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

    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    // Use a transaction to ensure both workspace and member are created
    const result = await db.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: {
          name: name,
          slug: slug,
          ownerId: decoded.userId,
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId: decoded.userId,
          role: "ADMIN",
        },
      });

      return workspace;
    });

    return NextResponse.json({ message: "Workspace created!", workspace: result }, { status: 201 });

  } catch (error: any) {
    console.error("CREATE_WORKSPACE_ERROR:", error);

    // Handle unique constraint violation for slug (Prisma error code P2002)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A workspace with this name or slug already exists. Please try a different name." },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
