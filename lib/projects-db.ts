import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

// export const projects: Project[] = [
//   {
//     id: 1,
//     title: "My First Open Source Contribution",
//     description: "A bug fix contributed to a popular library.",
//     type: "opensource",
//     technologies: ["TypeScript", "React"],
//     link: "https://github.com/example/repo",
//   },
//   {
//     id: 2,
//     title: "Database Design Final Project",
//     description: "An ER diagram and normalized schema for a library system.",
//     type: "school",
//     technologies: ["PostgreSQL", "SQL"],
//   },
// ];

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id DESC`;
    return rows;
  }
  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY id`;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}`;
  return rows[0] ?? null;
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(
  query: string,
  currentPage: number,
): Promise<{ projects: Project[] }> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const q = `%${query}%`;
  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE
      title ILIKE ${q} 
      OR description ILIKE ${q}
      OR array_to_string(technologies, ',') ILIKE ${q}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} 
    OFFSET ${offset}`;
  return { projects: rows };
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const q = `%${query}%`;

  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*)::text AS count FROM projects
    WHERE
      title ILIKE ${q}
      OR description ILIKE ${q}
      OR array_to_string(technologies, ',') ILIKE ${q}
  `;

  const count = Number(rows[0]?.count ?? 0);
  return Math.ceil(count / ITEMS_PER_PAGE);
}
