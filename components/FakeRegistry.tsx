import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Ban } from 'lucide-react';

const items = [
  { name: "New Knees (He's old)", price: "$50,000", img: "🦵" },
  { name: "Official Rizz License", price: "$999.99", img: "📜" },
  { name: "Bugatti (Invisible Edition)", price: "$2.5M", img: "🏎️" },
  { name: "A Girlfriend", price: "Priceless", img: "💔" },
];

const FakeRegistry: React.FC = () => {
  const handleBuy = () => {
    alert("TRANSACTION DECLINED: INSUFFICIENT RIZZ FUNDS.\n\nBro, you think we have budget for this? 💀");
  };

  return (
    <section className="py-20 bg-black px-4 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl text-center text-green-400 font-display mb-12">
          AAYAN'S WISHLIST
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-zinc-900 border border-green-900/30 p-6 rounded-lg flex flex-col items-center text-center group hover:border-green-400 transition-colors"
            >
              <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {item.img}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-green-400 font-mono text-lg mb-6">{item.price}</p>
              
              <button 
                onClick={handleBuy}
                className="w-full bg-zinc-800 text-white py-3 font-bold uppercase tracking-wider hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>Buy Now</span>
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-red-900/20 border border-red-900 text-red-400 text-center font-mono text-sm">
          NOTICE: We are not responsible if Aayan cries because he didn't get any of this.
        </div>
      </div>
    </section>
  );
};

export default FakeRegistry;