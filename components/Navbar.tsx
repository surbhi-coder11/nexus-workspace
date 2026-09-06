"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-slate-200/60 bg-white/70 backdrop-blur-md transition-all shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          N
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">Nexus</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {["Features", "How it Works", "FAQ"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative py-1 group transition-colors hover:text-indigo-600"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Login</Link>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
