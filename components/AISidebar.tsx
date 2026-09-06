"use client";
import React from "react";
import { useChat } from "@ai-sdk/react";

export default function AISidebar({ content }: { content: string }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ai/chat",
    body: { context: content },
  });

  return (
    <div className="w-80 bg-slate-50 border-l flex flex-col h-full">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2"><span>✨</span> Nexus AI</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-sm text-slate-500 italic">Ask me to summarize your document or suggest improvements!</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="relative">
          <input value={input} onChange={handleInputChange} placeholder="Ask AI..." className="w-full p-2 pr-10 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          <button type="submit" disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-sm disabled:text-gray-400">{isLoading ? "..." : "→"}</button>
        </div>
      </form>
    </div>
  );
}
