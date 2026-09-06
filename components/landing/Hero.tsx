"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span className="tracking-tight">The next generation of knowledge work</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.1]"
        >
          Your knowledge, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            connected.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed"
        >
          Collaborate in real time, organize your knowledge, and accelerate your team's work with an AI-powered workspace designed for the modern era.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <Button size="lg" className="rounded-full px-8 py-6 text-base group" asChild>
            <Link href="/signup" className="flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base" asChild>
            <Link href="#features">Explore Workspace</Link>
          </Button>
        </motion.div>

        {/* High-Fidelity Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-6xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] overflow-hidden p-1.5"
          >
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              {/* Mock App Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400 font-medium px-3 py-1 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-200">
                  nexus.ai/workspace/production-roadmap
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
              </div>

              {/* Mock App Layout */}
              <div className="grid grid-cols-12 gap-4 h-[500px]">
                {/* Left Sidebar Mock */}
                <div className="col-span-3 bg-white rounded-lg border border-slate-200 p-4 space-y-4">
                  <div className="h-4 w-20 bg-slate-100 rounded" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-indigo-50 rounded border-l-2 border-indigo-500" />
                    <div className="h-3 w-3/4 bg-slate-50 rounded" />
                    <div className="h-3 w-5/6 bg-slate-50 rounded" />
                    <div className="h-3 w-2/3 bg-slate-50 rounded" />
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="h-3 w-full bg-slate-50 rounded" />
                    <div className="h-3 w-1/2 bg-slate-50 rounded" />
                  </div>
                </div>

                {/* Main Editor Mock */}
                <div className="col-span-6 bg-white rounded-lg border border-slate-200 p-8 relative">
                  <div className="h-8 w-1/2 bg-slate-100 rounded mb-6" />
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-slate-50 rounded" />
                    <div className="h-4 w-full bg-slate-50 rounded" />
                    <div className="h-4 w-3/4 bg-slate-50 rounded" />
                    <div className="h-32 w-full bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 mt-6 relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 rounded-full bg-indigo-500" />
                        <div className="h-2 w-24 bg-indigo-100 rounded" />
                      </div>
                      <div className="h-3 w-full bg-indigo-100 rounded mb-2" />
                      <div className="h-3 w-4/5 bg-indigo-100 rounded" />
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-indigo-600 text-white text-[8px] font-bold">AI Suggestion</div>
                    </div>
                  </div>
                </div>

                {/* Right AI Panel Mock */}
                <div className="col-span-3 bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-4">
                  <div className="h-6 w-full bg-slate-200 rounded-full mb-6" />
                  <div className="space-y-3">
                    <div className="h-12 w-full bg-white rounded-lg border border-slate-200 p-2 shadow-sm" />
                    <div className="h-12 w-full bg-indigo-600 rounded-lg p-2 shadow-sm ml-8" />
                    <div className="h-12 w-full bg-white rounded-lg border border-slate-200 p-2 shadow-sm" />
                    <div className="h-12 w-full bg-indigo-600 rounded-lg p-2 shadow-sm ml-8" />
                  </div>
                  <div className="absolute bottom-4 right-4 w-full px-4">
                    <div className="h-10 w-full bg-white border border-slate-200 rounded-full px-4 flex items-center justify-between">
                      <div className="h-2 w-20 bg-slate-100 rounded" />
                      <div className="w-5 h-5 rounded-full bg-indigo-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Decorative Accents */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-30 -z-10" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
