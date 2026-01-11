import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from 'motion/react';
import { ModernButton } from './ui/modern-button';

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
               className="flex flex-col items-center mt-12 md:mt-20 w-full"
            >
                {/* 
                   NEW MODERN BUTTON
                */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <ModernButton onClick={handleContactClick} />
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
