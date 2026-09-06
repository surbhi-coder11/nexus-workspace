"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Logging in...");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setMessage("✅ Login successful! Redirecting...");
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              N
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 mt-2">Enter your details to access your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full py-6 text-base" size="lg">
              Sign In
            </Button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-6 text-center text-sm font-medium ${message.includes('✅') ? 'text-emerald-600' : 'text-rose-600'}`}
            >
              {message}
            </motion.p>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
                Create one for free
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
