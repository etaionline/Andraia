"use client";

import { useState, useCallback } from "react";
import { Brain, Zap, FileText, Lightbulb, Settings } from "lucide-react";

export type AgentType = "minimax" | "mistral" | "gpt4o" | "grok";

export interface Agent {
  id: AgentType;
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  costPerToken: number;
  strengths: string[];
}

export const AGENTS: Record<AgentType, Agent> = {
  minimax: {
    id: "minimax",
    name: "Minimax",
    role: "Deep Thinker",
    description: "Analytical, philosophical reasoning",
    icon: <Brain size={16} />,
    color: "#9D7AFE",
    costPerToken: 0.003,
    strengths: ["Analysis", "Logic", "Philosophy", "Complex reasoning"]
  },
  mistral: {
    id: "mistral",
    name: "Mistral",
    role: "Creative Generalist",
    description: "Warm, conversational, versatile",
    icon: <Zap size={16} />,
    color: "#4ECDC4",
    costPerToken: 0.001,
    strengths: ["Conversation", "Creativity", "Versatility", "Warmth"]
  },
  gpt4o: {
    id: "gpt4o",
    name: "GPT-4o",
    role: "Rational Journalist",
    description: "Factual, structured, clear",
    icon: <FileText size={16} />,
    color: "#6EA1DA",
    costPerToken: 0.002,
    strengths: ["Research", "Facts", "Structure", "Clarity"]
  },
  grok: {
    id: "grok",
    name: "Grok",
    role: "Deep Creator",
    description: "Innovative, boundary-pushing",
    icon: <Lightbulb size={16} />,
    color: "#FF6EC7",
    costPerToken: 0.004,
    strengths: ["Innovation", "Creativity", "Breakthrough thinking", "Art"]
  }
};

interface ZeusEngineProps {
  onAgentChange?: (agent: AgentType) => void;
  devMode?: boolean;
}

export function ZeusEngine({ onAgentChange, devMode = false }: ZeusEngineProps) {
  const [activeAgent, setActiveAgent] = useState<AgentType>("mistral");
  const [autoMode, setAutoMode] = useState(true);
  const [temperature, setTemperature] = useState(0.7);

  const selectAgent = useCallback((agentId: AgentType) => {
    setActiveAgent(agentId);
    onAgentChange?.(agentId);
  }, [onAgentChange]);

  const analyzeIntent = useCallback((input: string): AgentType => {
    const text = input.toLowerCase();
    
    // Deep thinking patterns
    if (text.includes("analyze") || text.includes("philosophy") || text.includes("complex") || text.includes("logic")) {
      return "minimax";
    }
    
    // Research/factual patterns
    if (text.includes("research") || text.includes("fact") || text.includes("explain") || text.includes("how does")) {
      return "gpt4o";
    }
    
    // Creative patterns
    if (text.includes("create") || text.includes("design") || text.includes("innovative") || text.includes("art")) {
      return "grok";
    }
    
    // Default to conversational
    return "mistral";
  }, []);

  const handleAutoRoute = useCallback((input: string) => {
    if (autoMode) {
      const suggestedAgent = analyzeIntent(input);
      selectAgent(suggestedAgent);
    }
  }, [autoMode, analyzeIntent, selectAgent]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-white/60 tracking-wider">ZEUS ENGINE</span>
        </div>
        <button 
          onClick={() => setAutoMode(!autoMode)}
          className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
        >
          {autoMode ? "AUTO" : "MANUAL"}
        </button>
      </div>

      {/* Agent Selection */}
      <div className="space-y-2">
        {Object.values(AGENTS).map((agent) => (
          <button
            key={agent.id}
            onClick={() => selectAgent(agent.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
              activeAgent === agent.id
                ? `border-[${agent.color}]/50 bg-[${agent.color}]/10`
                : "border-white/5 bg-white/5 hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-1.5 rounded"
                style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
              >
                {agent.icon}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white/90">{agent.name}</div>
                <div className="text-xs text-white/50">{agent.role}</div>
              </div>
            </div>
            
            {devMode && (
              <div className="text-right">
                <div className="text-xs text-white/40">${agent.costPerToken}/1k</div>
                {activeAgent === agent.id && (
                  <div className="text-xs text-teal-400">ACTIVE</div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Dev Mode Controls */}
      {devMode && (
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Temperature</span>
            <span className="text-xs text-white/40">{temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
          />
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <div className="text-white/40">Est. Cost</div>
              <div className="text-teal-400">${(AGENTS[activeAgent].costPerToken * 1000).toFixed(3)}</div>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <div className="text-white/40">Tokens</div>
              <div className="text-white/60">~1.2k</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for using Zeus Engine
export function useZeusEngine() {
  const [activeAgent, setActiveAgent] = useState<AgentType>("mistral");
  
  return {
    activeAgent,
    setActiveAgent,
    getAgent: (id: AgentType) => AGENTS[id],
    getAllAgents: () => AGENTS,
  };
}