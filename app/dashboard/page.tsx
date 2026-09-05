
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState<any[]>([]); // Store the workspaces here
  const router = useRouter();

  // Function to fetch workspaces from the API
  async function fetchWorkspaces() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/workspaces", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
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
      fetchWorkspaces(); // Fetch the workspaces when the page loads
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  async function createWorkspace() {
    const name = prompt("Enter workspace name:");
    if (!name) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/workspaces/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert("Workspace created successfully!");
        await fetchWorkspaces(); // Refresh the list instead of reloading the whole page!
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Nexus Workspace</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
        >
          Logout
        </button>
      </nav>

      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Your Workspaces 🚀</h2>
          <p className="text-gray-600 mb-8">Manage your projects and documents.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Map through the workspaces and show them as cards */}
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📁</span>
                  <span className="text-xs text-gray-400 uppercase font-bold">{ws.slug}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {ws.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">No documents yet</p>
              </div>
            ))}

            {/* 2. The "Create" Button */}
            <div
              onClick={createWorkspace}
              className="p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center h-40 hover:border-blue-400 transition cursor-pointer"
            >
              <span className="text-4xl mb-2">➕</span>
              <p className="font-medium text-gray-700">Create New Workspace</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
