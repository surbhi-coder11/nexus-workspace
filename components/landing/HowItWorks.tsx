"use client";
import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, PenTool, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Create your workspace",
    description: "Set up a dedicated space for your project. Organize your thoughts by context, team, or objective in seconds.",
    icon: PlusCircle,
    step: "01",
  },
  {
    title: "Invite your team",
    description: "Bring your collaborators on board. Share documents, leave comments, and work together in real time.",
    icon: Users,
    step: "02",
  },
  {
    title: "Create & collaborate",
    description: "Draft documents, build knowledge bases, and sync everything across your entire organization.",
    icon: PenTool,
    step: "03",
  },
  {
    title: "Accelerate with AI",
    description: "Use the integrated AI assistant to summarize long threads, brainstorm new ideas, and polish your writing.",
    icon: Sparkles,
    step: "04",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold mb-4"
          >
            Workflow
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            From chaos to clarity
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent -z-10 translate-y-[-50%]" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center mb-6 relative z-10 transition-all group-hover:border-indigo-500 group-hover:shadow-indigo-100 group-hover:shadow-lg"
              >
                <step.icon className="w-8 h-8 text-indigo-600" />
              </motion.div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl font-black text-slate-100 blur-[1px] pointer-events-none">
                {step.step}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
