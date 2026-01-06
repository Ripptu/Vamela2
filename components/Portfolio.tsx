import React from "react";
import AnimatedCardStack from "./ui/animate-card-animation";

export const Portfolio = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-12 md:mb-16">
           <h2 className="text-4xl md:text-7xl font-sans font-bold leading-tight text-white mb-6">
             Ausgewählte <span className="serif-txt text-orange-500">Arbeiten</span>
           </h2>
           <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
             Hier ist kein Platz für Durchschnitt. Jedes Projekt ist maßgeschneidert, performance-optimiert und darauf ausgelegt, zu verkaufen.
           </p>
        </div>

        {/* Animated Stack Component */}
        <AnimatedCardStack />

      </div>
    </section>
  );
};