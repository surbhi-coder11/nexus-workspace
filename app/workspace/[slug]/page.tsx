
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function WorkspacePage() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // 1. Fetch documents for this workspace
  async function fetchDocuments() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/workspaces/${slug}/documents`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (err) {
      console.error("Error fetching docs:", err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchDocuments();
      setIsLoading(false);
    }
  }, [router, slug]);

  // 2. Create a new document
  async function createDocument() {
    const token = localStorage.getItem("token");
    const docName = prompt("Enter document title:");
    if (!docName) return;

    try {
      // We need the workspace ID. Since we only have the slug,
      // we'll let the backend handle finding the workspace by slug.
      const response = await fetch("/api/documents/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: docName,
          slug: slug // Pass the slug so the backend knows which workspace
        }),
      });

      if (response.ok) {
        await fetchDocuments(); // Refresh list
        alert("Document created!");
      }
    } catch (err) {
      alert("Error creating document.");
    }
  }

  // 3. Autosave logic
  useEffect(() => {
    if (!activeDoc) return;

    const timeoutId = setTimeout(async () => {
      const token = localStorage.getItem("token");
      await fetch("/api/documents/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          documentId: activeDoc.id,
          content: content,
          title: title
        }),
      });
      console.log("Autosaved...");
    }, 1000); // Save 1 second after the user stops typing

    return () => clearTimeout(timeoutId);
  }, [content, title, activeDoc]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r flex flex-col">
        <div className="p-4 border-b font-bold text-lg flex items-center gap-2">
          <span className="text-blue-600">📁</span> {slug}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-4">Documents</p>
          <div className="space-y-1">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  setActiveDoc(doc);
                  setContent(doc.content);
                  setTitle(doc.title);
                }}
                className={`p-2 rounded cursor-pointer text-sm transition ${activeDoc?.id === doc.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-200"}`}
              >
                📄 {doc.title}
              </div>
            ))}
            {documents.length === 0 && <p className="text-xs text-gray-400 italic">No documents yet...</p>}
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={createDocument}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            + New Document
          </button>
        </div>
      </aside>

      {/* Editor Area */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center justify-between px-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-medium text-gray-700 outline-none text-lg w-1/2"
            placeholder="Untitled Document"
          />
          <button onClick={() => router.push("/dashboard")} className="text-sm text-gray-500 hover:text-gray-800">
            ← Back to Dashboard
          </button>
        </header>
        <div className="flex-1 p-12 max-w-4xl mx-auto w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full outline-none text-lg leading-relaxed resize-none text-gray-800"
            placeholder="Start typing your thoughts..."
          ></textarea>
        </div>
      </main>
    </div>
  );
}
