import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Utensils, GlassWater } from 'lucide-react';
import { DISHES_DATA } from '../data/cateringData';
import { DishItem } from '../types';

export const SpecialtiesSection: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filteredDishes = activeCategory === 'todos' 
    ? DISHES_DATA 
    : DISHES_DATA.filter(d => d.category === activeCategory);

  return (
    <section id="especialidades" className="py-24 bg-[#F5F2ED] relative border-t border-[#2A2A2A]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium font-sans">
              Alta Culinaria
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2A2A] font-light leading-tight">
              Especialidades <span className="italic font-normal">de temporada</span>
            </h2>
            <p className="text-[#2A2A2A]/70 font-sans font-light text-base">
              Nuestros platos principales y especialidades destacadas, adaptados con un servicio 100% personalizado para cada cliente.
            </p>
          </div>

          {/* Selector de categorías sutil */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'entrantes', label: 'Entrantes' },
              { id: 'principales', label: 'Principales' },
              { id: 'postres', label: 'Postres' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xs text-[11px] uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#5A5A40] text-[#F5F2ED]'
                    : 'bg-[#EADDCA]/40 text-[#2A2A2A]/80 border border-[#2A2A2A]/10 hover:bg-[#EADDCA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid limpio de 4 platos destacados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              onClick={() => setSelectedDish(dish)}
              className="group bg-white rounded-xs border border-[#2A2A2A]/10 overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Imagen del plato */}
                <div className="relative h-56 w-full overflow-hidden bg-[#EADDCA]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  
                  {/* Etiqueta de categoría en esquina */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xs bg-[#F5F2ED]/90 backdrop-blur-xs text-[9px] uppercase tracking-widest text-[#5A5A40] font-medium font-sans border border-[#2A2A2A]/10">
                    {dish.category}
                  </div>
                </div>

                {/* Info básica del plato */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl text-[#2A2A2A] group-hover:text-[#D27D56] transition-colors leading-snug font-light">
                    {dish.name}
                  </h3>

                  {/* Descripción corta */}
                  <p className="text-xs font-sans text-[#2A2A2A]/70 font-light leading-relaxed line-clamp-2">
                    {dish.description}
                  </p>

                  {/* Tags rápidos */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dish.tags.slice(0, 2).map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#5A5A40] bg-[#EADDCA]/40 border border-[#2A2A2A]/10 px-2 py-0.5 rounded-xs"
                      >
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-1 text-[10px] uppercase tracking-widest text-[#D27D56] font-medium flex items-center justify-between">
                <span>Ver propuesta & maridaje</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal de Detalle de Platillo (Mobile Optimized) */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A2A2A]/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-[#F5F2ED] rounded-xs max-w-lg sm:max-w-xl w-full shadow-2xl border border-[#2A2A2A]/20 relative max-h-[88vh] flex flex-col overflow-hidden"
            >
              {/* Floating Close Button (High contrast, always easy to click on mobile) */}
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#2A2A2A]/80 text-[#F5F2ED] hover:bg-[#D27D56] flex items-center justify-center transition-colors cursor-pointer shadow-lg border border-white/20"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Container wrapping IMAGE + CONTENT together */}
              <div className="flex-1 overflow-y-auto">
                {/* Header Image inside scroll container */}
                <div className="relative h-48 sm:h-60 w-full bg-[#EADDCA] shrink-0">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-xs bg-[#5A5A40]/90 backdrop-blur-md text-[#F5F2ED] text-[9px] uppercase tracking-widest font-sans border border-white/10">
                    {selectedDish.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-7 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A] font-light leading-snug">
                      {selectedDish.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#2A2A2A]/80 font-light mt-2 leading-relaxed">
                      {selectedDish.detailedDescription}
                    </p>
                  </div>

                  {/* Ingredientes clave */}
                  <div className="space-y-2 pt-2 border-t border-[#2A2A2A]/10">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                      <Utensils className="w-3.5 h-3.5 text-[#D27D56]" />
                      <span>Ingredientes principales</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDish.ingredients.map((ing, iIdx) => (
                        <span key={iIdx} className="text-[11px] sm:text-xs bg-white border border-[#2A2A2A]/10 text-[#2A2A2A] px-2.5 py-1 rounded-xs">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Maridaje recomendado */}
                  <div className="p-3.5 sm:p-4 rounded-xs bg-white border border-[#2A2A2A]/10 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                      <GlassWater className="w-3.5 h-3.5 text-[#D27D56]" />
                      <span>Maridaje del Sommelier</span>
                    </div>
                    <p className="text-xs text-[#2A2A2A]/80 italic font-serif">
                      "{selectedDish.pairing}"
                    </p>
                  </div>

                  {selectedDish.chefNote && (
                    <p className="text-[11px] text-[#5A5A40] font-sans italic pt-1">
                      <strong>Nota del chef:</strong> {selectedDish.chefNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Sticky Footer Modal Action */}
              <div className="p-4 sm:p-5 bg-[#F5F2ED] border-t border-[#2A2A2A]/10 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedDish(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
