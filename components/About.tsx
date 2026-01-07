import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stats = [
  { label: "Jahre Erfahrung", value: "8+" },
  { label: "Zufriedene Kunden", value: "40+" },
  { label: "Kaffee pro Tag", value: "4" },
  { label: "Qualität", value: "100%" },
];

// Ensure two distinct images are used for the slider
const images = [
  {
    src: "https://i.postimg.cc/zDbjms7g/4995ad88-01bd-465e-9b20-c3178ee83d1e.png",
    alt: "Christian Portrait",
  },
  {
    src: "https://i.postimg.cc/wvf0wfKC/70585c11-a1e8-444e-b6aa-c12fcbe61985.png", // Using the working image as second slide
    alt: "Christian Working",
  }
];

export const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImage((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = images.length - 1;
      if (next >= images.length) next = 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px"
        }}
      />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Swipeable Image Slider */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center">
           
           <div className="relative w-full h-full max-w-md mx-auto aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl group">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = (Math.abs(offset.x) * velocity.x);
                    if (swipe < -10000) {
                      paginate(1);
                    } else if (swipe > 10000) {
                      paginate(-1);
                    }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={images[currentImage].src} 
                    alt={images[currentImage].alt} 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                <button 
                  onClick={() => paginate(-1)}
                  className="p-3 rounded-full bg-black/40 hover:bg-orange-500 hover:text-white backdrop-blur-md transition-all border border-white/10 text-white shadow-lg active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => paginate(1)}
                  className="p-3 rounded-full bg-black/40 hover:bg-orange-500 hover:text-white backdrop-blur-md transition-all border border-white/10 text-white shadow-lg active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
           </div>

           {/* Decorative abstract shape */}
           <div className="absolute -z-10 inset-0 bg-orange-500/5 blur-[80px] rounded-full scale-90" />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2">
           <motion.h2 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="mb-8"
           >
             <span className="block font-sans font-black text-white text-5xl md:text-7xl tracking-tighter leading-[0.9]">
               Servus, ich bin
             </span>
             <span className="block font-serif font-light italic text-orange-500 text-6xl md:text-8xl -mt-2 md:-mt-4">
               Christian.
             </span>
           </motion.h2>
           
           <div className="space-y-6 text-lg text-muted font-light leading-relaxed mb-12">
             <p>
               Vergiss mal kurz Agenturen, Anzugträger und kompliziertes Fachchinesisch. Ich bin einfach ein Typ, der verdammt gerne Webseiten baut. Und zwar solche, die dir wirklich was bringen.
             </p>
             <p>
               Ich sitze nicht in einem Glaspalast, sondern arbeite direkt und persönlich mit dir. Wenn du anrufst, gehe ich dran. Wenn wir schreiben, antworte ich – und kein Chatbot.
             </p>
             <p className="border-l-2 border-orange-500 pl-6 text-white/80 italic">
               "Ehrlich, direkt und auf Augenhöhe. So macht Zusammenarbeit Spaß."
             </p>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-serif text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};