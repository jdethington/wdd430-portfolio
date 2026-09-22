interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
}

import { getProjects } from "@/lib/projects-db";

export default async function schoolProjectsPage() {
  const projects: Project[] = await getProjects("school");

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center py-12">
        School Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <p className="text-gray-500 mb-4">
              <strong>Technologies:</strong> {project.technologies.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
