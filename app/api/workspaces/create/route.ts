
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Workspace name is required" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const workspace = await db.workspace.create({
      data: {
        name: name,
        slug: slug,
        ownerId: decoded.userId,
      },
    });

    await db.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: decoded.userId,
        role: "ADMIN",
      },
    });

    return NextResponse.json({ message: "Workspace created!", workspace }, { status: 201 });

  } catch (error) {
    console.error("CREATE_WORKSPACE_ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}