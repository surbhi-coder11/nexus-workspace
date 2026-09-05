import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // 1. Get the token from the headers
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify the token using our helper
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 3. Parse the workspace name
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Workspace name is required" }, { status: 400 });
    }

    // 4. Create the workspace in the database
    // We also create a "slug" (e.g., "My Project" -> "my-project") for the URL
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const workspace = await db.workspace.create({
      data: {
        name: name,
        slug: slug,
        ownerId: decoded.userId,
      },
    });

    // 5. IMPORTANT: Make the owner a MEMBER of their own workspace
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