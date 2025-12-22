"use client";

import { useState, Suspense } from "react";
import { Send, Settings, Type, AlignLeft, Menu, Bot, User, Sparkles, Loader2, AlertCircle } from "lucide-react";

// Supabase configuration
const SUPABASE_URL = 'https://lblbfcbbwcjamfnvfjpm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibGZiY2Jid2NhbWZudmZqcG0iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNTU4Mzg5NCwiZXhwIjoyMDUxMTU5ODk0fQ.KE9KqVvUjJ4zO6w8gX7r0l8K1L9M2v4N6t5y2e4oI8';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m AndrAIa, your fluid AI chat assistant. I can help you with creative tasks, analysis, problem-solving, and much more. What would you like to explore today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add user message immediately
    setChatHistory(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Call the AI edge function with proper authentication
      const response = await fetch(`${SUPABASE_URL}/functions/v1/chat-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          message: currentMessage,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Failed to get AI response');
      }

      // Add AI response
      const aiMessage = {
        id: chatHistory.length + 2,
        sender: 'ai',
        text: data.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        id: chatHistory.length + 2,
        sender: 'ai',
        text: 'Sorry, I encountered an error processing your message. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
                      
                      <p className="text-white leading-relaxed mb-2 whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs text-white/50">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[70%]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                      <Bot size={18} className="text-white" />
                    </div>
                    <div className="relative p-4 rounded-2xl backdrop-blur-sm border bg-purple-900/40 border-purple-500/50 shadow-lg shadow-purple-500/20">
                      <div className="flex items-center gap-2 text-white">
                        <Loader2 size={16} className="animate-spin" />
                        <span className="text-sm">AndrAIa is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error banner */}
            {error && (
              <div className="mx-6 mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-red-300">
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 bg-black/20 backdrop-blur-xl border-t border-purple-500/30">
              <div className="flex items-end gap-3">
                {/* Rich Text Input */}
                <div className="flex-1 relative">
                  <div className="flex items-center gap-2 p-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl focus-within:border-purple-400/50 transition-colors">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message... (Rich text supported)"
                      className="flex-1 bg-transparent text-white placeholder-white/50 outline-none resize-none"
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                      rows={1}
                      disabled={isLoading}
                    />
                    
                    {/* Formatting Icons */}
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors group" disabled={isLoading}>
                        <Type size={16} className="text-orange-400 group-hover:text-orange-300" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors group" disabled={isLoading}>
                        <AlignLeft size={16} className="text-orange-400 group-hover:text-orange-300" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors group" disabled={isLoading}>
                        <Menu size={16} className="text-orange-400 group-hover:text-orange-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/50"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="text-white animate-spin" />
                  ) : (
                    <Send size={18} className="text-white" />
                  )}
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
                  <button 
                    className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => setMessage("Can you help me brainstorm ideas for a new app?")}
                    disabled={isLoading}
                  >
                    <p className="text-xs text-white/80">Ask about market research</p>
                  </button>
                  <button 
                    className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => setMessage("What are your capabilities?")}
                    disabled={isLoading}
                  >
                    <p className="text-xs text-white/80">Explore AI capabilities</p>
                  </button>
                  <button 
                    className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => setMessage("Help me with problem-solving frameworks")}
                    disabled={isLoading}
                  >
                    <p className="text-xs text-white/80">Problem-solving help</p>
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
                  <button 
                    className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                    onClick={() => {
                      setChatHistory([{
                        id: 1,
                        sender: 'ai',
                        text: 'Hello! I\'m AndrAIa, your fluid AI chat assistant. I can help you with creative tasks, analysis, problem-solving, and much more. What would you like to explore today?',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }]);
                      setMessage('');
                      setError(null);
                    }}
                  >
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