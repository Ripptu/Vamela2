import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Sparkles, Send } from 'lucide-react';

interface ContactFormProps {
  onWarpStart: () => void;
}

const questions = [
  {
    id: 'name',
    question: "Wie darf ich dich nennen?",
    placeholder: "Vorname Nachname",
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

  // Auto-focus input on step change
  useEffect(() => {
    if (questions[step].type === 'text' && inputRef.current) {
        // Small delay to allow animation to settle
        setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [step]);

  const handleNext = (val: string) => {
    // Save answer
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
    // Tactile delay: let the user see the selection glow before moving on
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

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 2000);
  };

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="w-full max-w-2xl mx-auto min-h-[400px] flex items-center justify-center">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center relative"
        >
            <div className="relative inline-block mb-8">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </motion.div>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-green-500 -z-10"
                />
            </div>
            
            <h3 className="text-4xl font-serif text-white mb-4">Perfekt!</h3>
            <p className="text-white/60 text-lg">WhatsApp öffnet sich gleich...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto relative group perspective-1000">
      
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative border border-white/10 rounded-2xl p-8 md:p-14 bg-[#0a0a0a] shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Progress Bar - Satisfyingly smooth */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
           <motion.div 
             className="h-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             transition={{ duration: 0.5, ease: "circOut" }}
           />
        </div>

        {/* Header / Counter */}
        <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/40 font-mono text-xs border border-white/5">
                    0{step + 1}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-white/20">
                    / 0{questions.length}
                </span>
            </div>
            {step > 0 && (
                <button 
                    onClick={() => setStep(step - 1)} 
                    className="text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors"
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="mb-10">
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-3 leading-tight">
                {currentQ.question}
                </h3>
                {currentQ.subtext && (
                    <p className="text-white/40 font-light">{currentQ.subtext}</p>
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
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl md:text-4xl text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/10 font-light"
                />
                
                <div className="mt-8 flex justify-end">
                    <motion.button
                        disabled={!currentInput.trim()}
                        onClick={() => currentInput.trim() && handleNext(currentInput)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={{ 
                            opacity: currentInput.trim() ? 1 : 0.5,
                            y: currentInput.trim() ? 0 : 10
                        }}
                        className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/20"
                    >
                        Weiter <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
              </div>
            )}

            {/* --- OPTIONS GRID --- */}
            {currentQ.type === 'options' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentQ.options?.map((option: any, idx) => {
                    const isSelected = selectionWait === option.label;
                    return (
                        <motion.button
                            key={option.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleOptionSelect(option.label)}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                relative p-6 border rounded-xl text-left transition-all duration-300 flex flex-col gap-3 group overflow-hidden
                                ${isSelected 
                                    ? 'border-orange-500 bg-orange-500/10' 
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                                }
                            `}
                        >
                            <span className="text-2xl">{option.icon}</span>
                            <span className={`text-sm md:text-base font-medium transition-colors ${isSelected ? 'text-orange-500' : 'text-white/80 group-hover:text-white'}`}>
                                {option.label}
                            </span>
                            
                            {/* Selection Glow Effect */}
                            {isSelected && (
                                <motion.div 
                                    layoutId="glow"
                                    className="absolute inset-0 bg-orange-500/5 shadow-[inset_0_0_20px_rgba(249,115,22,0.2)]" 
                                />
                            )}
                        </motion.button>
                    );
                })}
              </div>
            )}

            {/* --- SLIDER --- */}
            {currentQ.type === 'slider' && (
              <div className="w-full py-8">
                
                {/* Visual Value Display */}
                <div className="relative mb-12">
                   <div className="text-7xl md:text-9xl font-sans font-black text-white/5 tracking-tighter absolute -top-10 -left-4 select-none">
                     €
                   </div>
                   <div className="relative z-10 flex items-baseline gap-2">
                       <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                         {sliderValue < currentQ.max ? sliderValue : `${currentQ.max}+`}
                       </span>
                       <span className="text-2xl text-orange-500">€</span>
                   </div>
                </div>

                {/* Custom Range Slider Styling */}
                <div className="relative h-12 flex items-center">
                    {/* Track Background */}
                    <div className="absolute w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        {/* Fill */}
                        <motion.div 
                            className="h-full bg-orange-500"
                            style={{ 
                                width: `${((sliderValue - currentQ.min) / (currentQ.max - currentQ.min)) * 100}%` 
                            }}
                        />
                    </div>
                    
                    {/* Native Input (Hidden but functional) */}
                    <input 
                        type="range" 
                        min={currentQ.min} 
                        max={currentQ.max} 
                        step={currentQ.step} 
                        value={sliderValue}
                        onChange={(e) => setSliderValue(parseInt(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    />

                    {/* Custom Thumb handle follower */}
                    <motion.div 
                        className="absolute h-8 w-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-none z-10"
                        style={{ 
                            left: `calc(${((sliderValue - currentQ.min) / (currentQ.max - currentQ.min)) * 100}% - 16px)`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth follower
                    >
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    </motion.div>
                </div>
                
                <div className="flex justify-between text-xs font-mono text-white/30 mt-2 uppercase tracking-wider">
                   <span>Start: {currentQ.min} €</span>
                   <span>Open End</span>
                </div>

                <div className="mt-12 flex justify-end">
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => handleNext(sliderValue.toString())}
                     className="flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/20 hover:bg-orange-400 transition-colors"
                   >
                     <Send className="w-4 h-4" /> Anfrage Senden
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