'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, User, Sparkles, Mic, Plus, ChevronDown, Glasses, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load user name
  const [userName, setUserName] = useState("JATIN");
  useEffect(() => {
    const savedUser = localStorage.getItem('vayu_user');
    if (savedUser) {
      setUserName(JSON.parse(savedUser).name.toUpperCase().split(' ')[0]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (forcedText?: string) => {
    const text = forcedText || input;
    if (!text.trim()) return;
    
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, history: messages })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages([...newMessages, { role: 'model', content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'model', content: "**Error:** " + (data.error || "Failed to connect.") }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'model', content: "**Error:** Network failure." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Check rainfall probability", "What is the active regime?", 
    "Give me agriculture advice", "Show current warnings",
    "Prepare flood safety checklist"
  ];

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center text-white hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
        title="Ask WeatherGPT"
      >
        <Bot size={32} />
      </button>

      {/* Fullscreen Copilot-style Chat Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex flex-col animate-in fade-in duration-300 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2500&auto=format&fit=crop')" }}
        >
          {/* Dynamic weather overlay tint */}
          <div className="absolute inset-0 bg-[#0f1c3d]/70 backdrop-blur-[4px]"></div>

          {/* Header Close */}
          <div className="relative z-10 flex justify-end p-6">
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 p-2 rounded-lg transition">
              <X size={28} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 overflow-y-auto custom-scrollbar pb-10">
            
            {messages.length === 0 ? (
              // Initial State (Copilot Look)
              <div className="w-full max-w-4xl flex flex-col items-center justify-center animate-in slide-in-from-bottom-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center drop-shadow-md">
                  Nice to see you, {userName}. What's new?
                </h1>

                {/* Big Search Bar */}
                <div className="w-full bg-[#111928]/80 backdrop-blur-3xl border border-gray-600/50 rounded-[2rem] p-4 shadow-2xl relative transition-all focus-within:border-cyan-500/50 focus-within:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                  <div className="flex items-center space-x-3 mb-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 transition"><Plus size={18}/></button>
                    <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 text-sm font-semibold flex items-center transition">Smart <ChevronDown size={14} className="ml-1"/></button>
                  </div>
                  
                  <textarea 
                    value={listening ? "Listening to voice input..." : input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
                    }}
                    placeholder={listening ? "Listening..." : "Message WeatherGPT"}
                    disabled={listening}
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none h-16 outline-none text-lg px-2"
                  />

                  <div className="flex justify-end items-center space-x-2 mt-2">
                    <button className="p-2 text-gray-400 hover:text-white transition"><Glasses size={20}/></button>
                    <button className="p-2 text-gray-400 hover:text-white transition"><ImageIcon size={20}/></button>
                    <button onClick={() => setListening(!listening)} className={`p-2 transition ${listening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}><Mic size={20}/></button>
                    <button onClick={() => handleSend()} disabled={(!input.trim() && !listening) || isLoading} className="p-2 text-white bg-blue-600 hover:bg-blue-500 rounded-full disabled:opacity-50 transition ml-2">
                      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                    </button>
                  </div>
                </div>

                {/* Suggestions Grid */}
                <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-3xl">
                  {suggestions.map((s, i) => (
                    <button key={i} onClick={() => handleSend(s)} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/5 text-gray-200 text-sm font-medium rounded-full backdrop-blur-md transition shadow-md">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Chat State
              <div className="w-full max-w-4xl flex flex-col h-full animate-in fade-in">
                <div className="flex-1 space-y-6 px-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-blue-600 ml-4' : 'bg-[#111928] border border-gray-600 mr-4'}`}>
                          {msg.role === 'user' ? <User size={18} className="text-white"/> : <Bot size={20} className="text-cyan-400"/>}
                        </div>
                        <div className={`p-4 text-base shadow-lg ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-3xl rounded-tr-sm' : 'bg-[#111928]/80 backdrop-blur-md border border-gray-600 text-gray-100 rounded-3xl rounded-tl-sm prose prose-invert max-w-none'}`}>
                          {msg.role === 'user' ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex flex-row items-end">
                        <div className="w-10 h-10 rounded-full bg-[#111928] border border-gray-600 mr-4 flex items-center justify-center shadow-lg">
                          <Bot size={20} className="text-cyan-400"/>
                        </div>
                        <div className="bg-[#111928]/80 backdrop-blur-md border border-gray-600 p-4 rounded-3xl rounded-tl-sm shadow-lg flex space-x-2 items-center">
                           <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce"></div>
                           <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce delay-75"></div>
                           <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Sticky Input for Chat State */}
                <div className="mt-6 mx-4">
                  <div className="w-full bg-[#111928]/90 backdrop-blur-3xl border border-gray-600 rounded-3xl p-3 flex items-end shadow-2xl relative transition-all focus-within:border-cyan-500/50">
                    <button className="p-3 text-gray-400 hover:text-white transition"><Plus size={20}/></button>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                      placeholder="Message WeatherGPT..."
                      className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none max-h-32 min-h-[44px] py-3 px-2 outline-none"
                    />
                    <div className="flex space-x-1 pb-1 pr-1">
                      <button onClick={() => setListening(!listening)} className={`p-2 transition ${listening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}><Mic size={20}/></button>
                      <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="p-2 bg-blue-600 text-white hover:bg-blue-500 rounded-full disabled:opacity-50 transition">
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

