import { RecipeItem, RecipeStep } from '../data/recipesData';

/**
 * Utility to parse Markdown recipe format into a structured RecipeItem object.
 *
 * Supported Markdown Format Example:
 * 
 * # Filete Wellington Artesanal con Risotto de Setas
 * **Subtítulo:** El clásico atemporal de la alta cocina internacional
 * **Categoría:** principales
 * **Tiempo Prep:** 45 min
 * **Tiempo Cocción:** 35 min
 * **Porciones:** 4
 * **Dificultad:** Chef Master
 * **Imagen:** https://images.unsplash.com/photo-1544025162-d76694265947
 * **Maridaje:** Cabernet Sauvignon Reserva del Valle del Maipo.
 * **Nota del Chef:** El secreto está en secar completamente el duxelles.
 * 
 * ## Descripción
 * Aprende paso a paso la técnica maestra de Maceiras para sellar el corte de res...
 * 
 * ## Ingredientes
 * - 800g de Lomo Vetado
 * - 400g de Champiñones
 * - 200g de Jamón Serrano
 * 
 * ## Pasos
 * ### Paso 1: Sellado y Adobo del Corte
 * Salpimentar el lomo de res...
 * *Consejo:* Dejar reposar sobre una rejilla.
 * 
 * ### Paso 2: Preparación de la Duxelles
 * Triturar muy fino los champiñones...
 */

export function parseRecipeMarkdown(markdownText: string): Partial<RecipeItem> {
  const lines = markdownText.split('\n');
  
  let title = '';
  let subtitle = '';
  let category: RecipeItem['category'] = 'principales';
  let prepTime = '30 min';
  let cookTime = '30 min';
  let servings = 4;
  let difficulty: RecipeItem['difficulty'] = 'Intermedio';
  let image = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80';
  let pairing = '';
  let chefNote = '';
  let description = '';
  const ingredients: string[] = [];
  const steps: RecipeStep[] = [];

  let currentSection = '';
  let currentStep: Partial<RecipeStep> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) continue;

    // H1 Title: # Recipe Title
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
      continue;
    }

    // Key-Value attributes
    if (line.startsWith('**Subtítulo:**') || line.startsWith('**Subtitulo:**')) {
      subtitle = line.split(':**')[1]?.trim() || '';
      continue;
    }
    if (line.startsWith('**Categoría:**') || line.startsWith('**Categoria:**')) {
      const catVal = line.split(':**')[1]?.trim().toLowerCase() || 'principales';
      if (catVal.includes('entrante')) category = 'entrantes';
      else if (catVal.includes('postre')) category = 'postres';
      else category = 'principales';
      continue;
    }
    if (line.startsWith('**Tiempo Prep:**')) {
      prepTime = line.split(':**')[1]?.trim() || '30 min';
      continue;
    }
    if (line.startsWith('**Tiempo Cocción:**') || line.startsWith('**Tiempo Coccion:**')) {
      cookTime = line.split(':**')[1]?.trim() || '30 min';
      continue;
    }
    if (line.startsWith('**Porciones:**')) {
      const pVal = parseInt(line.split(':**')[1]?.trim() || '4', 10);
      if (!isNaN(pVal)) servings = pVal;
      continue;
    }
    if (line.startsWith('**Dificultad:**')) {
      const diffVal = line.split(':**')[1]?.trim() || 'Intermedio';
      if (diffVal.includes('Fácil') || diffVal.includes('Facil')) difficulty = 'Fácil';
      else if (diffVal.includes('Avanzado')) difficulty = 'Avanzado';
      else if (diffVal.includes('Master')) difficulty = 'Chef Master';
      else difficulty = 'Intermedio';
      continue;
    }
    if (line.startsWith('**Imagen:**')) {
      image = line.split(':**')[1]?.trim() || image;
      continue;
    }
    if (line.startsWith('**Maridaje:**')) {
      pairing = line.split(':**')[1]?.trim() || '';
      continue;
    }
    if (line.startsWith('**Nota del Chef:**')) {
      chefNote = line.split(':**')[1]?.trim() || '';
      continue;
    }

    // H2 Section Headers
    if (line.startsWith('## ')) {
      currentSection = line.replace('## ', '').trim().toLowerCase();
      if (currentStep) {
        steps.push(currentStep as RecipeStep);
        currentStep = null;
      }
      continue;
    }

    // H3 Step Headers: ### Paso 1: Title
    if (line.startsWith('### ')) {
      if (currentStep) {
        steps.push(currentStep as RecipeStep);
      }
      const stepHeader = line.replace('### ', '').trim();
      const stepNumber = String(steps.length + 1).padStart(2, '0');
      const stepTitle = stepHeader.includes(':') 
        ? stepHeader.split(':').slice(1).join(':').trim()
        : stepHeader;

      currentStep = {
        number: stepNumber,
        title: stepTitle || `Paso ${steps.length + 1}`,
        instruction: '',
        tip: ''
      };
      continue;
    }

    // Ingredients parsing: - Ingredient or * Ingredient
    if (currentSection.includes('ingrediente')) {
      if (line.startsWith('- ') || line.startsWith('* ')) {
        ingredients.push(line.substring(2).trim());
      } else {
        ingredients.push(line);
      }
      continue;
    }

    // Description section
    if (currentSection.includes('descripci')) {
      description += (description ? ' ' : '') + line;
      continue;
    }

    // Steps parsing
    if (currentStep) {
      if (line.startsWith('*Consejo:*') || line.startsWith('*Tip:*')) {
        currentStep.tip = line.replace(/^\*(Consejo|Tip):\*/, '').trim();
      } else {
        currentStep.instruction += (currentStep.instruction ? ' ' : '') + line;
      }
    }
  }

  if (currentStep) {
    steps.push(currentStep as RecipeStep);
  }

  return {
    title: title || 'Nueva Receta Gourmet',
    subtitle: subtitle || 'Especialidad culinaria de Maceiras',
    category,
    prepTime,
    cookTime,
    servings,
    difficulty,
    image,
    pairing,
    chefNote,
    description: description || 'Una experiencia gastronómica de alta precisión.',
    ingredients: ingredients.length ? ingredients : ['Ingredientes frescos de estación'],
    steps: steps.length ? steps : [
      {
        number: '01',
        title: 'Preparación inicial',
        instruction: 'Seleccionar y acondicionar los ingredientes con máxima frescura.',
        tip: 'Mantener orden en la estación de trabajo.'
      }
    ]
  };
}
