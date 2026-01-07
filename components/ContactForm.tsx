import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Send } from 'lucide-react';

interface ContactFormProps {
  onWarpStart: () => void;
}

const questions = [
  {
    id: 'name',
    question: "Wie darf ich dich nennen?",
    placeholder: "Dein Name",
    type: "text",
    subtext: "Damit ich weiß, mit wem ich schreibe."
  },
  {
    id: 'type',
    question: "Worum geht es bei dir?",
    type: "options",
    subtext: "Wähle das, was am besten passt.",
    options: [
      { label: "Firmenwebsite", icon: "🏢" },
      { label: "Landing Page", icon: "🚀" },
      { label: "Redesign", icon: "✨" },
      { label: "Online Shop", icon: "🛍️" },
      { label: "Blog / Portfolio", icon: "✍️" },
      { label: "Anderes", icon: "💡" }
    ]
  },
  {
    id: 'budget',
    question: "Dein ungefähres Budget?",
    type: "slider",
    subtext: "Keine Sorge, das dient nur zur Orientierung.",
    min: 500,
    max: 10000,
    step: 500
  }
];

export const ContactForm: React.FC<ContactFormProps> = ({ onWarpStart }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState("");
  const [sliderValue, setSliderValue] = useState(2500);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectionWait, setSelectionWait] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (questions[step].type === 'text' && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [step]);

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

  const handleOptionSelect = (val: string) => {
    setSelectionWait(val);
    setTimeout(() => {
        handleNext(val);
        setSelectionWait(null);
    }, 400); 
  };

  const finishForm = (finalAnswers: Record<string, string>) => {
    setIsCompleted(true);
    onWarpStart();
    const text = `Hi Christian! 👋%0A%0AIch bin *${finalAnswers.name}*.%0AIch interessiere mich für: *${finalAnswers.type}*.%0AMein Budgetrahmen liegt bei ca. *${finalAnswers.budget}€*.%0A%0ALass uns gerne sprechen!`;
    const waUrl = `https://wa.me/4917624200179?text=${text}`;
    setTimeout(() => window.open(waUrl, '_blank'), 2000);
  };

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="w-full max-w-2xl mx-auto min-h-[400px] flex items-center justify-center">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center relative bg-[#111] border border-white/10 rounded-[40px] p-12"
        >
            <div className="relative inline-block mb-8">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.6)]"
                >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </motion.div>
            </div>
            <h3 className="text-4xl font-serif italic text-white mb-4">Perfekt!</h3>
            <p className="text-white/60 text-lg">WhatsApp öffnet sich gleich...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto relative group perspective-1000">
      
      {/* Container */}
      <div className="relative bg-[#111] rounded-[40px] p-8 md:p-14 overflow-hidden min-h-[500px] flex flex-col border border-white/10 shadow-2xl">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
           <motion.div 
             className="h-full bg-orange-500"
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             transition={{ duration: 0.5, ease: "circOut" }}
           />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/60 font-mono text-sm border border-white/10">
                    0{step + 1}
                </span>
            </div>
            {step > 0 && (
                <button 
                    onClick={() => setStep(step - 1)} 
                    className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                >
                    Zurück
                </button>
            )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="mb-10">
                <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-4 leading-tight">
                {currentQ.question}
                </h3>
                {currentQ.subtext && (
                    <p className="text-white/50 font-sans font-light">{currentQ.subtext}</p>
                )}
            </div>

            {/* --- TEXT INPUT --- */}
            {currentQ.type === 'text' && (
              <div className="relative w-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && currentInput.trim()) handleNext(currentInput);
                  }}
                  placeholder={currentQ.placeholder}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-3xl md:text-5xl text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/10 font-sans font-bold tracking-tight"
                />
                
                <div className="mt-12 flex justify-end">
                    <motion.button
                        disabled={!currentInput.trim()}
                        onClick={() => currentInput.trim() && handleNext(currentInput)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Weiter
                    </motion.button>
                </div>
              </div>
            )}

            {/* --- OPTIONS GRID --- */}
            {currentQ.type === 'options' && (
              <div className="grid grid-cols-2 gap-4">
                {currentQ.options?.map((option: any, idx) => {
                    const isSelected = selectionWait === option.label;
                    return (
                        <motion.button
                            key={option.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleOptionSelect(option.label)}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                relative p-5 md:p-6 rounded-2xl text-left transition-all duration-300 flex flex-col gap-2
                                ${isSelected 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-white/80'
                                }
                            `}
                        >
                            <span className="text-2xl mb-1">{option.icon}</span>
                            <span className="text-sm md:text-lg font-bold font-sans">
                                {option.label}
                            </span>
                        </motion.button>
                    );
                })}
              </div>
            )}

            {/* --- SLIDER --- */}
            {currentQ.type === 'slider' && (
              <div className="w-full py-8">
                
                <div className="relative mb-16 text-center">
                   <div className="text-6xl md:text-8xl font-sans font-black text-white tracking-tighter">
                     {sliderValue < currentQ.max ? sliderValue : `${currentQ.max}+`} <span className="text-orange-500">€</span>
                   </div>
                </div>

                <div className="relative h-4 bg-white/10 rounded-full w-full">
                    <motion.div 
                        className="absolute h-full bg-orange-500 rounded-full"
                        style={{ 
                            width: `${((sliderValue - currentQ.min) / (currentQ.max - currentQ.min)) * 100}%` 
                        }}
                    />
                    <input 
                        type="range" 
                        min={currentQ.min} 
                        max={currentQ.max} 
                        step={currentQ.step} 
                        value={sliderValue}
                        onChange={(e) => setSliderValue(parseInt(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-none z-10"
                        style={{ 
                            left: `calc(${((sliderValue - currentQ.min) / (currentQ.max - currentQ.min)) * 100}% - 20px)`
                        }}
                    >
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    </motion.div>
                </div>

                <div className="mt-12 flex justify-center">
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => handleNext(sliderValue.toString())}
                     className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-3"
                   >
                     Anfrage Senden <Send className="w-5 h-5" />
                   </motion.button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};