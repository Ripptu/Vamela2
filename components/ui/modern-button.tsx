import React from "react";
import { motion } from "motion/react";
import { MessageCircle, ArrowRight } from "lucide-react";

interface ModernButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ModernButton: React.FC<ModernButtonProps> = ({ onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={`group relative flex items-center gap-5 pl-3 pr-8 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-orange-500/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)] ${className}`}
    >
      {/* Icon Circle */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white shadow-lg overflow-hidden shrink-0 z-10 group-hover:scale-105 transition-transform duration-300">
        <motion.div
            variants={{
                initial: { rotate: 0 },
                hover: { rotate: 15 }
            }}
        >
             <MessageCircle className="w-6 h-6 fill-white/20" />
        </motion.div>
        
        {/* Shine on Icon */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start text-left z-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 group-hover:text-orange-400 transition-colors duration-300">
          Let's talk
        </span>
        <div className="flex items-center gap-2 overflow-hidden h-7">
             <span className="text-xl font-bold text-white tracking-wide group-hover:text-white transition-colors">
               SCHREIB MIR
             </span>
             <motion.div
                variants={{
                    initial: { x: -10, opacity: 0 },
                    hover: { x: 0, opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
             >
                <ArrowRight className="w-5 h-5 text-orange-500" />
             </motion.div>
        </div>
      </div>

      {/* Background Gradient Slide */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)"
        }}
      />
    </motion.button>
  );
};
