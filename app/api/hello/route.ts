// export async function GET() {
//   return Response.json({ message: "Hello from Next.js API!" });
// }
// import { NextRequest, NextResponse } from "next/server";
// import { projects } from "@/lib/projects-db"; // Adjust the import path as needed
import { getProjects } from "@/lib/projects-db"; // Adjust the import path as needed

// GET /api/projects
export async function GET() {
  // return Response.json({ message: "Hello from Next.js API!" });
  const projects = await getProjects();
  return Response.json({ projects });
}
