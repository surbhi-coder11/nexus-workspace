import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
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

    // Fetch all workspaces the user is a member of
    const memberships = await db.workspaceMember.findMany({
      where: { userId: decoded.userId },
      include: {
        workspace: true,
      },
      orderBy: {
        workspace: {
          createdAt: "desc",
        },
      },
    });

    const workspaces = memberships.map(m => m.workspace);

    return NextResponse.json(workspaces);
  } catch (error) {
    console.error("FETCH_WORKSPACES_ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
