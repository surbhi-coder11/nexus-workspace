"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Brain, Users, Cloud, Search, Layout, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI-Powered Insights",
    description: "Transform your notes into actionable insights. Summarize long documents, brainstorm ideas, and expand your thinking with a built-in AI assistant.",
    icon: Brain,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    gridClass: "md:col-span-2",
  },
  {
    title: "Real-Time Sync",
    description: "Collaborate effortlessly. Changes sync instantly across all devices.",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50",
    gridClass: "md:col-span-1",
  },
  {
    title: "Enterprise Security",
    description: "Industry-leading encryption and role-based access control to keep your team's knowledge safe.",
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    gridClass: "md:col-span-1",
  },
  {
    title: "Smart Knowledge Management",
    description: "Organize documents, projects, and ideas in one connected workspace. Stop searching and start finding.",
    icon: Layout,
    color: "text-orange-600",
    bg: "bg-orange-50",
    gridClass: "md:col-span-2",
  },
  {
    title: "Team Workspaces",
    description: "Create dedicated hubs for different projects. Invite members with one click.",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    gridClass: "md:col-span-1",
  },
  {
    title: "Powerful Search",
    description: "Instant, full-text search across all your workspaces and documents.",
    icon: Search,
    color: "text-slate-600",
    bg: "bg-slate-50",
    gridClass: "md:col-span-1",
  },
  {
    title: "Collaboration Hub",
    description: "Comment, tag, and discuss ideas directly within your documents with live activity tracking.",
    icon: MessageSquare,
    color: "text-blue-600",
    bg: "bg-blue-50",
    gridClass: "md:col-span-1",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-4"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter mb-6"
          >
            Everything you need <br className="hidden md:block" /> to thrive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Nexus combines the power of a structured database with the flexibility of a document editor and the intelligence of AI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group p-8 rounded-3xl border border-slate-200/60 bg-white hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-default",
                feature.gridClass
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6",
                feature.bg
              )}>
                <feature.icon className={cn("w-6 h-6", feature.color)} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
