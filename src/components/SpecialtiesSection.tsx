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
    <section id="especialidades" className="py-24 bg-[#F7F7F5] relative border-t border-[#0A0A0A]/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="kicker">Carta</span>
            <h2 className="text-3xl sm:text-4xl text-[#0A0A0A] font-medium leading-tight tracking-[-0.03em]">
              Especialidades de temporada
            </h2>
            <p className="text-[#5C5C5C] font-light text-base">
              Platos de referencia. Cada servicio se ajusta al cliente, al recinto y a la temporada.
            </p>
          </div>

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
                className={`chip ${
                  activeCategory === cat.id
                    ? 'bg-[#0A0A0A] text-[#F7F7F5]'
                    : 'text-[#0A0A0A] border border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              onClick={() => setSelectedDish(dish)}
              className="group bg-white border border-[#0A0A0A]/10 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#0A0A0A]/40 transition-colors rounded-3xl"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-[#EDEDEC]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-[11px] text-[#0A0A0A] font-medium rounded-full">
                    {dish.category}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-lg text-[#0A0A0A] leading-snug font-medium tracking-tight">
                    {dish.name}
                  </h3>
                  <p className="text-xs font-light text-[#5C5C5C] leading-relaxed line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dish.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] text-[#5C5C5C] border border-[#0A0A0A]/10 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1 text-[14px] font-medium text-[#0A0A0A] flex items-center justify-between">
                <span>Maridaje</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A0A0A]/70 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22 }}
              className="bg-[#F7F7F5] max-w-lg sm:max-w-xl w-full shadow-2xl border border-[#0A0A0A]/10 relative max-h-[88vh] flex flex-col overflow-hidden rounded-3xl"
            >
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#0A0A0A] text-[#F7F7F5] hover:bg-[#2A2A2A] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="relative h-48 sm:h-60 w-full bg-[#EDEDEC] shrink-0">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 px-2.5 py-0.5 bg-[#0A0A0A] text-[#F7F7F5] font-display text-[11px] uppercase tracking-[0.16em]">
                    {selectedDish.category}
                  </div>
                </div>

                <div className="p-5 sm:p-7 space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl text-[#0A0A0A] font-light leading-snug tracking-tight">
                      {selectedDish.name}
                    </h3>
                    <p className="text-sm text-[#5C5C5C] font-light mt-2 leading-relaxed">
                      {selectedDish.detailedDescription}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#0A0A0A]/8">
                    <div className="flex items-center gap-2 kicker">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Ingredientes</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDish.ingredients.map((ing, iIdx) => (
                        <span key={iIdx} className="text-[11px] bg-white border border-[#0A0A0A]/10 text-[#0A0A0A] px-2.5 py-1">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-[#0A0A0A]/10 space-y-1">
                    <div className="flex items-center gap-2 kicker">
                      <GlassWater className="w-3.5 h-3.5" />
                      <span>Maridaje</span>
                    </div>
                    <p className="text-xs text-[#5C5C5C] font-light italic">
                      {selectedDish.pairing}
                    </p>
                  </div>

                  {selectedDish.chefNote && (
                    <p className="text-[11px] text-[#5C5C5C] italic pt-1">
                      <strong className="text-[#0A0A0A] not-italic">Nota del chef:</strong> {selectedDish.chefNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white border-t border-[#0A0A0A]/8 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedDish(null)}
                  className="btn-primary !py-2.5 !px-6 w-full sm:w-auto"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
