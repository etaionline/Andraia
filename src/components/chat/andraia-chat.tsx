import { useState } from "react";
import { Send, Mic, Paperclip, Zap } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

interface Message {
  id: string;
  content: string;
  agent: string;
  timestamp: Date;
}

interface AndrAIaChatProps {
  onMessageDrag?: (message: Message) => void;
}

export function AndrAIaChat({ onMessageDrag }: AndrAIaChatProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to AndrAIa OS! The ocean of AI agents awaits your commands.",
      agent: "Mistral",
      timestamp: new Date()
    }
  ]);
  const [activeAgent, setActiveAgent] = useState("Mistral");

  const agents = [
    { name: "Minimax", color: "purple", icon: "🧠" },
    { name: "Mistral", color: "teal", icon: "🌊" },
    { name: "GPT-4o", color: "blue", icon: "📰" },
    { name: "Grok", color: "pink", icon: "🎨" }
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      agent: activeAgent,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
  };

  return (
    <GlassPanel className="w-full max-w-4xl mx-auto" variant="default">
      <div className="space-y-4">
        {/* Agent Selector */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => setActiveAgent(agent.name)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                activeAgent === agent.name
                  ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className="text-sm">{agent.icon}</span>
              <span>{agent.name}</span>
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-white/40">
            <Zap size={12} className="text-teal-400" />
            <span>Auto-routing active</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-48 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className="group flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all ocean-shimmer"
              onClick={() => onMessageDrag?.(message)}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-400/20 to-rose-400/20 flex items-center justify-center text-sm">
                🌊
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-teal-400">{message.agent}</span>
                  <span className="text-xs text-white/30">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-black/20 border border-white/5">
          <button className="p-2 text-white/40 hover:text-white/60 transition-colors">
            <Paperclip size={16} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Command the ocean of AI agents..."
            className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm"
          />
          <button className="p-2 text-white/40 hover:text-white/60 transition-colors">
            <Mic size={16} />
          </button>
          <button
            onClick={handleSend}
            className="p-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}