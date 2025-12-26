import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: "default" | "accent";
}

export function GlassPanel({ 
  children, 
  title, 
  className = "",
  variant = "default"
}: GlassPanelProps) {
  return (
    <div className={cn(
      "glass-panel rounded-lg p-4 relative overflow-hidden",
      variant === "accent" && "border-rose-400/20 bg-rose-400/5",
      className
    )}>
      {title && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white/80 tracking-wide uppercase">
            {title}
          </h3>
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        </div>
      )}
      {children}
      
      {/* Subtle corner highlights */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-white/5 to-transparent rounded-tl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-rose-400/10 to-transparent rounded-br-lg" />
    </div>
  );
}