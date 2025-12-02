import React, { useState } from 'react';
import { generateRumor } from '../services/geminiService';
import { motion } from 'framer-motion';
import { Newspaper, Loader2 } from 'lucide-react';

const RumorMill: React.FC = () => {
  const [rumor, setRumor] = useState<string>("Click to spill the tea ☕");
  const [loading, setLoading] = useState(false);

  const handleSpill = async () => {
    setLoading(true);
    const text = await generateRumor();
    setRumor(text);
    setLoading(false);
  };

  return (
    <section className="py-24 bg-zinc-950 border-y border-zinc-800 relative">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-block bg-yellow-400 text-black px-4 py-1 font-black transform -rotate-2 mb-6 text-sm uppercase">
          Breaking News
        </div>
        
        <h2 className="text-4xl md:text-6xl font-display text-white mb-8">
          THE RUMOR MILL
        </h2>

        <div className="bg-zinc-900 p-8 md:p-12 rounded-none border-l-4 border-yellow-400 shadow-[20px_20px_0px_0px_rgba(20,20,20,1)]">
          <div className="min-h-[100px] flex items-center justify-center">
             {loading ? (
                <Loader2 className="animate-spin text-yellow-400 w-10 h-10" />
             ) : (
                <motion.p 
                    key={rumor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl md:text-2xl font-mono text-zinc-300 leading-relaxed"
                >
                    "{rumor}"
                </motion.p>
             )}
          </div>
        </div>

        <button 
            onClick={handleSpill}
            disabled={loading}
            className="mt-10 bg-transparent border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 mx-auto"
        >
            <Newspaper size={20} />
            Generate New Rumor
        </button>
      </div>
    </section>
  );
};

export default RumorMill;