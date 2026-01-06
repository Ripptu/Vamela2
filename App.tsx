import React, { useEffect, useRef, useState } from 'react';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ProcessScroll } from './components/ProcessScroll';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { Impressum, Datenschutz, AGB } from './components/LegalPages';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Sparkles } from 'lucide-react';

// Liquid Background Component
const LiquidBackground = () => (
  <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none bg-[#050505]">
    {/* Ambient Light Orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
    <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-orange-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
    <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />
    
    {/* Noise Texture Overlay for Glass realism */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
  </div>
);

// Scroll Reveal Component with 3D feel
const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform perspective-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0 rotate-x-0 scale-100' 
          : 'opacity-0 translate-y-12 rotate-x-6 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Mobile Floating Action Bar (Glassmorphism)
const MobileFloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-0 w-full px-4 z-50 md:hidden pointer-events-none"
        >
          <div className="pointer-events-auto glass-panel rounded-full p-2 pl-6 flex items-center justify-between shadow-2xl ring-1 ring-white/10">
             <span className="text-white font-medium text-sm flex items-center gap-2">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
               Projekt starten?
             </span>
             <button 
               onClick={() => window.open('https://wa.me/4917624200179', '_blank')}
               className="bg-white text-black rounded-full px-5 py-2.5 font-bold text-sm flex items-center gap-2 active:scale-95 transition-transform"
             >
               <MessageCircle className="w-4 h-4" />
               WhatsApp
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isWarping, setIsWarping] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const scrollReset = () => window.scrollTo(0, 0);
    scrollReset();
    requestAnimationFrame(scrollReset);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowFloatingBar(scrollY > window.innerHeight * 0.8);
    };

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0); 
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    switch (currentHash) {
      case '#impressum': return <Impressum />;
      case '#datenschutz': return <Datenschutz />;
      case '#agb': return <AGB />;
      default:
        return (
          <main className="relative z-10 w-full flex flex-col pb-20 md:pb-0">
            <Hero />

            <section className="py-24 md:py-32 px-4 md:px-6 relative">
              <div className="max-w-6xl mx-auto glass-panel rounded-[30px] p-8 md:p-16 relative overflow-hidden">
                <Reveal>
                  <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start relative z-10">
                     <div>
                        <span className="font-mono text-orange-500 text-xs uppercase tracking-[0.2em] mb-4 block">Die Realität</span>
                        <h2 className="text-3xl md:text-5xl leading-[1.1] font-sans font-black text-white mb-6">
                          Die meisten Websites kosten Geld, <span className="serif-txt text-white/50 block mt-2">aber bringen keins.</span>
                        </h2>
                     </div>
                     <div className="text-lg md:text-xl text-white/70 font-light leading-relaxed space-y-6">
                        <p>
                          Du kennst das Problem: Deine Seite sieht veraltet aus, lädt langsam oder – noch schlimmer – sie bringt dir keine Anfragen. Kunden klicken drauf und sind sofort wieder weg.
                        </p>
                        <p>
                          <strong>Wir ändern das.</strong> Wir bauen digitale Erlebnisse, die Vertrauen schaffen. Minimalistisches Design, das deine Professionalität unterstreicht, kombiniert mit einer technischen Basis, die Google liebt.
                        </p>
                     </div>
                  </div>
                </Reveal>
              </div>
            </section>

            <Services />
            <Portfolio />

            <section className="relative z-10">
                 <ProcessScroll />
            </section>
            
            <FAQ />
            <About />

            <section className="py-24 md:py-32 px-4 md:px-6 relative z-10">
              <div className="max-w-4xl mx-auto mb-16 text-center">
                 <Reveal>
                   <h2 className="text-5xl md:text-8xl mb-6 leading-[0.9]">
                     <span className="font-sans font-black block">Lass uns</span>
                     <span className="serif-txt text-orange-500 block">dein Business</span>
                     <span className="font-sans font-black block">pushen.</span>
                   </h2>
                   <p className="text-white/60 text-lg mt-8">
                     Keine Massenabfertigung. Schreib mir kurz, worum es geht.
                   </p>
                 </Reveal>
              </div>
              
              <Reveal delay={200}>
                <ContactForm onWarpStart={() => setIsWarping(true)} />
              </Reveal>
            </section>

          </main>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      <LiquidBackground />

      {/* Header / Navigation */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'backdrop-blur-md bg-black/50 py-4 border-b border-white/5' : ''} ${isScrolled && currentHash === '' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
         <div className="pointer-events-auto">
             {currentHash !== '' && currentHash !== '#' ? (
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>
                   <img src="https://i.postimg.cc/tJjgBcYZ/Logo-weiss.png" alt="Vamela" className="h-8 w-auto opacity-90" />
                </a>
             ) : (
                <img src="https://i.postimg.cc/tJjgBcYZ/Logo-weiss.png" alt="Vamela" className="h-8 w-auto opacity-90" />
             )}
         </div>
      </nav>

      {renderContent()}
      
      {(currentHash === '' || currentHash === '#') && (
        <MobileFloatingBar isVisible={showFloatingBar} />
      )}

      <Footer />
      
    </div>
  );
}