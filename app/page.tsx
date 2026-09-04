import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "Projects Portfolio",
    description:
      "This is a modern Next.js + React + TypeScript + Tailwind CSS portfolio project, bootstrapped with create-next-app. It is designed for easy deployment on Vercel.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    link: "https://github.com/jdethington/wdd430-portfolio",
  },
  {
    title: "FindMovie",
    description:
      "This is a client side static site that uses Streaming Availability API to find movies and TV shows that are available to stream on various platforms.",
    technologies: ["JavaScript", "HTML", "CSS", "APIs"],
    link: "https://wdd330-final-project-bg8o.onrender.com",
  },
  {
    title: "Service Network",
    description:
      "This is a classic backend application built with Node.js and Express.",
    technologies: ["Node.js", "Express", "PostgreSQL", "EJS"],
    link: "https://github.com/jdethington/cse340",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-large text-gray-700">
          I&#39;m a full-stack developer learning Next.js and React. Here are
          some of my latest projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}
