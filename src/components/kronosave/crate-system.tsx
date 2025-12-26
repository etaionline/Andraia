import { useState } from "react";
import { Box, Clock, Star, MoreVertical, Archive, Download, Share } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

interface Crate {
  id: string;
  name: string;
  lastModified: Date;
  size: string;
  items: number;
  starred: boolean;
  type: "project" | "archive" | "template";
  color: string;
}

interface CrateSystemProps {}

export function CrateSystem({}: CrateSystemProps) {
  const [crates, setCrates] = useState<Crate[]>([
    {
      id: "1",
      name: "AI Research Project",
      lastModified: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      size: "2.4 MB",
      items: 15,
      starred: true,
      type: "project",
      color: "teal"
    },
    {
      id: "2", 
      name: "Ocean UI Components",
      lastModified: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      size: "1.8 MB",
      items: 8,
      starred: false,
      type: "template",
      color: "purple"
    },
    {
      id: "3",
      name: "Zeus Engine Logs",
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      size: "856 KB",
      items: 23,
      starred: false,
      type: "archive",
      color: "blue"
    }
  ]);

  const [selectedCrate, setSelectedCrate] = useState<string | null>(null);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getTypeIcon = (type: Crate["type"]) => {
    switch (type) {
      case "project": return "🚀";
      case "template": return "📋";
      case "archive": return "📦";
      default: return "📁";
    }
  };

  const getTypeColor = (type: Crate["type"]) => {
    switch (type) {
      case "project": return "text-teal-400";
      case "template": return "text-purple-400";
      case "archive": return "text-blue-400";
      default: return "text-white/60";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box size={14} className="text-teal-400" />
          <span className="text-xs font-bold text-white/80">KRONOSAVE</span>
        </div>
        <button className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 transition-colors">
          <MoreVertical size={12} />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-black/20 border border-white/5">
        <div className="text-center">
          <div className="text-lg font-bold text-teal-400">{crates.length}</div>
          <div className="text-[10px] text-white/40">Active Crates</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-rose-400">46</div>
          <div className="text-[10px] text-white/40">Total Items</div>
        </div>
      </div>

      {/* Crates List */}
      <div className="space-y-2">
        {crates.map((crate) => (
          <div
            key={crate.id}
            className={`group p-3 rounded-lg border cursor-pointer transition-all ${
              selectedCrate === crate.id
                ? "bg-teal-500/10 border-teal-500/30"
                : "bg-white/5 border-white/5 hover:border-teal-500/20 hover:bg-white/10"
            }`}
            onClick={() => setSelectedCrate(selectedCrate === crate.id ? null : crate.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm">{getTypeIcon(crate.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-medium text-white/80 truncate">{crate.name}</h4>
                    {crate.starred && <Star size={10} className="text-yellow-400 fill-current" />}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/40 mt-0.5">
                    <span className={getTypeColor(crate.type)}>{crate.type.toUpperCase()}</span>
                    <span>•</span>
                    <span>{crate.items} items</span>
                    <span>•</span>
                    <span>{crate.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-2">
                <span className="text-[10px] text-white/30">{formatTimeAgo(crate.lastModified)}</span>
                <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-all">
                  <MoreVertical size={10} className="text-white/40" />
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedCrate === crate.id && (
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-white/50">
                  <span>Last modified:</span>
                  <span>{crate.lastModified.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/50">
                  <span>Created:</span>
                  <span>{new Date(crate.lastModified.getTime() - 86400000).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-1 pt-2">
                  <button className="flex items-center gap-1 px-2 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 text-[10px] transition-colors">
                    <Archive size={10} />
                    <span>Archive</span>
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 text-[10px] transition-colors">
                    <Download size={10} />
                    <span>Export</span>
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 text-[10px] transition-colors">
                    <Share size={10} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-3 rounded-lg bg-black/20 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={12} className="text-white/40" />
          <span className="text-[10px] text-white/60 font-medium">RECENT ACTIVITY</span>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] text-white/50">• Updated AI Research Project</div>
          <div className="text-[10px] text-white/50">• Created Ocean UI Components</div>
          <div className="text-[10px] text-white/50">• Exported Zeus Engine Logs</div>
        </div>
      </div>
    </div>
  );
}