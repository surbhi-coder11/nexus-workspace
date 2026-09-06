import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const decoded = verifyToken(token || "");
    if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const workspace = await db.workspace.findUnique({ where: { slug: params.slug } });
    if (!workspace) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const docs = await db.document.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(docs);
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const decoded = verifyToken(token || "");
    if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const workspace = await db.workspace.findUnique({
      where: { slug: params.slug },
      include: { members: true }
    });

    if (!workspace) return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

    // Check if user is ADMIN or OWNER
    const isMember = workspace.members.find(m => m.userId === decoded.userId);
    if (!isMember || isMember.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Only admins can delete workspaces" }, { status: 403 });
    }

    await db.workspace.delete({
      where: { id: workspace.id },
    });

    return NextResponse.json({ message: "Workspace deleted successfully" });
  } catch (e) {
    console.error("DELETE_WORKSPACE_ERROR:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
