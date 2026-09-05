
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function WorkspacePage() {
  const params = useParams();
  const slug = params.slug; // This gets the 'slug' from the URL
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r flex flex-col">
        <div className="p-4 border-b font-bold text-lg flex items-center gap-2">
          <span>📁</span> {slug}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-4">Documents</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 italic">No documents yet...</p>
          </div>
        </div>
        <div className="p-4 border-t">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
            + New Document
          </button>
        </div>
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center justify-between px-6">
          <h2 className="font-medium text-gray-700">Untitled Document</h2>
          <button onClick={() => router.push("/dashboard")} className="text-sm text-gray-500 hover:text-gray-800">
            ← Back to Dashboard
          </button>
        </header>
        <div className="flex-1 p-12 max-w-4xl mx-auto w-full">
          <textarea
            className="w-full h-full outline-none text-lg leading-relaxed resize-none"
            placeholder="Start typing your thoughts..."
          ></textarea>
        </div>
      </main>
    </div>
  );
}
