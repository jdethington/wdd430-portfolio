import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";
import type { ProjectSearchParams } from "@/types/search";

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
  const type = searchParams?.type; // optional filter

  const result = await fetchFilteredProjects(query, currentPage, type);
  const projects: Project[] = result.results;

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center py-12">
        Projects Overview
      </h1>

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
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <p className="text-gray-500 mb-4">
                <strong>Technologies:</strong>{" "}
                {Array.isArray(project.technologies)
                  ? project.technologies.join(", ")
                  : String(project.technologies ?? "")}
              </p>
            </div>
          ))}
        </div>
      )}

      <Pagination totalPages={result.totalPages} />
    </section>
  );
}
