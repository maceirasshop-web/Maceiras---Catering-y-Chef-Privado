import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/cateringData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="proceso" className="py-24 bg-[#F5F2ED] relative border-t border-[#2A2A2A]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header de la sección */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium font-sans">
            Metodología & Calma
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2A2A] font-light leading-tight">
            Cómo trabajamos <span className="italic font-normal">paso a paso</span>
          </h2>
          <p className="text-[#2A2A2A]/70 font-sans font-light text-base">
            Cuatro etapas sencillas diseñadas para asegurarte la máxima tranquilidad de principio a fin.
          </p>
        </div>

        {/* 4 pasos simples y claros en una fila horizontal limpia */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative">
          
          {/* Sutil línea conector en desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-[#2A2A2A]/10 -z-0" />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-8 rounded-xs border border-[#2A2A2A]/10 space-y-4 relative z-10 hover:border-[#D27D56]/40 transition-all duration-300 card-shadow"
            >
              {/* Número grande estilizado */}
              <div className="font-serif text-4xl sm:text-5xl text-[#D27D56] font-light tracking-tight">
                {step.number}
              </div>

              {/* Título corto */}
              <h3 className="font-serif text-xl text-[#2A2A2A] font-light pt-1">
                {step.title}
              </h3>

              {/* Una línea de texto (descripción clara) */}
              <p className="text-xs font-sans text-[#2A2A2A]/70 font-light leading-relaxed">
                {step.description}
              </p>

              {/* Detalle adicional sutil */}
              <div className="pt-2 border-t border-[#2A2A2A]/10 text-[10px] uppercase tracking-widest text-[#5A5A40] font-sans">
                {step.details}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
