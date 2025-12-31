import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

const services = [
  {
    id: "01",
    title: "High-End Webdesign",
    shortDescription: "Keine Templates von der Stange. Ich designe eine Website, die exakt zu deiner Marke passt und deine Konkurrenz alt aussehen lässt.",
    details: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Was ist das eigentlich?
          </h4>
          <p>
            Stell dir deine Website wie dein digitales Ladengeschäft oder Büro vor. Wenn ein Kunde reinkommt und es ist dunkel, unaufgeräumt oder sieht aus wie 1995, dreht er sich auf dem Absatz um. High-End Webdesign bedeutet: Wir räumen auf, machen das Licht an und sorgen dafür, dass sich dein Kunde sofort wohlfühlt und denkt: "Wow, hier bin ich richtig."
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Warum du es brauchst</h4>
          <p>
            Du hast genau 0,05 Sekunden Zeit, um einen ersten Eindruck zu hinterlassen. Kein Scherz. Wenn dein Design nicht sitzt, verlierst du Kunden, bevor sie überhaupt gelesen haben, was du anbietest.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Was es dir bringt</h4>
          <p>
            Vertrauen. Und zwar sofort. Du kannst höhere Preise abrufen, weil du premium aussiehst. Deine Konkurrenz wirkt plötzlich blass gegen dich.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "02",
    title: "Conversion Optimierung",
    shortDescription: "Schöne Bilder reichen nicht. Wir strukturieren deine Inhalte so, dass Besucher geführt werden – vom ersten Klick bis zur Anfrage.",
    details: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Was ist das eigentlich?
          </h4>
          <p>
            Conversion Optimierung (oder CRO) ist im Grunde "Verkaufspsychologie". Wir stellen sicher, dass deine Website nicht nur hübsch aussieht, sondern wie ein guter Verkäufer funktioniert. Wir platzieren Buttons, Texte und Elemente so, dass der Besucher intuitiv weiß, was er als Nächstes tun soll.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Warum du es brauchst</h4>
          <p>
            Viele Besucher auf der Seite zu haben ist toll. Aber wenn von 100 Besuchern niemand anruft, bringt dir das nichts. Das ist wie Wasser in einen Eimer mit Löchern schütten.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Was es dir bringt</h4>
          <p>
            Mehr Anfragen bei gleicher Besucherzahl. Du musst also nicht mehr Geld für Werbung ausgeben, sondern wir holen einfach mehr aus den Leuten raus, die eh schon da sind. Effizienz pur.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "03",
    title: "Individuelle Entwicklung",
    shortDescription: "Performance ist King. Deine Seite lädt blitzschnell, ist sicher und perfekt für Google optimiert. Sauberer Code ohne Baukasten-Ballast.",
    details: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Was ist das eigentlich?
          </h4>
          <p>
            Das ist der Motor unter der Haube. Baukästen sind oft wie Autos mit angezogener Handbremse – viel unnötiger Ballast. Wir programmieren individuell. Das heißt: Nur der Code, den wir wirklich brauchen.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Warum du es brauchst</h4>
          <p>
            Niemand wartet gerne. Wenn deine Seite länger als 3 Sekunden lädt, sind 40% der Leute weg. Außerdem liebt Google schnelle Seiten (Stichwort: Core Web Vitals). Schlechte Technik = Schlechtes Ranking.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Was es dir bringt</h4>
          <p>
            Blitzschnelle Ladezeiten (auch am Handy auf dem Land), top Sicherheit gegen Hacker und eine Seite, die bei Google bessere Chancen hat, ganz oben zu landen.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "04",
    title: "Branding & Strategie",
    shortDescription: "Wer bist du und warum sollte man bei dir kaufen? Wir schärfen deine Positionierung und übersetzen deine Werte in eine visuelle Sprache.",
    details: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Was ist das eigentlich?
          </h4>
          <p>
            Branding ist mehr als nur ein Logo. Es ist das "Bauchgefühl", das Leute haben, wenn sie an dein Unternehmen denken. Strategie bedeutet, dass wir uns überlegen: Wen willst du eigentlich ansprechen? Und wie müssen wir auftreten, damit genau diese Leute dich toll finden?
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Warum du es brauchst</h4>
          <p>
            Wenn du versuchst, es jedem recht zu machen, erreichst du niemanden. Ohne klares Profil bist du nur einer von vielen und wirst über den Preis vergleichbar. Das willst du nicht.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Was es dir bringt</h4>
          <p>
            Du wirst unverwechselbar. Kunden kommen zu dir, weil sie *dich* wollen, nicht weil du der Billigste bist. Du ziehst genau die Art von Aufträgen an, die dir Spaß machen.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "05",
    title: "Content & Copywriting",
    shortDescription: "Texte, die nicht langweilen, sondern verkaufen. Wir finden die richtigen Worte, um deine Zielgruppe emotional abzuholen.",
    details: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Was ist das eigentlich?
          </h4>
          <p>
            Copywriting ist "Schreiben mit Ziel". Keine lyrischen Ergüsse oder Fachchinesisch, das keiner versteht. Sondern klare, verständliche Worte, die dem Leser zeigen: "Hey, ich verstehe dein Problem und hier ist die Lösung."
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Warum du es brauchst</h4>
          <p>
            Design zieht die Aufmerksamkeit auf sich, aber der Text schließt den Verkauf ab. Wenn deine Texte schwammig sind ("Wir sind ein innovatives Team..."), klickt der Kunde weg.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Was es dir bringt</h4>
          <p>
            Besucher lesen deine Seite wirklich, fühlen sich verstanden und klicken am Ende auf "Kontaktieren". Gute Texte machen aus Interessenten Kunden.
          </p>
        </div>
      </div>
    )
  }
];

