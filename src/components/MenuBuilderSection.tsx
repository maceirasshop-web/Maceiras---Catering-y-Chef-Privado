import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
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

  const filteredProducts = selectedCategory === 'todos'
    ? CATALOG_PRODUCTS
    : CATALOG_PRODUCTS.filter(p => p.category === selectedCategory);

  const selectedItemsList: SelectedItemState[] = Object.keys(quantities)
    .map(id => {
      const product = CATALOG_PRODUCTS.find(p => p.id === id);
      return product ? { product, quantity: quantities[id] } : null;
    })
    .filter((item): item is SelectedItemState => item !== null && item.quantity > 0);

  const totalSelectedCount = selectedItemsList.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <section id="arma-tu-menu" className="py-24 bg-white relative border-t border-[#0A0A0A]/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="kicker">Cotizador de productos</span>
            <h2 className="text-3xl sm:text-4xl text-[#0A0A0A] font-light leading-tight tracking-[-0.03em]">
              Arma tu menú a la medida
            </h2>
            <p className="text-sm sm:text-base font-light text-[#5C5C5C] leading-relaxed">
              Selecciona canapés, almuerzos o estaciones. Define cantidades y envía una cotización itemizada en un paso.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'canapes', label: 'Canapés' },
              { id: 'almuerzos', label: 'Almuerzos' },
              { id: 'estaciones', label: 'Estaciones' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-200 cursor-pointer font-display ${
                  selectedCategory === cat.id
                    ? 'bg-[#0A0A0A] text-[#F7F7F5]'
                    : 'bg-transparent text-[#0A0A0A] border border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const qty = quantities[product.id] || 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-[#F7F7F5] border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  qty > 0
                    ? 'border-[#0A0A0A]'
                    : 'border-[#0A0A0A]/10 hover:border-[#0A0A0A]/35'
                }`}
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-[#EDEDEC]">
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    {product.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A0A0A] text-[#F7F7F5] font-display text-[11px] uppercase tracking-[0.14em]">
                        {product.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-white/95 text-[10px] uppercase tracking-wider text-[#0A0A0A] font-medium">
                      {product.subtitle}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg text-[#0A0A0A] font-medium leading-snug tracking-tight">
                      {product.title}
                    </h3>
                    <p className="text-xs font-light text-[#5C5C5C] leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                    <div className="pt-1 text-[11px] text-[#0A0A0A]/55 font-medium">
                      {product.unitText}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#0A0A0A]/8 mx-6 mb-5 mt-1">
                  <div className="pt-4">
                    {qty === 0 ? (
                      <button
                        onClick={() => handleIncrement(product.id)}
                        className="w-full py-2.5 bg-[#0A0A0A] text-[#F7F7F5] font-display text-[13px] uppercase tracking-[0.14em] font-semibold hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-medium text-[#0A0A0A]">
                          {qty} {qty === 1 ? 'porción' : 'porciones'}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrement(product.id)}
                            className="w-8 h-8 bg-white text-[#0A0A0A] border border-[#0A0A0A]/20 flex items-center justify-center hover:border-[#0A0A0A] transition-colors cursor-pointer"
                            aria-label="Disminuir porción"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-display text-base font-semibold text-[#0A0A0A]">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleIncrement(product.id)}
                            className="w-8 h-8 bg-[#0A0A0A] text-[#F7F7F5] flex items-center justify-center hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                            aria-label="Aumentar porción"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {totalSelectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-md w-full"
          >
            <div className="bg-[#0A0A0A] text-[#F7F7F5] p-4 sm:p-5 border border-white/10 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#F7F7F5] text-[#0A0A0A] flex items-center justify-center font-display font-semibold text-sm">
                    {totalSelectedCount}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white leading-tight">
                      Selección de menú
                    </div>
                    <div className="text-[10px] text-white/45">
                      {selectedItemsList.length} {selectedItemsList.length === 1 ? 'producto' : 'productos'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleResetSelection}
                  className="text-[10px] uppercase tracking-wider text-white/45 hover:text-white"
                  title="Vaciar selección"
                >
                  Vaciar
                </button>
              </div>

              <div className="max-h-24 overflow-y-auto space-y-1 text-xs font-light text-white/70 pr-1 scrollbar-none border-y border-white/10 py-2">
                {selectedItemsList.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center text-[11px]">
                    <span className="truncate pr-2">{quantity}× {product.title}</span>
                    <span className="text-white/40 shrink-0">{product.category}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onProceedToQuote(selectedItemsList)}
                className="w-full py-3.5 bg-[#F7F7F5] text-[#0A0A0A] font-display text-[13px] uppercase tracking-[0.14em] font-semibold hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Cotizar selección ({totalSelectedCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
