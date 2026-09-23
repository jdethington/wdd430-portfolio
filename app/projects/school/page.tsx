// import { getProjects } from "@/lib/projects-db";
import { Suspense } from "react";
import SchoolProjectList from "./SchoolProjectList";

// interface Project {
//   id: string | number;
//   title: string;
//   description: string;
//   technologies: string[];
// }

function ProjectCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="h-7 w-3/4 rounded bg-slate-200 mb-2" />
          <div className="h-7 w-3/4 rounded bg-slate-200 mb-2" />
          <div className="h-4 w-full rounded bg-slate-200 mb-2" />
          <div className="h-4 w-5/6 rounded bg-slate-200 mb-2" />
          <div className="h-4 w-1/2 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default async function schoolProjectsPage() {
  // const projects: Project[] = await getProjects("school");

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center py-12">
        School Projects
      </h1>
      <Suspense fallback={<ProjectCardSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </section>
  );
}
