import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stats = [
  { label: "Jahre Erfahrung", value: "8+" },
  { label: "Zufriedene Kunden", value: "40+" },
  { label: "Fokus", value: "100%" },
  { label: "Qualität", value: "A+" },
];

const images = [
  {
    src: "https://i.postimg.cc/zDbjms7g/4995ad88-01bd-465e-9b20-c3178ee83d1e.png",
    alt: "Christian Portrait",
  },
  {
    src: "https://i.postimg.cc/wvf0wfKC/70585c11-a1e8-444e-b6aa-c12fcbe61985.png",
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
           
           <div className="relative w-full h-full max-w-md mx-auto aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
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
                    const swipe = swipePower(offset.x, velocity.x);
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
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                <button 
                  onClick={() => paginate(-1)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/5 text-white"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => paginate(1)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/5 text-white"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-orange-500 w-4' : 'bg-white/30'}`}
                  />
                ))}
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
               Warum
             </span>
             <span className="block font-serif font-light italic text-orange-500 text-6xl md:text-8xl -mt-2 md:-mt-4">
               ich?
             </span>
           </motion.h2>
           
           <div className="space-y-6 text-lg text-muted font-light leading-relaxed mb-12">
             <p>
               Ganz einfach: <strong>Kein Agentur-Overhead, keine stillen Post-Spiele.</strong> Bei mir sprichst du direkt mit dem Macher.
             </p>
             <p>
               Ich bin Christian, Web-Entwickler und Designer. Ich verstehe, dass du als Selbstständiger oder kleines Unternehmen keine Zeit für endlose Meetings hast. Du brauchst Ergebnisse. Eine Website, die funktioniert, gut aussieht und dein Business voranbringt.
             </p>
             <p>
               Ich kombiniere technisches Know-how mit strategischem Marketing. Das Ergebnis? Digitale Lösungen, die nicht nur schön aussehen, sondern sich für dich bezahlt machen.
             </p>
             <p className="border-l-2 border-orange-500 pl-6 text-white/80 italic">
               "Persönliche Betreuung, kurze Kommunikationswege und eine Umsetzung auf höchstem Niveau."
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

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};