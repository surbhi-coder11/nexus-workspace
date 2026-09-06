"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AISection() {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI-Powered Intelligence</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6"
            >
              Stop searching, <br />
              <span className="text-indigo-400">start discovering.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 mb-10 leading-relaxed"
            >
              Our integrated AI assistant doesn't just chat—it understands your entire workspace. Summarize a hundred documents, generate project roadmaps, or brainstorm new angles instantly.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <Button className="rounded-full px-6">Try AI Assistant</Button>
              <Button variant="outline" className="rounded-full px-6 text-slate-300 border-slate-700 hover:bg-slate-800">View Documentation</Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden p-4 relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Nexus AI</p>
                    <p className="text-[10px] text-slate-500">Active Assistant</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>
              </div>

              <div className="space-y-6 mb-20">
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none text-sm">
                    Summarize the key decisions from the Project Alpha roadmap document.
                  </div>
                </div>
                <div className="flex justify-start items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="max-w-[80%] bg-slate-800 text-slate-300 p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                    Based on the roadmap, here are the 3 key decisions:
                    <ul className="mt-2 space-y-2 list-disc list-inside text-slate-400">
                      <li>Migration to Neon DB completed.</li>
                      <li>AI model switched to Llama 3.3.</li>
                      <li>New auth flow implemented via JWT.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="bg-transparent border-none outline-none text-sm text-white flex-1 px-2"
                    readOnly
                  />
                  <Button size="sm" className="rounded-lg h-8 w-8 p-0">
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 flex flex-wrap gap-2 max-w-[200px]">
              <Badge variant="info" className="cursor-pointer hover:bg-indigo-200 transition">Summarize</Badge>
              <Badge variant="info" className="cursor-pointer hover:bg-indigo-200 transition">Improve</Badge>
              <Badge variant="info" className="cursor-pointer hover:bg-indigo-200 transition">Brainstorm</Badge>
            </div>
            <div className="absolute -top-6 -right-6 flex flex-wrap gap-2 max-w-[200px] text-right">
              <Badge variant="info" className="cursor-pointer hover:bg-indigo-200 transition">Explain</Badge>
              <Badge variant="info" className="cursor-pointer hover:bg-indigo-200 transition">Generate</Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
