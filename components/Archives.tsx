import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateArchiveEntry } from '../services/geminiService';
import { FileText, Lock, Plus, Loader2 } from 'lucide-react';

interface ArchiveEntry {
  id: string;
  title: string;
  content: string;
  locked: boolean;
}

const initialEntries: ArchiveEntry[] = [
  {
    id: '1',
    title: 'THE SPAWN EVENT',
    content: 'On Dec 2, 2011, Aayan entered the lobby. The world was never the same (it got slightly worse).',
    locked: false,
  },
  {
    id: '101',
    title: 'THE CRICKET CARRY',
    content: 'That one time he actually caught the ball and saved the match. Everyone was shocked. We even clapped. Rare W for the team. 🏏✨',
    locked: false,
  },
  {
    id: '2',
    title: 'THE GREAT RIZZ FAMINE',
    content: 'In 2022, Aayan went 365 days without a single W. Scientists are still studying how he survived the drought.',
    locked: false,
  },
  {
    id: '3',
    title: 'THE VANSHIKA BRAWL (PRIME ARC)',
    content: 'This was his PEAK. Aayan didn\'t just argue; he COOKED Vanshika. He dropped bars so hard she evaporated. The chat went wild. Absolute cinema. W Aayan.',
    locked: false,
  },
  {
    id: '102',
    title: 'GENUINELY FUNNY MOMENT',
    content: 'He made a joke in the group chat and everyone actually laughed. Not at him, but with him. It was a good day. W Humor.',
    locked: false,
  },
  {
    id: '4',
    title: 'I THOUGHT YOU WERE MULLA',
    content: 'A classic case of mistaken identity. Someone looked at Aayan and said "I thought you were Mulla Aayan Bobs". He has never recovered from this violation. Is he a scholar? No. Is he a clown? Yes.',
    locked: false,
  },
  {
    id: '5',
    title: 'FAILED LAZY PROMPT ENGINEER',
    content: 'Tried to use AI to write his homework but forgot to remove "As an AI language model". Teacher read it out loud to the class. Bro looked like he wanted to despawn IRL.',
    locked: false,
  },
  {
    id: '103',
    title: 'THE RAMEN CHEF',
    content: 'He made instant noodles once and didn\'t burn the kitchen down. It was actually edible. Chef Aayan in the building? Maybe.',
    locked: false,
  },
  {
    id: '6',
    title: 'TAEKWONDO GREEN BELT',
    content: 'He has a green belt in Taekwondo but can\'t touch his toes. He thinks he\'s Bruce Lee but he\'s actually Kung Fu Panda (without the skills). Watch out, he might pull a hamstring trying to kick you.',
    locked: false,
  },
  {
    id: '7',
    title: 'THE DUMPY (FAT BUTT)',
    content: 'Why is he double cheeked up on a random Tuesday? Bro is hauling a whole bakery behind him. The gravity of that dumpy is pulling us all in. 🍑💀',
    locked: false,
  },
  {
    id: '8',
    title: 'USTAD E KHASS INCIDENT',
    content: 'Eating Ustad E Khass\'s ass cream. We don\'t ask questions about the flavor. We just look away and pray for his stomach. 🤢',
    locked: false,
  },
  {
    id: '10',
    title: 'THE HAIRCUT DISASTER',
    content: 'Walked into the barber asking for a fade, walked out looking like a pineapple. Wore a hoodie for 3 weeks straight.',
    locked: false,
  },
  {
    id: '13',
    title: 'THE MATH TEST TRAGEDY',
    content: 'Studied for 5 hours. Thought he cooked. Got a 4/20. Blamed the teacher for "hating his aura".',
    locked: false,
  },
  {
    id: '14',
    title: 'THE SIGMA PHASE',
    content: 'Started unironically watching Patrick Bateman edits. Walked around school making weird faces. Everyone was scared (not in a good way).',
    locked: false,
  },
  {
    id: '17',
    title: 'THE "JUST ONE MORE" LIE',
    content: 'A comprehensive list of the 5,000 times Aayan said "just one more game" and proceeded to play until 4 AM.',
    locked: false,
  },
  {
    id: '18',
    title: 'TRYING TO COOK',
    content: 'Tried to make instant noodles. Burnt the water. How do you burn water? Aayan found a way.',
    locked: false,
  },
  {
    id: '21',
    title: 'LEFT ON READ',
    content: 'Sent "Hey" to his crush. She replied 8 months later with "Who is this?". Emotional damage.',
    locked: false,
  },
  {
    id: '22',
    title: 'THE "BULKING" EXCUSE',
    content: 'He\'s not fat, he\'s "bulking". He has been bulking since 2015. The cut is never coming.',
    locked: false,
  },
  {
    id: '23',
    title: 'FORGOT HOW TO WALK',
    content: 'Tripped over absolutely nothing in the hallway. Tried to turn it into a jog. Nobody was fooled.',
    locked: false,
  },
  {
    id: '24',
    title: 'FIGHTING A TODDLER',
    content: 'Wrestled his baby cousin. The cousin won. Aayan claimed he "let him win". Sure bro.',
    locked: false,
  },
  {
    id: '26',
    title: '3AM MOTIVATION',
    content: 'Decided at 3 AM he would fix his life, learn 3 languages, and start a business. Woke up at 1 PM and played Roblox.',
    locked: false,
  }
];

