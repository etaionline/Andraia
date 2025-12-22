"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, GitBranch, Layers, X } from "lucide-react";

interface CanvasElement {
  id: string;
  type: "message" | "file" | "note";
  content: string;
  agent?: "minimax" | "mistral" | "gpt4o" | "grok";
  position: { x: number; y: number };
  timestamp: Date;
  version: number;
}

interface BlackBoardProps {
  className?: string;
}

export function BlackBoard({ className }: BlackBoardProps) {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState(100); // 100% = latest
  const canvasRef = useRef<HTMLDivElement>(null);

  const agentColors = {
    minimax: "border-purple-500/50 bg-purple-500/10",
    mistral: "border-teal-500/50 bg-teal-500/10", 
    gpt4o: "border-blue-500/50 bg-blue-500/10",
    grok: "border-pink-500/50 bg-pink-500/10"
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simulate dropping a message from chat
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: "message",
      content: "Sample AI response that was dragged here...",
      agent: "mistral",
      position: { x, y },
      timestamp: new Date(),
      version: 1
    };

    setElements(prev => [...prev, newElement]);
  };

  const handleElementDrag = (elementId: string, newPosition: { x: number; y: number }) => {
    setElements(prev => 
      prev.map(el => 
        el.id === elementId 
          ? { ...el, position: newPosition }
          : el
      )
    );
  };

  const removeElement = (elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
  };

  const forkElement = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    const forkedElement: CanvasElement = {
      ...element,
      id: `${element.id}-fork-${Date.now()}`,
      position: { 
        x: element.position.x + 20, 
        y: element.position.y + 20 
      },
      version: element.version + 1,
      timestamp: new Date()
    };

    setElements(prev => [...prev, forkedElement]);
  };

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Timeline Control */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-3">
          <Clock size={14} className="text-white/50" />
          <input
            type="range"
            min="0"
            max="100"
            value={timelinePosition}
            onChange={(e) => setTimelinePosition(Number(e.target.value))}
            className="w-32 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
          />
          <span className="text-xs text-white/50 font-mono">
            {timelinePosition}%
          </span>
        </div>
      </div>

      {/* Canvas Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      {/* Drop Zone */}
      <div
        ref={canvasRef}
        className="relative w-full h-full"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Canvas Elements */}
        <AnimatePresence>
          {elements.map((element) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: timelinePosition >= (element.version * 20) ? 1 : 0.3,
                scale: 1 
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              drag
              dragMomentum={false}
              onDragEnd={(_, info) => {
                const newX = Math.max(0, element.position.x + info.offset.x);
                const newY = Math.max(0, element.position.y + info.offset.y);
                handleElementDrag(element.id, { x: newX, y: newY });
              }}
              className={cn(
                "absolute cursor-move group",
                "w-64 min-h-[80px] p-3 rounded-lg border backdrop-blur-sm",
                element.agent ? agentColors[element.agent] : "border-white/20 bg-white/5"
              )}
              style={{
                left: element.position.x,
                top: element.position.y
              }}
            >
              {/* Element Header */}
              <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  {element.agent && (
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      element.agent === "minimax" && "bg-purple-500",
                      element.agent === "mistral" && "bg-teal-500",
                      element.agent === "gpt4o" && "bg-blue-500",
                      element.agent === "grok" && "bg-pink-500"
                    )} />
                  )}
                  <span className="text-xs text-white/60 capitalize">
                    {element.agent || element.type}
                  </span>
                  <span className="text-xs text-white/40">
                    v{element.version}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => forkElement(element.id)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <GitBranch size={12} className="text-white/50" />
                  </button>
                  <button
                    onClick={() => removeElement(element.id)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <X size={12} className="text-white/50" />
                  </button>
                </div>
              </div>

              {/* Element Content */}
              <div className="text-sm text-white/80 leading-relaxed">
                {element.content}
              </div>

              {/* Element Footer */}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                <span>{element.timestamp.toLocaleTimeString()}</span>
                <div className="flex items-center gap-1">
                  <Layers size={10} />
                  <span>{element.version}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Drop Zone Indicator */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/20">
              <div className="text-6xl mb-4">⚓</div>
              <p className="text-lg font-light tracking-widest">THE BLACK BOARD</p>
              <p className="text-sm mt-2">Drag messages here to create your workspace</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}