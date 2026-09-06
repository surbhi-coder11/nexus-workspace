"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-indigo-600 p-12 lg:p-20 text-center overflow-hidden shadow-2xl shadow-indigo-500/20"
        >
          {/* Decorative Mesh Gradient */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.3),transparent)]" />
          </div>

          <h2 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Your team's knowledge <br /> deserves a better workspace.
          </h2>
          <p className="text-indigo-100 text-lg lg:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Bring your ideas, documents, people, and AI together in one place. Start building your knowledge base today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-base bg-white text-indigo-600 hover:bg-indigo-50" asChild>
              <Link href="/signup">Start for Free</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base bg-transparent text-white border-indigo-400 hover:bg-indigo-500" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
