// app/lib/actions/ts
"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  type: z.enum(["opensource", "school"], {
    message: "Type must be either 'opensource' or 'school'",
  }),
  technologies: z.string().min(2, "Technologies are required"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  year_completed: z.coerce
    .number()
    .int("Year must be a whole number")
    .gte(2000, "Year must be 2000 or later")
    .lte(currentYear, `Year cannot be greater than ${currentYear}`),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    link?: string[];
    year_completed?: string[];
  };
  message?: string | null;
  // Keep what the user typed so the form can restore it
  values?: {
    title?: string;
    description?: string;
    type?: string;
    technologies?: string;
    link?: string;
    yearCompleted?: string;
  };
};

function parseTechnologies(technologies: string): string[] {
  return technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
}

async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");
  return session;
}

// Create a new project
export async function createProject(
  prevState: State,
  formData: FormData,
): Promise<State> {
  await requireOwnerSession();
  const values = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    type: String(formData.get("type") ?? ""),
    technologies: String(formData.get("technologies") ?? ""),
    link: String(formData.get("link") ?? ""),
    year_completed: String(formData.get("year_completed") ?? ""),
  };
  const validatedFields = ProjectFormSchema.safeParse({
    title: values.title,
    description: values.description,
    type: values.type,
    technologies: values.technologies,
    link: values.link || "",
    year_completed: values.year_completed,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Missing or invalid fields. Please correct the errors and try again.",
      values, // Keep what the user typed so the form can restore it
    };
  }

  const { title, description, type, technologies, link, year_completed } =
    validatedFields.data;
  const techList = parseTechnologies(technologies).join(",");

  try {
    await sql`
    INSERT INTO projects (title, description, type, technologies, link, year_completed)
    VALUES (
      ${title}, 
      ${description}, 
      ${type}, 
      string_to_array(${techList}, ','), 
      ${link || null},
      ${year_completed}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);
    // throw new Error("Failed to create project. Please try again later.");
    return {
      message: "Failed to create project. Please try again later.",
      values, // Keep what the user typed so the form can restore it
    };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
  redirect("/dashboard/projects");
}

// Update an existing project
export async function updateProject(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  await requireOwnerSession();
  const values = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    type: String(formData.get("type") ?? ""),
    technologies: String(formData.get("technologies") ?? ""),
    link: String(formData.get("link") ?? ""),
    year_completed: String(formData.get("year_completed") ?? ""),
  };
  const validatedFields = ProjectFormSchema.safeParse({
    title: values.title,
    description: values.description,
    type: values.type,
    technologies: values.technologies,
    link: values.link || "",
    year_completed: values.year_completed,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Missing or invalid fields. Please correct the errors and try again.",
      values, // Keep what the user typed so the form can restore it
    };
  }

  const { title, description, type, technologies, link, year_completed } =
    validatedFields.data;
  const techList = parseTechnologies(technologies).join(",");
  const projectId = Number(id);

  try {
    await sql`
    UPDATE projects
    SET
    title = ${title}, 
    description = ${description}, 
    type = ${type},
    technologies = string_to_array(${techList}, ','),
    link = ${link || null},
    year_completed = ${year_completed || null}
    WHERE id = ${projectId}
    `;
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      message: "Failed to update project. Please try again later.",
      values, // Keep what the user typed so the form can restore it
    };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard/projects/opensource");
  revalidatePath("/dashboard/projects/school");
  revalidatePath(`/dashboard/projects/${id}/edit`);
  redirect("/dashboard/projects");
}

// Delete a project
export async function deleteProject(
  id: string,
  _formData?: FormData,
): Promise<void> {
  await requireOwnerSession();
  const projectId = Number(id);
  try {
    await sql`DELETE FROM projects WHERE id = ${projectId}`;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project. Please try again later.");
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard/projects/opensource");
  revalidatePath("/dashboard/projects/school");
}

// Authentication action for signing in a user
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong. Please try again later.";
      }
    }
    throw error; // needed so successful login can redirect
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
