import React, { useState } from 'react';
import Hero from './components/Hero';
import Library from './components/Library';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [simulationStarted, setSimulationStarted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleEnterSimulation = () => {
    setSimulationStarted(true);
    // Smooth scroll to top when entering
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-green-500 selection:text-black">
      {/* Scroll Progress Bar (Only show in simulation) */}
      {simulationStarted && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
          style={{ scaleX }}
        />
      )}

      <AnimatePresence mode="wait">
        {!simulationStarted ? (
          <motion.div
            key="home"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onEnter={handleEnterSimulation} />
          </motion.div>
        ) : (
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Library onExit={() => setSimulationStarted(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;