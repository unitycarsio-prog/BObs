import React from 'react';
import { motion } from 'framer-motion';

const ChaosMarquee: React.FC = () => {
  const content = "HAPPY BIRTHDAY AAYAN BOBS KA RAJA AAVESH KA BADSHAH 💀 NO CAP 💀 JUST VIBES 💀 BRO IS ANCIENT NOW 💀 SKILL ISSUE 💀 L + RATIO 💀 WHO LET HIM COOK 💀 ";
  
  return (
    <div className="bg-yellow-400 py-3 overflow-hidden border-y-4 border-black rotate-1 scale-105 z-20 relative">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 10 
        }}
        className="whitespace-nowrap font-black text-black text-2xl md:text-4xl font-display tracking-wider"
      >
        {content.repeat(10)}
      </motion.div>
    </div>
  );
};

export default ChaosMarquee;