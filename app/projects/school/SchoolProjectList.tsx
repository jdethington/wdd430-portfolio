import { getProjects } from "@/lib/projects-db";

interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
}

export default async function SchoolProjectList() {
  // TEMPORARY delay for testing — remove later
  //   await new Promise((res) => setTimeout(res, 2000));

  const projects: Project[] = await getProjects("school");

  return (
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
  );
}
