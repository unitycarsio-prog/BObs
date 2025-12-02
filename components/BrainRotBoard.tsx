import React, { useState } from 'react';
import { motion } from 'framer-motion';

const sounds = [
  { id: 'vine', label: 'VINE BOOM', color: 'bg-red-600' },
  { id: 'bruh', label: 'BRUH MOMENT', color: 'bg-blue-600' },
  { id: 'skull', label: '💀💀💀', color: 'bg-white text-black' },
  { id: 'cap', label: 'CAP DETECTED', color: 'bg-yellow-500 text-black' },
  { id: 'w', label: 'MASSIVE W', color: 'bg-green-500' },
  { id: 'l', label: 'HOLD THIS L', color: 'bg-purple-600' },
];

const BrainRotBoard: React.FC = () => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  const handlePress = (id: string) => {
    setActiveEffect(id);
    
    // Reset effect after a quick burst
    setTimeout(() => setActiveEffect(null), 500);

    // Vibration API if available
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  return (
    <section className="py-20 bg-zinc-900 border-t-2 border-zinc-800 relative overflow-hidden">
      {/* Chaotic Background Flash */}
      {activeEffect && (
        <div className="absolute inset-0 z-0 bg-white/20 animate-pulse" />
      )}

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl text-white font-display mb-2">
          BRAIN ROT CONSOLE
        </h2>
        <p className="text-zinc-500 mb-8 font-mono">WARNING: SPAM AT YOUR OWN RISK</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sounds.map((sound) => (
            <motion.button
              key={sound.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9, rotate: Math.random() * 10 - 5 }}
              onClick={() => handlePress(sound.id)}
              className={`${sound.color} aspect-square md:aspect-video rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] flex items-center justify-center`}
            >
              <span className="font-black text-xl md:text-2xl font-display tracking-widest uppercase">
                {sound.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Floating Text Effect when clicked */}
        {activeEffect && (
          <motion.div 
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [1, 2, 0], rotate: [0, 10, -10] }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            <h1 className="text-9xl font-black text-red-600 outline-text" style={{ textShadow: '4px 4px 0 #000' }}>
              {sounds.find(s => s.id === activeEffect)?.label}
            </h1>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BrainRotBoard;