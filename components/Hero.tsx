import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleContactClick = () => {
    window.open('https://wa.me/4917624200179', '_blank');
  };

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 bg-[#0a0a0a] overflow-hidden pt-20">
      
      {/* Background Abstract Subtle Element REMOVED to ensure perfect #0a0a0a black everywhere */}
      {/* <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" /> */}

      {/* Content Container - z-20 ensures text is above background image */}
      <div className="max-w-[1400px] w-full mx-auto relative z-20">
        
        {/* Content Section */}
        <div className="relative z-20 mt-[150px]">
          
          {/* Main Headline - CRO Optimized Variant (Benefit + Professional) */}
          <motion.h1 
            className="text-5xl lg:text-[7vw] leading-[1.0] tracking-tight text-white mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <span className="block font-sans font-black">Websites, die</span>
            <span className="block serif-txt text-white/90 ml-[2vw] lg:ml-[4vw]">Verkaufen.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p 
            className="text-lg lg:text-xl text-white/60 max-w-xl leading-relaxed mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
             Schluss mit digitalen Visitenkarten, die niemand findet. Wir entwickeln strategische Webseiten für Selbstständige und Unternehmen, die Besucher in zahlende Kunden verwandeln.
          </motion.p>

          {/* Action & Scroll */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mt-4 lg:mt-0">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mt-[30px]"
            >
               <button 
                  onClick={handleContactClick}
                  className="group flex items-center gap-3 text-lg font-medium text-white hover:text-orange-500 transition-colors"
               >
                  <span className="border-b border-white/30 pb-1 group-hover:border-orange-500 transition-colors">Schreib mir auf Whatsapp</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </motion.div>

            {/* Scroll Indicator REMOVED */}

          </div>
        </div>

      </div>

      {/* Decorative Image - Background for ALL views now */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.2, delay: 0.2 }}
         className="absolute pointer-events-none top-0 left-0 w-full h-full z-0 opacity-20"
      >
         <div className="w-full h-full overflow-hidden relative">
            {/* Mobile/Tablet Image */}
            <img 
              src="https://i.postimg.cc/VshSbS5B/304d460a-ccb0-4175-8ee1-6768640cab66.png" 
              alt="Christian - Vamela Founder" 
              className="w-full h-full object-cover object-center md:object-top lg:hidden"
              // Optimized loading strategy
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
            {/* Desktop Image */}
            <img 
              src="https://i.postimg.cc/kgDQKrvj/Unbenannt-1.png" 
              alt="Christian - Vamela Founder" 
              className="hidden lg:block w-full h-full object-cover object-top"
              // Optimized loading strategy
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
            
            {/* Gradient: Fades image into black at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
         </div>
      </motion.div>

    </div>
  );
};