import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Users, Flame, CheckCircle, GlassWater, ChefHat, Lightbulb, BookOpen, Share2, Check } from 'lucide-react';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#D27D56] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#5A5A40]">Cargando receta gourmet...</p>
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
            className="px-6 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium"
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
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] hover:text-[#D27D56] font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Catálogo de Recetas</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#5A5A40] hover:text-[#D27D56] bg-white border border-[#2A2A2A]/15 px-3 py-1.5 rounded-xs transition-all cursor-pointer"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <div className="space-y-3 max-w-3xl">
            <span className="pill-tag text-[#5A5A40] border-[#2A2A2A]/15 bg-white/60">
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

        {/* Main Content Grid: Left Timeline (Paso a paso) | Right Metadata & Ingredients */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* COLUMNA IZQUIERDA: LÍNEA DE TIEMPO VERTICAL CON CÍRCULOS (PASO A PASO) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="border-b border-[#2A2A2A]/10 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium font-sans">
                    Guía Técnica de Preparación
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A] font-light">
                    Paso a Paso del Chef
                  </h2>
                </div>
                <span className="text-xs text-[#5A5A40] font-mono bg-white px-3 py-1 border border-[#2A2A2A]/10 rounded-xs">
                  {recipe.steps.length} etapas
                </span>
              </div>

              {/* Contenedor de la línea vertical continua */}
              <div className="relative pl-10 sm:pl-14 space-y-8">
                {/* Línea vertical continua que une todos los círculos numerados */}
                <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-0.5 bg-[#D27D56]/30 -z-0" />

                {recipe.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative space-y-3 group"
                  >
                    {/* Círculo numerado sobre la línea vertical */}
                    <div className="absolute -left-10 sm:-left-14 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#5A5A40] text-[#F5F2ED] font-serif text-xs sm:text-sm font-semibold flex items-center justify-center border-2 border-[#F5F2ED] shadow-md z-10 transition-transform group-hover:scale-105 group-hover:bg-[#D27D56]">
                      {step.number}
                    </div>

                    {/* Ficha del paso */}
                    <div className="bg-white p-6 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-3">
                      <h3 className="font-serif text-lg sm:text-xl text-[#2A2A2A] font-normal">
                        Paso {step.number}: {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#2A2A2A]/80 font-light leading-relaxed whitespace-pre-line">
                        {step.instruction}
                      </p>

                      {step.tip && (
                        <div className="mt-3 p-3.5 rounded-xs bg-[#EADDCA]/30 border-l-2 border-[#D27D56] flex items-start gap-2.5 text-xs text-[#2A2A2A]/80 font-sans">
                          <Lightbulb className="w-4 h-4 text-[#D27D56] shrink-0 mt-0.5" />
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
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xs bg-[#F5F2ED]/95 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#5A5A40] font-medium font-sans border border-[#2A2A2A]/10">
                  {recipe.category}
                </div>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-xs bg-white border border-[#2A2A2A]/10 text-center text-xs card-shadow">
                <div className="space-y-0.5">
                  <Clock className="w-4 h-4 mx-auto text-[#D27D56]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Prep / Coción</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.prepTime} + {recipe.cookTime}</div>
                </div>
                <div className="space-y-0.5 border-x border-[#2A2A2A]/10">
                  <Users className="w-4 h-4 mx-auto text-[#D27D56]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Porciones</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.servings} personas</div>
                </div>
                <div className="space-y-0.5">
                  <Flame className="w-4 h-4 mx-auto text-[#D27D56]" />
                  <div className="text-[10px] uppercase tracking-wider text-[#5A5A40]">Dificultad</div>
                  <div className="font-medium text-[#2A2A2A]">{recipe.difficulty}</div>
                </div>
              </div>

              {/* Lista de Ingredientes Requeridos */}
              <div className="bg-white p-6 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-4">
                <h3 className="font-serif text-xl text-[#2A2A2A] font-light border-b border-[#2A2A2A]/10 pb-3">
                  Ingredientes Requeridos
                </h3>
                <ul className="space-y-2.5 text-xs text-[#2A2A2A]/80 font-light">
                  {recipe.ingredients.map((ing, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#D27D56] shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maridaje Recomendado */}
              <div className="p-5 rounded-xs bg-white border border-[#2A2A2A]/10 space-y-1.5 card-shadow">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                  <GlassWater className="w-4 h-4 text-[#D27D56]" />
                  <span>Maridaje del Sommelier</span>
                </div>
                <p className="text-xs text-[#2A2A2A]/80 italic font-serif leading-relaxed">
                  "{recipe.pairing}"
                </p>
              </div>

              {/* Secreto del Chef */}
              {recipe.chefNote && (
                <div className="p-5 rounded-xs bg-[#EADDCA]/40 border border-[#2A2A2A]/10 space-y-1.5 text-xs text-[#2A2A2A]/80 font-sans">
                  <div className="font-medium text-[#5A5A40] flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-[#D27D56]" />
                    <span>Secreto del Chef Maceiras:</span>
                  </div>
                  <p className="italic font-light leading-relaxed">{recipe.chefNote}</p>
                </div>
              )}

              {/* CTA para Contratar este Menú a Domicilio */}
              <div className="p-6 rounded-xs bg-[#5A5A40] text-[#F5F2ED] space-y-4 text-center shadow-lg">
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
