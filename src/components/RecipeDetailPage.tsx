import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Users, Flame, CheckCircle, GlassWater, ChefHat, Lightbulb, Share2, Check, ChevronRight } from 'lucide-react';
import { RecipeItem } from '../data/recipesData';
import { fetchDbRecipes } from '../lib/supabase';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface RecipeDetailPageProps {
  recipeId: string;
  onNavigateBack: () => void;
  onOpenQuote: (serviceName?: string) => void;
  onOpenPrivacy: () => void;
  onOpenLegal: () => void;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({
  recipeId,
  onNavigateBack,
  onOpenQuote,
  onOpenPrivacy,
  onOpenLegal,
}) => {
  const [recipe, setRecipe] = useState<RecipeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      const res = await fetchDbRecipes();
      const found = res.recipes.find((r) => r.id === recipeId) || res.recipes[0];
      setRecipe(found || null);
      setLoading(false);
    }
    loadRecipe();
  }, [recipeId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToStep = (index: number) => {
    setActiveStepIndex(index);
    const element = document.getElementById(`step-card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#0A0A0A]">Cargando receta gourmet...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans flex flex-col justify-between">
        <Navbar onOpenQuote={() => onOpenQuote()} currentRoute="receta_detail" />
        <div className="py-24 text-center space-y-4 max-w-md mx-auto px-6">
          <h2 className="font-serif text-2xl">Receta no encontrada</h2>
          <button
            onClick={onNavigateBack}
            className="btn-primary"
          >
            Volver a Recetas
          </button>
        </div>
        <Footer onOpenPrivacy={onOpenPrivacy} onOpenLegal={onOpenLegal} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased flex flex-col justify-between">
      <Navbar onOpenQuote={() => onOpenQuote()} currentRoute="receta_detail" />

      <main className="pt-24 pb-20 flex-1">
        
        {/* Top Back Navigation Bar */}
        <div className="bg-[#EDEDEC]/30 border-b border-[#0A0A0A]/10 py-4 mb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
            <button
              onClick={onNavigateBack}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#0A0A0A] hover:text-[#0A0A0A] font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Catálogo de Recetas</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#0A0A0A] hover:text-[#0A0A0A] bg-white border border-[#0A0A0A]/15 px-3 py-1.5 rounded-xs transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartir receta</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Section de la Receta */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="space-y-3 max-w-3xl">
            <span className="pill-tag text-[#0A0A0A] border-[#0A0A0A]/30 bg-[#0A0A0A]/10 font-semibold">
              {recipe.category.toUpperCase()} • RECETA DE AUTOR MACEIRAS
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#0A0A0A] leading-tight">
              {recipe.title}
            </h1>

            <p className="text-base sm:text-lg text-[#0A0A0A]/70 font-light leading-relaxed">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Main Content Grid: Left Timeline (Paso a paso con línea verde pistacho) | Right Metadata & Ingredients */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* COLUMNA IZQUIERDA: LÍNEA VERDE PISTACHO INTERACTIVA Y PASOS A PASO */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="border-b border-[#0A0A0A]/20 pb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#0A0A0A] font-bold font-sans flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
                      <span>Guía Técnica del Chef</span>
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#0A0A0A] font-light mt-0.5">
                      Paso a Paso del Chef
                    </h2>
                  </div>
                  <span className="text-xs text-[#0A0A0A] font-mono bg-[#0A0A0A]/10 px-3 py-1 border border-[#0A0A0A]/20 rounded-xs font-semibold">
                    {recipe.steps.length} etapas
                  </span>
                </div>

                {/* BARRA DE NAVEGACIÓN RÁPIDA DE PASOS (PISTACHO ONSCREEN CHIPS) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#0A0A0A] font-semibold shrink-0">Ir al paso:</span>
                  {recipe.steps.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToStep(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-serif shrink-0 transition-all cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-[#0A0A0A] text-white shadow-md font-bold scale-105'
                          : 'bg-white text-[#0A0A0A]/80 border border-[#0A0A0A]/30 hover:bg-[#0A0A0A]/20'
                      }`}
                    >
                      {s.number}. {s.title.substring(0, 18)}{s.title.length > 18 ? '...' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTENEDOR CON LÍNEA VERTICAL PISTACHO 100% MATEMÁTICAMENTE CENTRADA */}
              <div className="relative space-y-6">
                
                {/* Línea vertical continua que atraviesa exactamente el centro geométrico de la columna de círculos */}
                <div className="absolute left-[19px] sm:left-[21px] top-4 bottom-4 w-[3px] bg-[#0A0A0A] rounded-full z-0" />

                {recipe.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    id={`step-card-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.06 }}
                    onClick={() => setActiveStepIndex(idx)}
                    className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start relative group cursor-pointer"
                  >
                    {/* Columna 1: Círculo con borde verde pistacho de 3px, fondo claro y número en verde pistacho */}
                    <div className="relative z-10 flex items-center justify-center shrink-0 w-10 sm:w-11">
                      <button
                        onClick={() => scrollToStep(idx)}
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full font-serif text-sm sm:text-base font-bold flex items-center justify-center bg-[#F7F7F5] border-[3px] border-[#0A0A0A] text-[#0A0A0A] transition-all duration-300 cursor-pointer ${
                          activeStepIndex === idx
                            ? 'scale-110 ring-4 ring-[#0A0A0A]/20 bg-white font-extrabold shadow-md'
                            : 'hover:scale-105 shadow-xs'
                        }`}
                        title={`Ir a Paso ${step.number}`}
                      >
                        {step.number}
                      </button>
                    </div>

                    {/* Columna 2: Ficha del paso */}
                    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                      activeStepIndex === idx
                        ? 'bg-white border-[#0A0A0A] ring-2 ring-[#0A0A0A]/20 shadow-xl'
                        : 'bg-white/90 border-[#0A0A0A]/10 hover:border-[#0A0A0A]/40 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-lg sm:text-xl text-[#0A0A0A] font-medium flex items-center gap-2">
                          <span className="text-[#0A0A0A] font-sans text-xs uppercase tracking-widest font-bold">Paso {step.number}</span>
                          <span>•</span>
                          <span>{step.title}</span>
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#0A0A0A]/85 font-light leading-relaxed whitespace-pre-line">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-4 p-3.5 rounded-xl bg-[#0A0A0A]/10 border-l-4 border-[#0A0A0A] flex items-start gap-2.5 text-xs text-[#0A0A0A]/90 font-sans">
                          <Lightbulb className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                          <span className="font-light"><strong>Consejo Maceiras:</strong> {step.tip}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* COLUMNA DERECHA: FOTO PRINCIPAL, FICHA TÉCNICA, INGREDIENTES Y CTA */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Imagen Principal */}
              <div className="relative h-64 sm:h-72 rounded-xs overflow-hidden border border-[#0A0A0A]/10 card-shadow">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xs bg-[#F7F7F5]/95 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#0A0A0A] font-bold font-sans border border-[#0A0A0A]/20">
                  {recipe.category}
                </div>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-xs bg-white border border-[#0A0A0A]/10 text-center text-xs card-shadow">
                <div className="space-y-0.5">
                  <Clock className="w-4 h-4 mx-auto text-[#0A0A0A]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5C5C5C]">Prep / Coción</div>
                  <div className="font-medium text-[#0A0A0A]">{recipe.prepTime} + {recipe.cookTime}</div>
                </div>
                <div className="space-y-0.5 border-x border-[#0A0A0A]/10">
                  <Users className="w-4 h-4 mx-auto text-[#0A0A0A]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5C5C5C]">Porciones</div>
                  <div className="font-medium text-[#0A0A0A]">{recipe.servings} personas</div>
                </div>
                <div className="space-y-0.5">
                  <Flame className="w-4 h-4 mx-auto text-[#0A0A0A]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5C5C5C]">Dificultad</div>
                  <div className="font-medium text-[#0A0A0A]">{recipe.difficulty}</div>
                </div>
              </div>

              {/* Lista de Ingredientes Requeridos */}
              <div className="bg-white p-6 rounded-xs border border-[#0A0A0A]/10 card-shadow space-y-4">
                <h3 className="font-serif text-xl text-[#0A0A0A] font-light border-b border-[#0A0A0A]/10 pb-3 flex items-center justify-between">
                  <span>Ingredientes Requeridos</span>
                  <span className="text-xs font-mono text-[#0A0A0A] font-bold">{recipe.ingredients.length} ítems</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#0A0A0A]/80 font-light">
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
                <div className="p-5 rounded-xl bg-[#0A0A0A]/10 border border-[#0A0A0A]/20 space-y-1.5 text-xs text-[#0A0A0A]/90 font-sans">
                  <div className="font-bold text-[#0A0A0A] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <ChefHat className="w-4 h-4 text-[#0A0A0A]" />
                    <span>Secreto del Chef Maceiras:</span>
                  </div>
                  <p className="italic font-light leading-relaxed">{recipe.chefNote}</p>
                </div>
              )}

              {/* CTA Destacada Principal para Contratar este Menú a Domicilio */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] via-[#5C5C5C] to-[#111111] text-[#F7F7F5] space-y-5 text-center shadow-xl border border-[#0A0A0A]/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                <div className="w-12 h-12 rounded-full bg-white/15 text-[#0A0A0A] flex items-center justify-center mx-auto shadow-inner border border-white/20">
                  <ChefHat className="w-6 h-6 text-[#F7F7F5]" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#EDEDEC] font-bold font-sans">
                    Experiencia Exclusiva a Domicilio
                  </span>
                  <h4 className="font-serif text-2xl font-light leading-snug">
                    ¿Prefieres que el chef lo prepare por ti?
                  </h4>
                  <p className="text-xs text-[#F7F7F5]/85 font-light leading-relaxed max-w-sm mx-auto">
                    Disfruta de esta propuesta gastronómica preparada en tu residencia con selección de ingredientes, montaje elegante de mesa y limpieza impecable incluida.
                  </p>
                </div>

                <button
                  onClick={() => onOpenQuote(`Menú especial: ${recipe.title}`)}
                  className="w-full py-3.5 bg-[#F7F7F5] text-[#0A0A0A] text-[14.5px] font-semibold hover:bg-white transition-all cursor-pointer rounded-full"
                >
                  Solicitar este menú a domicilio →
                </button>
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer onOpenPrivacy={onOpenPrivacy} onOpenLegal={onOpenLegal} />
    </div>
  );
};
