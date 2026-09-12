import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EMAIL, WHATSAPP_DISPLAY, waLink } from '../seo/site';

interface PrivacyPageProps {
  onOpenQuote: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased flex flex-col">
      <Navbar onOpenQuote={onOpenQuote} />
      <main id="contenido" className="flex-1 pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-6 lg:px-12 space-y-8">
          <header className="space-y-3 border-b border-[#0A0A0A]/8 pb-8">
            <span className="kicker">Legal</span>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.04em] leading-tight">
              Política de Privacidad
            </h1>
            <p className="text-sm text-[#5C5C5C] font-light">
              Maceiras Catering &amp; Chef Privado · Santiago de Chile
            </p>
          </header>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">1. Responsable</h2>
            <p>
              El responsable del tratamiento de los datos personales recabados a través de este sitio es
              <strong> Maceiras Catering &amp; Chef Privado</strong>, con operación en Santiago de Chile.
              Contacto: <a className="underline font-medium" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              {' '}·{' '}
              <a className="underline font-medium" href={waLink()}>{WHATSAPP_DISPLAY}</a>.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">2. Marco legal</h2>
            <p>
              El tratamiento se rige por la legislación chilena, en particular la Ley N° 19.628 sobre Protección
              de la Vida Privada y las normas que la complementen. Este sitio no está dirigido a la venta en línea
              ni al tratamiento masivo de datos de terceros.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">3. Datos que recabamos</h2>
            <p>
              A través del formulario de cotización y de WhatsApp podemos recabar: nombre, correo electrónico,
              teléfono, tipo de evento, número de comensales, fecha estimada, comuna o recinto, restricciones
              alimentarias y el mensaje que usted envíe. No solicitamos datos de tarjetas de pago en este sitio.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">4. Finalidad</h2>
            <p>
              Los datos se usan únicamente para elaborar propuestas gastronómicas, coordinar logística del
              servicio de catering o chef privado, y responder su solicitud. No se venden, arriendan ni ceden
              a terceros con fines publicitarios.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">5. Conservación y seguridad</h2>
            <p>
              Conservamos la información el tiempo necesario para gestionar la cotización y el servicio
              correspondiente. Aplicamos medidas organizativas e informáticas razonables para resguardarla.
              El envío por WhatsApp queda sujeto a las condiciones de esa plataforma.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed text-[#0A0A0A]/80 font-light">
            <h2 className="text-xl font-medium text-[#0A0A0A] tracking-tight">6. Derechos</h2>
            <p>
              Puede solicitar acceso, rectificación, actualización o eliminación de sus datos escribiendo a{' '}
              <a className="underline font-medium" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              Responderemos a la brevedad por el mismo canal.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};
