import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, Users, Flame, ArrowRight, ChefHat } from 'lucide-react';
import { RECIPES_DATA, RecipeItem } from '../data/recipesData';
import { RecipeDetailModal } from './RecipeDetailModal';

interface RecipesSectionProps {
  onSelectForQuote: (recipeTitle: string) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({ onSelectForQuote }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filteredRecipes = activeCategory === 'todos'
    ? RECIPES_DATA
    : RECIPES_DATA.filter(r => r.category === activeCategory);

  return (
    <section id="recetas" className="py-24 bg-[#F5F2ED] relative border-t border-[#2A2A2A]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium font-sans flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Saber Culinario & Recetas</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2A2A] font-light leading-tight">
              Técnica y sabor <span className="italic font-normal">explicados paso a paso</span>
            </h2>
            <p className="text-[#2A2A2A]/70 font-sans font-light text-base">
              Explora las guías de alta cocina de Maceiras. Aprende la preparación detallada de nuestras especialidades o solicita al chef en tu hogar.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'principales', label: 'Principales' },
              { id: 'entrantes', label: 'Entrantes' },
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

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              onClick={() => setSelectedRecipe(recipe)}
              className="group bg-white rounded-xs border border-[#2A2A2A]/10 overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-[#EADDCA]">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-xs bg-[#F5F2ED]/90 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#5A5A40] font-medium font-sans border border-[#2A2A2A]/10">
                    {recipe.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F5F2ED] text-xs font-sans">
                    <span className="flex items-center gap-1 bg-[#5A5A40]/80 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px]">
                      <Clock className="w-3 h-3 text-[#D27D56]" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1 bg-[#5A5A40]/80 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px]">
                      <Flame className="w-3 h-3 text-[#D27D56]" />
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8 space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#D27D56] font-sans font-medium">
                    {recipe.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl text-[#2A2A2A] group-hover:text-[#D27D56] transition-colors leading-tight font-light">
                    {recipe.title}
                  </h3>

                  <p className="text-xs font-sans text-[#2A2A2A]/70 font-light leading-relaxed line-clamp-3">
                    {recipe.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-8 pb-8 pt-2 flex items-center justify-between border-t border-[#2A2A2A]/10 mt-4 text-xs font-sans">
                <span className="inline-flex items-center gap-2 uppercase tracking-widest text-[#5A5A40] group-hover:text-[#D27D56] font-medium transition-colors">
                  <span>Ver Receta Paso a Paso</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>

                <span className="text-[10px] text-[#2A2A2A]/50 font-mono">
                  {recipe.steps.length} pasos
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onSelectForQuote={onSelectForQuote}
      />
    </section>
  );
};
