import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your AI Cube Coach. Ask me about algorithms, notation, or how to get faster!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
      <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
        <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          AI Coach (Gemini)
        </h3>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Flash 2.0</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-700 text-slate-100 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-slate-700 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about F2L, OLL, etc..."
          className="flex-1 bg-slate-800 text-slate-200 rounded-full px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 px-4 transition-colors disabled:opacity-50 font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AICoach;
