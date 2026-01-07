import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Scale, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const LegalLayout: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '';
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-white">
      
      {/* Background Elements - Subtle and Dark */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto pt-32 pb-24 px-6 md:px-12 relative z-10">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
            <a 
            href="#" 
            onClick={handleBack}
            className="group inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest font-mono cursor-pointer"
            >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft className="w-4 h-4" />
            </div>
            Zurück zur Startseite
            </a>
        </motion.div>
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16 border-b border-white/10 pb-12"
        >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 mb-8 border border-white/10">
                {icon}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-2">{title}</h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest mt-4">
                Offizielles Dokument
            </p>
        </motion.div>
        
        {/* Content */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-sans prose-headings:font-bold prose-headings:text-white 
            prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-6 prose-h3:border-l-4 prose-h3:border-orange-500 prose-h3:pl-4
            prose-p:text-white/70 prose-p:font-light prose-p:leading-relaxed
            prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-white prose-a:transition-colors
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-white/70 prose-li:my-2"
        >
          {children}
        </motion.div>

        {/* Footer Note */}
        <div className="mt-24 pt-12 border-t border-white/5 text-center text-white/20 text-sm font-mono flex flex-col items-center gap-4">
            <img src="https://i.postimg.cc/tJjgBcYZ/Logo-weiss.png" alt="Vamela" className="h-6 opacity-30 grayscale" />
            <span>Vamela Digital Arts © {new Date().getFullYear()}</span>
        </div>

      </div>
    </div>
  );
};

export const Impressum = () => (
  <LegalLayout title="Impressum" icon={<FileText className="w-8 h-8" />}>
    <p className="lead text-2xl text-white font-serif italic mb-12">Angaben gemäß § 5 TMG</p>
    
    <h3>Kontakt & Verantwortlichkeit</h3>
    <div className="bg-[#111] border border-white/5 p-8 rounded-2xl mb-8">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4 opacity-50">Anschrift</h4>
                <p className="!my-0 leading-relaxed">
                    <strong>Christian Stockmeier</strong><br />
                    Vamela Digital Arts<br />
                    85410 Haag an der Amper<br />
                    Deutschland
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4 opacity-50">Kommunikation</h4>
                <p className="!my-0 leading-relaxed">
                    <a href="mailto:stockmeier.ch@gmail.com" className="hover:text-white transition-colors block mb-2">stockmeier.ch@gmail.com</a>
                    <span>+49 176 24200179</span>
                </p>
            </div>
        </div>
    </div>

    <h3>Redaktionell verantwortlich</h3>
    <p>Christian Stockmeier (Anschrift wie oben)</p>

    <h3>EU-Streitschlichtung</h3>
    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

    <h3>Verbraucherstreitbeilegung</h3>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  </LegalLayout>
);

export const Datenschutz = () => (
  <LegalLayout title="Datenschutz" icon={<ShieldCheck className="w-8 h-8" />}>
    <p className="lead text-xl text-white/60 mb-12">Wir nehmen den Schutz deiner Daten ernst. Hier erfährst du, was mit deinen Daten passiert.</p>

    <h3>1. Datenschutz auf einen Blick</h3>
    <p><strong>Allgemeine Hinweise</strong><br/>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

    <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
    
    <p><strong>Wie erfassen wir Ihre Daten?</strong><br />
    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.<br />
    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>

    <h3>2. Hosting</h3>
    <div className="bg-[#111] border-l-4 border-orange-500 p-6 my-8">
        <h4 className="text-white font-bold mb-2 mt-0">Wir hosten bei Netlify</h4>
        <p className="!mb-0 text-sm">Anbieter ist die Netlify, Inc., 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA.<br />
        Netlify ist ein Dienst zum Hosten von Websites und zur Auslieferung von Inhalten. Wenn Sie unsere Website besuchen, erfasst Netlify verschiedene Logfiles inklusive Ihrer IP-Adressen.<br />
        Die Verwendung von Netlify erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.</p>
    </div>

    <h3>3. Allgemeine Hinweise und Pflichtinformationen</h3>
    <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

    <p><strong>Hinweis zur verantwortlichen Stelle</strong><br />
    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
    Christian Stockmeier<br />
    85410 Haag an der Amper<br />
    E-Mail: stockmeier.ch@gmail.com</p>
  </LegalLayout>
);

