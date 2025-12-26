import { Activity, Cpu, Zap } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

interface Agent {
  name: string;
  color: string;
  icon: string;
  status: "idle" | "active" | "thinking";
  temperature: number;
  cost: number;
}

interface ZeusEngineProps {
  devMode: boolean;
  onAgentChange?: (agent: string) => void;
}

export function ZeusEngine({ devMode, onAgentChange }: ZeusEngineProps) {
  const agents: Agent[] = [
    { name: "Minimax", color: "purple", icon: "🧠", status: "idle", temperature: 0.7, cost: 0.02 },
    { name: "Mistral", color: "teal", icon: "🌊", status: "active", temperature: 0.8, cost: 0.015 },
    { name: "GPT-4o", color: "blue", icon: "📰", status: "thinking", temperature: 0.6, cost: 0.03 },
    { name: "Grok", color: "pink", icon: "🎨", status: "idle", temperature: 0.9, cost: 0.025 }
  ];

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "active": return "text-green-400";
      case "thinking": return "text-yellow-400 animate-pulse";
      default: return "text-white/40";
    }
  };

  const getStatusText = (status: Agent["status"]) => {
    switch (status) {
      case "active": return "ACTIVE";
      case "thinking": return "THINKING";
      default: return "IDLE";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-teal-400" />
          <span className="text-xs font-bold text-white/80">ZEUS ENGINE</span>
        </div>
        <div className="flex items-center gap-1">
          <Activity size={12} className="text-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400">ONLINE</span>
        </div>
      </div>

      <div className="space-y-2">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="group p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-teal-500/30 transition-all cursor-pointer"
            onClick={() => onAgentChange?.(agent.name)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{agent.icon}</span>
                <span className="text-sm font-medium text-white/80">{agent.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status).replace('text-', 'bg-')}`} />
                <span className={`text-[10px] ${getStatusColor(agent.status)}`}>
                  {getStatusText(agent.status)}
                </span>
              </div>
            </div>
            
            {devMode && (
              <div className="grid grid-cols-2 gap-2 text-[10px] text-white/50">
                <div>
                  <span className="text-white/40">Temp:</span> {agent.temperature}
                </div>
                <div>
                  <span className="text-white/40">Cost:</span> ${agent.cost}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {devMode && (
        <div className="p-3 rounded-lg bg-black/20 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={12} className="text-rose-400" />
            <span className="text-[10px] font-bold text-rose-400">DEV CONTROLS</span>
          </div>
          <div className="space-y-2 text-[10px] text-white/60">
            <div className="flex justify-between">
              <span>Global Temperature:</span>
              <span className="text-teal-400">0.75</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cost Today:</span>
              <span className="text-rose-400">$0.47</span>
            </div>
            <div className="flex justify-between">
              <span>Requests Made:</span>
              <span className="text-teal-400">23</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}