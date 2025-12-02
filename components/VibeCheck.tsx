import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VibeCheck: React.FC = () => {
  const [vibe, setVibe] = useState(50);
  const [message, setMessage] = useState("CHECK THE VIBES");

  const handleSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    // It always goes to 100 no matter what you drag
    setVibe(100);
    setMessage("IMMACULATE 100% NO CAP");
  };

  return (
    <section className="py-20 bg-black text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
      
      <h2 className="text-5xl font-display text-white mb-12 relative z-10">
        VIBE CHECK
      </h2>

      <div className="max-w-md mx-auto relative z-10 bg-zinc-900 p-8 border-4 border-green-400 shadow-[10px_10px_0px_0px_rgba(74,222,128,1)]">
        <div className="mb-6 flex justify-between text-xs font-mono text-green-400">
          <span>MID</span>
          <span>GOATED</span>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={vibe} 
          onChange={handleSlide}
          className="w-full h-4 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-400"
        />
        
        <motion.div 
          key={message}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-8 text-3xl font-black text-white italic"
        >
          {vibe === 50 ? "DRAG TO CHECK" : message}
        </motion.div>
      </div>
      
      {vibe === 100 && (
         <div className="mt-8 text-zinc-500 text-sm">
           (System Error: Aayan Bobs is too lit to have bad vibes)
         </div>
      )}
    </section>
  );
};

export default VibeCheck;