import React from 'react';
import { ChefHat, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2A2A2A] text-[#F5F2ED] py-16 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#F5F2ED]/10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center font-serif font-medium">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-widest uppercase block font-light">
                Maceiras
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#EADDCA]/70 font-sans">
                Catering & Chef Privado en Chile
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 text-[11px] tracking-widest uppercase text-[#EADDCA]/80">
            <a href="#servicios" className="hover:text-[#D27D56] transition-colors">Servicios</a>
            <a href="#especialidades" className="hover:text-[#D27D56] transition-colors">Especialidades</a>
            <a href="#proceso" className="hover:text-[#D27D56] transition-colors">Cómo trabajamos</a>
            <a href="#opiniones" className="hover:text-[#D27D56] transition-colors">Opiniones</a>
            <a href="#contacto" className="hover:text-[#D27D56] transition-colors">Contacto</a>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#5A5A40] text-[#F5F2ED] hover:bg-[#D27D56] transition-colors cursor-pointer self-end md:self-auto"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EADDCA]/60 font-sans">
          <p>© {new Date().getFullYear()} Maceiras. Experiencias gastronómicas privadas en Chile. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider">
            <a href="#" className="hover:underline">Aviso Legal</a>
            <a href="#" className="hover:underline">Política de Privacidad</a>
            {onOpenAdmin && (
              <button 
                onClick={onOpenAdmin} 
                className="hover:text-[#D27D56] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#D27D56]" />
                <span>Acceso Admin</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
