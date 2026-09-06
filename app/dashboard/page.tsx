"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Folder, LogOut, LayoutGrid, Settings, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function fetchWorkspaces() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/workspaces", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setWorkspaces(data);
      }
    } catch (err) {
      console.error("Error fetching workspaces:", err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchWorkspaces();
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  async function handleCreateWorkspace() {
    if (!newWsName) return;
    const token = localStorage.getItem("token");
    setMessage("Creating workspace...");
    try {
      const response = await fetch("/api/workspaces/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name: newWsName }),
      });
      if (response.ok) {
        setMessage("✅ Workspace created!");
        setNewWsName("");
        await fetchWorkspaces();
        setTimeout(() => {
          setIsCreateModalOpen(false);
          setMessage("");
        }, 1500);
      } else {
        const data = await response.json();
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }
  }

  async function handleDeleteWorkspace(slug: string) {
    if (!confirm(`Are you sure you want to delete the workspace "${slug}"? This action cannot be undone.`)) {
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/workspaces/${slug}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        await fetchWorkspaces();
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert("Something went wrong while deleting the workspace.");
    }
  }

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-slate-500 font-medium">Loading your workspaces...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Slim Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col transition-all">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
            N
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 hidden lg:block">Nexus</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-3 px-3 py-6 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100" asChild>
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-5 h-5" />
              <span className="hidden lg:block font-semibold">Workspaces</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-6 rounded-xl text-slate-600 hover:bg-slate-100" asChild>
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Settings</span>
            </div>
          </Button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 px-3 py-6 rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700" asChild>
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Logout</span>
            </div>
          </Button>
        </div >
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Workspaces</h2>
            <p className="text-sm text-slate-500">Manage and access your knowledge hubs</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full px-6 py-6 gap-2 shadow-sm shadow-indigo-500/20"
            size="md"
          >
            <Plus className="w-4 h-4" />
            New Workspace
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {workspaces.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mb-6">
                <Folder className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No workspaces yet</h3>
              <p className="text-slate-500 mb-8">Create your first workspace to start organizing your documents and collaborating with AI.</p>
              <Button onClick={() => setIsCreateModalOpen(true)} className="rounded-full px-8 py-6">
                Create Your First Workspace
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workspaces.map((ws) => (
                <motion.div
                  key={ws.id}
                  whileHover={{ y: -4 }}
                  className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all cursor-default relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-indigo-100" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <Folder className="w-6 h-6" />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWorkspace(ws.slug);
                        }}
                        className="p-2 h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div onClick={() => router.push(`/workspace/${ws.slug}`)} className="cursor-pointer">
                      <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">{ws.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="info" className="text-[10px] py-0 px-2 bg-slate-100 text-slate-500 border-none">
                          {ws.slug}
                        </Badge>
                        <span className="text-[10px] text-slate-400">Active</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div >

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Workspace"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateWorkspace} disabled={!newWsName || message.includes("Creating")}>
                Create Workspace
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Workspace Name</label>
              <Input
                autoFocus
                placeholder="e.g. Product Roadmap, Q4 Planning..."
                value={newWsName}
                onChange={(e) => setNewWsName(e.target.value)}
              />
            </div>
            {message && (
              <p className={`text-sm font-medium ${message.includes('✅') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {message}
              </p>
            )}
            <p className="text-xs text-slate-500">
              The workspace name will be used to generate a unique URL slug for your team to access.
            </p>
          </div>
        </Modal>
      </main>
    </div>
  );
}
