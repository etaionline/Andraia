"use client";

import { useState, Suspense } from "react";
import { Send, Settings, Type, AlignLeft, Menu, Bot, User, Sparkles } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m AndrAIa, your fluid AI chat assistant. I can help you with creative tasks, analysis, problem-solving, and much more. What would you like to explore today?',
      timestamp: '2:45 PM'
    },
    {
      id: 2,
      sender: 'user', 
      text: 'Can you help me brainstorm ideas for a new app?',
      timestamp: '2:47 PM'
    },
    {
      id: 3,
      sender: 'ai',
      text: 'Absolutely! I\'d love to help you brainstorm app ideas. What problem are you trying to solve, or what industry/area interests you most? Let\'s explore some innovative concepts together.',
      timestamp: '2:47 PM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        sender: 'user',
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatHistory.length + 2,
          sender: 'ai',
          text: 'That\'s a fascinating idea! Let me help you develop that concept further. Here are some considerations and potential enhancements...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl font-medium">Loading AndrAIa...</div>
      </div>
    }>
      <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="h-16 w-full flex items-center justify-between px-6 z-10 bg-black/20 backdrop-blur-xl border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/50">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">AndrAIa</h1>
              <p className="text-xs text-purple-300">Fluid AI Chat Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings size={18} className="text-white/70" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-white/70 font-medium">Online</span>
            </div>
          </div>
        </header>

        {/* Main Chat Interface */}
        <div className="flex-1 flex">
          {/* Chat Stream - Left Panel */}
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'ai' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
                        : 'bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/50'
                    }`}>
                      {msg.sender === 'ai' ? (
                        <Bot size={18} className="text-white" />
                      ) : (
                        <User size={18} className="text-white" />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`relative p-4 rounded-2xl backdrop-blur-sm border ${
                      msg.sender === 'ai'
                        ? 'bg-purple-900/40 border-purple-500/50 shadow-lg shadow-purple-500/20'
                        : 'bg-cyan-900/40 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    }`}>
                      <div className={`absolute top-3 w-3 h-3 transform rotate-45 ${
                        msg.sender === 'ai'
                          ? 'bg-purple-500/50 border-l border-t border-purple-500/50 -left-1.5'
                          : 'bg-cyan-500/50 border-r border-b border-cyan-500/50 -right-1.5'
                      }`}></div>
                      
                      <p className="text-white leading-relaxed mb-2">{msg.text}</p>
                      <p className="text-xs text-white/50">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-black/20 backdrop-blur-xl border-t border-purple-500/30">
              <div className="flex items-end gap-3">
                {/* Rich Text Input */}
                <div className="flex-1 relative">
                  <div className="flex items-center gap-2 p-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl focus-within:border-purple-400/50 transition-colors">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message... (Rich text supported)"
                      className="flex-1 bg-transparent text-white placeholder-white/50 outline-none resize-none"
                      style={{ minHeight: '44px' }}
                    />
                    
                    {/* Formatting Icons */}
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors group">
                        <Type size={16} className="text-orange-400 group-hover:text-orange-300" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors group">
                        <AlignLeft size={16} className="text-orange-400 group-hover:text-orange-300" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors group">
                        <Menu size={16} className="text-orange-400 group-hover:text-orange-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/50"
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Insights Panel - Right Sidebar */}
          <div className="w-80 h-full bg-black/20 backdrop-blur-xl border-l border-purple-500/30 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Collected Insights</h3>
              <p className="text-sm text-white/60">Real-time conversation analysis</p>
            </div>

            <div className="space-y-4">
              {/* Conversation Stats */}
              <div className="p-4 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-500/30">
                <h4 className="text-sm font-medium text-white mb-2">Session Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-white/70">Messages</span>
                    <span className="text-xs text-purple-300 font-mono">{chatHistory.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-white/70">Duration</span>
                    <span className="text-xs text-purple-300 font-mono">5m 23s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-white/70">Tokens Used</span>
                    <span className="text-xs text-purple-300 font-mono">1,247</span>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="p-4 bg-gradient-to-br from-cyan-900/40 to-teal-900/40 rounded-xl border border-cyan-500/30">
                <h4 className="text-sm font-medium text-white mb-2">AI Suggestions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-xs text-white/80">Ask about market research</p>
                  </button>
                  <button className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-xs text-white/80">Generate user personas</p>
                  </button>
                  <button className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-xs text-white/80">Create wireframes</p>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl border border-orange-500/30">
                <h4 className="text-sm font-medium text-white mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <p className="text-xs text-white/80">Export conversation</p>
                  </button>
                  <button className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <p className="text-xs text-white/80">Share insights</p>
                  </button>
                  <button className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <p className="text-xs text-white/80">New chat session</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}