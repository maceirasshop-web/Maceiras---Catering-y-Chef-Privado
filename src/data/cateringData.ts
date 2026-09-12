import { ServiceItem, DishItem, ProcessStep, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'catering-eventos',
    title: 'Eventos personales',
    subtitle: 'Cumpleaños, graduaciones y celebraciones',
    description: 'Catering para cumpleaños, graduaciones, baby showers, aniversarios y reuniones en casa o en recinto. El evento se siente, la cocina no se nota.',
    detailedDescription: 'Cubrimos la vida real: cumpleaños, graduaciones, onces de título, baby showers, aniversarios y reuniones familiares. Diseñamos el menú según la ocasión — cocktail, estaciones o cena servida — y nos encargamos de montaje, servicio y retiro.',
    image: '/images/tabla-de-charcuteria',
    features: [
      'Cumpleaños, graduaciones, aniversarios y baby showers',
      'Formatos: cocktail, buffet o cena servida',
      'Personal de servicio discreto y puntual',
      'Montaje, servicio y cocina limpia al terminar'
    ],
    idealFor: 'Cumpleaños, graduaciones, matrimonios y celebraciones de 10 a 150 invitados.'
  },
  {
    id: 'menus-periodicos',
    title: 'Menús semanales y mensuales',
    subtitle: 'Vamos a tu casa con la comida de la semana o del mes',
    description: 'Planificamos el menú, llevamos los alimentos a tu domicilio y dejamos las comidas de la semana o del mes listas. Cocina de casa, sin que te toque cocinar.',
    detailedDescription: 'Además de los eventos, cocinamos el día a día. Armamos un plan semanal o mensual a tu medida, vamos a tu residencia con los ingredientes y preparamos (o dejamos organizadas) las comidas para los días que siguen. Porciones, gustos y restricciones se resuelven en el brief, no a las 21:00 un martes.',
    image: '/images/ceviche-mixto',
    features: [
      'Plan semanal o mensual, con recambio según tu ritmo',
      'Vamos a tu casa con los alimentos y la preparación',
      'Porciones para la familia, office o dieta específica',
      'Ajustes por alergias, preferencias y temporada'
    ],
    idealFor: 'Familias, profesionales con poco tiempo y quien quiere comer bien en casa toda la semana o el mes.'
  },
  {
    id: 'chef-privado',
    title: 'Chef privado a domicilio',
    subtitle: 'Una cena, en tu cocina, sin que muevas un plato',
    description: 'El chef llega a tu casa, cocina, sirve y deja todo impecable. Para una noche, no para improvisar el menú.',
    detailedDescription: 'Nos desplazamos a tu residencia o casa de playa. Selección de ingredientes, preparación en el lugar, servicio de mesa y limpieza total de la cocina. Una velada de alta cocina sin que nadie de la casa entre a la cocina.',
    image: '/images/brocheta-capresse',
    features: [
      'Menú 100% personalizado para esa noche',
      'Ingredientes frescos de primera calidad',
      'Servicio de mesa exclusivo',
      'Cocina limpia al finalizar'
    ],
    idealFor: 'Cenas íntimas, aniversarios de pareja, reuniones chicas y vacaciones en casa.'
  },
  {
    id: 'experiencias-corporativas',
    title: 'Empresas',
    subtitle: 'Protocolo para directorio, no para un cocktail genérico',
    description: 'Coffee breaks, lunches ejecutivos, cocktails de marca y cenas de directorio. Un interlocutor. Facturación empresa.',
    detailedDescription: 'Acompañamos hitos empresariales con una propuesta sobria y puntual. Finger food, lunch ejecutivo o cena privada para directorios, con tiempos alineados a la agenda de la empresa.',
    image: '/images/canape-de-roast-beef',
    features: [
      'Menús ágiles para ritmo corporativo',
      'Restricciones alimentarias resueltas en la propuesta',
      'Servicio con protocolo de sala',
      'Cotización itemizada y facturación empresa'
    ],
    idealFor: 'Reuniones de directorio, lanzamientos, coffee breaks y cenas de empresa.'
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
    image: '/images/canape-de-roast-beef',
    tags: ['Especialidad Maceiras', 'Plato Estrella', 'Corte Noble'],
    chefNote: 'El horneado del hojaldre se sincroniza exactamente para mantener el centro del filete tierno y jugoso.'
  },
  {
    id: 'dish-2',
    name: 'Carpaccio de Res & Canapés Gourmet',
    category: 'entrantes',
    description: 'Finas láminas de filete de res marinadas al momento con escamas de queso madurado, rúcula fresca y emulsión de oliva virgen.',
    detailedDescription: 'Una entrada distinguida y refrescante. Láminas cortadas con máxima precisión, marinadas al instante con aceite de oliva virgen extra, jugo de limón de pica fresco, alcaparras y un toque de pimienta recién molida.',
    ingredients: ['Filete de res fresco', 'Queso madurado artesanal', 'Alcaparras', 'Rúcula fresca', 'Aceite de oliva virgen extra', 'Limón de pica'],
    pairing: 'Sauvignon Blanc del Valle de Casablanca o Pinot Noir chileno.',
    image: '/images/brocheta-capresse',
    tags: ['Entrante Destacado', 'Ligero & Elegante', 'Sin Gluten'],
    chefNote: 'Seleccionamos cortes magros de primera calidad para garantizar una textura suave que se deshace en la boca.'
  },
  {
    id: 'dish-3',
    name: 'Tabla Premium de Charcutería & Quesos Madurados',
    category: 'postres',
    description: 'Selección exclusiva de quesos artesanales chilenos e importados, jamón serrano y charcutería fina de autor.',
    detailedDescription: 'El acompañamiento perfecto para la bienvenida. Selección de fiambres nobles cortados en el lugar, acompañados de frutos secos y panecillos artesanales.',
    ingredients: ['Jamón serrano', 'Quesos madurados', 'Frutos secos', 'Miel de ulmo', 'Pan de masa madre'],
    pairing: 'Vino Late Harvest o espumante Brut de valles chilenos.',
    image: '/images/tabla-de-charcuteria',
    tags: ['Tabla Gourmet', 'Montaje VIP'],
    chefNote: 'Montada segundos antes del servicio para preservar la temperatura perfecta de cada variedad.'
  },
  {
    id: 'dish-4',
    name: 'Ceviche Mixto del Pacífico en Cuchara Gourmet',
    category: 'principales',
    description: 'Pesca fresca seleccionada en leche de tigre de maracuyá, mariscos, canchita crujiente y cebolla morada fina.',
    detailedDescription: 'Pesca fresca seleccionada diariamente con toque marino. Acompañada de mariscos y leche de tigre cítrica de autor.',
    ingredients: ['Corvina del Pacífico', 'Mariscos frescos', 'Leche de tigre maracuyá', 'Cilantro', 'Canchita'],
    pairing: 'Chardonnay de clima frío o Sauvignon Blanc de la costa.',
    image: '/images/ceviche-mixto',
    tags: ['Pesca del Pacífico', 'Entrante del Mar'],
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
    quote: 'Maceiras convirtió nuestra casa en una verdadera experiencia de alta cocina. Los canapés y la tabla de charcutería estuvieron impecables. Servicio muy profesional y cocina reluciente.',
    rating: 5,
    location: 'Santiago (Lo Barnechea)'
  },
  {
    id: 't2',
    client: 'Valentina R.',
    role: 'Aniversario Familiar',
    quote: 'La atención personalizada para cada uno de nuestros invitados hizo la diferencia. Las brochetas caprese y el ceviche fueron el éxito de la noche. Totalmente recomendados.',
    rating: 5,
    location: 'Santiago (Las Condes)'
  },
  {
    id: 't3',
    client: 'Matías L.',
    role: 'Celebración Familiar',
    quote: 'Contratamos el servicio de chef privado para una velada en casa. Ingredientes de primera calidad y una disposición maravillosa. Repetiremos sin duda.',
    rating: 5,
    location: 'Santiago (Vitacura)'
  }
];

