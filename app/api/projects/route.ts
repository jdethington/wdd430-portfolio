import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/projects-db";

// GET /api/projects
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const projects = await getProjects(type);
  return NextResponse.json(projects);
}
