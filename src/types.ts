export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  image: string;
  features: string[];
  idealFor: string;
}

export interface DishItem {
  id: string;
  name: string;
  category: 'entrantes' | 'principales' | 'postres' | 'degustacion';
  description: string;
  detailedDescription: string;
  ingredients: string[];
  pairing: string;
  image: string;
  tags: string[];
  chefNote?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
  date: string;
  location: string;
  dietaryNotes: string;
  message: string;
}

export interface Testimonial {
  id: string;
  client: string;
  role: string;
  quote: string;
  rating: number;
  location: string;
}
