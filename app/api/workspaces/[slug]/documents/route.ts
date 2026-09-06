
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const decoded = verifyToken(token || "");
    if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Find the workspace by the slug in the URL
    const workspace = await db.workspace.findUnique({
      where: { slug: params.slug }
    });

    if (!workspace) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // 2. Fetch the documents belonging to THIS specific workspace
    const docs = await db.document.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(docs);
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}