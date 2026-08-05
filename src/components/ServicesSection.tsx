import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, X, Users, Sparkles, ChefHat } from 'lucide-react';
import { SERVICES_DATA } from '../data/cateringData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="servicios" className="py-24 bg-[#F5F2ED] relative border-t border-[#2A2A2A]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header de la sección */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium font-sans">
            Nuestras Propuestas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2A2A] font-light leading-tight">
            Servicios diseñados <span className="italic font-normal">para momentos únicos</span>
          </h2>
          <p className="text-[#2A2A2A]/70 font-sans font-light text-base leading-relaxed">
            Adaptamos la experiencia culinaria a la atmósfera de cada ocasión, garantizando exclusividad y precisión.
          </p>
        </div>

        {/* Grid de 3 tarjetas grandes y limpias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-xs border border-[#2A2A2A]/10 overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Imagen del servicio */}
                <div className="relative h-64 w-full overflow-hidden bg-[#EADDCA]">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5F2ED]/90 backdrop-blur-xs flex items-center justify-center text-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-8 space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#D27D56] font-sans font-medium">
                    {service.subtitle}
                  </span>
                  
                  <h3 className="font-serif text-2xl text-[#2A2A2A] group-hover:text-[#D27D56] transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Descripción breve de una línea exacta */}
                  <p className="text-xs font-sans text-[#2A2A2A]/70 font-light leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Botón ver detalles */}
              <div className="px-8 pb-8 pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] group-hover:text-[#D27D56] font-medium transition-colors">
                  <span>Explorar detalles</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal de detalles de Servicio */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A2A2A]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F5F2ED] rounded-xs max-w-2xl w-full overflow-hidden shadow-2xl border border-[#2A2A2A]/20 relative max-h-[90vh] flex flex-col"
            >
              {/* Header Image inside Modal */}
              <div className="relative h-56 sm:h-64 w-full bg-[#EADDCA]">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F2ED]/90 text-[#2A2A2A] flex items-center justify-center hover:bg-[#D27D56] hover:text-white transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 px-3 py-1 rounded-xs bg-[#5A5A40]/90 backdrop-blur-md text-[#F5F2ED] text-xs uppercase tracking-widest font-sans">
                  {selectedService.subtitle}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A] mb-2 font-light">
                    {selectedService.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#2A2A2A]/80 font-light leading-relaxed">
                    {selectedService.detailedDescription}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                    Qué incluye esta experiencia:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#2A2A2A]">
                        <div className="w-5 h-5 rounded-full bg-[#EADDCA] flex items-center justify-center text-[#D27D56] shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xs bg-white border border-[#2A2A2A]/10 flex items-center gap-3 text-xs text-[#2A2A2A]/80">
                  <Users className="w-4 h-4 text-[#D27D56] shrink-0" />
                  <span><strong>Ideal para:</strong> {selectedService.idealFor}</span>
                </div>
              </div>

              {/* Footer Modal Action */}
              <div className="p-6 bg-[#EADDCA]/30 border-t border-[#2A2A2A]/10 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#2A2A2A]/70 hover:text-[#2A2A2A] font-medium"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceForQuote(title);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Solicitar este servicio</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
