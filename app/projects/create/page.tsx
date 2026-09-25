import { createProject } from "@/app/lib/actions";
import ProjectForm from "@/components/ProjectForm";

export default function CreateProjectPage() {
  return (
    <section className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Project</h1>
      <ProjectForm action={createProject} submitLabel="Save Project" />
    </section>
  );
}
