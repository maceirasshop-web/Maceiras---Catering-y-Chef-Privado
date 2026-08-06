import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Clock, Users, Flame, CheckCircle, GlassWater, ChefHat, Lightbulb } from 'lucide-react';
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
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  if (!recipe) return null;

  const scrollToModalStep = (index: number) => {
    setActiveStepIndex(index);
    const element = document.getElementById(`modal-step-card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
            <div className="w-8 h-8 rounded-full bg-[#708238] text-[#F5F2ED] flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
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
            
            {/* COLUMNA IZQUIERDA: LÍNEA VERDE PISTACHO Y NAVEGACIÓN PASO A PASO */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="border-b border-[#708238]/20 pb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#708238] font-bold">
                    Guía Técnica del Chef
                  </span>
                  <span className="text-xs font-mono text-[#708238] font-bold">
                    {recipe.steps.length} etapas
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#2A2A2A] font-light">
                  Preparación Paso a Paso
                </h3>

                {/* BARRA NAVEGACIÓN RÁPIDA PISTACHO */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                  {recipe.steps.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToModalStep(idx)}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-serif shrink-0 transition-all cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-[#708238] text-white shadow-sm font-bold'
                          : 'bg-white text-[#2A2A2A]/80 border border-[#708238]/30 hover:bg-[#708238]/20'
                      }`}
                    >
                      {s.number}. {s.title.substring(0, 15)}..
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTENEDOR LÍNEA VERDE PISTACHO QUE CONECTA LOS CÍRCULOS */}
              <div className="relative pl-12 sm:pl-16 space-y-8">
                
                {/* Línea vertical continua color Pistacho (#708238) */}
                <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-1.5 bg-[#708238] rounded-full -z-0" />

                {recipe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    id={`modal-step-card-${idx}`}
                    onClick={() => setActiveStepIndex(idx)}
                    className="relative space-y-2 group cursor-pointer"
                  >
                    {/* Círculo numerado bordeado por la línea Pistacho */}
                    <button
                      onClick={() => scrollToModalStep(idx)}
                      className={`absolute -left-12 sm:-left-16 top-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full font-serif text-xs sm:text-sm font-bold flex items-center justify-center shadow-md z-10 transition-all duration-300 border-2 ${
                        activeStepIndex === idx
                          ? 'bg-[#708238] text-white border-white ring-4 ring-[#708238]/30 scale-110'
                          : 'bg-white text-[#708238] border-[#708238] hover:bg-[#708238] hover:text-white'
                      }`}
                    >
                      {step.number}
                    </button>

                    {/* Ficha del paso */}
                    <div className={`p-5 rounded-xs border transition-all duration-300 ${
                      activeStepIndex === idx
                        ? 'bg-white border-[#708238] ring-2 ring-[#708238]/20 shadow-md'
                        : 'bg-white/90 border-[#2A2A2A]/10 hover:border-[#708238]/40'
                    }`}>
                      <h4 className="font-serif text-base sm:text-lg text-[#2A2A2A] font-normal mb-1">
                        Paso {step.number}: {step.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#2A2A2A]/80 font-light leading-relaxed">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-3 p-3 rounded-xs bg-[#708238]/10 border-l-4 border-[#708238] flex items-start gap-2 text-xs text-[#2A2A2A]/90">
                          <Lightbulb className="w-4 h-4 text-[#708238] shrink-0 mt-0.5" />
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
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xs bg-[#F5F2ED]/90 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#708238] font-bold font-sans border border-[#708238]/20">
                  {recipe.category}
                </div>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-xs bg-white border border-[#2A2A2A]/10 text-center text-xs">
                <div className="space-y-0.5">
                  <Clock className="w-4 h-4 mx-auto text-[#708238]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Prep / Coción</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.prepTime} + {recipe.cookTime}</div>
                </div>
                <div className="space-y-0.5 border-x border-[#2A2A2A]/10">
                  <Users className="w-4 h-4 mx-auto text-[#708238]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Porciones</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.servings} comensales</div>
                </div>
                <div className="space-y-0.5">
                  <Flame className="w-4 h-4 mx-auto text-[#708238]" />
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
                      <CheckCircle className="w-4 h-4 text-[#708238] shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maridaje Recomendado */}
              <div className="p-4 rounded-xs bg-white border border-[#2A2A2A]/10 space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                  <GlassWater className="w-4 h-4 text-[#708238]" />
                  <span>Maridaje del Sommelier</span>
                </div>
                <p className="text-xs text-[#2A2A2A]/80 italic font-serif">
                  "{recipe.pairing}"
                </p>
              </div>

              {/* Nota secreta del chef */}
              {recipe.chefNote && (
                <div className="p-4 rounded-xs bg-[#708238]/10 border border-[#708238]/20 space-y-1 text-xs text-[#2A2A2A]/90 font-sans">
                  <div className="font-bold text-[#708238]">Secreto del Chef:</div>
                  <p className="italic font-light">{recipe.chefNote}</p>
                </div>
              )}

              {/* CTA para contratar al Chef */}
              <div className="p-6 rounded-xs bg-[#5A5A40] text-[#F5F2ED] space-y-3 text-center border border-[#708238]/30">
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
            className="px-6 py-2.5 rounded-xs bg-[#708238] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#5A5A40] transition-colors cursor-pointer"
          >
            Cerrar Receta
          </button>
        </div>
      </motion.div>
    </div>
  );
};
