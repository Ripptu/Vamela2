import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowRight } from "lucide-react";

const services = [
  {
    id: "webdesign",
    title: "Webdesign",
    description: "Der Maßanzug für dein Business.",
    analogy: "Stell dir vor, du gehst zum ersten Date in Jogginghose. Dein Charakter mag super sein, aber der erste Eindruck ist ruiniert. Deine Website ist genau das: Dein digitales Outfit.",
    why: "Kunden scannen in Millisekunden. Sieht die Seite altbacken aus, klicken sie weg. Sieht sie professionell aus, bleiben sie.",
    who: "Für alle, die keine Lust mehr haben, sich für ihre aktuelle Seite zu schämen, wenn sie Kunden den Link schicken.",
    benefit: "Du wirkst sofort wie ein Marktführer. Das schafft Vertrauen, noch bevor du das erste Wort gesagt hast."
  },
  {
    id: "psychologie",
    title: "Verkaufspsychologie",
    description: "Der unsichtbare Verkäufer.",
    analogy: "Eine schöne Website ohne Strategie ist wie ein Ferrari ohne Motor. Sieht gut aus, bringt dich aber nirgendwo hin. Wir bauen eine Straße, die den Kunden direkt zum Ziel führt.",
    why: "Besucher sind ungeduldig. Wenn sie nicht sofort wissen, was sie tun sollen (Anrufen? Kaufen?), tun sie gar nichts.",
    who: "Für Unternehmer, die Besucher auf der Seite haben, aber sich wundern, warum das Telefon trotzdem stillsteht.",
    benefit: "Aus Zuschauern werden Kunden. Deine Seite arbeitet für dich, auch wenn du gerade schläfst oder auf der Baustelle bist."
  },
  {
    id: "tech",
    title: "Development",
    description: "Der Motor unter der Haube.",
    analogy: "Baukästen sind wie Fertiggerichte: Geht schnell, schmeckt aber jedem gleich. Wir kochen frisch. Das bedeutet: Sauberer Code, keine unnötigen Plugins, pfeilschnelle Ladezeiten.",
    why: "Google hasst langsame Seiten. Kunden hassen sie noch mehr. Wenn es länger als 3 Sekunden lädt, sind 40% der Leute weg.",
    who: "Für jeden, der bei Google gefunden werden will und eine Seite braucht, die auch auf dem Handy perfekt funktioniert.",
    benefit: "Deine Seite lädt sofort. Google belohnt das mit besseren Plätzen. Und du hast ein System, das stabil läuft und sicher ist."
  },
  {
    id: "branding",
    title: "Branding",
    description: "Dein unverwechselbarer Charakter.",
    analogy: "Warum kaufen Leute Apple statt irgendein Handy? Wegen des Gefühls. Branding ist nicht nur ein Logo, sondern das Bauchgefühl, das Kunden haben, wenn sie an dich denken.",
    why: "In einer lauten Welt gewinnt der, der am klarsten kommuniziert. Wer alles für jeden sein will, ist am Ende nichts für niemanden.",
    who: "Für Firmen, die aus der grauen Masse herausstechen wollen und nicht verwechselbar sein möchten.",
    benefit: "Du ziehst genau die Kunden an, die zu dir passen. Preiskämpfe werden unwichtiger, weil Kunden DICH wollen, nicht nur den Billigsten."
  },
  {
    id: "copy",
    title: "Copywriting",
    description: "Texte, die verkaufen.",
    analogy: "Niemand liest gerne 'Herzlich Willkommen auf unserer Homepage'. Das ist wie 'Guten Tag' sagen und dann schweigen. Wir schreiben Texte, die den Kunden dort abholen, wo er steht.",
    why: "Schöne Bilder wecken Interesse, aber Worte verkaufen. Wenn der Text nicht sitzt, versteht der Kunde den Wert deines Angebots nicht.",
    who: "Für alle, die schwer erklären können, was sie eigentlich so besonders macht.",
    benefit: "Deine Kunden verstehen sofort: 'Aha, das ist genau das, was ich brauche!' Weniger Fragen, mehr Abschlüsse."
  }
];

export const Services = () => {
  const [openService, setOpenService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <section className="py-24 md:py-32 relative z-10 bg-[#050505] text-white overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-20">
        
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-6">
            <span className="font-sans font-black block text-white">Digitale</span>
            <span className="serif-txt text-orange-500 block italic">Maßarbeit.</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-xl font-light">
             Wir machen keine halben Sachen. Hier ist, was wir für dich tun und warum es dein Business verändert.
          </p>
        </div>

        {/* Minimalist List */}
        <div className="flex flex-col">
          {services.map((service, index) => {
            const isOpen = openService === service.id;
            
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border-t border-white/10 group ${index === services.length - 1 ? 'border-b' : ''}`}
              >
                <button 
                  onClick={() => toggleService(service.id)}
                  className="w-full py-8 md:py-10 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-baseline gap-6 md:gap-12">
                     <span className="font-mono text-xs md:text-sm text-white/30 w-8">0{index + 1}</span>
                     <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                        <span className={`text-3xl md:text-5xl font-sans font-black tracking-tight transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-white group-hover:text-white/80'}`}>
                           {service.title}
                        </span>
                        <span className="hidden md:block text-white/40 font-serif italic text-xl">
                           — {service.description}
                        </span>
                     </div>
                  </div>
                  
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-orange-500 border-orange-500 rotate-90 text-white' : 'group-hover:bg-white group-hover:text-black text-white'}`}>
                     {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                {/* Mobile Description */}
                <div className="md:hidden -mt-4 mb-4 pl-14 text-white/40 font-serif italic text-sm">
                   {service.description}
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key={`content-${service.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-0 md:pl-24 pb-12 pr-4">
                        <div className="bg-[#111] rounded-2xl p-6 md:p-10 border border-white/5 relative overflow-hidden">
                           
                           {/* Highlight Bar */}
                           <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                           
                           {/* Main Analogy */}
                           <div className="mb-8">
                              <p className="text-xl md:text-2xl text-white font-serif italic leading-relaxed">
                                 "{service.analogy}"
                              </p>
                           </div>

                           {/* Grid Details */}
                           <div className="grid md:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-white/10">
                              
                              <div>
                                 <h4 className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Wieso brauchst du das?
                                 </h4>
                                 <p className="text-white/70 text-sm leading-relaxed">
                                    {service.why}
                                 </p>
                              </div>

                              <div>
                                 <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2 opacity-60">
                                    <span className="w-1 h-1 bg-white rounded-full"></span>
                                    Für wen?
                                 </h4>
                                 <p className="text-white/70 text-sm leading-relaxed">
                                    {service.who}
                                 </p>
                              </div>

                              <div>
                                 <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2 opacity-60">
                                    <span className="w-1 h-1 bg-white rounded-full"></span>
                                    Was bringt's?
                                 </h4>
                                 <p className="text-white text-sm leading-relaxed font-bold">
                                    {service.benefit}
                                 </p>
                              </div>

                           </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};