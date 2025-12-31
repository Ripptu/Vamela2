import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  onWarpStart: () => void;
}

const questions = [
  {
    id: 'name',
    question: "Wie darf ich dich nennen?",
    placeholder: "Vorname Nachname",
    type: "text"
  },
  {
    id: 'type',
    question: "Worum geht es?",
    type: "options",
    // Expanded options list
    options: ["Firmenwebsite", "Landing Page", "Redesign", "Online Shop", "Blog / Portfolio", "Anderes"]
  },
  {
    id: 'budget',
    question: "Was ist dein Budgetrahmen?",
    type: "slider",
    min: 250,
    max: 5000,
    step: 50
  }
];

export const ContactForm: React.FC<ContactFormProps> = ({ onWarpStart }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState("");
  const [sliderValue, setSliderValue] = useState(1500); // Default middle-ish value
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = (val: string) => {
    const currentQ = questions[step];
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);
    setCurrentInput("");

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finishForm(newAnswers);
    }
  };

  const finishForm = (finalAnswers: Record<string, string>) => {
    setIsCompleted(true);
    onWarpStart(); // Optional effect

    const text = `Hi! Ich bin ${finalAnswers.name}.%0AThema: ${finalAnswers.type}.%0ABudget ca.: ${finalAnswers.budget}€.`;
    const waUrl = `https://wa.me/4917624200179?text=${text}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1500);
  };

  const currentQ = questions[step];

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center w-full">
        <CheckCircle2 className="w-16 h-16 text-orange-500 mb-6" />
        <h3 className="text-3xl font-serif text-white mb-2">Wird geöffnet...</h3>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border border-white/10 p-8 md:p-12 bg-[#0a0a0a]">
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-8 uppercase tracking-widest">
           <span>0{step + 1}</span>
           <div className="w-12 h-[1px] bg-white/20">
              <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
           </div>
           <span>0{questions.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[250px] flex flex-col justify-center"
          >
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-8">
              {currentQ.question}
            </h3>

            {currentQ.type === 'text' && (
              <div className="relative group w-full">
                <input
                  type="text"
                  autoFocus
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && currentInput.trim()) handleNext(currentInput);
                  }}
                  placeholder={currentQ.placeholder}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/20 rounded-none font-light"
                />
                <button
                  onClick={() => currentInput.trim() && handleNext(currentInput)}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 text-orange-500 hover:text-white transition-all ${currentInput.trim() ? 'opacity-100' : 'opacity-0'}`}
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}

            {currentQ.type === 'options' && (
              <div className="flex flex-wrap gap-3">
                {currentQ.options?.map((option, idx) => (
                  <button
                    key={option}
                    onClick={() => handleNext(option)}
                    className="px-6 py-3 border border-white/10 hover:border-orange-500 hover:text-orange-500 text-white/70 transition-colors text-sm md:text-base uppercase tracking-wider"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === 'slider' && (
              <div className="w-full">
                <div className="mb-8 flex items-end gap-2">
                   <span className="text-5xl font-sans font-bold text-orange-500">{sliderValue} €</span>
                   <span className="text-white/40 mb-2">{sliderValue === 5000 ? '+' : ''}</span>
                </div>
                
                <input 
                  type="range" 
                  min={currentQ.min} 
                  max={currentQ.max} 
                  step={currentQ.step} 
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400"
                />
                
                <div className="flex justify-between text-xs font-mono text-white/30 mt-4 uppercase tracking-wider">
                   <span>{currentQ.min} €</span>
                   <span>5000 € +</span>
                </div>

                <div className="mt-10 flex justify-end">
                   <button 
                     onClick={() => handleNext(sliderValue.toString())}
                     className="bld-btn text-base"
                   >
                     Weiter <ArrowRight className="w-4 h-4 ml-2" />
                   </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};