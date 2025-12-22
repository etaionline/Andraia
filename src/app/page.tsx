"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { ZeusEngine } from "@/components/orchestrator/zeus-engine";
import { AndrAIaChat } from "@/components/chat/andraia-chat";
import { BlackBoard } from "@/components/canvas/black-board";
import { CrateSystem } from "@/components/kronosave/crate-system";
import { Anchor, Ship, Box, Layers, Activity } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [leftDockOpen, setLeftDockOpen] = useState(true);
  const [rightDockOpen, setRightDockOpen] = useState(true);
  const [devMode, setDevMode] = useState(false);

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col relative text-white">
      {/* Background Layer */}
      <div className="ocean-bg">
        {/* Procedural Stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          />
        ))}
      </div>

      {/* Top Bar (Zeus Dashboard / Minimal) */}
      <header className="h-12 w-full flex items-center justify-between px-6 z-10 border-b border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-teal-400">
          <Ship size={18} />
          <span className="text-sm font-bold tracking-[0.2em] uppercase">AndrAIa OS</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <Activity size={12} className="text-teal-400 animate-pulse" />
            <span>ZEUS ENGINE: IDLE</span>
          </div>
          <span>v0.1.0</span>
        </div>
      </header>

      {/* Main Workspace (The Hull) */}
      <div className="flex-1 flex p-4 gap-4 overflow-hidden z-10">
        
        {/* LEFT DOCK (Harbour/Agora) */}
        {leftDockOpen && (
          <GlassPanel 
            title="Harbour" 
            className="w-64 h-full flex-shrink-0 transition-all duration-300"
          >
            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  <Anchor size={16} className="text-teal-400" />
                  <span>Global Assets</span>
                </button>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-white/60">
                  <Box size={16} />
                  <span>Archives</span>
                </button>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-white/60">
                  <Layers size={16} />
                  <span>Agora Feed</span>
                </button>
              </div>
              
              <div className="h-[1px] bg-white/10 my-2" />
              
              <div className="p-3 rounded border border-white/5 bg-black/20">
                <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Storage</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-teal-500/50" />
                </div>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* CENTER (The Black Board / Canvas) */}
        <GlassPanel 
          className="flex-1 h-full shadow-2xl relative" 
          variant="default"
        >
          {/* BlackBoard Canvas */}
          <BlackBoard className="absolute inset-0" />
          
          {/* AndrAIa Chat Interface (Bottom) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[600px] max-w-full px-4 z-30">
             <AndrAIaChat 
               onMessageDrag={(message) => {
                 console.log("Message dragged to canvas:", message);
                 // TODO: Add message to canvas/blackboard
               }}
             />
          </div>
        </GlassPanel>

        {/* RIGHT DOCK (The Ship / KronoSave) */}
        {rightDockOpen && (
          <GlassPanel 
            title="The Ship" 
            className="w-72 h-full flex-shrink-0"
          >
             <div className="flex flex-col h-full">
                {/* Active Crates */}
                <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
                   <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Active Crates</p>
                   
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="group p-3 rounded-lg border border-white/5 bg-white/5 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-2">
                              <Box size={14} className="text-teal-400" />
                              <span className="text-sm font-medium text-white/80">Project Alpha</span>
                           </div>
                           <span className="text-[10px] text-white/30">10m ago</span>
                        </div>
                        <div className="flex gap-1 pl-6">
                           <div className="w-8 h-1 bg-white/10 rounded-full" />
                           <div className="w-4 h-1 bg-white/10 rounded-full" />
                        </div>
                     </div>
                   ))}
                </div>

                {/* ZEUS Engine Controls */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                   <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-white/60">CONTROLS</span>
                      <button 
                        onClick={() => setDevMode(!devMode)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          devMode ? "bg-teal-500/20 text-teal-400" : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {devMode ? "DEV" : "USER"}
                      </button>
                   </div>
                   
                   <ZeusEngine 
                     devMode={devMode}
                     onAgentChange={(agent) => {
                       console.log("Agent changed to:", agent);
                     }}
                   />
                </div>
             </div>
          </GlassPanel>
        )}
      </div>
    </main>
  );
}
