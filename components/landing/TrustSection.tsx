"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, UserCheck, Globe, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "Your data is encrypted before it even leaves your device.",
    icon: Lock,
  },
  {
    title: "Role-Based Access",
    description: "Granular control over who can view, edit, or admin your content.",
    icon: UserCheck,
  },
  {
    title: "Privacy First",
    description: "We never sell your data. Your knowledge remains your own.",
    icon: EyeOff,
  },
  {
    title: "Secure Infrastructure",
    description: "Hosted on world-class data centers with 99.9% uptime.",
    icon: Server,
  },
  {
    title: "Global Availability",
    description: "Access your workspace from anywhere in the world, instantly.",
    icon: Globe,
  },
  {
    title: "Verified Compliance",
    description: "Meeting the highest standards of data protection and security.",
    icon: ShieldCheck,
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold mb-4">
            Security
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            Enterprise-grade security <br /> for every team.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We take security seriously. Nexus is built from the ground up to protect your most sensitive intellectual property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-2xl border border-slate-200 flex gap-4 items-start hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                <feature.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 tracking-tight">{feature.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
