export interface CatalogProduct {
  id: string;
  title: string;
  category: 'canapes' | 'almuerzos' | 'estaciones';
  subtitle: string;
  description: string;
  unitText: string;
  recommendedCount?: number;
  image: string;
  badge?: string;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // CANAPÉS & FINGER FOOD
  {
    id: 'canape-tartaro-filete',
    title: 'Canapé de Tártaro de Filete',
    category: 'canapes',
    subtitle: 'Finger Food de Autor',
    description: 'Filete picado a cuchillo con alcaparras baby, ciboulette, aceite de oliva virgen extra y toques de mostaza Dijón sobre crujiente crostini.',
    unitText: 'Porción (10 unidades)',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Solicitado'
  },
  {
    id: 'brocheta-caprese-pesto',
    title: 'Brocheta Caprese al Pesto de Nuez',
    category: 'canapes',
    subtitle: 'Fresco & Elegante',
    description: 'Bocconcini de queso mozzarella fresco, tomates cherry confitados y hojas de albahaca perfumadas con pesto artesanal de nueces.',
    unitText: 'Porción (12 unidades)',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'crostini-salmon-ahumado',
    title: 'Crostini de Salmón Ahumado & Eneldo',
    category: 'canapes',
    subtitle: 'Maridaje del Océano',
    description: 'Láminas de salmón ahumado artesanal sobre crema suave de queso con eneldo fresco y ralladura de limón de pica.',
    unitText: 'Porción (10 unidades)',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    badge: 'Favorito Gourmet'
  },
  {
    id: 'ceviche-corvina-cuchara',
    title: 'Ceviche de Corvina en Cuchara de Cerámica',
    category: 'canapes',
    subtitle: 'Bocado de Alta Cocina',
    description: 'Corvina fresca en leche de tigre de maracuyá, canchita crujiente, cebolla morada fina y cilantro hidropónico.',
    unitText: 'Porción (12 unidades)',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mini-empanadas-camaron',
    title: 'Mini Empanadas de Queso Mantecoso & Camarón',
    category: 'canapes',
    subtitle: 'Horneado Artesanal',
    description: 'Masa fina dorada al horno rellena de suave queso fundido y camarones salteados al ajillo con vino blanco.',
    unitText: 'Porción (15 unidades)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },

  // ALMUERZOS & BANQUETES
  {
    id: 'almuerzo-ejecutivo-3tiempos',
    title: 'Almuerzo Ejecutivo 3 Tiempos',
    category: 'almuerzos',
    subtitle: 'Menú Completo Servido',
    description: 'Entrante de Carpaccio de Res o Salmón, Plato Principal a elección (Filete Wellington o Corvina a la Brasa) y Dessert Crème Brûlée.',
    unitText: 'Menú por persona',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    badge: 'Opción Estrella'
  },
  {
    id: 'buffet-cortes-nobles',
    title: 'Buffet Premium de Cortes Nobles & Ensaladas',
    category: 'almuerzos',
    subtitle: 'Formato Buffet Exclusivo',
    description: 'Lomo vetado a las finas hierbas, pollo orgánico glaseado, variedad de ensaladas gourmet de autor y vegetales gratinados.',
    unitText: 'Buffet por persona',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cena-privada-4pasos',
    title: 'Cena Privada de Gala (4 Pasos)',
    category: 'almuerzos',
    subtitle: 'Alta Gastronomía en Casa',
    description: 'Amuse-bouche del chef, entrada fría de mar, plato fuerte con guarnición mantecada y degustación de postres artesanales.',
    unitText: 'Menú por persona',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },

  // ESTACIONES EN VIVO
  {
    id: 'estacion-quesos-jamon',
    title: 'Estación de Jamón Serrano & Quesos Madurados',
    category: 'estaciones',
    subtitle: 'Montaje de Autor',
    description: 'Corte en vivo de jamón serrano, variedad de quesos artesanales chilenos e importados, frutos secos, miel de ulmo y pan de masa madre.',
    unitText: 'Estación para 20-30 pers.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
    badge: 'Recomendado'
  },
  {
    id: 'estacion-cocteleria-autor',
    title: 'Barra Móvil de Cócteles de Autor & Mixología',
    category: 'estaciones',
    subtitle: 'Barra Abierta VIP',
    description: 'Bartender profesional con carta de tragos de autor (Sour de Maracuyá, Gin Tonic botánico, Spritz de pomelo) e insumos premium.',
    unitText: 'Servicio por 4 horas',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  }
];
