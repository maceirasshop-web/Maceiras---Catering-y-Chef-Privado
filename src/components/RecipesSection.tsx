import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Flame, ArrowRight, ArrowUpRight } from 'lucide-react';
import { RECIPES_DATA, RecipeItem } from '../data/recipesData';
import { Link } from 'react-router-dom';
import { RecipeDetailModal } from './RecipeDetailModal';
import { OptimizedImage } from './OptimizedImage';

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
    <section id="recetas" className="py-24 bg-white relative border-t border-[#0A0A0A]/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="kicker">Recetas</span>
            <h2 className="text-3xl sm:text-4xl text-[#0A0A0A] font-medium leading-tight tracking-[-0.03em]">
              Técnica, explicada paso a paso
            </h2>
            <p className="text-[#5C5C5C] font-light text-base">
              Guías de cocina de Maceiras. Prepáralas en casa o solicita al chef en tu residencia.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <Link
              to="/recetas"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0A0A0A] hover:opacity-60 transition-opacity"
            >
              Catálogo completo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todas' },
                { id: 'principales', label: 'Principales' },
                { id: 'entrantes', label: 'Entrantes' },
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              onClick={() => setSelectedRecipe(recipe)}
              className="group bg-white border border-[#0A0A0A]/10 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#0A0A0A]/40 transition-colors rounded-3xl"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-[#EDEDEC]">
                  <OptimizedImage
                    src={recipe.image}
                    alt={recipe.title}
                    width={800}
                    height={640}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/95 text-[11px] text-[#0A0A0A] font-medium rounded-full">
                    {recipe.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 bg-[#0A0A0A]/80 px-2.5 py-1 text-[10px] rounded-full">
                      <Clock className="w-3 h-3" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1 bg-[#0A0A0A]/80 px-2.5 py-1 text-[10px] rounded-full">
                      <Flame className="w-3 h-3" />
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <span className="kicker !text-[11px]">{recipe.subtitle}</span>
                  <h3 className="text-2xl text-[#0A0A0A] leading-tight font-light tracking-tight">
                    {recipe.title}
                  </h3>
                  <p className="text-sm font-light text-[#5C5C5C] leading-relaxed line-clamp-3">
                    {recipe.description}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 flex items-center justify-between border-t border-[#0A0A0A]/8 mt-2 text-xs">
                <span className="inline-flex items-center gap-2 text-[14px] text-[#0A0A0A] font-medium">
                  Ver receta
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-[10px] text-[#0A0A0A]/40">
                  {recipe.steps.length} pasos
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onSelectForQuote={onSelectForQuote}
      />
    </section>
  );
};
