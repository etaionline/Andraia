import { useState } from "react";
import { Move, Plus, Save, Share, Layers } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

interface CanvasItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "note" | "image" | "code" | "chat";
  content: string;
  color: string;
}

interface BlackBoardProps {
  className?: string;
}

export function BlackBoard({ className }: BlackBoardProps) {
  const [items, setItems] = useState<CanvasItem[]>([
    {
      id: "1",
      x: 50,
      y: 50,
      width: 200,
      height: 120,
      type: "note",
      content: "Welcome to your digital workspace! Drag elements around and organize your thoughts.",
      color: "teal"
    },
    {
      id: "2",
      x: 300,
      y: 100,
      width: 180,
      height: 100,
      type: "code",
      content: "const agent = new Minimax({\n  temperature: 0.7,\n  capabilities: ['reasoning']\n});",
      color: "purple"
    }
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent, itemId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, x: Math.max(0, x - item.width/2), y: Math.max(0, y - item.height/2) }
        : item
    ));
    setDraggedItem(null);
  };

  const addItem = (type: CanvasItem["type"]) => {
    const newItem: CanvasItem = {
      id: Date.now().toString(),
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      width: type === "code" ? 250 : 200,
      height: type === "note" ? 120 : 100,
      type,
      content: type === "note" ? "New note..." : type === "code" ? "// New code snippet" : "New item",
      color: ["teal", "purple", "blue", "pink"][Math.floor(Math.random() * 4)]
    };
    setItems(prev => [...prev, newItem]);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Canvas Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-black/20 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-teal-400" />
            <span className="text-sm font-bold text-white/80">BLACKBOARD</span>
            <span className="text-xs text-white/40">({items.length} items)</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => addItem("note")}
              className="p-1.5 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 transition-colors"
              title="Add Note"
            >
              <Plus size={14} />
            </button>
            <button
              onClick={() => addItem("code")}
              className="p-1.5 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 transition-colors"
              title="Add Code"
            >
              <Plus size={14} />
            </button>
            <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/60 transition-colors">
              <Save size={14} />
            </button>
            <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/60 transition-colors">
              <Share size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Grid */}
      <div className="absolute inset-0 pt-16">
        {/* Grid Background */}
        <div 
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Canvas Items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute group cursor-move"
            style={{
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragEnd={(e) => handleDragEnd(e, item.id)}
          >
            <GlassPanel className="w-full h-full p-3 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-2 h-2 rounded-full bg-${item.color}-400`} />
                <Move size={12} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="text-xs text-white/80 leading-relaxed">
                {item.content}
              </div>
              
              {/* Type indicator */}
              <div className="absolute bottom-1 right-1 text-[10px] text-white/30">
                {item.type.toUpperCase()}
              </div>
            </GlassPanel>
          </div>
        ))}
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
          <span className="text-xs text-white/60">Zoom:</span>
          <input
            type="range"
            min="50"
            max="200"
            defaultValue="100"
            className="w-20 accent-teal-400"
          />
          <span className="text-xs text-white/60">100%</span>
        </div>
      </div>
    </div>
  );
}