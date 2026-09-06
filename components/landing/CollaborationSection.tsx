"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function CollaborationSection() {
  const collaborators = [
    { name: "Sarah", color: "bg-indigo-500", pos: { top: "20%", left: "30%" } },
    { name: "Alex", color: "bg-rose-500", pos: { top: "45%", left: "60%" } },
    { name: "Jordan", color: "bg-amber-500", pos: { top: "70%", left: "40%" } },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Mock Document Editor with Cursors */}
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl p-8 overflow-hidden min-h-[500px]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">Team Roadmap 2026</h3>
                </div>
                <Button size="sm" className="rounded-full h-8 px-3">
                  <Share2 className="w-3 h-3 mr-2" /> Share
                </Button>
              </div>

              <div className="space-y-6 relative">
                <div className="h-4 w-full bg-slate-50 rounded" />
                <div className="h-4 w-5/6 bg-slate-50 rounded" />
                <div className="h-4 w-4/6 bg-slate-50 rounded" />

                <div className="py-4">
                  <div className="h-4 w-full bg-slate-50 rounded" />
                  <div className="h-4 w-full bg-slate-50 rounded mt-2" />
                </div>

                <div className="h-4 w-full bg-slate-50 rounded" />
                <div className="h-4 w-2/3 bg-slate-50 rounded mt-2" />
              </div>

              {/* Live Cursors */}
              {collaborators.map((user, i) => (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="absolute z-10 pointer-events-none"
                  style={{ top: user.pos.top, left: user.pos.left }}
                >
                  <div className="relative">
                    <div className={cn("w-3 h-6 rounded-full", user.color)} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)" }} />
                    <div className={cn("absolute top-0 left-0 px-2 py-0.5 rounded-full text-[10px] text-white font-bold whitespace-nowrap", user.color)}>
                      {user.name}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Floating Comment Bubble */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-1/3 right-10 p-3 bg-white border border-slate-200 shadow-lg rounded-xl max-w-[200px] z-20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-rose-500" />
                  <span className="text-xs font-bold text-slate-900">Alex</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "I think we should move the AI feature to the first sprint!"
                </p>
                <div className="flex items-center gap-2 mt-2 text-indigo-600">
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Reply</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-6"
            >
              <Users className="w-3 h-3" />
              <span>Collaboration</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
            >
              Work together <br />
              <span className="text-blue-600">in perfect harmony.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-10 leading-relaxed"
            >
              Nexus brings your team together with real-time presence, synchronized editing, and contextual communication. No more fragmented documents or endless email chains.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="rounded-full px-6">Invite Your Team</Button>
              <Button variant="outline" className="rounded-full px-6">View Enterprise Plans</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
