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
      <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#708238] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#708238]">Cargando receta gourmet...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans flex flex-col justify-between">
        <Navbar onOpenQuote={() => onOpenQuote()} />
        <div className="py-24 text-center space-y-4 max-w-md mx-auto px-6">
          <h2 className="font-serif text-2xl">Receta no encontrada</h2>
          <button
            onClick={onNavigateBack}
            className="px-6 py-2.5 rounded-xs bg-[#708238] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium"
          >
            Volver a Recetas
          </button>
        </div>
        <Footer onOpenPrivacy={onOpenPrivacy} onOpenLegal={onOpenLegal} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans antialiased flex flex-col justify-between">
      {/* Clean Navbar */}
      <Navbar onOpenQuote={() => onOpenQuote()} />

      <main className="pt-24 pb-20 flex-1">
        
        {/* Top Back Navigation Bar */}
        <div className="bg-[#EADDCA]/30 border-b border-[#2A2A2A]/10 py-4 mb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
            <button
              onClick={onNavigateBack}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#708238] hover:text-[#D27D56] font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Catálogo de Recetas</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#708238] hover:text-[#D27D56] bg-white border border-[#2A2A2A]/15 px-3 py-1.5 rounded-xs transition-all cursor-pointer"
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
            <span className="pill-tag text-[#708238] border-[#708238]/30 bg-[#708238]/10 font-semibold">
              {recipe.category.toUpperCase()} • RECETA DE AUTOR MACEIRAS
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#2A2A2A] leading-tight">
              {recipe.title}
            </h1>

            <p className="text-base sm:text-lg text-[#2A2A2A]/70 font-light leading-relaxed">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Main Content Grid: Left Timeline (Paso a paso con línea verde pistacho) | Right Metadata & Ingredients */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* COLUMNA IZQUIERDA: LÍNEA VERDE PISTACHO INTERACTIVA Y PASOS A PASO */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="border-b border-[#708238]/20 pb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#708238] font-bold font-sans flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#708238]" />
                      <span>Guía Técnica del Chef</span>
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A] font-light mt-0.5">
                      Paso a Paso del Chef
                    </h2>
                  </div>
                  <span className="text-xs text-[#708238] font-mono bg-[#708238]/10 px-3 py-1 border border-[#708238]/20 rounded-xs font-semibold">
                    {recipe.steps.length} etapas
                  </span>
                </div>

                {/* BARRA DE NAVEGACIÓN RÁPIDA DE PASOS (PISTACHO ONSCREEN CHIPS) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#708238] font-semibold shrink-0">Ir al paso:</span>
                  {recipe.steps.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToStep(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-serif shrink-0 transition-all cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-[#708238] text-white shadow-md font-bold scale-105'
                          : 'bg-white text-[#2A2A2A]/80 border border-[#708238]/30 hover:bg-[#708238]/20'
                      }`}
                    >
                      {s.number}. {s.title.substring(0, 18)}{s.title.length > 18 ? '...' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTENEDOR DE LÍNEA VERDE PISTACHO QUE CONECTA Y BORDEA CADA CÍRCULO */}
              <div className="relative pl-12 sm:pl-16 space-y-10">
                
                {/* Línea vertical continua color Pistacho (#708238) */}
                <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-1.5 bg-[#708238] rounded-full -z-0 shadow-xs" />

                {recipe.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    id={`step-card-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`relative space-y-3 group transition-all duration-300 ${
                      activeStepIndex === idx ? 'scale-[1.01]' : ''
                    }`}
                  >
                    {/* Círculo numerado bordeado por la línea Pistacho */}
                    <button
                      onClick={() => scrollToStep(idx)}
                      className={`absolute -left-12 sm:-left-16 top-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full font-serif text-xs sm:text-sm font-bold flex items-center justify-center shadow-lg z-10 transition-all duration-300 border-2 cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-[#708238] text-white border-white ring-4 ring-[#708238]/30 scale-110'
                          : 'bg-white text-[#708238] border-[#708238] hover:bg-[#708238] hover:text-white'
                      }`}
                      title={`Ir a Paso ${step.number}`}
                    >
                      {step.number}
                    </button>

                    {/* Tarjeta del paso */}
                    <div className={`p-6 rounded-xs border transition-all duration-300 ${
                      activeStepIndex === idx
                        ? 'bg-white border-[#708238] ring-2 ring-[#708238]/20 shadow-xl'
                        : 'bg-white/90 border-[#2A2A2A]/10 hover:border-[#708238]/40 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-lg sm:text-xl text-[#2A2A2A] font-medium flex items-center gap-2">
                          <span className="text-[#708238] font-sans text-xs uppercase tracking-widest font-bold">Paso {step.number}</span>
                          <span>•</span>
                          <span>{step.title}</span>
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#2A2A2A]/85 font-light leading-relaxed whitespace-pre-line">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-4 p-3.5 rounded-xs bg-[#708238]/10 border-l-4 border-[#708238] flex items-start gap-2.5 text-xs text-[#2A2A2A]/90 font-sans">
                          <Lightbulb className="w-4 h-4 text-[#708238] shrink-0 mt-0.5" />
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
              <div className="relative h-64 sm:h-72 rounded-xs overflow-hidden border border-[#2A2A2A]/10 card-shadow">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xs bg-[#F5F2ED]/95 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#708238] font-bold font-sans border border-[#708238]/20">
                  {recipe.category}
                </div>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-xs bg-white border border-[#2A2A2A]/10 text-center text-xs card-shadow">
                <div className="space-y-0.5">
                  <Clock className="w-4 h-4 mx-auto text-[#708238]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Prep / Coción</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.prepTime} + {recipe.cookTime}</div>
                </div>
                <div className="space-y-0.5 border-x border-[#2A2A2A]/10">
                  <Users className="w-4 h-4 mx-auto text-[#708238]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Porciones</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.servings} personas</div>
                </div>
                <div className="space-y-0.5">
                  <Flame className="w-4 h-4 mx-auto text-[#708238]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Dificultad</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.difficulty}</div>
                </div>
              </div>

              {/* Lista de Ingredientes Requeridos */}
              <div className="bg-white p-6 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-4">
                <h3 className="font-serif text-xl text-[#2A2A2A] font-light border-b border-[#2A2A2A]/10 pb-3 flex items-center justify-between">
                  <span>Ingredientes Requeridos</span>
                  <span className="text-xs font-mono text-[#708238] font-bold">{recipe.ingredients.length} ítems</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#2A2A2A]/80 font-light">
                  {recipe.ingredients.map((ing, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#708238] shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maridaje Recomendado */}
              <div className="p-5 rounded-xs bg-white border border-[#2A2A2A]/10 space-y-1.5 card-shadow">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                  <GlassWater className="w-4 h-4 text-[#708238]" />
                  <span>Maridaje del Sommelier</span>
                </div>
                <p className="text-xs text-[#2A2A2A]/80 italic font-serif leading-relaxed">
                  "{recipe.pairing}"
                </p>
              </div>

              {/* Secreto del Chef */}
              {recipe.chefNote && (
                <div className="p-5 rounded-xs bg-[#708238]/10 border border-[#708238]/20 space-y-1.5 text-xs text-[#2A2A2A]/90 font-sans">
                  <div className="font-bold text-[#708238] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <ChefHat className="w-4 h-4 text-[#708238]" />
                    <span>Secreto del Chef Maceiras:</span>
                  </div>
                  <p className="italic font-light leading-relaxed">{recipe.chefNote}</p>
                </div>
              )}

              {/* CTA para Contratar este Menú a Domicilio */}
              <div className="p-6 rounded-xs bg-[#5A5A40] text-[#F5F2ED] space-y-4 text-center shadow-lg border border-[#708238]/30">
                <div className="w-10 h-10 rounded-full bg-white/10 text-[#D27D56] flex items-center justify-center mx-auto">
                  <ChefHat className="w-5 h-5 text-[#F5F2ED]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-light">
                    ¿Prefieres que el chef lo prepare por ti?
                  </h4>
                  <p className="text-xs text-[#F5F2ED]/80 font-light leading-relaxed">
                    Disfruta de este menú preparado en tu residencia con vajilla, servicio de mesa y limpieza total incluida.
                  </p>
                </div>
                <button
                  onClick={() => onOpenQuote(`Menú especial: ${recipe.title}`)}
                  className="w-full py-3.5 rounded-xs bg-[#D27D56] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#b86440] transition-all cursor-pointer shadow-md active:scale-98"
                >
                  Solicitar este menú a domicilio
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
