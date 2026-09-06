"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI integration work?",
    answer: "Nexus utilizes a state-of-the-art AI assistant integrated directly into your workspace. By analyzing the context of your active document, it can provide summaries, expand on your ideas, or even help you restructure your knowledge base in real time.",
  },
  {
    question: "Is my data private and secure?",
    answer: "Privacy is our priority. All data is encrypted at rest and in transit. We implement strict role-based access control, ensuring that only the people you invite can access your documents and workspaces.",
  },
  {
    question: "Can I collaborate with external guests?",
    answer: "Yes. Nexus allows you to create secure, invite-only workspaces where you can collaborate with external clients or partners without granting them access to your entire organization's knowledge.",
  },
  {
    question: "What makes Nexus different from Notion or Slack?",
    answer: "Nexus bridges the gap between structured documentation and real-time communication. While Slack is for chatting and Notion is for documenting, Nexus is an AI-first environment where your documents actually 'think' and help you work.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-4"
          >
            Support
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="border border-slate-200 rounded-2xl overflow-hidden transition-all hover:shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition"
              >
                <span className="font-semibold text-slate-900 tracking-tight">{faq.question}</span>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", openIndex === index && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-gradient-to-b from-white to-slate-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
