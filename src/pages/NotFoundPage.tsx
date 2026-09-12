import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { waLink } from '../seo/site';

interface NotFoundPageProps {
  onOpenQuote: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased flex flex-col">
      <Navbar onOpenQuote={onOpenQuote} />
      <main id="contenido" className="flex-1 pt-32 pb-20">
        <div className="max-w-xl mx-auto px-6 space-y-6">
          <span className="kicker">Error 404</span>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.04em] leading-tight">
            Página no encontrada
          </h1>
          <p className="text-[#5C5C5C] font-light leading-relaxed">
            Maceiras no es una tienda en línea: no hay carrito ni checkout de pago.
            Trabajamos por cotización de catering, menús a domicilio y chef privado en Santiago.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href={waLink()} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Escribir por WhatsApp
            </a>
            <Link to="/?cotizar=1" className="btn-outline">
              Solicitar cotización
            </Link>
            <Link to="/" className="btn-outline">
              Ir al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
