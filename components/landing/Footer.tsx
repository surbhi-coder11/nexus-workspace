import Link from "next/link";
import { MessageSquare, Code2, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-2xl mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm">N</div>
              Nexus
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              The next generation of collaborative workspaces, powered by AI. Organizing the world's knowledge, one workspace at a time.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white transition">How it Works</Link></li>
              <li><Link href="/signup" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition">AI Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition">About</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <p>© {new Date().getFullYear()} Nexus Workspace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition"><MessageSquare className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-white transition"><Code2 className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-white transition"><User className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