const Archives: React.FC = () => {
  const [entries, setEntries] = useState<ArchiveEntry[]>(initialEntries);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const newStory = await generateArchiveEntry();
    const newEntry: ArchiveEntry = {
      id: Date.now().toString(),
      title: newStory.title.toUpperCase(),
      content: newStory.content,
      locked: false,
    };
    setEntries(prev => [newEntry, ...prev]);
    setLoading(false);
  };

  return (
    <div className="bg-zinc-950 min-h-full p-6 md:p-12 pb-32">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              THE ARCHIVES
            </h2>
            <p className="text-zinc-400 font-mono mt-2">
              > RECORD_DATABASE // AAYAN_BOBS
            </p>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 font-bold font-mono text-sm uppercase flex items-center gap-3 transition-all border border-zinc-600 disabled:opacity-50 rounded-lg shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
            {loading ? 'DECRYPTING...' : 'GENERATE LORE'}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                layout
                key={entry.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, backgroundColor: '#18181b' }}
                onClick={() => setSelectedId(selectedId === entry.id ? null : entry.id)}
                className={`
                  cursor-pointer p-8 border-2 relative overflow-hidden group transition-all rounded-xl
                  ${selectedId === entry.id 
                    ? 'bg-zinc-900 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]' 
                    : 'bg-black border-zinc-800 hover:border-zinc-600'}
                `}
              >
                <div className="absolute top-4 right-4 text-zinc-600">
                  {entry.locked ? <Lock size={20} /> : <FileText size={20} />}
                </div>
                
                <h3 className="font-display text-2xl md:text-3xl text-white mb-4 pr-10 leading-none">
                  {entry.title}
                </h3>
                
                <div className={`h-1 bg-zinc-800 mb-6 transition-all duration-500 ease-out ${selectedId === entry.id ? 'w-full bg-green-500' : 'w-12 group-hover:w-full'}`} />

                <div className="text-zinc-400 font-mono text-sm leading-relaxed">
                    {selectedId === entry.id ? (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-lg">
                        {entry.content}
                      </motion.p>
                    ) : (
                      <p className="line-clamp-3 opacity-70 blur-[0.5px] group-hover:blur-none transition-all">
                        {entry.content}
                      </p>
                    )}
                </div>

                <div className="mt-4 flex justify-between items-center text-xs font-mono text-zinc-600 uppercase">
                    <span>ID: {entry.id.substring(0,6)}</span>
                    <span>{selectedId === entry.id ? 'READING' : 'CLICK TO EXPAND'}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Archives;