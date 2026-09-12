import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenLegal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#F7F7F5] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <a href="#/" className="text-2xl font-semibold tracking-[-0.03em]">
            Maceiras
          </a>

          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[14px] font-medium text-white/55">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#/empresas" className="hover:text-white transition-colors">Empresas</a>
            <a href="#arma-tu-menu" className="hover:text-white transition-colors">Arma tu menú</a>
            <a href="#/recetas" className="hover:text-white transition-colors">Recetas</a>
            <a href="#opiniones" className="hover:text-white transition-colors">Opiniones</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </nav>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/8 text-[#F7F7F5] hover:bg-white hover:text-[#0A0A0A] transition-colors cursor-pointer self-end md:self-auto border border-white/10"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/40">
          <p>© {new Date().getFullYear()} Maceiras. Catering premium y chef privado en Santiago de Chile.</p>
          <div className="flex items-center gap-6 text-[13px] font-medium">
            <button
              onClick={onOpenLegal}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Aviso Legal
            </button>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
