import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import { fetchFilteredProjects } from "@/lib/projects-db";
import type { ProjectSearchParams } from "@/types/search";
import Link from "next/link";

interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
}

export default async function ProjectsPage(props: {
  searchParams?: Promise<ProjectSearchParams>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const type = searchParams?.type;

  const result = await fetchFilteredProjects(query, currentPage, type);
  const projects: Project[] = result.results;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-center sm:text-left py-4">
          Projects Overview
        </h1>
        <Link
          href="/projects/create"
          className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition text-center"
        >
          + New Project
        </Link>
      </div>

      <div className="flex justify-center mb-6">
        <ProjectSearch />
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-600 py-12">
          No projects found
          {query ? ` for “${query}”` : ""}
          {type ? ` in ${type}` : ""}. Try different keywords or clear filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4 flex-grow">
                {project.description}
              </p>
              <p className="text-gray-500 mb-4">
                <strong>Technologies:</strong>{" "}
                {Array.isArray(project.technologies)
                  ? project.technologies.join(", ")
                  : String(project.technologies ?? "")}
              </p>

              <div className="flex gap-3 mt-auto pt-2">
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded transition"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={String(project.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination totalPages={result.totalPages} />
    </section>
  );
}
