import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Plus, Minus, Check, ArrowRight, Sparkles, UtensilsCrossed, Wine, ChefHat, Trash2 } from 'lucide-react';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData';

export interface SelectedItemState {
  product: CatalogProduct;
  quantity: number;
}

interface MenuBuilderSectionProps {
  onProceedToQuote: (selectedItems: SelectedItemState[]) => void;
}

export const MenuBuilderSection: React.FC<MenuBuilderSectionProps> = ({ onProceedToQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleIncrement = (id: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: current - 1
      };
    });
  };

  const handleResetSelection = () => {
    setQuantities({});
  };

  // Filtered products list
  const filteredProducts = selectedCategory === 'todos'
    ? CATALOG_PRODUCTS
    : CATALOG_PRODUCTS.filter(p => p.category === selectedCategory);

  // Compute selected items list
  const selectedItemsList: SelectedItemState[] = Object.keys(quantities)
    .map(id => {
      const product = CATALOG_PRODUCTS.find(p => p.id === id);
      return product ? { product, quantity: quantities[id] } : null;
    })
    .filter((item): item is SelectedItemState => item !== null && item.quantity > 0);

  const totalSelectedCount = selectedItemsList.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <section id="arma-tu-menu" className="py-24 bg-[#FAF8F5] relative border-t border-[#708238]/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="pill-tag text-[#708238] border-[#708238]/30 bg-[#708238]/10 font-bold inline-flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Cotizador Interactivo de Productos</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2937] font-light leading-tight">
              Arma tu menú <span className="italic font-normal text-[#E07A5F]">a la medida</span>
            </h2>

            <p className="text-sm sm:text-base font-light text-[#1F2937]/75 leading-relaxed">
              Selecciona tus canapés, almuerzos ejecutivos o estaciones gastronómicas favoritas. Añade las cantidades que necesitas y envía tu cotización itemizada en un solo clic.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'todos', label: 'Todos los Productos' },
              { id: 'canapes', label: 'Canapés & Finger Food' },
              { id: 'almuerzos', label: 'Almuerzos & Banquetes' },
              { id: 'estaciones', label: 'Estaciones en Vivo' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#708238] text-white shadow-md'
                    : 'bg-white text-[#1F2937]/80 border border-[#708238]/20 hover:bg-[#708238]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => {
            const qty = quantities[product.id] || 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  qty > 0
                    ? 'border-[#708238] ring-2 ring-[#708238]/20 shadow-xl'
                    : 'border-[#1F2937]/10 hover:border-[#708238]/40 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#F3E9DC]">
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#E07A5F] text-white text-[10px] uppercase tracking-widest font-semibold shadow-sm">
                        {product.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] uppercase tracking-wider text-[#708238] font-bold">
                      {product.subtitle}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl text-[#1F2937] font-normal leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-xs font-sans text-[#1F2937]/75 font-light leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    <div className="pt-1 text-[11px] font-mono text-[#708238] font-semibold">
                      {product.unitText}
                    </div>
                  </div>
                </div>

                {/* Counter Footer Controls */}
                <div className="p-5 pt-2 border-t border-[#1F2937]/10 flex items-center justify-between bg-[#FAF8F5]/50">
                  {qty === 0 ? (
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="w-full py-2.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#5A5A40] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar al Menú</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-[#708238] font-sans">
                        {qty} {qty === 1 ? 'porción' : 'porciones'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrement(product.id)}
                          className="w-8 h-8 rounded-full bg-white text-[#1F2937] border border-[#1F2937]/20 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Disminuir porción"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-sm text-[#1F2937]">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleIncrement(product.id)}
                          className="w-8 h-8 rounded-full bg-[#708238] text-white flex items-center justify-center hover:bg-[#5A5A40] transition-colors cursor-pointer shadow-sm"
                          aria-label="Aumentar porción"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* FLOATING LIVE SUMMARY DRAWER / ACTION BAR */}
      <AnimatePresence>
        {totalSelectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-md w-full"
          >
            <div className="bg-[#1F2937] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#708238]/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#708238] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {totalSelectedCount}
                  </div>
                  <div>
                    <div className="font-serif text-base font-light text-white leading-tight">
                      Selección de Menú Personalizado
                    </div>
                    <div className="text-[10px] text-[#EADDCA] font-mono">
                      {selectedItemsList.length} {selectedItemsList.length === 1 ? 'producto elegido' : 'productos elegidos'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleResetSelection}
                  className="text-[10px] uppercase text-white/60 hover:text-red-400 font-mono underline"
                  title="Vaciar selección"
                >
                  Vaciar
                </button>
              </div>

              {/* Selected Items Micro Preview */}
              <div className="max-h-24 overflow-y-auto space-y-1 text-xs font-light text-white/80 pr-1 scrollbar-none border-y border-white/10 py-2">
                {selectedItemsList.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center text-[11px]">
                    <span className="truncate pr-2">• {quantity}x {product.title}</span>
                    <span className="text-[#EADDCA] shrink-0 font-mono">{product.category}</span>
                  </div>
                ))}
              </div>

              {/* Action CTA Button */}
              <button
                onClick={() => onProceedToQuote(selectedItemsList)}
                className="w-full py-3.5 rounded-xl bg-[#E07A5F] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#d4664a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
              >
                <span>Cotizar esta Selección ({totalSelectedCount} porciones)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
