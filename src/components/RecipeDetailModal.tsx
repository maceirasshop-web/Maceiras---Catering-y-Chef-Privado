import React from 'react';
import { motion } from 'motion/react';
import { X, Clock, Users, Flame, CheckCircle, GlassWater, ChefHat, Sparkles, Lightbulb } from 'lucide-react';
import { RecipeItem } from '../data/recipesData';

interface RecipeDetailModalProps {
  recipe: RecipeItem | null;
  onClose: () => void;
  onSelectForQuote: (recipeTitle: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onSelectForQuote,
}) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A2A2A]/75 backdrop-blur-md font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-[#F5F2ED] rounded-xs max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#2A2A2A]/20 overflow-hidden relative"
      >
        {/* Top Sticky Header */}
        <div className="bg-[#2A2A2A] text-[#F5F2ED] px-6 py-4 flex items-center justify-between border-b border-[#F5F2ED]/10 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-[#D27D56]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#EADDCA]/70 block font-sans">
                Receta de Alta Gastronomía Maceiras
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-light text-[#F5F2ED] leading-tight">
                {recipe.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#F5F2ED] transition-colors cursor-pointer"
            aria-label="Cerrar receta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Grid: Left Column = Timeline Paso a Paso | Right Column = Info, Ingredientes & CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            
            {/* COLUMNA IZQUIERDA: LÍNEA DE TIEMPO VERTICAL CON CÍRCULOS (PASO A PASO) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="border-b border-[#2A2A2A]/10 pb-4 space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium">
                  Guía Técnica del Chef
                </span>
                <h3 className="font-serif text-2xl text-[#2A2A2A] font-light">
                  Preparación Paso a Paso
                </h3>
              </div>

              {/* Contenedor de la línea vertical continua */}
              <div className="relative pl-10 sm:pl-14 space-y-8">
                {/* Línea vertical continua que conecta todos los círculos */}
                <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-0.5 bg-[#D27D56]/30 -z-0" />

                {recipe.steps.map((step, idx) => (
                  <div key={idx} className="relative space-y-2 group">
                    {/* Círculo numerado en la línea a la izquierda */}
                    <div className="absolute -left-10 sm:-left-14 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#5A5A40] text-[#F5F2ED] font-serif text-xs sm:text-sm font-semibold flex items-center justify-center border-2 border-[#F5F2ED] shadow-md z-10 transition-transform group-hover:scale-105 group-hover:bg-[#D27D56]">
                      {step.number}
                    </div>

                    {/* Contenido del paso */}
                    <div className="bg-white p-5 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base sm:text-lg text-[#2A2A2A] font-normal">
                          Paso {step.number}: {step.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-[#2A2A2A]/80 font-light leading-relaxed">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-3 p-3 rounded-xs bg-[#EADDCA]/30 border-l-2 border-[#D27D56] flex items-start gap-2 text-xs text-[#2A2A2A]/80">
                          <Lightbulb className="w-4 h-4 text-[#D27D56] shrink-0 mt-0.5" />
                          <span className="font-light"><strong>Consejo Maceiras:</strong> {step.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMNA DERECHA: FOTO, METADATOS, INGREDIENTES Y CTA */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Imagen Principal */}
              <div className="relative h-56 sm:h-64 rounded-xs overflow-hidden border border-[#2A2A2A]/10 card-shadow">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xs bg-[#F5F2ED]/90 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#5A5A40] font-medium font-sans border border-[#2A2A2A]/10">
                  {recipe.category}
                </div>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-xs bg-white border border-[#2A2A2A]/10 text-center text-xs">
                <div className="space-y-0.5">
                  <Clock className="w-4 h-4 mx-auto text-[#D27D56]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Prep / Coción</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.prepTime} + {recipe.cookTime}</div>
                </div>
                <div className="space-y-0.5 border-x border-[#2A2A2A]/10">
                  <Users className="w-4 h-4 mx-auto text-[#D27D56]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Porciones</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.servings} comensales</div>
                </div>
                <div className="space-y-0.5">
                  <Flame className="w-4 h-4 mx-auto text-[#D27D56]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Dificultad</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.difficulty}</div>
                </div>
              </div>

              {/* Ingredientes */}
              <div className="bg-white p-5 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-3">
                <h4 className="font-serif text-lg text-[#2A2A2A] font-light border-b border-[#2A2A2A]/10 pb-2">
                  Ingredientes Requeridos
                </h4>
                <ul className="space-y-2 text-xs text-[#2A2A2A]/80 font-light">
                  {recipe.ingredients.map((ing, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#D27D56] shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maridaje Recomendado */}
              <div className="p-4 rounded-xs bg-white border border-[#2A2A2A]/10 space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                  <GlassWater className="w-4 h-4 text-[#D27D56]" />
                  <span>Maridaje del Sommelier</span>
                </div>
                <p className="text-xs text-[#2A2A2A]/80 italic font-serif">
                  "{recipe.pairing}"
                </p>
              </div>

              {/* Nota secreta del chef */}
              {recipe.chefNote && (
                <div className="p-4 rounded-xs bg-[#EADDCA]/40 border border-[#2A2A2A]/10 space-y-1 text-xs text-[#2A2A2A]/80 font-sans">
                  <div className="font-medium text-[#5A5A40]">Secreto del Chef:</div>
                  <p className="italic font-light">{recipe.chefNote}</p>
                </div>
              )}

              {/* CTA para contratar al Chef */}
              <div className="p-6 rounded-xs bg-[#5A5A40] text-[#F5F2ED] space-y-3 text-center">
                <h4 className="font-serif text-xl font-light">
                  ¿Prefieres disfrutar sin cocinar?
                </h4>
                <p className="text-xs text-[#F5F2ED]/80 font-light">
                  Nuestro chef privado prepara este plato en tu residencia con servicio completo.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onSelectForQuote(recipe.title);
                  }}
                  className="w-full py-3 rounded-xs bg-[#D27D56] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#b86440] transition-colors cursor-pointer shadow-md"
                >
                  Solicitar este menú a domicilio
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 bg-[#F5F2ED] border-t border-[#2A2A2A]/10 flex justify-end shrink-0 z-20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
          >
            Cerrar Receta
          </button>
        </div>
      </motion.div>
    </div>
  );
};
