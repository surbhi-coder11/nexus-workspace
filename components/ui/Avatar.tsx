"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
  status?: "online" | "offline" | "away";
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback, status, ...props }, ref) => {
    const statusColors = {
      online: "bg-emerald-500",
      offline: "bg-slate-400",
      away: "bg-amber-500",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full border-2 border-slate-200 overflow-hidden bg-slate-100 transition-all",
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={fallback} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs font-semibold text-slate-600">
            {fallback || "U"}
          </span>
        )}
        {status && (
          <span className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white",
            statusColors[status]
          )} />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
