import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, User, BookOpen, MessageSquare, Gamepad2, AlertTriangle, ArrowLeft, Home, Heart, Image } from 'lucide-react';
import Archives from './Archives';
import FlappyBobs from './FlappyBobs';
import BobsBot from './BobsBot';
import About from './About';
import ChaosZone from './ChaosZone';
import ChaosMarquee from './ChaosMarquee';
import HypeStation from './HypeStation';
import Gallery from './Gallery';

type View = 'MENU' | 'ABOUT' | 'ARCHIVES' | 'CHAT' | 'GAME' | 'CHAOS' | 'HYPE' | 'HALL_OF_FAME';

interface LibraryProps {
  onExit: () => void;
}

const Library: React.FC<LibraryProps> = ({ onExit }) => {
  const [currentView, setCurrentView] = useState<View>('MENU');

  const menuItems = [
    { id: 'ABOUT', label: 'Who is Aayan?', icon: User, color: 'bg-blue-600' },
    { id: 'ARCHIVES', label: 'The Archives', icon: BookOpen, color: 'bg-purple-600' },
    { id: 'HALL_OF_FAME', label: 'Hall of Fame', icon: Image, color: 'bg-orange-500' },
    { id: 'CHAT', label: 'Chat with BobsBot', icon: MessageSquare, color: 'bg-green-600' },
    { id: 'GAME', label: 'Flappy Bobs', icon: Gamepad2, color: 'bg-yellow-500 text-black' },
    { id: 'CHAOS', label: 'Chaos Zone', icon: AlertTriangle, color: 'bg-red-600' },
    { id: 'HYPE', label: 'Hype Station', icon: Heart, color: 'bg-pink-500' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'ABOUT': return <About />;
      case 'ARCHIVES': return <Archives />;
      case 'HALL_OF_FAME': return <Gallery />;
      case 'CHAT': return <BobsBot />;
      case 'GAME': return <FlappyBobs />;
      case 'CHAOS': return <ChaosZone />;
      case 'HYPE': return <HypeStation />;
      default: return null;
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen relative flex flex-col">
      <ChaosMarquee />
      
      {/* Universal Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between z-50 sticky top-0 shadow-lg">
        {currentView !== 'MENU' ? (
           <button 
             onClick={() => setCurrentView('MENU')}
             className="flex items-center gap-2 text-white hover:text-green-400 font-bold uppercase tracking-wider transition-colors"
           >
             <ArrowLeft size={20} /> Back to Menu
           </button>
        ) : (
           <span className="font-display text-white text-xl tracking-wider">SYSTEM_OS v2.0</span>
        )}

        <div className="flex items-center gap-4">
           {currentView !== 'MENU' && <span className="font-display text-xl text-zinc-500 hidden md:inline">{currentView.replace(/_/g, ' ')}</span>}
           <button
             onClick={onExit}
             className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-md transition-colors flex items-center gap-2 font-bold text-sm uppercase"
             title="Exit Simulation"
           >
             <Home size={18} /> <span className="hidden md:inline">Home</span>
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden bg-zinc-950">
        <AnimatePresence mode="wait">
          {currentView === 'MENU' ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full overflow-y-auto flex flex-col items-center justify-center p-6 md:p-12"
            >
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-8xl font-display text-white mb-2">SIMULATION OS</h1>
                <p className="text-green-500 font-mono">SELECT A MODULE TO LOAD</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full pb-20">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentView(item.id as View)}
                    className={`${item.color} ${item.id === 'GAME' ? 'text-black' : 'text-white'} p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center gap-4 group transition-all`}
                  >
                    <item.icon size={48} strokeWidth={2.5} />
                    <span className="font-display text-3xl uppercase tracking-wider text-center">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="h-full w-full absolute inset-0 overflow-y-auto bg-zinc-950"
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Library;