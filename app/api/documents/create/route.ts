
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // 1. Get and verify the token from headers
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Parse the data from the request body
    const body = await request.json();
    const { slug, title } = body;

    if (!slug) {
      return NextResponse.json({ error: "Workspace slug is required" }, { status: 400 });
    }

    // 3. Find the workspace by slug
    const workspace = await db.workspace.findUnique({
      where: { slug: slug },
    });

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    // 4. Security Check: Does this user actually belong to this workspace?
    const membership = await db.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId: workspace.id,
          userId: decoded.userId,
        },
      },
    });

    if (!membership) {
      return NextResponse.json({ error: "You do not have access to this workspace" }, { status: 403 });
    }

    // 5. Create the document in the database
    const document = await db.document.create({
      data: {
        workspaceId: workspace.id,
        title: title || "Untitled Document",
        content: "", // Start with empty content for the user to fill
      },
    });

    // 6. Return the created document
    return NextResponse.json({ message: "Document created!", document }, { status: 201 });

  } catch (error) {
    console.error("CREATE_DOC_ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}