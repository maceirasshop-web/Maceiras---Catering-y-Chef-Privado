import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Clock, Flame, ArrowRight, X, Filter } from 'lucide-react';
import { RECIPES_DATA, RecipeItem } from '../data/recipesData';
import { fetchDbRecipes } from '../lib/supabase';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { OptimizedImage } from './OptimizedImage';
import { waLink } from '../seo/site';

interface RecipesPageProps {
  onNavigateHome: () => void;
  onNavigateToRecipeDetail: (id: string) => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const RecipesPage: React.FC<RecipesPageProps> = ({
  onNavigateToRecipeDetail,
  onOpenQuote,
}) => {
  const [recipes, setRecipes] = useState<RecipeItem[]>(RECIPES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  useEffect(() => {
    let cancelled = false;
    fetchDbRecipes().then((res) => {
      if (!cancelled && res.recipes.length > 0) {
        setRecipes(res.recipes);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      recipe.title.toLowerCase().includes(query) ||
      recipe.subtitle.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === 'todos' || recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] font-sans antialiased flex flex-col justify-between">
      <Navbar onOpenQuote={() => onOpenQuote()} />

      <main id="contenido" className="pt-24 pb-20 flex-1">
        <section className="border-b border-[#0A0A0A]/8 py-14 sm:py-20 mb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-5">
            <span className="kicker">Recetario</span>
            <h1 className="text-4xl sm:text-5xl font-medium text-[#0A0A0A] leading-tight tracking-[-0.04em] max-w-3xl">
              Técnica de autor, documentada.
            </h1>
            <p className="text-sm sm:text-base font-light text-[#5C5C5C] max-w-2xl leading-relaxed">
              Guías paso a paso de Maceiras. Cocínalas en casa o solicita al chef privado para tu velada.
            </p>

            <div className="pt-4 max-w-xl relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-4 text-[#5C5C5C]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar receta o ingrediente…"
                  className="input-pro pl-11 pr-10 py-3.5 bg-white"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 p-1 text-[#5C5C5C] hover:text-[#0A0A0A]"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#0A0A0A]/8">
            <div className="flex items-center gap-2 kicker">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtro</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todas' },
                { id: 'principales', label: 'Principales' },
                { id: 'entrantes', label: 'Entrantes' },
                { id: 'postres', label: 'Postres' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`chip ${
                    selectedCategory === cat.id
                      ? 'bg-[#0A0A0A] text-[#F7F7F5]'
                      : 'bg-white text-[#0A0A0A] border border-[#0A0A0A]/10 hover:border-[#0A0A0A]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="py-16 text-center bg-white p-8 border border-[#0A0A0A]/10 space-y-4 max-w-md mx-auto">
              <BookOpen className="w-8 h-8 text-[#0A0A0A]/25 mx-auto" />
              <h3 className="text-xl text-[#0A0A0A] font-light">Sin resultados</h3>
              <p className="text-xs text-[#5C5C5C] font-light">
                {searchTerm
                  ? `No hay recetas que coincidan con “${searchTerm}”.`
                  : 'Aún no hay recetas publicadas en esta categoría.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('todos');
                  }}
                  className="btn-primary"
                >
                  Ver todas
                </button>
                <a href={waLink('Hola, quisiera cotizar un menú o chef privado.')} className="btn-outline" target="_blank" rel="noopener noreferrer">
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  onClick={() => onNavigateToRecipeDetail(recipe.id)}
                  className="group bg-white border border-[#0A0A0A]/10 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#0A0A0A]/40 transition-colors rounded-3xl"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-[#EDEDEC]">
                      <OptimizedImage
                        src={recipe.image}
                        alt={recipe.title}
                        width={800}
                        height={560}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-[11px] text-[#0A0A0A] font-medium rounded-full">
                        {recipe.category}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="flex items-center gap-1 bg-[#0A0A0A]/80 px-2.5 py-1 text-[10px]">
                          <Clock className="w-3 h-3" />
                          {recipe.prepTime}
                        </span>
                        <span className="flex items-center gap-1 bg-[#0A0A0A]/80 px-2.5 py-1 text-[10px]">
                          <Flame className="w-3 h-3" />
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <span className="kicker !text-[11px] block">{recipe.subtitle}</span>
                      <h3 className="text-xl text-[#0A0A0A] leading-snug font-medium tracking-tight">
                        {recipe.title}
                      </h3>
                      <p className="text-xs font-light text-[#5C5C5C] leading-relaxed line-clamp-3">
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#0A0A0A]/8 text-xs">
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
