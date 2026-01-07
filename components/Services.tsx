import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, Sparkles, Layers, Box, Code, PenTool, BarChart } from "lucide-react";

const services = [
  {
    id: "01",
    icon: <Layers className="w-6 h-6" />,
    title: "High-End Webdesign",
    shortDescription: "Keine Templates. Design, das deine Konkurrenz alt aussehen lässt.",
    details: "Stell dir deine Website wie dein digitales Ladengeschäft vor. High-End Webdesign bedeutet: Wir räumen auf, machen das Licht an und sorgen dafür, dass sich dein Kunde sofort wohlfühlt."
  },
  {
    id: "02",
    icon: <BarChart className="w-6 h-6" />,
    title: "Conversion Optimierung",
    shortDescription: "Besucher zu Kunden machen. Wir strukturieren Inhalte strategisch.",
    details: "Conversion Optimierung ist 'Verkaufspsychologie'. Wir platzieren Buttons und Texte so, dass der Besucher intuitiv weiß, was er tun soll."
  },
  {
    id: "03",
    icon: <Code className="w-6 h-6" />,
    title: "Individuelle Entwicklung",
    shortDescription: "Blitzschnell, sicher und perfekt für Google optimiert.",
    details: "Performance ist King. Baukästen sind oft langsam. Wir programmieren individuell für maximale Geschwindigkeit und Sichtbarkeit."
  },
  {
    id: "04",
    icon: <Box className="w-6 h-6" />,
    title: "Branding & Strategie",
    shortDescription: "Wer bist du? Wir schärfen deine Positionierung.",
    details: "Branding ist das Bauchgefühl. Wir sorgen dafür, dass Kunden dich wollen, nicht weil du der Billigste bist, sondern der Beste."
  },
  {
    id: "05",
    icon: <PenTool className="w-6 h-6" />,
    title: "Content & Copywriting",
    shortDescription: "Texte, die verkaufen. Wir finden die richtigen Worte.",
    details: "Design zieht an, Text verkauft. Wir schreiben klar und verständlich, ohne Fachchinesisch."
  }
];

export const Services = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-8xl leading-none text-white">
            <span className="font-sans font-black block">Nicht nur hübsch.</span>
            <span className="serif-txt text-orange-500 block ml-8 md:ml-32">Strategisch.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleAccordion(service.id)}
              className={`
                group rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border border-white/5
                ${activeId === service.id ? 'bg-white/[0.08] border-orange-500/50' : 'bg-[#111] hover:bg-white/[0.05]'}
              `}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                
                {/* ID & Icon */}
                <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-6">
                    <span className="font-mono text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">{service.id}</span>
                    <div className={`p-3 rounded-2xl transition-colors ${activeId === service.id ? 'bg-orange-500 text-white' : 'bg-white/5 text-white/50 group-hover:text-white'}`}>
                        {service.icon}
                    </div>
                    {/* Mobile Arrow */}
                    <div className="md:hidden">
                        <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${activeId === service.id ? 'rotate-180 text-orange-500' : ''}`} />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                    <h3 className="text-2xl md:text-4xl font-serif italic text-white mb-2 group-hover:text-orange-500 transition-colors">
                        {service.title}
                    </h3>
                    <p className="text-white/60 font-light text-sm md:text-base pr-8">
                        {service.shortDescription}
                    </p>
                </div>

                {/* Desktop Arrow */}
                <div className="hidden md:block pr-4">
                    <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${activeId === service.id ? 'bg-white text-black rotate-90' : 'text-white/30 group-hover:border-white/50'}`}>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeId === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 pt-0 md:pl-[8rem]">
                        <div className="bg-black/40 rounded-xl p-6 border border-white/5 text-white/80 leading-relaxed font-light">
                            <div className="flex items-center gap-2 mb-3 text-orange-500 font-bold text-sm uppercase tracking-wide">
                                <Sparkles className="w-4 h-4" /> Deep Dive
                            </div>
                            {service.details}
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};