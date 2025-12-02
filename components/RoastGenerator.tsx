import React, { useState } from 'react';
import { generateRoast } from '../services/geminiService';
import { Flame, RefreshCw, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RoastGenerator: React.FC = () => {
  const [roast, setRoast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<string>('SAVAGE');

  const handleRoast = async () => {
    setLoading(true);
    const result = await generateRoast(level);
    setRoast(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (roast) {
      navigator.clipboard.writeText(roast);
      // Could add a toast here, but keeping it simple/rugged
    }
  };

  return (
    <section id="roast-zone" className="py-20 bg-zinc-900 border-t-2 border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl text-white mb-8">
          The <span className="text-red-500">Roast</span> Station
        </h2>
        <p className="text-gray-400 mb-8 text-xl">Let AI cook Aayan Bobs. Choose your violence level.</p>

        <div className="flex justify-center gap-4 mb-8">
          {['LIGHT', 'SAVAGE'].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-6 py-2 font-bold font-display tracking-wider border-2 ${
                level === l 
                  ? 'bg-red-500 border-red-500 text-black' 
                  : 'border-zinc-600 text-zinc-600 hover:border-red-500 hover:text-red-500'
              } transition-all uppercase`}
            >
              {l} Mode
            </button>
          ))}
        </div>

        <div className="min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {roast && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black border-2 border-white p-8 relative max-w-2xl transform rotate-1"
              >
                <p className="text-2xl md:text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 leading-tight">
                  "{roast}"
                </p>
                <button 
                  onClick={copyToClipboard}
                  className="absolute bottom-2 right-2 p-2 hover:bg-zinc-800 rounded-full text-zinc-500"
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </button>
              </motion.div>
            )}
            
            {loading && (
              <motion.div 
                key="loader"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={48} className="text-red-500" />
              </motion.div>
            )}

            {!roast && !loading && (
              <motion.div key="empty" className="text-zinc-600 italic">
                Press the button to destroy his ego.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRoast}
          disabled={loading}
          className="mt-12 group relative inline-flex items-center justify-center px-8 py-6 text-xl font-bold text-white transition-all duration-200 bg-red-600 font-display uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
        >
          {loading ? 'Cooking...' : 'COOK HIM'} <Flame className="ml-2 group-hover:animate-bounce" />
          <div className="absolute -inset-3 rounded-lg bg-red-600 opacity-20 blur-lg transition-all duration-200 group-hover:opacity-40"></div>
        </motion.button>
      </div>
    </section>
  );
};

export default RoastGenerator;