export const AGB = () => (
  <LegalLayout title="AGB" icon={<Scale className="w-8 h-8" />}>
    <p className="lead text-xl text-white/60 mb-12">Allgemeine Geschäftsbedingungen für Webdesign & Entwicklung</p>

    <h3>1. Geltungsbereich</h3>
    <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Christian Stockmeier (nachfolgend "Auftragnehmer") und seinen Kunden (nachfolgend "Auftraggeber") im Bereich Webdesign, Webentwicklung und damit verbundenen Dienstleistungen.</p>

    <h3>2. Vertragsschluss</h3>
    <p>Der Vertrag kommt durch die Annahme eines Angebots des Auftragnehmers durch den Auftraggeber zustande. Die Annahme kann schriftlich oder per E-Mail erfolgen. Mündliche Nebenabreden bestehen nicht.</p>

    <h3>3. Leistungen</h3>
    <p>Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot. Nachträgliche Änderungen oder Erweiterungen des Leistungsumfangs bedürfen einer gesonderten Vereinbarung und Vergütung.</p>

    <h3>4. Mitwirkungspflichten</h3>
    <p>Der Auftraggeber ist verpflichtet, alle für die Durchführung des Auftrags erforderlichen Daten und Unterlagen (Texte, Bilder, Logos etc.) zeitnah und in digitaler Form zur Verfügung zu stellen. Verzögerungen, die durch fehlende Mitwirkung des Auftraggebers entstehen, gehen nicht zu Lasten des Auftragnehmers.</p>

    <h3>5. Abnahme</h3>
    <p>Nach Fertigstellung der vereinbarten Leistungen wird der Auftragnehmer dem Auftraggeber die Arbeitsergebnisse zur Abnahme vorlegen. Die Abnahme gilt als erfolgt, wenn der Auftraggeber die Arbeitsergebnisse nutzt oder nicht innerhalb von 10 Tagen nach Übergabe wesentliche Mängel rügt.</p>

    <h3>6. Vergütung & Zahlungsbedingungen</h3>
    <p>Es gelten die im Angebot vereinbarten Preise. Sofern nicht anders vereinbart, ist die Vergütung nach Rechnungsstellung ohne Abzug fällig.</p>
    <ul className="list-disc pl-6 space-y-2">
        <li>Bei Projekten mit einem Volumen über 1.000 € ist eine Anzahlung von 50% bei Auftragserteilung fällig.</li>
        <li>Die Restzahlung erfolgt nach Abnahme des Projekts.</li>
    </ul>

    <h3>7. Urheberrecht & Nutzungsrechte</h3>
    <p>Der Auftragnehmer räumt dem Auftraggeber mit vollständiger Bezahlung der Vergütung das einfache, räumlich und zeitlich unbeschränkte Nutzungsrecht an den erstellten Arbeitsergebnissen ein. Der Auftragnehmer hat das Recht, auf den Vertragserzeugnissen als Urheber genannt zu werden und diese als Referenz für die Eigenwerbung zu nutzen.</p>

    <h3>8. Haftung</h3>
    <p>Der Auftragnehmer haftet nur für Schäden, die auf vorsätzlicher oder grob fahrlässiger Pflichtverletzung beruhen. Für die wettbewerbs- und markenrechtliche Zulässigkeit und Eintragungsfähigkeit der Arbeiten haftet der Auftragnehmer nicht.</p>

    <h3>9. Schlussbestimmungen</h3>
    <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Auftragnehmers.</p>
  </LegalLayout>
);