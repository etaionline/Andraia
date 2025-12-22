"use client";

import { useState } from "react";
import { Anchor, Ship, Box, Layers, Activity, Zap, Bot, MessageCircle, Palette } from "lucide-react";

export default function Home() {
  const [leftDockOpen, setLeftDockOpen] = useState(true);
  const [rightDockOpen, setRightDockOpen] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [activeAgent, setActiveAgent] = useState('mistral');
  const [message, setMessage] = useState('');

  const agents = [
    {
      id: 'minimax',
      name: 'Minimax',
      role: 'Deep Thinker',
      color: 'purple',
      icon: Bot,
      description: 'Analytical reasoning and complex problem solving'
    },
    {
      id: 'mistral',
      name: 'Mistral',
      role: 'Creative Generalist',
      color: 'teal',
      icon: Palette,
      description: 'Creative solutions and flexible thinking'
    },
    {
      id: 'gpt4o',
      name: 'GPT-4o',
      role: 'Rational Journalist',
      color: 'blue',
      icon: MessageCircle,
      description: 'Clear communication and structured analysis'
    },
    {
      id: 'grok',
      name: 'Grok',
      role: 'Deep Creator',
      color: 'pink',
      icon: Zap,
      description: 'Innovative ideation and artistic expression'
    }
  ];

  const getAgentStyles = (agentId: string, isActive: boolean) => {
    const baseStyles = "agent-card p-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden";
    const activeStyles = isActive ? "active border-2 shadow-xl" : "border border-teal-100 hover:border-teal-300";
    
    const colorStyles = {
      minimax: isActive ? "border-purple-500 bg-purple-50" : "",
      mistral: isActive ? "border-teal-500 bg-teal-50" : "",
      gpt4o: isActive ? "border-blue-500 bg-blue-50" : "",
      grok: isActive ? "border-pink-500 bg-pink-50" : ""
    };
    
    return `${baseStyles} ${activeStyles} ${colorStyles[agentId as keyof typeof colorStyles]}`;
  };

  const getAgentIconColor = (agentId: string, isActive: boolean) => {
    if (!isActive) return "text-gray-400";
    
    const colors = {
      minimax: "text-purple-600",
      mistral: "text-teal-600", 
      gpt4o: "text-blue-600",
      grok: "text-pink-600"
    };
    
    return colors[agentId as keyof typeof colors] || "text-gray-400";
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Sending message to ${activeAgent}: ${message}`);
      setMessage('');
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col relative text-white">
      {/* Enhanced Ocean Background */}
      <div className="ocean-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="star absolute rounded-full bg-white"
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

      {/* Modern Header */}
      <header className="h-16 w-full flex items-center justify-between px-6 z-10 border-b border-teal-200/20 bg-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600">
            <Ship size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">AndrAIa OS</h1>
            <p className="text-xs text-teal-200">Fluid AI Orchestration</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>ZEUS ENGINE: ACTIVE</span>
          </div>
          <span className="text-sm text-white/60 font-mono">v1.0</span>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        
        {/* LEFT DOCK - Harbour */}
        {leftDockOpen && (
          <div className="glass-panel w-72 h-full flex-shrink-0 transition-all duration-300 p-6">
            <div className="glass-panel-title text-gray-800">Harbour</div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors text-sm text-gray-700 hover:text-teal-700">
                  <Anchor size={18} className="text-teal-600" />
                  <span className="font-medium">Global Assets</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-600">
                  <Box size={18} />
                  <span>Archives</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-600">
                  <Layers size={18} />
                  <span>Agora Feed</span>
                </button>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent my-4" />
              
              <div className="p-4 rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50">
                <p className="text-xs text-gray-600 mb-3 font-medium uppercase tracking-wider">Storage Capacity</p>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div className="w-[68%] h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">6.8GB of 10GB used</p>
              </div>
            </div>
          </div>
        )}

        {/* CENTER - BlackBoard with Enhanced Chat */}
        <div className="glass-panel flex-1 h-full relative shadow-2xl">
          <div className="blackboard-canvas absolute inset-0 p-6">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                  <Palette size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">BlackBoard Canvas</h3>
                <p className="text-gray-600">Interactive workspace for drag-and-drop collaboration</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[700px] max-w-full px-4 z-30">
            <div className="chat-container p-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Select AI Agent</h4>
                <div className="grid grid-cols-4 gap-3">
                  {agents.map((agent) => {
                    const Icon = agent.icon;
                    const isActive = activeAgent === agent.id;
                    return (
                      <div 
                        key={agent.id}
                        className={getAgentStyles(agent.id, isActive)}
                        onClick={() => setActiveAgent(agent.id)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={16} className={getAgentIconColor(agent.id, isActive)} />
                          <span className="text-sm font-medium text-gray-800">{agent.name}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{agent.role}</p>
                        <p className="text-xs text-gray-500">{agent.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Message ${agents.find(a => a.id === activeAgent)?.name}...`}
                  className="chat-input flex-1"
                />
                <button 
                  onClick={handleSendMessage}
                  className="btn-primary"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT DOCK - The Ship */}
        {rightDockOpen && (
          <div className="glass-panel w-80 h-full flex-shrink-0">
            <div className="p-6">
              <div className="glass-panel-title text-gray-800">The Ship</div>
              
              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Active Projects</p>
                
                {[1, 2, 3].map((i) => (
                  <div key={i} className="crate-item">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Box size={16} className="crate-icon text-teal-600" />
                        <span className="text-sm font-medium text-gray-800">Project Alpha</span>
                      </div>
                      <span className="text-xs text-gray-400">12m ago</span>
                    </div>
                    <div className="flex gap-1 pl-6">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                      </div>
                      <div className="w-1/2 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Control Panel</span>
                  <button 
                    onClick={() => setDevMode(!devMode)}
                    className={`dev-toggle ${devMode ? 'active' : ''}`}
                  >
                    {devMode ? 'DEV' : 'USER'}
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Temperature</span>
                    <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Tokens Used</span>
                    <span className="text-xs font-mono text-gray-800">1,247</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Cost Today</span>
                    <span className="text-xs font-mono text-teal-600">$2.34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
