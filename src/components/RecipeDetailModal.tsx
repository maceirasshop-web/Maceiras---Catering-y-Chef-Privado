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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A0A0A]/75 backdrop-blur-md font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-[#F7F7F5] rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#0A0A0A]/20 overflow-hidden relative"
      >
        {/* Top Sticky Header */}
        <div className="bg-[#0A0A0A] text-[#F7F7F5] px-6 py-4 flex items-center justify-between border-b border-[#F7F7F5]/10 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-[#F7F7F5] flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#EDEDEC]/70 block font-sans">
                Receta de Alta Gastronomía Maceiras
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-light text-[#F7F7F5] leading-tight">
                {recipe.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#F7F7F5] transition-colors cursor-pointer"
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
              
              <div className="border-b border-[#0A0A0A]/20 pb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#0A0A0A] font-bold">
                    Guía Técnica del Chef
                  </span>
                  <span className="text-xs font-mono text-[#0A0A0A] font-bold">
                    {recipe.steps.length} etapas
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#0A0A0A] font-light">
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
                          ? 'bg-[#0A0A0A] text-white shadow-sm font-bold'
                          : 'bg-white text-[#0A0A0A]/80 border border-[#0A0A0A]/30 hover:bg-[#0A0A0A]/20'
                      }`}
                    >
                      {s.number}. {s.title.substring(0, 15)}..
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTENEDOR CON LÍNEA VERTICAL PISTACHO 100% MATEMÁTICAMENTE CENTRADA */}
              <div className="relative space-y-6">
                
                {/* Línea vertical continua que atraviesa exactamente el centro geométrico de la columna de círculos */}
                <div className="absolute left-[19px] sm:left-[21px] top-4 bottom-4 w-[3px] bg-[#0A0A0A] rounded-full z-0" />

                {recipe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    id={`modal-step-card-${idx}`}
                    onClick={() => setActiveStepIndex(idx)}
                    className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start relative group cursor-pointer"
                  >
                    {/* Columna 1: Círculo ahuecado con borde verde pistacho de 3px y número interno en verde pistacho */}
                    <div className="relative z-10 flex items-center justify-center shrink-0 w-10 sm:w-11">
                      <button
                        onClick={() => scrollToModalStep(idx)}
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full font-serif text-sm sm:text-base font-bold flex items-center justify-center bg-[#F7F7F5] border-[3px] border-[#0A0A0A] text-[#0A0A0A] transition-all duration-300 cursor-pointer ${
                          activeStepIndex === idx
                            ? 'scale-110 ring-4 ring-[#0A0A0A]/20 bg-white font-extrabold shadow-md'
                            : 'hover:scale-105 shadow-xs'
                        }`}
                      >
                        {step.number}
                      </button>
                    </div>

                    {/* Columna 2: Ficha del paso */}
                    <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                      activeStepIndex === idx
                        ? 'bg-white border-[#0A0A0A] ring-2 ring-[#0A0A0A]/20 shadow-md'
                        : 'bg-white/90 border-[#0A0A0A]/10 hover:border-[#0A0A0A]/40'
                    }`}>
                      <h4 className="font-serif text-base sm:text-lg text-[#0A0A0A] font-normal mb-1">
                        Paso {step.number}: {step.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#0A0A0A]/85 font-light leading-relaxed">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-3 p-3 rounded-xl bg-[#0A0A0A]/10 border-l-4 border-[#0A0A0A] flex items-start gap-2 text-xs text-[#0A0A0A]/90">
                          <Lightbulb className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
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
              <div className="relative h-56 sm:h-64 rounded-xs overflow-hidden border border-[#0A0A0A]/10 card-shadow">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xs bg-[#F7F7F5]/90 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#0A0A0A] font-bold font-sans border border-[#0A0A0A]/20">
                  {recipe.category}
                </div>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-xs bg-white border border-[#0A0A0A]/10 text-center text-xs">
                <div className="space-y-0.5">
                  <Clock className="w-4 h-4 mx-auto text-[#0A0A0A]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5C5C5C]">Prep / Coción</div>
                  <div className="font-medium text-[#0A0A0A]">{recipe.prepTime} + {recipe.cookTime}</div>
                </div>
                <div className="space-y-0.5 border-x border-[#0A0A0A]/10">
                  <Users className="w-4 h-4 mx-auto text-[#0A0A0A]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5C5C5C]">Porciones</div>
                  <div className="font-medium text-[#0A0A0A]">{recipe.servings} comensales</div>
                </div>
                <div className="space-y-0.5">
                  <Flame className="w-4 h-4 mx-auto text-[#0A0A0A]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5C5C5C]">Dificultad</div>
                  <div className="font-medium text-[#0A0A0A]">{recipe.difficulty}</div>
                </div>
              </div>

              {/* Ingredientes */}
              <div className="bg-white p-5 rounded-xs border border-[#0A0A0A]/10 card-shadow space-y-3">
                <h4 className="font-serif text-lg text-[#0A0A0A] font-light border-b border-[#0A0A0A]/10 pb-2">
                  Ingredientes Requeridos
                </h4>
                <ul className="space-y-2 text-xs text-[#0A0A0A]/80 font-light">
                  {recipe.ingredients.map((ing, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secreto del Chef */}
              {recipe.chefNote && (
                <div className="p-4 rounded-xl bg-[#0A0A0A]/10 border border-[#0A0A0A]/20 space-y-1 text-xs text-[#0A0A0A]/90 font-sans">
                  <div className="font-bold text-[#0A0A0A]">Secreto del Chef:</div>
                  <p className="italic font-light">{recipe.chefNote}</p>
                </div>
              )}

              {/* CTA Destacada Principal para Contratar este Menú a Domicilio */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0A0A0A] via-[#5C5C5C] to-[#111111] text-[#F7F7F5] space-y-4 text-center shadow-xl border border-[#0A0A0A]/40 relative overflow-hidden group">
                <div className="w-10 h-10 rounded-full bg-white/15 text-[#0A0A0A] flex items-center justify-center mx-auto shadow-inner border border-white/20">
                  <ChefHat className="w-5 h-5 text-[#F7F7F5]" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#EDEDEC] font-bold font-sans block">
                    Experiencia Exclusiva a Domicilio
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-light leading-snug">
                    ¿Prefieres que el chef lo prepare por ti?
                  </h4>
                  <p className="text-xs text-[#F7F7F5]/85 font-light leading-relaxed">
                    Disfruta de este menú preparado en tu residencia con selección de ingredientes y servicio completo.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onSelectForQuote(`Menú especial: ${recipe.title}`);
                  }}
                  className="w-full py-3.5 bg-[#F7F7F5] text-[#0A0A0A] text-[14.5px] font-semibold hover:bg-white transition-all cursor-pointer rounded-full"
                >
                  Solicitar este menú a domicilio →
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 bg-[#F7F7F5] border-t border-[#0A0A0A]/10 flex justify-end shrink-0 z-20">
          <button
            onClick={onClose}
            className="btn-primary !py-2.5 !px-6"
          >
            Cerrar Receta
          </button>
        </div>
      </motion.div>
    </div>
  );
};
