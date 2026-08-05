import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Hero3D } from './Hero3D';

interface HeroSectionProps {
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center pt-28 pb-20 bg-[#F5F2ED] overflow-visible"
    >
      {/* Subtle organic light gradient background */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#EADDCA]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D27D56]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LADO IZQUIERDO: Texto refinado, limpio y aireado */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 pr-0 lg:pr-6">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Tagline discreto */}
            <div className="inline-block">
              <span className="pill-tag text-[#5A5A40] border-[#2A2A2A]/15 bg-[#EADDCA]/30">
                Catering Premium & Chefs Privados
              </span>
            </div>

            {/* Título principal exacto con énfasis artístico */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#2A2A2A] leading-[1.12] font-light">
              Experiencias gastronómicas <span className="italic font-normal text-[#D27D56]">que se sienten</span>
            </h1>

            {/* Subtítulo corto exacto */}
            <p className="text-base sm:text-lg font-sans font-light text-[#2A2A2A]/70 max-w-md leading-relaxed">
              Maceiras ofrece catering premium y chefs privados dedicados a crear experiencias culinarias memorables con un servicio 100% personalizado.
            </p>
          </motion.div>

          {/* Un solo botón principal elegante */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2"
          >
            <button
              onClick={onOpenQuote}
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:bg-[#D27D56] hover:shadow-md active:scale-98 cursor-pointer"
              id="hero-quote-btn"
            >
              <span>Solicitar cotización</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Indicadores sutiles de distinción */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-8 border-t border-[#2A2A2A]/10 flex items-center gap-8 text-xs text-[#5A5A40] font-sans"
          >
            <div className="flex flex-col">
              <span className="font-serif text-lg text-[#2A2A2A] font-light">Ingredientes Frescos</span>
              <span className="text-[10px] uppercase tracking-widest text-[#2A2A2A]/60">Selección de Temporada</span>
            </div>
            <div className="w-px h-8 bg-[#2A2A2A]/10" />
            <div className="flex flex-col">
              <span className="font-serif text-lg text-[#2A2A2A] font-light">Chef a Domicilio</span>
              <span className="text-[10px] uppercase tracking-widest text-[#2A2A2A]/60">Servicio Exclusivo</span>
            </div>
            <div className="w-px h-8 bg-[#2A2A2A]/10" />
            <div className="flex flex-col">
              <span className="font-serif text-lg text-[#2A2A2A] font-light">100% Personalizado</span>
              <span className="text-[10px] uppercase tracking-widest text-[#2A2A2A]/60">Para Cada Cliente</span>
            </div>
          </motion.div>

        </div>

        {/* LADO DERECHO: Escena 3D limpia y suave con Three.js */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            {/* Backdrop halo */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#EADDCA]/40 via-transparent to-[#F5F2ED] rounded-3xl -z-10 transform scale-90 blur-2xl" />
            
            <Hero3D />

            {/* Micro hint overlay for interactivity */}
            <div className="absolute bottom-2 right-4 text-[10px] tracking-widest uppercase text-[#5A5A40]/80 font-sans pointer-events-none hidden sm:block">
              Interactúa con el mouse ✦ 3D
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
