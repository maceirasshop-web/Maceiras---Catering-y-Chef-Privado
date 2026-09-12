export const SITE_URL = 'https://www.maceiras.shop';
export const SITE_NAME = 'Maceiras Catering & Chef Privado';
export const SITE_LANG = 'es-CL';
export const WHATSAPP_NUMBER = '56931939017';
export const WHATSAPP_DISPLAY = '+56 9 3193 9017';
export const EMAIL = 'maceiras.shop@gmail.com';
export const OG_IMAGE_PATH = '/images/og-catering.webp';
export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;

export const DEFAULT_QUOTE_TEXT =
  'Hola, quisiera información sobre sus servicios de catering y chef privado.';

export function waLink(text: string = DEFAULT_QUOTE_TEXT): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const AREA_SERVED = [
  'Santiago',
  'Vitacura',
  'Las Condes',
  'Lo Barnechea',
  'La Dehesa',
  'Providencia',
  'Chicureo',
  'La Reina',
] as const;
