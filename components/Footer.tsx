import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLegalNavigation = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    window.location.hash = hash;
    window.scrollTo(0, 0);
  };

  return (
    <footer className="w-full bg-[#050505] pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col justify-between">
             <div className="mb-8">
               <img src="https://i.postimg.cc/tJjgBcYZ/Logo-weiss.png" alt="Vamela Logo" className="w-24 mb-6 opacity-100" />
             </div>
             <p className="text-white/60 text-sm leading-relaxed max-w-xs">
               Vamela ist ein digitales Studio aus Deutschland. Mit smarten Strategien und klarem Design helfen wir Marken, sichtbar zu werden.
             </p>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 md:col-start-9">
             <h4 className="font-serif italic text-xl mb-6 text-white">Socials</h4>
             <ul className="space-y-3">
               <li>
                 <a href="https://instagram.com/vamela_studio" target="_blank" rel="noreferrer" className="text-white/50 hover:text-orange-500 transition-colors text-sm uppercase tracking-wide">Instagram</a>
               </li>
             </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
             <h4 className="font-serif italic text-xl mb-6 text-white">Kontakt</h4>
             <address className="not-italic text-white/50 text-sm space-y-3">
               <p className="font-bold text-white">Christian Stockmeier</p>
               <p>85410 Haag an der Amper</p>
               <p className="mt-4">
                 <a href="mailto:stockmeier.ch@gmail.com" className="hover:text-white transition-colors">stockmeier.ch@gmail.com</a>
               </p>
             </address>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/30">
           <div className="flex gap-4 mb-4 md:mb-0">
              <a href="#impressum" onClick={(e) => handleLegalNavigation(e, 'impressum')} className="hover:text-white transition-colors cursor-pointer">Impressum</a>
              <a href="#datenschutz" onClick={(e) => handleLegalNavigation(e, 'datenschutz')} className="hover:text-white transition-colors cursor-pointer">Datenschutz</a>
              <a href="#agb" onClick={(e) => handleLegalNavigation(e, 'agb')} className="hover:text-white transition-colors cursor-pointer">AGB</a>
           </div>
           <div>
              © {currentYear} Vamela Digital Arts
           </div>
        </div>

      </div>
    </footer>
  );
};