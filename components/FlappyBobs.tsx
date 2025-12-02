import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Upload, Image as ImageIcon, Camera, ChevronRight, User } from 'lucide-react';

const SKINS = [
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjO-GP2b7E19RSGOPhUHfOm18YfwUNZgJeRJgZxZKVuvefCJXToDI-nZSnrOxYpoNZd5DX6UZQoHEiVFneVur_qsgsSQI0zlloU4dp4mJW6MVF6ZbgAcJczU1LZ-jqAUzdMIaUPTXR_NdKvOHYB3XuQcV5PFPhyphenhyphen3LY7Zl_TBkP6rv0Xn5blc9TCVU63QaU/s320/Gemini_Generated_Image_qc26tfqc26tfqc26.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqr-CKao67CiMR55whXQea-W0QnlVis-c6fekEBUBU48VgpnmvtPtIssgJHgyLP_q_U0M8rEzxtLUDqnNsOHkF7tpenLcyZhPLV58ufHB1kIdfFQ-x3Y7p0JtBBacYwQZBglaQMxluSUNq7AMgBVfoB9bw_lGRN5xibewBTyeIx-K17n3-n2KbneSL7bo/s1184/Gemini_Generated_Image_q25cowq25cowq25c.png',
  'https://lh3.googleusercontent.com/gg-dl/ABS2GSlp7dkcgYE88mnAFBJyLPpZuxVWRVDoyTuSTiYBnIQKlSCPER6bbL4nh_dPbcT4WbbhDumrUL7IlJNx8CRIDJVMZxAn0GboRCcJncgJGzRNeHox8vXK6QS30lOhVZWfRmEmPaGcFOOEMTsZzZF54uzmmTxLJ1cIMjA_ziP0q-QlPpEcHg=s1024-rj',
  'https://lh3.googleusercontent.com/gg-dl/ABS2GSmpNGXhkSwtK-3TA6qeZu-x6LbHWtL59SMtoZt2yjKusXEXnIiRqmcPxwdyT3-fz1-d781-S1bxVHoQ6979idgf4lO0U8wpDxyp2orx4B0qiL-Nh3p_d4_8P6lKN2w1OIR1qqUi2X2KxPZ2JcmyHhbUqPDM-V8OA0gdMQsyZvCr8ldx8Q=s1024-rj'
];

