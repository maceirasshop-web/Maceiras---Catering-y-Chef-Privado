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
  // CANAPÉS & FINGER FOOD CON FOTOS REALES MACEIRAS
  {
    id: 'brocheta-caprese-pesto',
    title: 'Brocheta Caprese al Pesto de Nuez',
    category: 'canapes',
    subtitle: 'Fresco & Elegante',
    description: 'Bocconcini de queso mozzarella fresco, tomates cherry confitados y hojas de albahaca perfumadas con pesto artesanal.',
    unitText: 'Porción (12 unidades)',
    image: '/images/brocheta capresse.jpeg',
    badge: 'Más Popular'
  },
  {
    id: 'canape-roast-beef',
    title: 'Canapé de Roast Beef & Mostaza Dijón',
    category: 'canapes',
    subtitle: 'Corte de Selección',
    description: 'Finas láminas de roast beef marinadas al punto con toques de mostaza Dijón en grano y ciboulette fresco sobre tostada artesanal.',
    unitText: 'Porción (10 unidades)',
    image: '/images/canape de roast beff.jpeg',
    badge: 'Selección del Chef'
  },
  {
    id: 'ceviche-corvina-cuchara',
    title: 'Ceviche Mixto Gourmet en Cuchara de Cerámica',
    category: 'canapes',
    subtitle: 'Bocado del Mar',
    description: 'Pesca del día y mariscos frescos en leche de tigre de maracuyá, canchita crujiente, cebolla morada fina y cilantro hidropónico.',
    unitText: 'Porción (12 unidades)',
    image: '/images/cevice mixto.jpeg',
    badge: 'Especialidad Mar'
  },
  {
    id: 'canape-mermelada-cebolla',
    title: 'Canapé de Cebolla Caramelizada & Queso',
    category: 'canapes',
    subtitle: 'Sabor Dulce & Salado',
    description: 'Mermelada de cebolla tintada al vino tinto artesanal con suave capa de queso crema y nueces picadas.',
    unitText: 'Porción (12 unidades)',
    image: '/images/canape de mermelada de cebolla.jpeg',
  },
  {
    id: 'canape-huevo-codorniz',
    title: 'Canapé de Huevo Gourmet & Sabor Tradicional',
    category: 'canapes',
    subtitle: 'Clásico Culinario',
    description: 'Pasta cremosa de huevo artesanal condimentada con toques de mayo casera, pimentón dulce y finas hierbas de la huerta.',
    unitText: 'Porción (12 unidades)',
    image: '/images/canape de huevo.jpeg',
  },
  {
    id: 'canape-ave-pimenton',
    title: 'Canapé de Ave Pimentón de la Casa',
    category: 'canapes',
    subtitle: 'Receta Tradicional',
    description: 'Pechuga de pollo desmenuzada con crema de pimentones asados al horno y suave toque de pimienta blanca.',
    unitText: 'Porción (12 unidades)',
    image: '/images/canape de avepimenton.jpeg',
  },
  {
    id: 'canape-palmito-gourmet',
    title: 'Canapé de Palmito & Crema de Hierbas',
    category: 'canapes',
    subtitle: 'Fresco & Ligero',
    description: 'Medallones de palmito de primera calidad con suave mousse de ciboulette sobre crujiente panecillo horneado.',
    unitText: 'Porción (12 unidades)',
    image: '/images/camnape de palmito.jpeg',
  },
  {
    id: 'mini-empanadas-coctel',
    title: 'Mini Empanaditas Gourmet de Cóctel',
    category: 'canapes',
    subtitle: 'Horneado Artesanal',
    description: 'Masa fina dorada al horno rellena de queso fundido, camarones salteados o pino gourmet tradicional.',
    unitText: 'Porción (15 unidades)',
    image: '/images/empanada de coctel.jpeg',
    badge: 'Recién Horneado'
  },

  // ALMUERZOS & BANQUETES
  {
    id: 'almuerzo-ejecutivo-3tiempos',
    title: 'Almuerzo Ejecutivo 3 Tiempos',
    category: 'almuerzos',
    subtitle: 'Menú Completo Servido',
    description: 'Entrante de Carpaccio o Ceviche Mixto, Plato Principal a elección (Filete Wellington o Corvina a la Brasa) y Postre de autor.',
    unitText: 'Menú por persona',
    image: '/images/cevice mixto.jpeg',
    badge: 'Opción Estrella'
  },
  {
    id: 'buffet-cortes-nobles',
    title: 'Buffet Premium de Cortes Nobles & Ensaladas',
    category: 'almuerzos',
    subtitle: 'Formato Buffet Exclusivo',
    description: 'Lomo vetado a las finas hierbas, roast beef gourmet, variedad de ensaladas de autor y vegetales gratinados.',
    unitText: 'Buffet por persona',
    image: '/images/canape de roast beff.jpeg',
  },
  {
    id: 'cena-privada-4pasos',
    title: 'Cena Privada de Gala (4 Pasos)',
    category: 'almuerzos',
    subtitle: 'Alta Gastronomía en Casa',
    description: 'Amuse-bouche del chef, entrada fría de mar, plato fuerte con guarnición mantecada y degustación de postres artesanales.',
    unitText: 'Menú por persona',
    image: '/images/brocheta capresse.jpeg',
  },

  // ESTACIONES EN VIVO
  {
    id: 'estacion-quesos-jamon',
    title: 'Tabla Premium de Charcutería & Quesos Madurados',
    category: 'estaciones',
    subtitle: 'Montaje de Autor Maceiras',
    description: 'Selección de charcutería fina, jamón serrano, quesos artesanales chilenos e importados, frutos secos, aceitunas marinadas y pan de masa madre.',
    unitText: 'Estación para 20-30 pers.',
    image: '/images/tabla de charcuteria.jpeg',
    badge: 'Recomendado VIP'
  }
];
