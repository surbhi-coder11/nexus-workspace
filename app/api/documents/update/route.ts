
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    const decoded = verifyToken(token || "");
    if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { documentId, content, title } = body;

    if (!documentId) return NextResponse.json({ error: "Document ID required" }, { status: 400 });

    const doc = await db.document.findUnique({ where: { id: documentId } });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const member = await db.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId: doc.workspaceId, userId: decoded.userId } },
    });

    if (!member) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const updated = await db.document.update({
      where: { id: documentId },
      data: { content, title },
    });

    return NextResponse.json({ message: "Saved!", document: updated });
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