const FlappyBobs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [skinIndex, setSkinIndex] = useState(0);

  // Game Constants
  const GRAVITY = 0.6;
  const JUMP = -10;
  const PIPE_SPEED = 5;
  const PIPE_SPAWN_RATE = 100;
  const PIPE_GAP = 220;
  const BIRD_SIZE = 60; // Slightly smaller for better hitboxes

  // Game State Refs
  const birdY = useRef(300);
  const birdVelocity = useRef(0);
  const pipes = useRef<{ x: number; topHeight: number; passed: boolean }[]>([]);
  
  // Image Ref
  const birdImageRef = useRef<HTMLImageElement>(new Image());
  const [imageLoaded, setImageLoaded] = useState(false);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);

  // Enhanced Particle System
  const particles = useRef<{ 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    life: number; 
    decay: number;
    color: string; 
    size: number;
    type: 'fire' | 'smoke' | 'spark' | 'core';
  }[]>([]);

  const frameCount = useRef(0);
  const animationFrameId = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio & Image
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }
  }, []);

  // Update Bird Image when skin or custom image changes
  useEffect(() => {
    const src = customImageSrc || SKINS[skinIndex];
    birdImageRef.current.crossOrigin = "Anonymous";
    birdImageRef.current.src = src;
    birdImageRef.current.onload = () => {
        setImageLoaded(true);
    };
    birdImageRef.current.onerror = () => {
        // Fallback to default if a link breaks
        if (src !== SKINS[0]) {
             birdImageRef.current.src = SKINS[0];
        }
    }
  }, [skinIndex, customImageSrc]);

  const cycleSkin = () => {
    setCustomImageSrc(null); // Clear custom upload if cycling presets
    setSkinIndex((prev) => (prev + 1) % SKINS.length);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
              setCustomImageSrc(event.target.result as string);
            }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const playFartSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Create oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sawtooth';
    // Lower frequency start for a "wet" fart sound
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);
    
    // Envelope
    gainNode.gain.setValueAtTime(0.8, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }, []);

  const resetGame = () => {
    if(containerRef.current) {
        birdY.current = containerRef.current.clientHeight / 2;
    } else {
        birdY.current = 300;
    }
    birdVelocity.current = 0;
    pipes.current = [];
    particles.current = [];
    frameCount.current = 0;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const spawnFire = () => {
     // Adjust spawn position based on rotation logic approx
     const birdCenterY = birdY.current + BIRD_SIZE / 2;
     const birdBackX = 100; // Left side of bird

     // 1. Core White Hot Blast (Fast, Short)
     for(let i=0; i<8; i++) {
        const speed = Math.random() * 8 + 6;
        const angle = (Math.random() - 0.5) * 0.5; 
        particles.current.push({
            x: birdBackX, 
            y: birdCenterY + (Math.random() * 8 - 4),
            vx: -Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1.0,
            decay: Math.random() * 0.08 + 0.05,
            size: Math.random() * 12 + 8,
            color: '#ffffff',
            type: 'core'
        });
     }

     // 2. Main Fire Flames (Orange/Red, Medium)
     for(let i=0; i<15; i++) {
         const speed = Math.random() * 5 + 3;
         const angle = (Math.random() - 0.5) * 1.0; 
         particles.current.push({
             x: birdBackX - 5,
             y: birdCenterY + (Math.random() * 15 - 7.5),
             vx: -Math.cos(angle) * speed,
             vy: Math.sin(angle) * speed,
             life: 1.0,
             decay: Math.random() * 0.03 + 0.02,
             size: Math.random() * 14 + 6,
             color: '#facc15', // Starts yellow
             type: 'fire'
         });
     }

     // 3. Smoke Trails (Grey, Slow, Rising)
     for(let i=0; i<8; i++) {
         const speed = Math.random() * 2 + 1;
         const angle = (Math.random() - 0.5) * 1.5;
         particles.current.push({
             x: birdBackX - 10,
             y: birdCenterY + (Math.random() * 20 - 10),
             vx: -Math.cos(angle) * speed - 2, // Moves left with world
             vy: (Math.random() - 0.5) * 2,
             life: 1.0,
             decay: Math.random() * 0.01 + 0.005,
             size: Math.random() * 15 + 10,
             color: '#52525b',
             type: 'smoke'
         });
     }

     // 4. Sparks (Tiny, Wild)
     for(let i=0; i<5; i++) {
         const speed = Math.random() * 10 + 5;
         const angle = (Math.random() - 0.5) * 2.0;
         particles.current.push({
             x: birdBackX,
             y: birdCenterY,
             vx: -Math.cos(angle) * speed,
             vy: Math.sin(angle) * speed,
             life: 1.0,
             decay: 0.1,
             size: 3,
             color: '#fbbf24',
             type: 'spark'
         });
     }
  };

  const jump = useCallback(() => {
    if (!isPlaying) return;
    birdVelocity.current = JUMP;
    spawnFire();
    playFartSound();
  }, [isPlaying, playFartSound]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault(); // Prevent scrolling
        if (!isPlaying && !gameOver) {
          resetGame();
        } else if (isPlaying) {
          jump();
        } else if (gameOver && e.code === 'Space') {
          resetGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, jump]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      if (!isPlaying || gameOver) {
         if(gameOver) return;
      }

      birdVelocity.current += GRAVITY;
      birdY.current += birdVelocity.current;

      frameCount.current++;
      if (frameCount.current % PIPE_SPAWN_RATE === 0) {
        const minPipeHeight = 100;
        const maxPipeHeight = canvas.height - PIPE_GAP - minPipeHeight;
        const randomHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
        pipes.current.push({ x: canvas.width, topHeight: randomHeight, passed: false });
      }

      // Update Pipes
      pipes.current.forEach(pipe => {
        pipe.x -= PIPE_SPEED;
      });

      if (pipes.current.length > 0 && pipes.current[0].x < -100) {
        pipes.current.shift();
      }

      // Update Particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;
          
          if (p.type === 'smoke') {
              p.vy -= 0.05; // Smoke rises naturally
              p.size += 0.2; // Smoke expands
              p.x -= 1; // Drag effect
          } else if (p.type === 'fire') {
              // Fire color transition: Yellow -> Orange -> Red -> Fade
              if (p.life > 0.7) p.color = '#facc15'; // Yellow
              else if (p.life > 0.4) p.color = '#f97316'; // Orange
              else p.color = '#ef4444'; // Red
          } else if (p.type === 'core') {
               // Core stays white/light yellow then fades fast
               if (p.life < 0.5) p.color = '#fef08a';
          }

          if (p.life <= 0) {
              particles.current.splice(i, 1);
          }
      }

      // Hitbox logic
      // Forgiving hitbox
      const hitPaddingX = 15;
      const hitPaddingY = 10;
      const birdRect = { 
          x: 100 + hitPaddingX, 
          y: birdY.current + hitPaddingY, 
          w: BIRD_SIZE - hitPaddingX * 2, 
          h: BIRD_SIZE - hitPaddingY * 2 
      };
      
      // Ground/Ceiling collision
      if (birdY.current + BIRD_SIZE > canvas.height) {
        birdY.current = canvas.height - BIRD_SIZE;
        setGameOver(true);
        setIsPlaying(false);
      }
      if (birdY.current < 0) {
        birdY.current = 0;
        birdVelocity.current = 0;
      }

      pipes.current.forEach(pipe => {
        // Collision logic
        // Pipe X range overlap
        if (birdRect.x + birdRect.w > pipe.x && birdRect.x < pipe.x + 80) {
          // Pipe Y collision (hit top pipe OR hit bottom pipe)
          if (birdRect.y < pipe.topHeight || birdRect.y + birdRect.h > pipe.topHeight + PIPE_GAP) {
            setGameOver(true);
            setIsPlaying(false);
          }
        }

        if (!pipe.passed && birdRect.x > pipe.x + 80) {
          pipe.passed = true;
          setScore(s => {
             const newScore = s + 1;
             if(newScore > highScore) setHighScore(newScore);
             return newScore;
          });
        }
      });

      // DRAW
      ctx.fillStyle = '#18181b'; // Zinc-900 bg
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background decorative lines
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      for(let i=0; i<canvas.width; i+=100) {
        ctx.beginPath();
        ctx.moveTo((i - (frameCount.current * 2) % 100), 0);
        ctx.lineTo((i - (frameCount.current * 2) % 100), canvas.height);
        ctx.stroke();
      }

      // Draw Particles (BEHIND BIRD)
      particles.current.forEach(p => {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          
          if (p.type === 'smoke') {
              // Smoke bubbles (circles)
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
              ctx.fill();
          } else {
              // Fire/Core/Spark (Squares)
              const currentSize = p.size * p.life;
              const offset = (p.size - currentSize) / 2;
              ctx.fillRect(p.x + offset, p.y + offset, currentSize, currentSize);
          }
      });
      ctx.globalAlpha = 1.0;

      // Pipes
      ctx.fillStyle = '#22c55e';
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 4;
      pipes.current.forEach(pipe => {
        // Top Pipe
        ctx.fillRect(pipe.x, 0, 80, pipe.topHeight);
        ctx.strokeRect(pipe.x, 0, 80, pipe.topHeight);
        
        // Bottom Pipe
        ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, 80, canvas.height - (pipe.topHeight + PIPE_GAP));
        ctx.strokeRect(pipe.x, pipe.topHeight + PIPE_GAP, 80, canvas.height - (pipe.topHeight + PIPE_GAP));

        // Pipe Cap details
        ctx.fillStyle = '#166534';
        ctx.fillRect(pipe.x - 4, pipe.topHeight - 20, 88, 20); // Top cap
        ctx.fillRect(pipe.x - 4, pipe.topHeight + PIPE_GAP, 88, 20); // Bottom cap
        ctx.fillStyle = '#22c55e';
      });

      // DRAW BIRD (IMAGE WITH ROTATION)
      ctx.save();
      // Move to center of bird
      ctx.translate(100 + BIRD_SIZE / 2, birdY.current + BIRD_SIZE / 2);
      
      // Calculate rotation based on velocity
      // More aggressive rotation for better feel
      const rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (birdVelocity.current * 0.15)));
      ctx.rotate(rotation);

      if (imageLoaded && birdImageRef.current) {
         ctx.drawImage(birdImageRef.current, -BIRD_SIZE / 2, -BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE);
      } else {
         // Fallback just in case
         ctx.fillStyle = '#fde047';
         ctx.beginPath();
         ctx.arc(0, 0, BIRD_SIZE/2, 0, Math.PI*2);
         ctx.fill();
      }
      ctx.restore();

      if(!gameOver) {
        animationFrameId.current = requestAnimationFrame(loop);
      }
    };

    if (isPlaying && !gameOver) {
      animationFrameId.current = requestAnimationFrame(loop);
    } else {
       // Static render for menu/game over
       const ctx = canvas.getContext('2d');
       if(ctx && pipes.current.length === 0) {
           ctx.fillStyle = '#18181b';
           ctx.fillRect(0, 0, canvas.width, canvas.height);
           
           // Draw Idle bird
           const hoverY = birdY.current + Math.sin(Date.now() / 300) * 10;
           
           ctx.save();
           ctx.translate(100 + BIRD_SIZE / 2, hoverY + BIRD_SIZE / 2);
           if (imageLoaded && birdImageRef.current) {
             ctx.drawImage(birdImageRef.current, -BIRD_SIZE / 2, -BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE);
           }
           ctx.restore();
           
           requestAnimationFrame(() => {}); // Force re-render
       }
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isPlaying, gameOver, highScore, imageLoaded]);


  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full bg-zinc-900 overflow-hidden outline-none"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
        <canvas 
          ref={canvasRef}
          onClick={jump}
          className="w-full h-full cursor-pointer touch-none block"
        />

        {/* HUD */}
        <div className="absolute top-8 left-8 text-white font-black text-6xl drop-shadow-lg select-none pointer-events-none z-20">
          {score}
        </div>
        
        <div className="absolute top-8 right-8 text-zinc-500 font-mono text-xl select-none pointer-events-none z-20">
          BEST: {highScore}
        </div>

        {/* Start Screen */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30 p-4 text-center">
              <h2 className="text-4xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-2">FLAPPY BOBS</h2>
              <p className="text-green-400 font-mono mb-8 animate-pulse uppercase tracking-widest text-sm md:text-base">
                 🎉 HAPPY BIRTHDAY AAYAN BOBS 🎉
              </p>
              
              <div className="flex flex-col gap-4 mb-12">
                  <button 
                    onClick={resetGame}
                    className="w-full bg-green-500 hover:bg-green-400 text-black px-8 py-6 font-black text-xl md:text-2xl uppercase tracking-widest flex items-center justify-center gap-3 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  >
                    <Play fill="currentColor" size={32} /> Start Game
                  </button>

                  <div className="flex flex-col md:flex-row gap-4">
                      {/* Skin Cycler */}
                      <button 
                        onClick={cycleSkin}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl border-2 border-blue-400"
                        title="Change Character Skin"
                      >
                         <User size={24} /> 
                         <span>Skin {skinIndex + 1}/{SKINS.length}</span>
                         <ChevronRight size={24} />
                      </button>

                      {/* Custom Upload */}
                      <label className="flex-1 cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-4 font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-600">
                        <Camera size={24} /> 
                        <span>{customImageSrc ? 'Custom Set' : 'Upload'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileSelect} 
                          className="hidden"
                          ref={fileInputRef}
                        />
                      </label>
                  </div>
              </div>

              <p className="text-white mt-4 font-mono text-center text-sm md:text-base mb-4 opacity-70">
                Tap or Press Space to Jump. <br/>
                <span className="text-xs text-zinc-500">(Drag & Drop any image to use as skin)</span>
              </p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-md z-30">
            <h3 className="text-5xl md:text-7xl font-display text-white mb-4 text-shadow-lg shake text-center">
                MATERIAL NIKAL DIYA
            </h3>
            <p className="text-red-200 font-mono text-2xl mb-12">Score: {score}</p>
            
            <button 
              onClick={resetGame}
              className="bg-white hover:bg-zinc-200 text-black px-12 py-6 font-black text-2xl uppercase tracking-widest flex items-center gap-3 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <RotateCcw size={32} /> Try Again
              </button>
          </div>
        )}
    </div>
  );
};

export default FlappyBobs;