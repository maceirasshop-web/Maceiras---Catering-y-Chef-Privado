import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EMAIL, WHATSAPP_DISPLAY, waLink } from '../seo/site';

interface TermsPageProps {
  onOpenQuote: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased flex flex-col">
      <Navbar onOpenQuote={onOpenQuote} />
      <main id="contenido" className="flex-1 pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 space-y-8">
          <header className="space-y-3 border-b border-[#0A0A0A]/8 pb-8">
            <span className="kicker">Legal</span>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.04em] leading-tight">
              Aviso Legal y Términos del Servicio
            </h1>
            <p className="text-sm text-[#5C5C5C] font-light">
              Maceiras Catering &amp; Chef Privado · Santiago de Chile
            </p>
          </header>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">1. Identificación</h2>
            <p>
              Este sitio web informa sobre los servicios de <strong>Maceiras Catering &amp; Chef Privado</strong>:
              catering para eventos, menús a domicilio y chef privado en Santiago de Chile.
              Contacto oficial:{' '}
              <a className="underline font-medium" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              {' '}·{' '}
              <a className="underline font-medium" href={waLink()}>{WHATSAPP_DISPLAY}</a>.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">2. Naturaleza del sitio</h2>
            <p>
              Este sitio no es una tienda en línea. No existe carrito, pasarela de pago ni checkout.
              Los precios de cada servicio se determinan por cotización, según fecha, recinto, número de
              comensales y menú. Una solicitud en el formulario o por WhatsApp no constituye reserva confirmada.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">3. Condiciones del servicio</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Las propuestas están sujetas a confirmación de disponibilidad de fechas y equipo.</li>
              <li>El menú se personaliza según alergias o restricciones alimentarias notificadas a tiempo.</li>
              <li>La cotización itemizada y, cuando corresponda, la facturación a empresa se acuerdan por escrito.</li>
              <li>La cobertura habitual es Santiago y el sector oriente; otras comunas se evalúan en la cotización.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">4. Propiedad intelectual</h2>
            <p>
              Textos, fotografías de platos, recetas publicadas e identidad visual de Maceiras están protegidos
              por las normas de propiedad intelectual aplicables en Chile. Queda prohibida su reproducción
              total o parcial sin autorización previa.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">5. Limitación</h2>
            <p>
              El contenido del recetario es informativo. Maceiras no garantiza resultados idénticos en
              preparaciones caseras. Las fotografías ilustran elaboraciones reales del servicio y pueden
              variar según temporada y brief.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">6. Privacidad</h2>
            <p>
              El tratamiento de datos se describe en la{' '}
              <Link className="underline font-medium" to="/privacidad">Política de Privacidad</Link>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};
