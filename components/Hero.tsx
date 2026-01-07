import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Flame } from 'lucide-react';

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, onClick }: { children?: React.ReactNode, onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.5, y: middleY * 0.5 }); // Sensitivity
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  
  // Smooth spring physics for the magnetic pull
  const xMotion = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const yMotion = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      style={{ x: xMotion, y: yMotion }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className="relative z-50 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse tracking background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Scroll parallax for different layers
  const { scrollY } = useScroll();
  
  // 1. Background Image
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  
  // 2. "JEDERMANN" (Main Title)
  const yMainText = useTransform(scrollY, [0, 1000], [0, 200]);

  // 3. "Websites für" (Floating Top Layer)
  const yOverlayText = useTransform(scrollY, [0, 1000], [0, -50]);
  
  // 4. Button Area
  const yContent = useTransform(scrollY, [0, 1000], [0, 50]);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleContactClick = () => {
    window.open('https://wa.me/4917624200179', '_blank');
  };

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px, 
    rgba(255, 255, 255, 0.04), 
    transparent 80%
  )`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-4 md:px-12 overflow-hidden bg-[#050505] group selection:bg-orange-500 selection:text-white"
    >
      
      {/* BACKGROUND IMAGE */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
      >
         <img 
            src="https://i.postimg.cc/FRbC4RCR/Unbenannt-1.jpg" 
            alt="Atmosphere" 
            className="w-full h-full object-cover opacity-70"
         />
         <div className="absolute inset-0 bg-black/40" />
         <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </motion.div>

      {/* Spotlight Effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
        style={{ background }}
      />
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-8 left-6 md:left-12 z-50 pointer-events-auto"
      >
         <img src="https://i.postimg.cc/tJjgBcYZ/Logo-weiss.png" alt="Vamela" className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center w-full max-w-[95vw] mt-[10vh]">
            
            {/* Title Section */}
            <div className="relative flex flex-col items-center leading-none select-none pointer-events-none">
                <motion.span
                    style={{ y: yOverlayText }}
                    initial={{ opacity: 0, y: 40, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-[11vw] md:text-[6.5vw] serif-txt text-orange-500 italic tracking-wide z-10 -mb-3 md:-mb-14 drop-shadow-[0_0_40px_rgba(249,115,22,1)] relative"
                >
                    Websites für
                </motion.span>
                
                <motion.h1 
                    style={{ y: yMainText }}
                    initial={{ opacity: 0, scale: 0.9, letterSpacing: "-0.08em" }}
                    animate={{ opacity: 1, scale: 1, letterSpacing: "-0.06em" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[16vw] md:text-[14vw] font-black text-white leading-[0.8] drop-shadow-2xl tracking-tighter"
                >
                    JEDERMANN
                </motion.h1>
            </div>

            {/* BUTTON CONTAINER */}
            <motion.div
               style={{ y: yContent }}
               className="flex flex-col items-center mt-12 md:mt-20"
            >
                {/* 
                   NEW MAGNETIC "LIQUID CORE" BUTTON 
                */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <MagneticButton onClick={handleContactClick}>
                    <div className="group relative">
                      {/* Outer Glow / Blur Ring */}
                      <div className="absolute -inset-3 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 rounded-full blur-xl opacity-40 group-hover:opacity-80 group-hover:blur-2xl transition-all duration-500 animate-pulse-slow"></div>
                      
                      {/* The Button Body */}
                      <div className="relative overflow-hidden rounded-full bg-black border border-white/10 px-10 py-5 md:px-12 md:py-6 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] active:scale-[0.98]">
                         
                         {/* Liquid Background Effect */}
                         <div className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#f97316_100%)] opacity-0 group-hover:opacity-20 animate-spin-slow duration-[3s] group-hover:duration-[1s] transition-opacity"></div>
                         
                         <div className="relative z-10 flex items-center gap-4">
                           {/* Slot Machine Text Effect */}
                           <div className="relative h-6 overflow-hidden flex flex-col items-start justify-start">
                              <span className="block text-base md:text-lg font-black tracking-[0.2em] uppercase text-white transition-transform duration-500 group-hover:-translate-y-full">
                                Schreib mir
                              </span>
                              <span className="absolute top-full left-0 block text-base md:text-lg font-black tracking-[0.2em] uppercase text-orange-500 transition-transform duration-500 group-hover:-translate-y-full">
                                Schreib mir
                              </span>
                           </div>

                           <ArrowRight className="w-5 h-5 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-500" strokeWidth={3} />
                         </div>
                      </div>
                    </div>
                  </MagneticButton>
                </motion.div>
            </motion.div>

      </div>

      {/* Footer Text & Scroll Hint */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2, duration: 1 }}
         style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
         className="absolute bottom-8 w-full px-8 md:px-12 flex justify-between items-end pointer-events-none"
      >
          {/* Left: Script Slogan */}
          <div className="hidden md:block w-64 text-left">
             <p className="font-serif italic text-white/60 text-lg leading-tight md:text-xl transform rotate-[-2deg] origin-bottom-left">
               Endlich deine eigene Website. <br />
               <span className="text-orange-500 border-b border-orange-500/30 pb-1">Ohne Stress.</span>
             </p>
          </div>

          {/* Center: Scroll Indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-2 animate-bounce">
             <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
          </div>

          {/* Right: Spacer */}
          <div className="hidden md:block w-64"></div>
      </motion.div>
    </div>
  );
};
