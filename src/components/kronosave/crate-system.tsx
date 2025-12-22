"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Box, Clock, GitBranch, FileText, Image, Code, MoreHorizontal } from "lucide-react";

interface CrateFile {
  id: string;
  name: string;
  type: "text" | "image" | "code" | "conversation";
  size: string;
  lastModified: Date;
  version: number;
  clustered?: boolean;
}

interface Crate {
  id: string;
  name: string;
  files: CrateFile[];
  color: "teal" | "purple" | "blue" | "pink";
  lastAccessed: Date;
}

interface CrateSystemProps {
  className?: string;
}

export function CrateSystem({ className }: CrateSystemProps) {
  const [crates, setCrates] = useState<Crate[]>([
    {
      id: "crate-1",
      name: "Project Alpha",
      color: "teal",
      lastAccessed: new Date(),
      files: [
        {
          id: "file-1",
          name: "conversation-01.md",
          type: "conversation",
          size: "2.4 KB",
          lastModified: new Date(),
          version: 3,
          clustered: true
        },
        {
          id: "file-2", 
          name: "design-mockup.png",
          type: "image",
          size: "156 KB",
          lastModified: new Date(),
          version: 1
        }
      ]
    },
    {
      id: "crate-2",
      name: "Research Notes",
      color: "purple",
      lastAccessed: new Date(Date.now() - 3600000),
      files: [
        {
          id: "file-3",
          name: "ai-models.md",
          type: "text",
          size: "8.1 KB", 
          lastModified: new Date(),
          version: 2
        }
      ]
    }
  ]);

  const [expandedCrate, setExpandedCrate] = useState<string | null>(null);

  const getFileIcon = (type: CrateFile["type"]) => {
    switch (type) {
      case "text": return <FileText size={12} />;
      case "image": return <Image size={12} />;
      case "code": return <Code size={12} />;
      case "conversation": return <GitBranch size={12} />;
      default: return <FileText size={12} />;
    }
  };

  const getColorClasses = (color: Crate["color"]) => {
    switch (color) {
      case "teal": return "border-teal-500/30 bg-teal-500/5 hover:border-teal-500/50";
      case "purple": return "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50";
      case "blue": return "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50";
      case "pink": return "border-pink-500/30 bg-pink-500/5 hover:border-pink-500/50";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/40 uppercase tracking-wider">Active Crates</p>
        <button className="text-xs text-white/40 hover:text-white/60 transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <AnimatePresence>
        {crates.map((crate) => (
          <motion.div
            key={crate.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "group rounded-lg border transition-all cursor-pointer",
              getColorClasses(crate.color)
            )}
          >
            {/* Crate Header */}
            <div 
              className="p-3"
              onClick={() => setExpandedCrate(
                expandedCrate === crate.id ? null : crate.id
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Box size={14} className={`text-${crate.color}-400`} />
                  <span className="text-sm font-medium text-white/80">
                    {crate.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30">
                    {crate.files.length} files
                  </span>
                  <Clock size={10} className="text-white/30" />
                </div>
              </div>

              {/* File Preview Bars */}
              <div className="flex gap-1 pl-6">
                {crate.files.slice(0, 3).map((file, i) => (
                  <div 
                    key={file.id}
                    className={cn(
                      "h-1 rounded-full bg-white/10",
                      i === 0 ? "w-8" : i === 1 ? "w-6" : "w-4"
                    )}
                  />
                ))}
                {crate.files.length > 3 && (
                  <div className="w-2 h-1 bg-white/5 rounded-full" />
                )}
              </div>
            </div>

            {/* Expanded File List */}
            <AnimatePresence>
              {expandedCrate === crate.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10 overflow-hidden"
                >
                  <div className="p-3 space-y-2">
                    {crate.files.map((file) => (
                      <div 
                        key={file.id}
                        className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group/file"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", JSON.stringify(file));
                        }}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="text-white/40">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white/70 truncate">
                              {file.name}
                            </div>
                            <div className="text-[10px] text-white/40 flex items-center gap-2">
                              <span>{file.size}</span>
                              {file.clustered && (
                                <span className="text-teal-400">clustered</span>
                              )}
                              <span>v{file.version}</span>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover/file:opacity-100 transition-opacity">
                          <button className="p-1 hover:bg-white/10 rounded">
                            <MoreHorizontal size={10} className="text-white/40" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Chronoshard Timeline */}
      <div className="mt-4 p-3 rounded border border-white/5 bg-black/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/40 uppercase tracking-wider">
            Chronoshard
          </span>
          <Clock size={12} className="text-white/30" />
        </div>
        <div className="relative">
          <div className="w-full h-1 bg-white/10 rounded-full">
            <div className="w-[75%] h-full bg-gradient-to-r from-teal-500/50 to-purple-500/50 rounded-full" />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-white/30">
            <span>Past</span>
            <span>Present</span>
          </div>
        </div>
      </div>
    </div>
  );
}