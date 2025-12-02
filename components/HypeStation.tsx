import React, { useState, useEffect } from 'react';
import { generateHype } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy } from 'lucide-react';

const HypeStation: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hearts, setHearts] = useState<{ id: number, x: number }[]>([]);
  const [loveCount, setLoveCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('aayan_love_count');
    if (saved) setLoveCount(parseInt(saved));
  }, []);

  const handleHype = async () => {
    setLoading(true);
    const result = await generateHype();
    setMessage(result);
    setLoading(false);
  };

  const spawnHearts = () => {
    const newCount = loveCount + 1;
    setLoveCount(newCount);
    localStorage.setItem('aayan_love_count', newCount.toString());

    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100
    }));
    setHearts(prev => [...prev, ...newHearts]);
    
    setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 2000);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-cyan-950 p-6 relative overflow-hidden">
        {/* Floating Hearts Animation */}
        <AnimatePresence>
            {hearts.map(h => (
                <motion.div
                    key={h.id}
                    initial={{ y: '100vh', opacity: 1, x: `${h.x}vw` }}
                    animate={{ y: '-20vh', opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute text-pink-500 z-0 pointer-events-none"
                >
                    <Heart fill="currentColor" size={Math.random() * 40 + 20} />
                </motion.div>
            ))}
        </AnimatePresence>

        <div className="max-w-3xl w-full text-center relative z-10">
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8"
            >
                <div className="inline-block bg-pink-500 text-white px-4 py-1 font-bold rounded-full mb-4 text-sm animate-pulse">
                    WHOLESOME HOURS OPEN
                </div>
                <h2 className="text-5xl md:text-7xl font-display text-white mb-2">
                    THE <span className="text-cyan-400">HYPE</span> STATION
                </h2>
                <p className="text-cyan-200 font-mono mb-8">
                    Because even Aayan deserves a W sometimes.
                </p>

                {/* Love Counter */}
                <div className="bg-black/30 p-6 rounded-2xl border border-pink-500/30 inline-block min-w-[300px]">
                    <p className="text-pink-400 font-mono text-sm uppercase tracking-widest mb-2">Total Love Given</p>
                    <motion.div 
                        key={loveCount}
                        initial={{ scale: 1.2, color: '#ffffff' }}
                        animate={{ scale: 1, color: '#ec4899' }}
                        className="text-7xl md:text-8xl font-black font-display text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]"
                    >
                        {loveCount.toLocaleString()}
                    </motion.div>
                </div>
            </motion.div>

            <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-500 p-8 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)] mb-8 min-h-[150px] flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            <Heart className="text-pink-500 w-12 h-12" fill="currentColor" />
                        </motion.div>
                    ) : message ? (
                        <motion.div
                            key="message"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl md:text-4xl font-bold text-white italic"
                        >
                            "{message}"
                        </motion.div>
                    ) : (
                        <p className="text-cyan-600 font-mono italic">
                            Click 'Generate W' to gas up Aayan.
                        </p>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleHype}
                    disabled={loading}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xl px-8 py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg"
                >
                    <Trophy size={24} /> Generate W
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={spawnHearts}
                    className="bg-pink-500 hover:bg-pink-400 text-white font-black text-xl px-8 py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                >
                    <Sparkles size={24} /> Send Love (+1)
                </motion.button>
            </div>
        </div>
    </div>
  );
};

export default HypeStation;