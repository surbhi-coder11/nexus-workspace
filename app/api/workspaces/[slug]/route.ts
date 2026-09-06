
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