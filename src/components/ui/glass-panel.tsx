"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: "default" | "dark" | "active";
}

export function GlassPanel({ 
  children, 
  className, 
  title,
  variant = "default" 
}: GlassPanelProps) {
  const variants = {
    default: "bg-black/40 border-white/10",
    dark: "bg-black/60 border-white/5",
    active: "bg-[#4ECDC4]/5 border-[#4ECDC4]/30 box-shadow-glow"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative rounded-xl backdrop-blur-md border overflow-hidden flex flex-col",
        variants[variant],
        className
      )}
    >
      {/* Metallic/Wooden Header Accent */}
      {title && (
        <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-white/5">
          <span className="text-xs font-medium tracking-widest text-white/70 uppercase">
            {title}
          </span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Subtle shine effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
    </motion.div>
  );
}
