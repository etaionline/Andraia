"use client";

import { useState, useRef, useCallback } from "react";
import { Send, Mic, MicOff, Maximize2, Minimize2 } from "lucide-react";
import { useZeusEngine, AGENTS, type AgentType } from "@/components/orchestrator/zeus-engine";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  agent: AgentType;
  timestamp: Date;
  type: "user" | "assistant";
}

interface AndrAIaChatProps {
  onMessageDrag?: (message: Message) => void;
  className?: string;
}

export function AndrAIaChat({ onMessageDrag, className }: AndrAIaChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { activeAgent, setActiveAgent, getAgent } = useZeusEngine();

  const analyzeIntent = useCallback((text: string): AgentType => {
    const input = text.toLowerCase();
    
    if (input.includes("analyze") || input.includes("philosophy") || input.includes("complex")) {
      return "minimax";
    }
    if (input.includes("research") || input.includes("fact") || input.includes("explain")) {
      return "gpt4o";
    }
    if (input.includes("create") || input.includes("design") || input.includes("art")) {
      return "grok";
    }
    return "mistral";
  }, []);

  const simulateResponse = useCallback(async (userMessage: string, agent: AgentType): Promise<string> => {
    const agentData = getAgent(agent);
    
    // Simulate different response styles based on agent
    const responses = {
      minimax: [
        "Let me analyze this deeply... The philosophical implications suggest that...",
        "From a logical perspective, we must consider the underlying structures...",
        "This requires careful analytical thinking. The core issue appears to be..."
      ],
      mistral: [
        "That's an interesting question! Let me help you with that...",
        "I'd be happy to explore this with you. Here's what I think...",
        "Great point! Let's dive into this together..."
      ],
      gpt4o: [
        "Based on available information, here are the key facts...",
        "Let me provide a structured analysis of this topic...",
        "According to research, the main points are..."
      ],
      grok: [
        "What if we approached this completely differently? Imagine...",
        "Let's break some boundaries here. What if we...",
        "Here's a wild idea that might just work..."
      ]
    };

    const agentResponses = responses[agent];
    const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
    
    return `${randomResponse} [This is a simulated response from ${agentData.name}]`;
  }, [getAgent]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      agent: activeAgent,
      timestamp: new Date(),
      type: "user"
    };

    // Auto-route to best agent based on intent
    const suggestedAgent = analyzeIntent(input);
    if (suggestedAgent !== activeAgent) {
      setActiveAgent(suggestedAgent);
    }

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(async () => {
      const response = await simulateResponse(input, suggestedAgent);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        agent: suggestedAgent,
        timestamp: new Date(),
        type: "assistant"
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  }, [input, activeAgent, analyzeIntent, simulateResponse, setActiveAgent]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const toggleVoice = useCallback(() => {
    setIsListening(!isListening);
    // Voice functionality would be implemented here
  }, [isListening]);

  const currentAgent = getAgent(activeAgent);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "400px" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="mb-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${currentAgent.color}20`, color: currentAgent.color }}
                >
                  {currentAgent.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">{currentAgent.name}</div>
                  <div className="text-xs text-white/50">{currentAgent.role}</div>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Minimize2 size={16} className="text-white/50" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => {
                const messageAgent = getAgent(message.agent);
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    draggable
                    onDragStart={() => onMessageDrag?.(message)}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl cursor-move ${
                        message.type === "user"
                          ? "bg-teal-500/20 border border-teal-500/30 text-white"
                          : "bg-white/5 border border-white/10 text-white/90"
                      }`}
                      style={{
                        borderColor: message.type === "assistant" ? `${messageAgent.color}30` : undefined,
                        backgroundColor: message.type === "assistant" ? `${messageAgent.color}10` : undefined
                      }}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs text-white/40 mt-1 flex items-center justify-between">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.type === "assistant" && (
                          <span className="text-xs" style={{ color: messageAgent.color }}>
                            {messageAgent.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Input */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-xl">
        {/* Agent Indicator */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center border"
          style={{ 
            backgroundColor: `${currentAgent.color}20`, 
            borderColor: `${currentAgent.color}30`,
            color: currentAgent.color 
          }}
        >
          {isTyping ? (
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
          ) : (
            currentAgent.icon
          )}
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Ask ${currentAgent.name}...`}
          className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-white placeholder:text-white/30"
          disabled={isTyping}
        />

        {/* Voice Toggle */}
        <button
          onClick={toggleVoice}
          className={`p-2 rounded-full transition-colors ${
            isListening 
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
              : "hover:bg-white/10 text-white/50"
          }`}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} className="text-white/50" />
        </button>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Maximize2 size={16} className="text-white/50" />
        </button>
      </div>
    </div>
  );
}