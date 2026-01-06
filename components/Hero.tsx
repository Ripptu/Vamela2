import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleContactClick = () => {
    window.open('https://wa.me/4917624200179', '_blank');
  };

  return (
    <div className="relative w-full min-h-[95vh] flex flex-col justify-end pb-32 px-6 md:px-12 overflow-hidden">
      
      {/* Decorative Image Layer - Full Background with Mask */}
      <motion.div 
         initial={{ opacity: 0, scale: 1.1 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1.5 }}
         className="absolute inset-0 z-0 opacity-40 md:opacity-30 mix-blend-lighten"
      >
         {/* Mobile Image */}
         <img 
            src="https://i.postimg.cc/VshSbS5B/304d460a-ccb0-4175-8ee1-6768640cab66.png" 
            alt="Christian Background" 
            className="w-full h-full object-cover object-top lg:hidden" 
         />
         {/* Desktop Image */}
         <img 
            src="https://i.postimg.cc/kgDQKrvj/Unbenannt-1.png" 
            alt="Christian Background" 
            className="hidden lg:block w-full h-full object-cover object-top" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="max-w-[1400px] w-full mx-auto relative z-20">
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            
            {/* Typography Stack */}
            <div className="flex-1">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-[9vw] leading-[0.85] tracking-tight text-white mb-6 text-glow">
                        <span className="block font-sans font-black">Websites,</span>
                        <div className="flex items-center gap-4">
                             <span className="block font-sans font-black">die</span>
                             <span className="block serif-txt text-orange-500">Verkaufen.</span>
                        </div>
                    </h1>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-md mt-8 glass-panel rounded-2xl p-6 md:p-8 backdrop-blur-md border border-white/10"
                >
                    <p className="text-lg text-white/80 font-light leading-relaxed mb-6">
                        Schluss mit digitalen Visitenkarten. Wir entwickeln strategische Webseiten, die Besucher in zahlende Kunden verwandeln.
                    </p>
                    <button 
                        onClick={handleContactClick}
                        className="w-full group relative overflow-hidden bg-white text-black px-6 py-4 rounded-xl font-sans font-bold text-lg flex items-center justify-between hover:scale-[1.02] transition-transform duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                           <Sparkles className="w-4 h-4 text-orange-500" /> WhatsApp Chat starten
                        </span>
                        <div className="relative z-10 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator / Side Text */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="hidden md:block text-right"
            >
                <p className="text-sm font-mono text-white/30 uppercase tracking-widest vertical-rl rotate-180">
                    Scroll for more
                </p>
            </motion.div>

        </div>

      </div>
    </div>
  );
};