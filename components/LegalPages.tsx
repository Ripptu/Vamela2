import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <a 
          href="#" 
          onClick={(e) => {
             e.preventDefault();
             window.location.hash = '';
          }}
          className="inline-flex items-center gap-2 text-white/50 hover:text-orange-500 transition-colors mb-12 text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
        </a>
        
        <h1 className="text-4xl md:text-6xl font-serif mb-12 text-white">{title}</h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-orange-500 prose-strong:text-white text-white/70 font-light">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Impressum = () => (
  <LegalLayout title="Impressum">
    <p>Angaben gemäß § 5 TMG</p>
    
    <h3>Kontakt</h3>
    <p>
      Christian Stockmeier<br />
      Vamela Digital Arts<br />
      85410 Haag an der Amper<br />
      Deutschland
    </p>

    <p>
      <strong>E-Mail:</strong> <a href="mailto:stockmeier.ch@gmail.com">stockmeier.ch@gmail.com</a><br />
      <strong>Telefon:</strong> +49 176 24200179
    </p>

    <h3>Redaktionell verantwortlich</h3>
    <p>Christian Stockmeier (Anschrift wie oben)</p>

    <h3>EU-Streitschlichtung</h3>
    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

    <h3>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  </LegalLayout>
);

export const Datenschutz = () => (
  <LegalLayout title="Datenschutz">
    <h3>1. Datenschutz auf einen Blick</h3>
    <h4>Allgemeine Hinweise</h4>
    <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

    <h4>Datenerfassung auf dieser Website</h4>
    <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
    
    <p><strong>Wie erfassen wir Ihre Daten?</strong><br />
    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.<br />
    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>

    <h3>2. Hosting</h3>
    <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
    <h4>Netlify</h4>
    <p>Anbieter ist die Netlify, Inc., 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA (nachfolgend „Netlify“).<br />
    Netlify ist ein Dienst zum Hosten von Websites und zur Auslieferung von Inhalten. Wenn Sie unsere Website besuchen, erfasst Netlify verschiedene Logfiles inklusive Ihrer IP-Adressen.<br />
    Die Verwendung von Netlify erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.</p>

    <h3>3. Allgemeine Hinweise und Pflichtinformationen</h3>
    <h4>Datenschutz</h4>
    <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

    <h4>Hinweis zur verantwortlichen Stelle</h4>
    <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
    Christian Stockmeier<br />
    85410 Haag an der Amper<br />
    E-Mail: stockmeier.ch@gmail.com</p>
  </LegalLayout>
);

export const AGB = () => (
  <LegalLayout title="Allgemeine Geschäftsbedingungen">
    <h3>1. Geltungsbereich</h3>
    <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Christian Stockmeier (nachfolgend "Auftragnehmer") und seinen Kunden (nachfolgend "Auftraggeber") im Bereich Webdesign, Webentwicklung und damit verbundenen Dienstleistungen.</p>

    <h3>2. Vertragsschluss</h3>
    <p>Der Vertrag kommt durch die Annahme eines Angebots des Auftragnehmers durch den Auftraggeber zustande. Die Annahme kann schriftlich oder per E-Mail erfolgen.</p>

    <h3>3. Leistungen</h3>
    <p>Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot. Nachträgliche Änderungen oder Erweiterungen des Leistungsumfangs bedürfen einer gesonderten Vereinbarung und Vergütung.</p>

    <h3>4. Mitwirkungspflichten des Auftraggebers</h3>
    <p>Der Auftraggeber ist verpflichtet, alle für die Durchführung des Auftrags erforderlichen Daten und Unterlagen (Texte, Bilder, Logos etc.) zeitnah und in digitaler Form zur Verfügung zu stellen. Verzögerungen, die durch fehlende Mitwirkung des Auftraggebers entstehen, gehen nicht zu Lasten des Auftragnehmers.</p>

    <h3>5. Abnahme</h3>
    <p>Nach Fertigstellung der vereinbarten Leistungen wird der Auftragnehmer dem Auftraggeber die Arbeitsergebnisse zur Abnahme vorlegen. Die Abnahme gilt als erfolgt, wenn der Auftraggeber die Arbeitsergebnisse nutzt oder nicht innerhalb von 10 Tagen nach Übergabe wesentliche Mängel rügt.</p>

    <h3>6. Vergütung und Zahlungsbedingungen</h3>
    <p>Es gelten die im Angebot vereinbarten Preise. Sofern nicht anders vereinbart, ist die Vergütung nach Rechnungsstellung ohne Abzug fällig. Bei Projekten mit einem Volumen über 1.000 € ist der Auftragnehmer berechtigt, eine Anzahlung in Höhe von 50% bei Vertragsschluss zu verlangen.</p>

    <h3>7. Urheberrecht und Nutzungsrechte</h3>
    <p>Der Auftragnehmer räumt dem Auftraggeber mit vollständiger Bezahlung der Vergütung das einfache, räumlich und zeitlich unbeschränkte Nutzungsrecht an den erstellten Arbeitsergebnissen ein. Der Auftragnehmer hat das Recht, auf den Vertragserzeugnissen als Urheber genannt zu werden und diese als Referenz zu nutzen.</p>

    <h3>8. Haftung</h3>
    <p>Der Auftragnehmer haftet nur für Schäden, die auf vorsätzlicher oder grob fahrlässiger Pflichtverletzung beruhen. Für die wettbewerbs- und markenrechtliche Zulässigkeit und Eintragungsfähigkeit der Arbeiten haftet der Auftragnehmer nicht.</p>

    <h3>9. Schlussbestimmungen</h3>
    <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Auftragnehmers.</p>
  </LegalLayout>
);