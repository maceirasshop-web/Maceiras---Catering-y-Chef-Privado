import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Utensils, GlassWater, Tag } from 'lucide-react';
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

        {/* Grid limpio de 4 platos destacados con espaciado generoso */}
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

                  {/* Descripción corta exactas */}
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

      {/* Modal de Detalle de Platillo */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A2A2A]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F5F2ED] rounded-xs max-w-xl w-full overflow-hidden shadow-2xl border border-[#2A2A2A]/20 relative flex flex-col"
            >
              <div className="relative h-64 w-full bg-[#EADDCA]">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5F2ED]/90 text-[#2A2A2A] flex items-center justify-center hover:bg-[#D27D56] hover:text-white transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D27D56] font-medium font-sans">
                    {selectedDish.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A] mt-1 font-light">
                    {selectedDish.name}
                  </h3>
                  <p className="text-sm text-[#2A2A2A]/80 font-light mt-2 leading-relaxed">
                    {selectedDish.detailedDescription}
                  </p>
                </div>

                {/* Ingredientes clave */}
                <div className="space-y-2 pt-2 border-t border-[#2A2A2A]/10">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] font-medium">
                    <Utensils className="w-3.5 h-3.5 text-[#D27D56]" />
                    <span>Ingredientes principales</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDish.ingredients.map((ing, iIdx) => (
                      <span key={iIdx} className="text-xs bg-[#EADDCA]/50 border border-[#2A2A2A]/10 text-[#2A2A2A] px-2.5 py-1 rounded-xs">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Maridaje recomendado */}
                <div className="p-4 rounded-xs bg-white border border-[#2A2A2A]/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] font-medium">
                    <GlassWater className="w-3.5 h-3.5 text-[#D27D56]" />
                    <span>Maridaje del Sommelier</span>
                  </div>
                  <p className="text-xs text-[#2A2A2A]/80 italic font-serif">
                    "{selectedDish.pairing}"
                  </p>
                </div>

                {selectedDish.chefNote && (
                  <p className="text-xs text-[#5A5A40] font-sans italic">
                    Nota del chef: {selectedDish.chefNote}
                  </p>
                )}
              </div>

              <div className="p-6 bg-[#EADDCA]/30 border-t border-[#2A2A2A]/10 flex justify-end">
                <button
                  onClick={() => setSelectedDish(null)}
                  className="px-6 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
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
