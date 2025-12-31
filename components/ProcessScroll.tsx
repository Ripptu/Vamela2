import React, { useState, useEffect, useRef } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { CheckCheck, ChevronLeft, Phone, Video } from "lucide-react";
import { motion } from "motion/react";

// Chat Data with timing
const chatHistory = [
  {
    role: "client",
    text: "Moin Christian! 👋 Bin über eine Empfehlung hier. Ich brauche dringend eine neue Seite für meinen Handwerksbetrieb. Die alte ist... naja, peinlich.",
    time: "10:23",
    delay: 500
  },
  {
    role: "me",
    text: "Moin! Das höre ich oft, keine Sorge. 😄 Was ist das Ziel? Einfach nur 'hübsch' oder sollen sich mehr Kunden melden?",
    time: "10:25",
    delay: 2000
  },
  {
    role: "client",
    text: "Beides. Aber ehrlich: Ich hab absolut keine Zeit für lange Meetings oder Zoom-Calls. Bin den ganzen Tag auf der Baustelle.",
    time: "10:28",
    delay: 2500
  },
  {
    role: "client",
    text: "Ich brauche jemanden, der das Thema einfach für mich erledigt, ohne dass ich ständig Händchen halten muss. 😅",
    time: "10:28",
    delay: 2000
  },
  {
    role: "me",
    text: "Verstanden. Genau so arbeiten wir. 🛠️ Wir machen das asynchron. Ich baue einen Entwurf, schicke dir ein Video dazu.",
    time: "10:30",
    delay: 2000
  },
  {
    role: "me",
    text: "Du schaust es dir an, wenn du abends auf der Couch sitzt. Feedback einfach per WhatsApp. Kein Terminstress.",
    time: "10:30",
    delay: 2500
  },
  {
    role: "client",
    text: "Das klingt wie ein Traum. Wenn das echt so klappt, bin ich dabei. Wo unterschreibe ich?",
    time: "10:32",
    delay: 2000
  },
  {
    role: "system",
    text: "1 Woche später",
    delay: 1000
  },
  {
    role: "me",
    text: "So, der erste Entwurf steht! 🚀 Hab mich auf Vertrauen und klare Kontaktmöglichkeiten konzentriert. Link ist oben.",
    time: "09:15",
    delay: 2500
  },
  {
    role: "client",
    text: "Wow... Christian, das sieht mega aus. Endlich modern! 😍 Eine Sache: Können wir meine Nummer ganz oben noch größer machen?",
    time: "12:42",
    delay: 3000
  },
  {
    role: "me",
    text: "Erledigt. Aktualisier mal. ⚡",
    time: "12:45",
    delay: 1500
  },
  {
    role: "client",
    text: "Perfekt. Nichts mehr zu meckern. Kann direkt so live gehen. Danke für den entspannten Ablauf!",
    time: "12:50",
    delay: 2000
  }
];

const ChatInterface = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Message Timer Logic
  useEffect(() => {
    if (!hasStarted) return;

    if (visibleMessages < chatHistory.length) {
      const timeout = setTimeout(() => {
        setVisibleMessages((prev) => prev + 1);
      }, chatHistory[visibleMessages].delay);

      return () => clearTimeout(timeout);
    }
  }, [visibleMessages, hasStarted]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleMessages]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col bg-[#0b141a] font-sans">
      
      {/* PHONE HEADER (Simulating WhatsApp/Messenger) */}
      <div className="bg-[#202c33] px-4 pt-10 pb-3 flex items-center justify-between border-b border-white/5 shadow-md z-10 shrink-0">
         <div className="flex items-center gap-3">
             <ChevronLeft className="w-6 h-6 text-[#007aff]" />
             
             {/* Avatar / Logo Container */}
             <div className="relative">
                <img 
                  src="https://i.postimg.cc/tJjgBcYZ/Logo-weiss.png" 
                  alt="Vamela Logo" 
                  className="h-10 w-10 object-contain rounded-full bg-black/20 p-1"
                />
             </div>

             <div className="flex flex-col">
                <span className="text-gray-100 font-bold text-base leading-tight">Christian</span>
                <span className="text-orange-500 text-[11px] animate-pulse">Online</span>
             </div>
         </div>
         
         <div className="flex items-center gap-4 text-[#007aff]">
             <Video className="w-6 h-6 opacity-40" />
             <Phone className="w-5 h-5 opacity-40" />
         </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar"
        style={{
            backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            backgroundRepeat: "repeat",
            opacity: 0.95
        }}
      >
        {chatHistory.slice(0, visibleMessages).map((msg, index) => {
          if (msg.role === "system") {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center my-2"
              >
                <span className="bg-[#1f2c34] text-[#8696a0] text-[10px] px-2 py-1 rounded-md uppercase tracking-wide font-medium shadow-sm">
                  {msg.text}
                </span>
              </motion.div>
            );
          }

          const isMe = msg.role === "me";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isMe ? 20 : -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`
                  max-w-[85%] p-2 px-3 shadow-sm relative text-[15px] leading-snug
                  ${isMe 
                    ? "bg-[#005c4b] rounded-2xl rounded-tr-none text-[#e9edef]" 
                    : "bg-[#202c33] rounded-2xl rounded-tl-none text-[#e9edef]"
                  }
                `}
              >
                <p>{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[9px] text-white/60">{msg.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Spacer */}
        <div className="h-4"></div>
      </div>

      {/* Input Area (Mock) */}
      <div className="bg-[#202c33] px-2 py-2 pb-6 flex items-center gap-2 shrink-0 border-t border-white/5">
        <div className="text-[#007aff] p-2">
            <PlusIcon />
        </div>
        <div className="flex-1 bg-[#2a3942] rounded-full h-9 px-4 flex items-center text-gray-400 text-sm">
            Nachricht...
        </div>
        <div className="w-9 h-9 bg-[#005c4b] rounded-full flex items-center justify-center text-white">
            <MicIcon />
        </div>
      </div>
    </div>
  );
};

// Simple Icons
const PlusIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>;
const MicIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;

export const ProcessScroll = () => {
  const TitleComponent = (
    <>
      <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">
        Wie wir <br />
        <span className="relative inline-block mt-2 font-bold">
            <span className="relative z-10">zusammenarbeiten</span>
            {/* Orange Stroke */}
            <svg 
              className="absolute -bottom-2 left-0 w-full h-[0.3em] text-orange-500 -z-10" 
              viewBox="0 0 100 15" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,10 C30,12 70,8 100,10" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="6" 
                strokeLinecap="round"
                className="opacity-90"
              />
            </svg>
        </span>
      </h1>
    </>
  );

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Removed bg-[#0a0a0a] for transparency */}
      <ContainerScroll titleComponent={TitleComponent} children={<ChatInterface />} />
    </div>
  );
};