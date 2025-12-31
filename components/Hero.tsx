import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleContactClick = () => {
    window.open('https://wa.me/4915100000000', '_blank');
  };

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 bg-[#0a0a0a] overflow-hidden pt-20">
      
      {/* Background Abstract Subtle Element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Pre-headline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-orange-500"></div>
          <span className="text-sm md:text-base font-mono uppercase tracking-widest text-white/60">Vamela Digital Studio</span>
        </motion.div>

        {/* Main Headline - CRO Optimized Variant (Benefit + Professional) */}
        <motion.h1 
          className="text-5xl md:text-[7vw] leading-[1.0] tracking-tight text-white mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <span className="block font-sans font-black">Websites, die</span>
          <span className="block serif-txt text-white/90 ml-[2vw] md:ml-[4vw]">Verkaufen.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p 
          className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
           Schluss mit digitalen Visitenkarten, die niemand findet. Wir entwickeln strategische Webseiten für Selbstständige und Unternehmen, die Besucher in zahlende Kunden verwandeln.
        </motion.p>

        {/* Action & Scroll */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mt-4 md:mt-0">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-md"
          >
             <button 
                onClick={handleContactClick}
                className="group flex items-center gap-3 text-lg font-medium text-white hover:text-orange-500 transition-colors"
             >
                <span className="border-b border-white/30 pb-1 group-hover:border-orange-500 transition-colors">Strategiegespräch vereinbaren</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="hidden md:flex flex-col items-center gap-4"
          >
             <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[drop_2s_infinite]" />
             </div>
             <span className="serif-txt text-sm opacity-60">scroll</span>
          </motion.div>

        </div>

      </div>

      {/* Decorative Image - Updated Portrait */}
      <motion.div 
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 1.2, delay: 0.4 }}
         className="absolute -right-12 md:right-0 bottom-0 w-[80vw] md:w-[45vw] h-[50vh] md:h-[85vh] pointer-events-none z-0 flex items-end justify-end"
      >
         <img 
           src="https://i.postimg.cc/wvf0wfKC/70585c11-a1e8-444e-b6aa-c12fcbe61985.png" 
           alt="Christian - Vamela Founder" 
           className="w-full h-full object-contain object-bottom opacity-60 md:opacity-100 mix-blend-normal"
         />
         {/* Gradient overlay to blend bottom with footer/background */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent h-1/3 bottom-0 w-full" />
      </motion.div>

    </div>
  );
};