export const Services = () => {
  const [activeId, setActiveId] = useState<string | null>("01");
  const [detailsVisible, setDetailsVisible] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent main accordion toggle
    setDetailsVisible(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAccordion = (id: string) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      // Optional: Reset details when switching main tabs? 
      // Let's keep them closed by default when switching
      setDetailsVisible({}); 
    }
  };

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl leading-none">
            <span className="font-sans font-bold block">Nicht nur hübsch.</span>
            <span className="serif-txt text-orange-500 block ml-8 md:ml-20">Strategisch.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-white/10">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group border-b border-white/10 transition-colors hover:border-white/30"
            >
              <button 
                onClick={() => toggleAccordion(service.id)}
                className="w-full flex items-start md:items-center justify-between py-8 md:py-12 text-left outline-none"
              >
                <div className="flex items-baseline gap-6 md:gap-16">
                   <span className="font-mono text-sm md:text-lg text-white/40">{service.id}</span>
                   <h3 className={`text-2xl md:text-5xl font-serif transition-colors duration-300 ${activeId === service.id ? 'text-orange-500' : 'text-white group-hover:text-white/80'}`}>
                     {service.title}
                   </h3>
                </div>
                
                {/* Mobile/Desktop Arrow Interaction */}
                <div className={`transform transition-transform duration-300 ${activeId === service.id ? 'rotate-90 text-orange-500' : 'rotate-0 text-white/40'}`}>
                   <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                </div>
              </button>

              <AnimatePresence>
                {activeId === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 md:pl-[6.5rem] pb-10 pr-4 md:pr-0 max-w-2xl">
                       {/* Short Description */}
                       <p className="text-lg text-white/60 font-light leading-relaxed mb-6">
                         {service.shortDescription}
                       </p>
                       
                       {/* Interactive Read More Trigger */}
                       <div className="flex flex-col items-start">
                         <button 
                            onClick={(e) => toggleDetails(service.id, e)}
                            className="text-orange-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:text-white transition-colors py-2"
                         >
                           {detailsVisible[service.id] ? "Weniger anzeigen" : "Mehr dazu"} 
                           <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${detailsVisible[service.id] ? 'rotate-180' : ''}`} />
                         </button>

                         {/* Detailed Content Expand */}
                         <AnimatePresence>
                            {detailsVisible[service.id] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 md:p-8 bg-white/[0.03] rounded-xl border border-white/5 text-white/80 font-light leading-relaxed text-base">
                                        {service.details}
                                    </div>
                                </motion.div>
                            )}
                         </AnimatePresence>
                       </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};