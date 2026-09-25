import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "@/app/lib/actions";
import ProjectForm from "@/components/ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const project = await getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <section className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Project</h1>
      <ProjectForm
        action={updateProjectWithId}
        submitLabel="Update Project"
        defaultValues={{
          title: project.title,
          description: project.description,
          type: project.type,
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(", ")
            : String(project.technologies ?? ""),
          link: project.link ?? "",
        }}
      />
    </section>
  );
}
