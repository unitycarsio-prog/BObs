import React from 'react';
import RoastGenerator from './RoastGenerator';
import VibeCheck from './VibeCheck';
import BrainRotBoard from './BrainRotBoard';
import FakeRegistry from './FakeRegistry';
import RumorMill from './RumorMill';

const ChaosZone: React.FC = () => {
  return (
    <div className="space-y-0">
      <div className="bg-yellow-400 p-4 text-center text-black font-black uppercase tracking-widest sticky top-0 z-50">
        ⚠ Entering The Chaos Zone ⚠
      </div>
      <RumorMill />
      <BrainRotBoard />
      <RoastGenerator />
      <VibeCheck />
      <FakeRegistry />
    </div>
  );
};

export default ChaosZone;