import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/cateringData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="proceso" className="py-24 bg-[#F7F7F5] relative border-t border-[#0A0A0A]/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="kicker">Cómo trabajamos</span>
          <h2 className="text-3xl sm:text-4xl text-[#0A0A0A] font-medium tracking-[-0.03em] leading-tight">
            Cuatro etapas, de la consulta a la mesa
          </h2>
          <p className="text-[#5C5C5C] font-light text-base leading-relaxed">
            Un proceso claro para cotizar catering, menús a domicilio o chef privado en Santiago.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white p-7 sm:p-8 border border-[#0A0A0A]/10 space-y-4 rounded-3xl"
            >
              <div className="text-3xl sm:text-4xl text-[#0A0A0A] font-semibold tracking-tight">
                {step.number}
              </div>
              <h3 className="text-xl text-[#0A0A0A] font-medium tracking-tight pt-1">
                {step.title}
              </h3>
              <p className="text-sm font-light text-[#5C5C5C] leading-relaxed">
                {step.description}
              </p>
              <div className="pt-2 border-t border-[#0A0A0A]/8 text-[11px] text-[#5C5C5C]">
                {step.details}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
