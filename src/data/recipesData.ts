export interface RecipeStep {
  number: string;
  title: string;
  instruction: string;
  tip?: string;
}

export interface RecipeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'principales' | 'entrantes' | 'postres';
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado' | 'Chef Master';
  image: string;
  ingredients: string[];
  pairing: string;
  chefNote: string;
  steps: RecipeStep[];
}

export const RECIPES_DATA: RecipeItem[] = [
  {
    id: 'receta-filete-wellington',
    title: 'Filete Wellington Artesanal con Risotto de Setas',
    subtitle: 'El clásico atemporal de la alta cocina internacional',
    description: 'Aprende paso a paso la técnica maestra de Maceiras para sellar el corte de res, envolver en duxelles de champiñones y hojaldre crujiente.',
    category: 'principales',
    prepTime: '45 min',
    cookTime: '35 min',
    servings: 4,
    difficulty: 'Chef Master',
    image: '/images/canape-de-roast-beef',
    ingredients: [
      '800g de Lomo Vetado o Filete de Res centro',
      '400g de Champiñones París y Champiñones Portobello',
      '200g de Jamón Serrano en finas láminas',
      '1 masa de Hojaldre Artesanal de mantequilla',
      '2 cucharadas de Mostaza Dijón de grano',
      '2 yemas de huevo campero para pincelar',
      '300g de Arroz Carnaroli para el risotto',
      '100ml de Vino Blanco y 1L de Caldo de Hongos',
      'Queso madurado, mantequilla sin sal y aceite de oliva virgen extra'
    ],
    pairing: 'Cabernet Sauvignon Reserva del Valle del Maipo o Carmenère de guarda.',
    chefNote: 'El secreto de Maceiras está en secar completamente el duxelles de hongos en el sartén antes de envolver el filete. De esta forma, el hojaldre se mantiene dorado y crujiente.',
    steps: [
      {
        number: '01',
        title: 'Sellado y Adobo del Corte',
        instruction: 'Salpimentar el lomo de res. En una sartén a fuego muy alto con un chorro de aceite de oliva, sellar la pieza durante 1 a 2 minutos por lado hasta dorar exteriormente sin cocinar el centro. Retirar y pincelar de inmediato con mostaza Dijón mientras está caliente.',
        tip: 'Dejar reposar sobre una rejilla para que no acumule líquidos.'
      },
      {
        number: '02',
        title: 'Preparación de la Duxelles de Setas',
        instruction: 'Triturar muy fino los champiñones. En una sartén sin aceite a fuego medio, saltearlos hasta que se evapore el 100% de su humedad natural. Condimentar con tomillo fresco, sal fina y pimienta. Dejar enfriar.',
        tip: 'La duxelles debe quedar casi seca como una pasta moldeable.'
      },
      {
        number: '03',
        title: 'Ensamblaje del Roll con Jamón Serrano',
        instruction: 'Extender un pliego de alusa plas sobre la mesa. Disponer las láminas de jamón serrano solapadas formando un rectángulo. Extender la duxelles de hongos sobre el jamón y colocar la pieza de filete en el centro. Envolver firmemente formando un cilindro hermético.',
        tip: 'Refrigerar el rollo envuelto durante 20 minutos para fijar la forma.'
      },
      {
        number: '04',
        title: 'Envoltorio en Hojaldre y Horneado Maestro',
        instruction: 'Extender la masa de hojaldre frío. Desenvolver el lomo y colocarlo sobre la masa. Pincelar los bordes con yema de huevo y cerrar sellando bien las uniones. Pincelar toda la superficie con yema y realizar cortes decorativos sutiles.',
        tip: 'Hornear a 200°C en horno precalentado durante 25-30 minutos hasta lograr un dorado perlado espectacular.'
      },
      {
        number: '05',
        title: 'Mantecado del Risotto y Emplatado',
        instruction: 'Nacarar el arroz Carnaroli con chalotas, desglasar con vino blanco e ir agregando caldo de hongos caliente poco a poco. Al estar al dente (18 min), fuera del fuego mantecar con mantequilla fría y queso madurado. Servir con medallones del Wellington recién cortado.',
        tip: 'Reposar el Wellington 8 minutos antes de cortar con cuchillo de sierra fino.'
      }
    ]
  },
  {
    id: 'receta-carpaccio-res',
    title: 'Carpaccio de Res con Emulsión de Oliva & Limón de Pica',
    subtitle: 'Frescura, elegancia y precisión en la entrada',
    description: 'Descubre cómo seleccionar y laminar filete de res de primera calidad, acompañado de alcaparras baby, rúcula silvestre y queso madurado.',
    category: 'entrantes',
    prepTime: '20 min',
    cookTime: '0 min',
    servings: 4,
    difficulty: 'Intermedio',
    image: '/images/brocheta-capresse',
    ingredients: [
      '350g de Filete de Res sin grasa ni nervios',
      '2 cucharadas de Alcaparras baby escurridas',
      '100g de Queso parmesano o madurado en lajas',
      '1 atado de Rúcula fresca hidropónica',
      'Jugo de 3 Limones de pica frescos',
      '60ml de Aceite de oliva virgen extra de prensado en frío',
      'Flor de sal y pimienta negra en grano recién molida'
    ],
    pairing: 'Sauvignon Blanc del Valle de Casablanca o Pinot Noir de clima frío.',
    chefNote: 'Congelar ligeramente el filete durante 25 minutos antes de cortar. Esto permite obtener láminas ultrafinas con un cuchillo bien afilado.',
    steps: [
      {
        number: '01',
        title: 'Acondicionamiento del Corte',
        instruction: 'Limpiar meticulosamente el filete de res retirando cualquier resto de tela o grasa. Envolver en film plástico apretando en forma de cilindro regular y congelar por 25 a 30 minutos.',
        tip: 'No debe congelarse sólido, solo tomar firmeza para facilitar el corte.'
      },
      {
        number: '02',
        title: 'Laminado de Alta Precisión',
        instruction: 'Con un cuchillo filetador de filo perfecto, cortar láminas casi transparentes. Disponer las láminas sobre platos llanos en un patrón circular solapado desde el centro hacia afuera.',
        tip: 'También puedes presionar suavemente las láminas entre dos pliegos de papel vegetal.'
      },
      {
        number: '03',
        title: 'Emulsión Citrina de Autor',
        instruction: 'Emulsionar en un pocillo pequeño el jugo de limón de pica fresco con el aceite de oliva virgen extra, una pizca de flor de sal y pimienta negra molida al momento.',
        tip: 'Aderezar la carne justo antes de llevar a la mesa para no "cocinar" el tono rosado de la carne.'
      },
      {
        number: '04',
        title: 'Montaje de Toppings y Rúcula',
        instruction: 'Distribuir las alcaparras baby por toda la superficie, coronar con un ramo de rúcula fresca aderezada y finalizar con las escamas de queso madurado recortadas en láminas delgadas.',
        tip: 'Servir inmediatamente acompañado de tostadas de pan baguette masa madre.'
      }
    ]
  }
];
