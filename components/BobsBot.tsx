import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { Send, Terminal, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const BobsBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', sender: 'bot', text: 'Yo. I am BobsBot. I know everything about Aayan (unfortunately). Ask me stuff. 🤖' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getChatResponse(userMsg.text);
    const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: responseText };
    
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-black">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center gap-4 shrink-0">
          <div className="bg-green-500 p-2 rounded shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
            <Terminal size={24} className="text-black" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-display text-white">BOBS_AI_SYSTEM</h2>
            <p className="text-green-500 font-mono text-xs">ONLINE // GEN ALPHA TRANSLATOR ACTIVE</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black">
            {/* Scanlines effect */}
            <div className="fixed inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-0"></div>

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
              >
                <div className={`
                  max-w-[85%] p-4 rounded-lg font-mono text-sm md:text-base shadow-lg
                  ${msg.sender === 'user' 
                    ? 'bg-zinc-800 text-white rounded-br-none border border-zinc-700' 
                    : 'bg-green-900/30 text-green-400 rounded-bl-none border border-green-500/30'}
                `}>
                  <div className="flex items-center gap-2 mb-1 opacity-50 text-xs uppercase font-bold tracking-wider">
                      {msg.sender === 'bot' && <Bot size={12} />}
                      <span>{msg.sender === 'user' ? 'You' : 'BobsBot'}</span>
                  </div>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {loading && (
              <div className="flex justify-start relative z-10">
                 <div className="bg-green-900/20 text-green-400 p-4 rounded-lg rounded-bl-none border border-green-500/30 flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-3 shrink-0 relative z-20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-black border border-zinc-700 text-white p-4 focus:outline-none focus:border-green-500 font-mono transition-colors rounded-lg"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-green-600 hover:bg-green-500 text-black px-6 py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
          >
            <Send size={24} />
          </button>
        </form>
    </div>
  );
};

export default BobsBot;