import { ServiceItem, DishItem, ProcessStep, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'chef-privado',
    title: 'Chef Privado a Domicilio',
    subtitle: 'Alta cocina en la intimidad de tu hogar',
    description: 'Menús diseñados a la medida para cenas exclusivas, celebraciones íntimas y eventos privados en tu residencia.',
    detailedDescription: 'En Maceiras nos desplazamos a tu residencia, casa de playa o centro de eventos. Nos encargamos absolutamente de todo: selección de ingredientes frescos de mercado, preparación en el lugar, servicio de mesa impecable y limpieza total de la cocina.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Menú 100% personalizado para cada cliente',
      'Ingredientes frescos y locales de primera calidad',
      'Atención y servicio de mesa exclusivo',
      'Limpieza impecable de la cocina al finalizar'
    ],
    idealFor: 'Cenas privadas, cumpleaños, aniversarios, reuniones familiares y vacaciones.'
  },
  {
    id: 'catering-eventos',
    title: 'Catering Premium para Eventos',
    subtitle: 'Elegancia y sabor adaptado a tu ocasión',
    description: 'Servicio integral de catering para matrimonios boutique, eventos sociales y celebraciones familiares.',
    detailedDescription: 'Transformamos tu evento en una experiencia gastronómica memorable. Diseñamos banquetes a la medida, cocktails elegantes y estaciones gastronómicas en vivo con presentaciones cuidadas al detalle.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Formatos a elección: cena servida, cocktail o buffet exclusivo',
      'Propuestas gastronómicas adaptadas a tus preferencias',
      'Personal de servicio profesional y discreto',
      'Montaje y coordinación integral del menú'
    ],
    idealFor: 'Matrimonios, celebraciones de aniversario y eventos sociales de 15 a 150 invitados.'
  },
  {
    id: 'experiencias-corporativas',
    title: 'Eventos Corporativos & Ejecutivos',
    subtitle: 'Distinción gastronómica para empresas',
    description: 'Cocktails ejecutivos, reuniones de directorio, lanzamientos de marca y cenas corporativas VIP.',
    detailedDescription: 'Acompañamos tus hitos empresariales con una propuesta sobria, puntual y elegante. Nos adaptamos a los tiempos de tu evento con finger food refinado, lunches ejecutivos o cenas privadas para directorios.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Menús ágiles para ritmo corporativo',
      'Opciones especiales para restricción alimentaria',
      'Servicio profesional orientados a empresas',
      'Atención personalizada para cada requerimiento'
    ],
    idealFor: 'Reuniones de directorio, alianzas de negocios y cenas de empresa.'
  }
];

