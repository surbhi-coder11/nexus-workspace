"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  Search,
  ChevronLeft,
  MoreVertical,
  User,
  Hash
} from "lucide-react";
import AISidebar from "@/components/AISidebar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function WorkspacePage() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  async function createDocument() {
    const token = localStorage.getItem("token");
    const docName = prompt("Enter document title:");
    if (!docName) return;
    try {
      const response = await fetch("/api/documents/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ title: docName, slug: slug }),
      });
      if (response.ok) {
        await fetchDocuments();
      }
    } catch (err) {
      alert("Error creating document.");
    }
  }

  useEffect(() => {
    if (!activeDoc) return;
    const timeoutId = setTimeout(async () => {
      const token = localStorage.getItem("token");
      await fetch("/api/documents/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ documentId: activeDoc.id, content, title }),
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [content, title, activeDoc]);

  const filteredDocs = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-slate-500 font-medium">Loading your workspace...</div>;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar: Navigation & Documents */}
      <aside className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col transition-all">
        <div className="p-6 flex items-center justify-between border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              N
            </div>
            <span className="font-bold text-slate-900 truncate text-sm">{slug}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="p-1 h-8 w-8 rounded-md">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              className="pl-9 bg-white border-slate-200 text-sm"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="flex items-center justify-between px-3 mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Documents</span>
            <Button variant="ghost" size="sm" onClick={createDocument} className="p-1 h-6 w-6 rounded-md text-indigo-600 hover:bg-indigo-50">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1">
            {filteredDocs.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ x: 2 }}
                onClick={() => { setActiveDoc(doc); setContent(doc.content); setTitle(doc.title); }}
                className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm transition-all ${
                  activeDoc?.id === doc.id
                    ? "bg-indigo-50 text-indigo-700 font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <FileText className={cn("w-4 h-4", activeDoc?.id === doc.id ? "text-indigo-600" : "text-slate-400")} />
                <span className="truncate flex-1">{doc.title}</span>
                {activeDoc?.id === doc.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
              </motion.div>
            ))}
            {filteredDocs.length === 0 && (
              <div className="text-center py-8 px-4">
                <p className="text-xs text-slate-400 italic">No documents found</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">User Profile</p>
              <p className="text-[10px] text-slate-500 truncate">Owner</p>
            </div>
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6 rounded-md">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 flex overflow-hidden bg-white">
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Editor Header */}
          <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 bg-white/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span className="hover:text-slate-600 cursor-pointer transition">Workspaces</span>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-slate-600 truncate">{slug}</span>
              {activeDoc && (
                <>
                  <span className="text-slate-300">/</span>
                  <span className="text-indigo-600 font-medium truncate">{title}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="info" className="text-[10px] py-0 px-2 bg-emerald-50 text-emerald-600 border-emerald-100">
                Autosaving
              </Badge>
              <Button variant="outline" size="sm" className="h-8 rounded-full text-xs">Share</Button>
            </div>
          </header>

          {/* Document Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto w-full px-8 py-16">
              <div className="mb-8 group relative">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-4xl font-extrabold text-slate-900 w-full outline-none placeholder:text-slate-200 leading-tight"
                  placeholder="Untitled Document"
                />
                <div className="absolute -top-1 -left-1 w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[calc(100vh-300px)] outline-none text-lg leading-relaxed resize-none text-slate-700 placeholder:text-slate-300 font-sans"
                placeholder="Start writing your thoughts..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right AI Panel */}
        <div className="w-[400px] border-l border-slate-200 bg-slate-50 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-indigo-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold">
                AI
              </div>
              <span className="text-sm font-bold text-slate-900">Nexus Assistant</span>
            </div>
            <Badge variant="info" className="text-[10px] py-0 px-2 bg-indigo-50 text-indigo-600 border-indigo-100">
              Llama 3.3
            </Badge>
          </div>
          <div className="flex-1 overflow-hidden">
            <AISidebar content={content} />
          </div>
        </div>
      </main>
    </div>
  );
}
