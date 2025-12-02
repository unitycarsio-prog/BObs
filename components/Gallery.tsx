import React, { useState, useRef } from 'react';
import { Camera, Plus, Trash2 } from 'lucide-react';

const Gallery: React.FC = () => {
  // Using the stable Blogger image as the default starting image
  const DEFAULT_IMG = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqr-CKao67CiMR55whXQea-W0QnlVis-c6fekEBUBU48VgpnmvtPtIssgJHgyLP_q_U0M8rEzxtLUDqnNsOHkF7tpenLcyZhPLV58ufHB1kIdfFQ-x3Y7p0JtBBacYwQZBglaQMxluSUNq7AMgBVfoB9bw_lGRN5xibewBTyeIx-K17n3-n2KbneSL7bo/s1184/Gemini_Generated_Image_q25cowq25cowq25c.png';
  const NEW_IMG = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjO-GP2b7E19RSGOPhUHfOm18YfwUNZgJeRJgZxZKVuvefCJXToDI-nZSnrOxYpoNZd5DX6UZQoHEiVFneVur_qsgsSQI0zlloU4dp4mJW6MVF6ZbgAcJczU1LZ-jqAUzdMIaUPTXR_NdKvOHYB3XuQcV5PFPhyphenhyphen3LY7Zl_TBkP6rv0Xn5blc9TCVU63QaU/s320/Gemini_Generated_Image_qc26tfqc26tfqc26.png';
  const NEW_HALL_OF_FAME_IMG = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsohNaiLx0wmb0qilq8ImXIzB0T541BS_3tVqGch2Ys-8wiA9bewk-NM_ZrpgqaeW_Ze4_PSPpLwC3yFhhMgZz0D0OtieF0V1x9cRatSN7NhJP0-CWVFkCvRn9bxCXuX1EQUXLATLuxVOo0q-jkBLI7nWoBujC21rGwvNAyHEX7ke3uHx4wExpbvh9iCE/s320/Gemini_Generated_Image_2i1za82i1za82i1z.png';
  const NEW_IMG_1 = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhiY4pT5uFIK4SM1kQw8k8lsK9s1mMxuP2xL7AEtM1FKPm3b7SGz1s-SNnHlJq2JqA3dVgvvwStPsQOHDSUF6i1ikGyrx9Oj8K3BSYo1UyrM77JHzajwi2tVKmQsP7oVkKRawLrIZP9EhdB8U_hBZ_KF99uFeZ3410jRpUG4VRSlE0UkuN-Kjry0CeIvs4/s320/Gemini_Generated_Image_s2ar6gs2ar6gs2ar.png';
  const NEW_IMG_2 = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsuDJ528D7vMTpGlyYUCUmrQmBqXpBg1Nhh8qZu2s4x7hwaUkoizUc0XILukaMSXuHN1l6xDaDDHo7HOIXzvOfseC1ySULp5fUlXTXiGYe3TDWo5-_BfF8gZZL1fStssnFAsMSw_EJOyXAH-oXDu7FzsBtM9vqhENvq7hGkKzzYOSK70MYJT-_usxi5u0/s320/Gemini_Generated_Image_g981peg981peg981.png';

  const [images, setImages] = useState([
    {
        id: 7,
        src: NEW_IMG_2,
        caption: "PURE RIZZ 🥶"
    },
    {
        id: 6,
        src: NEW_IMG_1,
        caption: "THE AURA IS BLINDING 🌟"
    },
    {
        id: 5,
        src: 'https://api.dicebear.com/9.x/micah/svg?seed=KingAayan&backgroundColor=facc15',
        caption: "BIRTHDAY KING 🎂 (UPLOAD HERE)"
    },
    {
        id: 4,
        src: NEW_HALL_OF_FAME_IMG,
        caption: "LEGENDARY AURA 🔥"
    },
    {
        id: 3,
        src: NEW_IMG,
        caption: "AAYAN IN 4K 📸"
    },
    { 
      id: 1,
      src: DEFAULT_IMG, 
      caption: "LEGENDARY STATUS 👑"
    },
    { 
      id: 2,
      src: DEFAULT_IMG, // Using same safe image as placeholder since other link expired
      caption: "THE REAL BADSHAH" 
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [
            {
              id: Date.now(),
              src: event.target?.result as string,
              caption: "NEW UPLOAD 🔥"
            },
            ...prev
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-full py-12 bg-zinc-950 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-5xl md:text-8xl font-display mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 opacity-90">
            HALL OF FAME
            </h2>
            <p className="text-zinc-500 font-mono mb-8">
            A COLLECTION OF RARE AAYAN MOMENTS
            </p>
            
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-600 hover:bg-green-500 text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105"
            >
                <Plus size={20} /> Add Photo
            </button>
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <div key={img.id} className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all">
              <div className="aspect-[3/4] overflow-hidden relative bg-black">
                 <img 
                  src={img.src} 
                  alt={`Aayan Bobs ${index}`} 
                  onError={(e) => {
                      // Fallback if image breaks
                      (e.target as HTMLImageElement).src = 'https://api.dicebear.com/9.x/micah/svg?seed=AayanBobs&backgroundColor=facc15';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button 
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 bg-red-600/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                    <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                <p className="text-white font-display text-2xl tracking-wide text-center drop-shadow-md">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 p-8 border border-zinc-800 rounded-xl bg-black/50">
          <p className="text-zinc-600 font-mono text-sm">
            *WARNING: Exposure to these images may cause blindness due to extreme aura.*
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;