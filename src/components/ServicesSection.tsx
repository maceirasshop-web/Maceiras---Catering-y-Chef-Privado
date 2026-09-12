import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, X, Users, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/cateringData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="servicios" className="py-24 bg-[#F7F7F5] relative border-t border-[#0A0A0A]/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-4">
            <span className="kicker">Servicios</span>
            <h2 className="text-3xl sm:text-4xl text-[#0A0A0A] font-medium leading-tight tracking-[-0.03em]">
              Tres líneas. Un mismo criterio de ejecución.
            </h2>
            <p className="text-[#5C5C5C] font-light text-base leading-relaxed">
              Chef privado, catering de eventos y operación corporativa. Cada propuesta se diseña sobre el recinto, el número de invitados y el tono de la ocasión.
            </p>
          </div>
          <a
            href="#/empresas"
            className="inline-flex items-center gap-2 kicker !text-[#0A0A0A] hover:opacity-70 transition-opacity"
          >
            Página empresas
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="group bg-white overflow-hidden flex flex-col justify-between cursor-pointer rounded-3xl border border-[#0A0A0A]/8 hover:border-[#0A0A0A]/20 transition-colors"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-[#EDEDEC]">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 text-sm font-medium text-white/90">
                    0{index + 1}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <span className="kicker !text-[11px]">{service.subtitle}</span>
                  <h3 className="text-xl text-[#0A0A0A] tracking-tight font-medium leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-[#5C5C5C] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-1">
                <span className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0A0A0A]">
                  Detalles
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A0A0A]/70 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22 }}
              className="bg-[#F7F7F5] max-w-2xl w-full shadow-2xl border border-[#0A0A0A]/10 relative max-h-[88vh] flex flex-col overflow-hidden rounded-3xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#0A0A0A] text-[#F7F7F5] hover:bg-[#2A2A2A] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="relative h-48 sm:h-64 w-full bg-[#EDEDEC] shrink-0">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 sm:left-6 px-3 py-1 bg-[#0A0A0A] text-[#F7F7F5] font-display text-[12px] tracking-[0.16em] uppercase">
                    {selectedService.subtitle}
                  </div>
                </div>

                <div className="p-5 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl text-[#0A0A0A] mb-2 font-light tracking-tight">
                      {selectedService.title}
                    </h3>
                    <p className="text-sm text-[#5C5C5C] font-light leading-relaxed">
                      {selectedService.detailedDescription}
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <h4 className="kicker">Incluye</h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {selectedService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#0A0A0A]">
                          <Check className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.75} />
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-white border border-[#0A0A0A]/10 flex items-center gap-3 text-xs text-[#5C5C5C]">
                    <Users className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                    <span><strong className="text-[#0A0A0A]">Ideal para:</strong> {selectedService.idealFor}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white border-t border-[#0A0A0A]/8 flex items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#5C5C5C] hover:text-[#0A0A0A] font-medium"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceForQuote(title);
                  }}
                  className="btn-primary !py-2.5 !px-5"
                >
                  <span>Solicitar servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
