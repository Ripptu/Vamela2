import React from "react";
import AnimatedCardStack from "./ui/animate-card-animation";

export const Portfolio = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden z-10 bg-[#050505]">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
           <h2 className="text-4xl md:text-8xl leading-[0.9] text-white mb-8">
             <span className="font-sans font-black block">Ausgewählte</span>
             <span className="serif-txt text-orange-500 block">Arbeiten.</span>
           </h2>
           <p className="inline-block px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm md:text-base font-light">
             Maßgeschneidert. Performance-optimiert. High-End.
           </p>
        </div>

        {/* Animated Stack Component */}
        <AnimatedCardStack />

      </div>
    </section>
  );
};