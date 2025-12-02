import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 bg-zinc-950 text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-zinc-900 border-2 border-green-500 p-8 shadow-[10px_10px_0px_0px_rgba(34,197,94,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-green-500 text-black px-4 py-1 font-bold font-mono text-sm">
          CONFIDENTIAL
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-32 h-32 bg-zinc-800 border-2 border-white flex items-center justify-center overflow-hidden">
             <span className="text-6xl">🤡</span>
          </div>
          <div>
            <h2 className="text-4xl font-display text-white">AAYAN BOBS</h2>
            <p className="text-green-400 font-mono">Level 14 NPC</p>
          </div>
        </div>

        <div className="space-y-6 font-mono">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-zinc-500 block text-xs uppercase tracking-widest">Date of Spawn</span>
            <span className="text-xl md:text-2xl text-white font-bold">DECEMBER 2, 2011</span>
            <span className="ml-2 text-red-500 text-sm">(Gen Alpha confirmed 💀)</span>
          </div>

          <div className="border-b border-zinc-800 pb-4">
            <span className="text-zinc-500 block text-xs uppercase tracking-widest">Known Aliases</span>
            <span className="text-lg text-white">"Bobs", "The Raja", "Badshah of Yapping"</span>
          </div>

          <div className="border-b border-zinc-800 pb-4">
            <span className="text-zinc-500 block text-xs uppercase tracking-widest">Main Abilities</span>
            <ul className="text-white list-disc list-inside mt-2 space-y-1">
              <li>Bade Bade Bobs just like Tun Tun mausi 💀</li>
              <li>Gooning 26 times a day</li>
              <li>Material nikalna</li>
              <li>Aura farming in front of teachers (by using my lines)</li>
            </ul>
          </div>

          <div>
             <span className="text-zinc-500 block text-xs uppercase tracking-widest">Bio</span>
             <p className="mt-2 text-zinc-300 leading-relaxed">
               Aayan Bobs spawned into the server on Dec 2, 2011. Since then, he has accomplished absolutely nothing besides mastering the art of being "mid". He thinks he has aura, but his aura is actually -5000. He is the best friend you roast because you care (but mostly because it's funny).
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;