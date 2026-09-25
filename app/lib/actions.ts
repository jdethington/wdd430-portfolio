// app/lib/actions/ts
"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ProjectFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  type: z.enum(["opensource", "school"]),
  technologies: z.string().min(2, "Technologies are required"),
  link: z.string().url().optional().or(z.literal("")),
});

// function parseTechnologies(technologies: string): string[] {
//   return technologies
//     .split(",")
//     .map((tech) => tech.trim())
//     .filter(Boolean);
// }

export async function createProject(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    link: formData.get("link") || "",
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid project input");
  }

  const { title, description, type, technologies, link } = parsed.data;
  // const techArray = parseTechnologies(technologies);

  try {
    await sql`
    INSERT INTO projects (title, description, type, technologies, link)
    VALUES (
      ${title}, 
      ${description}, 
      ${type}, 
      ${technologies}, 
      ${link || null}
      )
      `;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project. Please try again later.");
  }

  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");
  redirect("/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const parsed = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    link: formData.get("link") || "",
  });

  if (!parsed.success) {
    throw new Error("Invalid project input");
  }

  const { title, description, type, technologies, link } = parsed.data;
  // const techArray = parseTechnologies(technologies);
  const projectId = Number(id);

  try {
    await sql`
    UPDATE projects
    SET
    title = ${title}, 
    description = ${description}, 
    type = ${type},
    technologies = ${technologies},
    link = ${link || null}
    WHERE id = ${projectId}
    `;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project. Please try again later.");
  }

  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");
  revalidatePath("/projects/${id}/edit");
  redirect("/projects");
}

export async function deleteProject(id: string) {
  const projectId = Number(id);
  await sql`DELETE FROM projects WHERE id = ${projectId}`;

  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");
}
