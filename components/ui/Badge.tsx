"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-100 text-slate-700 border-slate-200",
      success: "bg-emerald-100 text-emerald-700 border-emerald-200",
      warning: "bg-amber-100 text-amber-700 border-amber-200",
      error: "bg-rose-100 text-rose-700 border-rose-200",
      info: "bg-indigo-100 text-indigo-700 border-indigo-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
