import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Hero3D } from './Hero3D';

interface HeroSectionProps {
  onOpenQuote: (serviceType?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center pt-24 sm:pt-28 pb-16 lg:pb-0 bg-[#F7F7F5] overflow-hidden"
    >
      <div className="absolute inset-y-0 right-0 w-px bg-[#0A0A0A]/8 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 lg:pr-8 lg:border-r lg:border-[#0A0A0A]/8 lg:min-h-[70vh] lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="kicker">Santiago · Catering y cocina en casa</span>

            <h1 className="text-[2.35rem] sm:text-5xl lg:text-[3.4rem] tracking-[-0.04em] text-[#0A0A0A] leading-[1.08] font-medium">
              Eventos en casa. Y menús para toda la semana.
            </h1>

            <p className="text-[15px] sm:text-base font-light text-[#5C5C5C] max-w-md leading-relaxed">
              Cumpleaños, graduaciones y cenas privadas. También vamos a tu domicilio con los alimentos de la semana o del mes. Y catering para empresas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <button
              onClick={() => onOpenQuote('Eventos personales')}
              className="btn-primary"
              id="hero-quote-event-btn"
            >
              <span>Cotizar evento</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenQuote('Menú semanal a domicilio')}
              className="btn-outline"
              id="hero-weekly-menu-btn"
            >
              <span>Menú semanal o mensual</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="pt-6 border-t border-[#0A0A0A]/8 grid grid-cols-3 gap-4 text-[#0A0A0A]"
          >
            {[
              { value: 'Eventos', label: 'Cumpleaños y graduaciones' },
              { value: 'Semana', label: 'Menú a domicilio' },
              { value: 'Mes', label: 'Plan mensual' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl tracking-tight font-semibold leading-none">
                  {item.value}
                </span>
                <span className="kicker mt-2 !text-[11px]">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <a
            href="#/empresas"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#5C5C5C] hover:text-[#0A0A0A] transition-colors font-medium w-fit"
          >
            <span>Servicio para empresas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="hidden lg:col-span-6 lg:flex relative items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            <Hero3D />
            <div className="absolute bottom-3 right-4 kicker pointer-events-none">
              Interactúa · 3D
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
