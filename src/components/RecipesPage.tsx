import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Clock, Flame, ArrowRight, X, ChefHat, Filter, Sparkles } from 'lucide-react';
import { RecipeItem } from '../data/recipesData';
import { fetchDbRecipes } from '../lib/supabase';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface RecipesPageProps {
  onNavigateHome: () => void;
  onNavigateToRecipeDetail: (id: string) => void;
  onOpenQuote: (serviceName?: string) => void;
  onOpenPrivacy: () => void;
  onOpenLegal: () => void;
}

export const RecipesPage: React.FC<RecipesPageProps> = ({
  onNavigateHome,
  onNavigateToRecipeDetail,
  onOpenQuote,
  onOpenPrivacy,
  onOpenLegal,
}) => {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecipes() {
      setLoading(true);
      const res = await fetchDbRecipes();
      setRecipes(res.recipes);
      setLoading(false);
    }
    loadRecipes();
  }, []);

  // Filtered recipes
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
    <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans antialiased flex flex-col justify-between">
      {/* Clean Navbar */}
      <Navbar onOpenQuote={() => onOpenQuote()} />

      {/* Main Container */}
      <main className="pt-28 pb-20 flex-1">
        
        {/* Header Hero Section de Recetas */}
        <section className="bg-[#EADDCA]/30 border-b border-[#2A2A2A]/10 py-12 sm:py-16 mb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-4">
            <span className="pill-tag text-[#5A5A40] border-[#2A2A2A]/15 bg-white/60 inline-flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-[#D27D56]" />
              <span>Saber Culinario & Recetas de Autor</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#2A2A2A] leading-tight">
              Recetario Gourmet <span className="italic font-normal text-[#D27D56]">Maceiras</span>
            </h1>

            <p className="text-sm sm:text-base font-light text-[#2A2A2A]/70 max-w-2xl mx-auto leading-relaxed">
              Explora nuestras técnicas culinarias exclusivas, explicadas paso a paso con la guía técnica del chef. Prepara las recetas en tu hogar o solicita a nuestro chef privado para tu velada.
            </p>

            {/* BARRA DE BÚSQUEDA INTERACTIVA SUPERIOR */}
            <div className="pt-4 max-w-xl mx-auto relative">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 absolute left-4 text-[#5A5A40]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar receta, ingrediente o plato (Ej. Wellington, Risotto, Carpaccio)..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-xs bg-white border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] focus:ring-1 focus:ring-[#D27D56] shadow-sm transition-all placeholder:text-[#2A2A2A]/50"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 p-1 text-[#2A2A2A]/50 hover:text-[#2A2A2A]"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Controls Bar: Category Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#2A2A2A]/10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] font-medium">
              <Filter className="w-4 h-4 text-[#D27D56]" />
              <span>Categorías:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todas las Recetas' },
                { id: 'principales', label: 'Platos Principales' },
                { id: 'entrantes', label: 'Entrantes' },
                { id: 'postres', label: 'Postres' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xs text-[11px] uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#5A5A40] text-[#F5F2ED] shadow-sm'
                      : 'bg-white text-[#2A2A2A]/80 border border-[#2A2A2A]/10 hover:bg-[#EADDCA]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Cards Grid */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#D27D56] border-t-transparent animate-spin mx-auto" />
              <p className="text-xs uppercase tracking-widest text-[#5A5A40]">Cargando recetas de autor...</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="py-16 text-center bg-white p-8 rounded-xs border border-[#2A2A2A]/10 space-y-4 max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-[#EADDCA] mx-auto" />
              <h3 className="font-serif text-xl text-[#2A2A2A]">No se encontraron recetas</h3>
              <p className="text-xs text-[#2A2A2A]/70 font-light">
                No hay recetas que coincidan con "{searchTerm}". Intenta con otros términos o limpia el filtro.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                }}
                className="px-6 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors"
              >
                Ver todas las recetas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => onNavigateToRecipeDetail(recipe.id)}
                  className="group bg-white rounded-xs border border-[#2A2A2A]/10 overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative h-60 w-full overflow-hidden bg-[#EADDCA]">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-xs bg-[#F5F2ED]/95 backdrop-blur-xs text-[10px] uppercase tracking-widest text-[#5A5A40] font-medium font-sans border border-[#2A2A2A]/10">
                        {recipe.category}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#F5F2ED] text-xs font-sans">
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
                    <div className="p-6 sm:p-7 space-y-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#D27D56] font-sans font-medium block">
                        {recipe.subtitle}
                      </span>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#2A2A2A] group-hover:text-[#D27D56] transition-colors leading-snug font-light">
                        {recipe.title}
                      </h3>

                      <p className="text-xs font-sans text-[#2A2A2A]/70 font-light leading-relaxed line-clamp-3">
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-[#2A2A2A]/10 text-xs font-sans">
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
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer onOpenPrivacy={onOpenPrivacy} onOpenLegal={onOpenLegal} />
    </div>
  );
};
