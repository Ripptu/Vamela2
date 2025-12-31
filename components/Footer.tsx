import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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

          {/* Links 1 */}
          <div className="md:col-span-2 md:col-start-7">
             <h4 className="font-serif italic text-xl mb-6 text-white">Menu</h4>
             <ul className="space-y-3">
               {['Projekte', 'Agentur', 'Services', 'Kontakt'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-white/50 hover:text-orange-500 transition-colors text-sm uppercase tracking-wide">{item}</a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2">
             <h4 className="font-serif italic text-xl mb-6 text-white">Socials</h4>
             <ul className="space-y-3">
               {['Instagram', 'LinkedIn', 'WhatsApp'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-white/50 hover:text-orange-500 transition-colors text-sm uppercase tracking-wide">{item}</a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
             <h4 className="font-serif italic text-xl mb-6 text-white">Kontakt</h4>
             <address className="not-italic text-white/50 text-sm space-y-3">
               <p>Hofmark 15</p>
               <p>84307 Eggenfelden</p>
               <p className="mt-4">
                 <a href="mailto:hallo@vamela.de" className="hover:text-white transition-colors">hallo@vamela.de</a>
               </p>
             </address>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/30">
           <div className="flex gap-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-white">Impressum</a>
              <a href="#" className="hover:text-white">Datenschutz</a>
              <a href="#" className="hover:text-white">AGB</a>
           </div>
           <div>
              © {currentYear} Vamela Digital Arts
           </div>
        </div>

      </div>
    </footer>
  );
};