export const DISHES_DATA: DishItem[] = [
  {
    id: 'dish-1',
    name: 'Filete Wellington con Risotto de Champiñones',
    category: 'principales',
    description: 'Corte noble de filete envuelto en hojaldre crujiente y duxelles de hongos, servido sobre cremoso risotto de champiñones silvestres.',
    detailedDescription: 'Nuestro plato insignia. Filete de res tierno sellado al punto, cubierto con una fina paté de champiñones y envuelto en hojaldre artesanal dorado al horno. Acompañado de un risotto de champiñones suavemente mantecado con queso artesanal.',
    ingredients: ['Filete de res premium', 'Hojaldre artesanal', 'Duxelles de hongos', 'Arroz Carnaroli', 'Champiñones silvestres', 'Reducción de vino'],
    pairing: 'Cabernet Sauvignon o Carmenère de reserva del Valle del Maipo.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Especialidad Maceiras', 'Plato Estrella', 'Corte Noble'],
    chefNote: 'El horneado del hojaldre se sincroniza exactamente para mantener el centro del filete tierno y jugoso.'
  },
  {
    id: 'dish-2',
    name: 'Carpaccio de Res',
    category: 'entrantes',
    description: 'Finas láminas de filete de res, alcaparras baby, escamas de queso madurado, rúcula fresca y emulsión de oliva virgen.',
    detailedDescription: 'Una entrada distinguida y refrescante. Láminas cortadas con máxima precisión, marinadas al instante con aceite de oliva virgen extra, jugo de limón de pica fresco, alcaparras y un toque de pimienta recién molida.',
    ingredients: ['Filete de res fresco', 'Queso madurado artesanal', 'Alcaparras', 'Rúcula fresca', 'Aceite de oliva virgen extra', 'Limón de pica'],
    pairing: 'Sauvignon Blanc del Valle de Casablanca o Pinot Noir chileno.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    tags: ['Entrante Destacado', 'Ligero & Elegante', 'Sin Gluten'],
    chefNote: 'Seleccionamos cortes magros de primera calidad para garantizar una textura suave que se deshace en la boca.'
  },
  {
    id: 'dish-3',
    name: 'Crème Brûlée Tradicional',
    category: 'postres',
    description: 'Crema cocida a fuego lento infusionada con vainilla natural en vaina y una fina costra de azúcar fogueada al instante.',
    detailedDescription: 'El clásico postre francés preparado según la técnica tradicional. Una base sedosa de yemas, crema y vainilla natural con el contraste crujiente de la capa caramelizada al momento de servir.',
    ingredients: ['Crema de leche fresca', 'Yemas camperas', 'Vaina de vainilla natural', 'Azúcar caramelizada'],
    pairing: 'Vino Late Harvest o espumante Brut de valles chilenos.',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=800&q=80',
    tags: ['Postre Clásico', 'Caramelizado al Instante'],
    chefNote: 'El toque de soplete se aplica segundos antes de llegar a la mesa para asegurar la máxima textura crujiente.'
  },
  {
    id: 'dish-4',
    name: 'Corvina del Pacífico a la Brasa con Vegetales',
    category: 'principales',
    description: 'Lomo de corvina fresca sellada a la brasa con mantequilla de hierbas nativas y vegetales orgánicos glaseados.',
    detailedDescription: 'Pesca fresca seleccionada diariamente, cocinada a la plancha con un toque de brasa para conservar la jugosidad natural de la carne blanca. Acompañada de vegetales de estación glaseados en mantequilla de romero.',
    ingredients: ['Corvina del Pacífico', 'Mantequilla de hierbas', 'Vegetales de estación', 'Aceite de oliva', 'Flor de sal'],
    pairing: 'Chardonnay de clima frío o Sauvignon Blanc de la costa.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    tags: ['Pesca del Pacífico', 'Vegetales Frescos'],
    chefNote: 'Respetamos los tiempos de pesca fresca para brindar el máximo sabor natural del mar.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Consulta Inicial',
    description: 'Conversamos sobre tus preferencias, concepto del evento, número de invitados y requerimientos especiales.',
    details: 'Servicio 100% personalizado adaptable a tus gustos e instalaciones.'
  },
  {
    number: '02',
    title: 'Diseño del Menú',
    description: 'Preparamos una propuesta de menú a tu medida con opciones de maridaje y alternativas especiales.',
    details: 'Ajustamos cada detalle hasta lograr la combinación perfecta para tu velada.'
  },
  {
    number: '03',
    title: 'Preparación & Montaje',
    description: 'Seleccionamos los ingredientes más frescos del día y preparamos todo en tu residencia con total puntualidad.',
    details: 'Nuestro equipo llega con anticipación para cuidar cada aspecto del montaje y la cocina.'
  },
  {
    number: '04',
    title: 'La Experiencia Maceiras',
    description: 'Disfruta de una velada inolvidable. Servimos la mesa con calidez y dejamos la cocina limpia e impecable.',
    details: 'Atención atenta y discreta para que te dediques exclusivamente a compartir con tus invitados.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    client: 'Gonzalo & Camila',
    role: 'Cena Privada a Domicilio',
    quote: 'Maceiras convirtió nuestra casa en una verdadera experiencia de alta cocina. El Filete Wellington y el Carpaccio estuvieron impecables. Servicio muy profesional y cocina reluciente.',
    rating: 5,
    location: 'Santiago (Lo Barnechea)'
  },
  {
    id: 't2',
    client: 'Valentina R.',
    role: 'Aniversario Familiar',
    quote: 'La atención personalizada para cada uno de nuestros invitados hizo la diferencia. La Crème Brûlée fue el broche de oro de la noche. Totalmente recomendados.',
    rating: 5,
    location: 'Santiago (Las Condes)'
  },
  {
    id: 't3',
    client: 'Familia Larraín',
    role: 'Celebración Familiar',
    quote: 'Contratamos el servicio de chef privado para una velada en casa. Ingredientes de primera calidad y una disposición maravillosa. Repetiremos sin duda.',
    rating: 5,
    location: 'Santiago (Vitacura)'
  }
];

