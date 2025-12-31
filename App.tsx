import React, { useEffect, useRef, useState } from 'react';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ProcessScroll } from './components/ProcessScroll';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';

// Scroll Reveal Component
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
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isWarping, setIsWarping] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      // Wenn mehr als 50px gescrollt wurde, Logo ausblenden
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* Header / Navigation Placeholder (Minimal) */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
      >
         <div className="pointer-events-auto">
            <img src="https://i.postimg.cc/tJjgBcYZ/Logo-weiss.png" alt="Vamela" className="h-8 w-auto opacity-90" />
         </div>
         <div className="pointer-events-auto">
            {/* Hamburger or Menu could go here */}
         </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col">
        
        {/* HERO */}
        <Hero />

        {/* THE PROBLEM / SOLUTION MANIFEST */}
        <section className="py-24 md:py-32 px-6 border-b border-white/10 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                 <div>
                    <span className="font-mono text-orange-500 text-xs uppercase tracking-[0.2em] mb-4 block">Die Realität</span>
                    <h2 className="text-3xl md:text-5xl leading-tight font-sans font-bold text-white mb-6">
                      Die meisten Websites kosten Geld, <span className="serif-txt font-normal text-white/50">aber bringen keins.</span>
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

        {/* SERVICES (Accordion Style) */}
        <Services />

        {/* WORK / PORTFOLIO (Grid Style) */}
        <Portfolio />

        {/* PROCESS (Chat Style - kept as it fits the 'mobile first' narrative) */}
        <section className="border-b border-white/10 bg-[#0f0f0f]">
             <ProcessScroll />
        </section>
        
        {/* FAQ */}
        <FAQ />

        {/* ABOUT */}
        <About />

        {/* CONTACT */}
        <section className="py-24 md:py-32 px-6 relative z-10 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto mb-16 text-center">
             <Reveal>
               <h2 className="text-5xl md:text-7xl mb-6">
                 <span className="font-sans font-bold">Lass uns dein Business</span><br/>
                 <span className="serif-txt text-orange-500">nach vorne bringen.</span>
               </h2>
               <p className="text-muted text-lg">
                 Keine Massenabfertigung. Schreib mir kurz, worum es geht.
               </p>
             </Reveal>
          </div>
          
          <Reveal delay={200}>
            <ContactForm onWarpStart={() => setIsWarping(true)} />
          </Reveal>
        </section>

      </main>

      <Footer />
    </div>
  );
}