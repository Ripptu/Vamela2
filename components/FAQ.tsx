import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border-b border-white/10 overflow-hidden ${isOpen ? 'bg-white/[0.02]' : 'bg-transparent'}`}
    >
      <button
        onClick={onClick}
        className="w-full py-8 px-4 md:px-8 flex items-center justify-between text-left group transition-colors hover:bg-white/[0.02]"
      >
        <span className="text-xl md:text-2xl font-sans font-bold text-white group-hover:text-orange-500 transition-colors pr-8">
          {question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-orange-500 border-orange-500 rotate-180' : 'group-hover:border-white'}`}>
          {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 md:px-8 pb-8 text-muted text-lg leading-relaxed font-light max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      question: "Was kostet eine professionelle Website für Handwerker & Dienstleister?",
      answer: (
        <>
          <p className="mb-4">
            Die Frage aller Fragen. Es gibt keine Pauschalantwort, aber eine Faustregel: Eine gute Website ist eine <strong>Investition</strong>, keine Ausgabe. Sie bringt Geld, statt es nur zu kosten.
          </p>
          <p>
            Bei Vamela arbeiten wir meist mit Festpreisen statt Stundenabrechnung, damit du Planungssicherheit hast. Egal ob für Gärtner, Elektriker oder eine Praxis – wir schnüren ein Paket, das zu deinem Budget passt, ohne an der Qualität zu sparen. Keine versteckten monatlichen Kosten für das Design, nur die üblichen Gebühren für Hosting & Domain.
          </p>
        </>
      )
    },
    {
      question: "Baukasten vs. Profi-Website – Lohnt sich das Investment wirklich?",
      answer: (
        <>
          <p className="mb-4">
            Ein Baukasten (Wix, Jimdo etc.) wirkt auf den ersten Blick günstig. Das Problem: Du investierst hunderte Stunden deiner eigenen Zeit, und am Ende sieht es oft trotzdem nach "Vorlage" aus.
          </p>
          <p>
            Eine professionelle Website unterscheidet dich von der Masse. Sie ist technisch optimiert, lädt extrem schnell (wichtig für Google!) und baut psychologisch Vertrauen auf. Kunden spüren den Unterschied zwischen "selbstgebastelt" und "vom Experten". Für einen Handwerksbetrieb ist die Website oft der erste Eindruck – und für den gibt es keine zweite Chance.
          </p>
        </>
      )
    },
    {
      question: "Wie lange dauert es und wie viel Zeit muss ich investieren?",
      answer: (
        <>
          <p className="mb-4">
            Als Unternehmer hast du keine Zeit für lange Meetings. Deshalb läuft bei uns alles effizient. In der Regel steht deine neue Seite in <strong>2 bis 4 Wochen</strong>.
          </p>
          <p>
            Dein Aufwand ist minimal. Wir führen ein kurzes Strategie-Gespräch (oder Chat), du lieferst uns grobe Infos und Bilder (wenn vorhanden), und wir übernehmen den Rest – von Texten bis zur Technik. Wir bauen schlüsselfertig.
          </p>
        </>
      )
    },
    {
      question: "Werde ich damit wirklich bei Google gefunden?",
      answer: (
        <>
          <p className="mb-4">
            Ja. Wir bauen keine leeren Hüllen, sondern SEO-optimierte Strukturen. Wir recherchieren, was deine Kunden suchen (z.B. "Maler in München" oder "Zahnarzt Köln") und richten die Seite darauf aus.
          </p>
          <p>
            Sauberer Code, schnelle Ladezeiten und mobile Optimierung sind heute die wichtigsten Ranking-Faktoren. Das bekommst du bei uns standardmäßig, nicht als teures Extra.
          </p>
        </>
      )
    },
    {
      question: "Kann ich Inhalte später selbst ändern?",
      answer: (
        <>
          <p>
            Absolut. Wir wollen keine Abhängigkeit schaffen. Du bekommst ein System, in dem du Texte oder Bilder einfach selbst tauschen kannst, wenn du das möchtest. Falls du dich lieber auf dein Kerngeschäft konzentrieren willst, bieten wir aber auch Support-Pakete an und erledigen das für dich auf Zuruf.
          </p>
        </>
      )
    },
    {
      question: "Warum reicht meine Facebook- oder Instagram-Seite nicht aus?",
      answer: (
        <>
          <p className="mb-4">
            Social Media ist wichtig, aber es gehört dir nicht. Der Algorithmus entscheidet, wer dich sieht. Eine Website ist dein <strong>digitales Eigentum</strong>.
          </p>
          <p>
            Außerdem suchen Menschen bei konkretem Bedarf (z.B. "Rohrbruch Hilfe" oder "Steuerberater finden") bei Google, nicht auf Instagram. Eine Website wirkt seriöser, bietet alle Infos strukturiert auf einen Blick und konvertiert Besucher viel besser in zahlende Kunden als ein Social Media Profil.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative z-10 border-t border-white/5">
      {/* Removed bg-[#0a0a0a] for transparency */}
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">
            Klartext
          </p>
          <h2 className="text-4xl md:text-6xl text-white mb-6">
            <span className="font-sans font-black tracking-tighter">Häufige Fragen</span> <br/>
            <span className="font-serif font-light italic text-white/60">und ehrliche Antworten.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Kein Fachchinesisch. Hier ist alles, was du über moderne Websites für Handwerk, Dienstleistung & Praxis wissen musst.
          </p>
        </div>

        <div className="flex flex-col">
          {questions.map((q, i) => (
            <FAQItem 
              key={i} 
              index={i}
              question={q.question} 
              answer={q.answer} 
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};