export interface CorporateFormat {
  id: string;
  number: string;
  title: string;
  description: string;
  capacity: string;
}

export const CORPORATE_FORMATS: CorporateFormat[] = [
  {
    id: 'coffee',
    number: '01',
    title: 'Coffee break y desayunos ejecutivos',
    description: 'Montaje puntual para juntas, workshops y onboarding. Finger food fino, café de especialidad y una operación que no interrumpe la agenda.',
    capacity: '10 — 120 personas'
  },
  {
    id: 'lunch',
    number: '02',
    title: 'Lunch ejecutivo',
    description: 'Almuerzos servidos o en formato buffet controlado. Menús ágiles, presentación precisa y tiempos de servicio alineados a la reunión.',
    capacity: '8 — 80 personas'
  },
  {
    id: 'cocktail',
    number: '03',
    title: 'Cocktail corporativo',
    description: 'Canapés, estaciones en vivo y servicio de sala discreto para lanzamientos, networking y cierres de trimestre.',
    capacity: '20 — 150 personas'
  },
  {
    id: 'board',
    number: '04',
    title: 'Directorio y cenas VIP',
    description: 'Cenas privadas para comités, inversionistas y clientes clave. Protocolo, maridaje y un servicio que permanece en segundo plano.',
    capacity: '6 — 40 personas'
  }
];

export const CORPORATE_CAPABILITIES = [
  {
    title: 'Puntualidad operativa',
    text: 'Llegamos con margen, montamos en silencio y respetamos el horario del evento. El servicio se adapta al ritmo de la empresa, no al revés.'
  },
  {
    title: 'Protocolo y discreción',
    text: 'Personal uniformado, comunicación mínima con invitados y un estándar de sala pensado para directorios, marcas y visitas institucionales.'
  },
  {
    title: 'Restricciones alimentarias',
    text: 'Vegetarianos, veganos, sin gluten y alergias se resuelven en la propuesta, no en el momento del servicio.'
  },
  {
    title: 'Facturación empresa',
    text: 'Cotización itemizada, orden de compra y facturación. Un interlocutor único desde el brief hasta el cierre.'
  }
];
