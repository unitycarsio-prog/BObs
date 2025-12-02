import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onEnter: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden selection:bg-neon-green selection:text-black">
      {/* Background Abstract Shapes */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.5, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <div className="z-10 text-center px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-3xl text-green-400 font-display mb-8 tracking-widest uppercase"
        >
          Warning: Massive W Incoming
        </motion.p>
        
        <div className="glitch-wrapper mb-12">
          <div className="flex flex-col items-center leading-none">
             <h1 className="glitch text-5xl md:text-7xl font-black text-white">
              AAYAN BOBS
            </h1>
            <h2 className="glitch text-3xl md:text-5xl font-black text-yellow-400 mt-2 md:mt-4">
              KA RAJA
            </h2>
            <h2 className="glitch text-4xl md:text-6xl font-black text-red-500 mt-2 md:mt-4">
              AAVESH KA BADSHAH
            </h2>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg md:text-2xl font-bold max-w-2xl mx-auto"
        >
          Another year closer to retirement bro. 💀 <br/>
          <span className="text-yellow-400">NO CAP. JUST VIBES.</span>
        </motion.p>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 1 }}
          className="mt-12"
        >
          <button 
            onClick={onEnter}
            className="bg-white text-black font-display text-2xl px-8 py-4 rounded-none hover:bg-green-400 transition-colors duration-300 uppercase transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
          >
            Enter the simulation
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;