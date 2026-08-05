import { createClient } from '@supabase/supabase-js';

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  guest_count: number;
  date?: string;
  location?: string;
  message?: string;
  status: 'Pendiente' | 'Contactado' | 'Confirmado' | 'Cancelado';
  created_at: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co'));

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial sample mock data for demonstration if local storage is empty
const INITIAL_DEMO_QUOTES: QuoteRequest[] = [
  {
    id: 'demo-1',
    name: 'Javier Valenzuela',
    email: 'j.valenzuela@empresa.cl',
    phone: '+56 9 8765 4321',
    event_type: 'Chef Privado a Domicilio',
    guest_count: 12,
    date: '2026-08-20',
    location: 'Lo Barnechea, Santiago',
    message: 'Cena de cumpleaños especial. Quisiéramos Filete Wellington como plato principal y opción de postre Crème Brûlée.',
    status: 'Pendiente',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'demo-2',
    name: 'Carolina Errázuriz',
    email: 'carolina.e@gmail.com',
    phone: '+56 9 9123 8844',
    event_type: 'Catering Premium (Matrimonios/Social)',
    guest_count: 45,
    date: '2026-09-15',
    location: 'Vitacura, Santiago',
    message: 'Matrimonio civil íntimo en jardín privado. Servicio completo de garzones y cocktail.',
    status: 'Contactado',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: 'demo-3',
    name: 'Andrés Undurraga',
    email: 'a.undurraga@directorio.cl',
    phone: '+56 9 7788 1122',
    event_type: 'Eventos Corporativos VIP',
    guest_count: 16,
    date: '2026-08-25',
    location: 'Las Condes, Santiago',
    message: 'Almuerzo de directorio corporativo. Requerimos maridaje exclusivo.',
    status: 'Confirmado',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  }
];

const LOCAL_STORAGE_KEY = 'maceiras_quotes_db';

// Helper to get local quotes
const getLocalQuotes = (): QuoteRequest[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_QUOTES));
      return INITIAL_DEMO_QUOTES;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading quotes from localStorage', e);
    return INITIAL_DEMO_QUOTES;
  }
};

// Save a quote request (Supabase + LocalStorage fallback)
export async function saveQuote(payload: {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  guest_count: number;
  date?: string;
  location?: string;
  message?: string;
}): Promise<{ success: boolean; data?: QuoteRequest; error?: string }> {
  const newQuote: QuoteRequest = {
    id: 'q-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    ...payload,
    status: 'Pendiente',
    created_at: new Date().toISOString(),
  };

  // Always save to localStorage backup
  const currentLocal = getLocalQuotes();
  const updatedLocal = [newQuote, ...currentLocal];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));

  // Try Supabase if configured
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert([{
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          event_type: payload.event_type,
          guest_count: payload.guest_count,
          date: payload.date || null,
          location: payload.location || null,
          message: payload.message || null,
          status: 'Pendiente',
        }])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert notice (falling back to local):', error.message);
        return { success: true, data: newQuote };
      }
      return { success: true, data: data as QuoteRequest };
    } catch (err: any) {
      console.warn('Supabase request failed, saved locally:', err);
      return { success: true, data: newQuote };
    }
  }

  return { success: true, data: newQuote };
}

// Fetch all quotes
export async function fetchQuotes(): Promise<{ quotes: QuoteRequest[]; source: 'supabase' | 'local' }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return { quotes: data as QuoteRequest[], source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase fetch failed, loading local quotes:', err);
    }
  }

  return { quotes: getLocalQuotes(), source: 'local' };
}

// Update Quote Status
export async function updateQuoteStatus(id: string, newStatus: QuoteRequest['status']): Promise<boolean> {
  // Update local storage
  const currentLocal = getLocalQuotes();
  const updatedLocal = currentLocal.map(q => q.id === id ? { ...q, status: newStatus } : q);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));

  if (supabase && !id.startsWith('demo-') && !id.startsWith('q-')) {
    try {
      await supabase.from('quotes').update({ status: newStatus }).eq('id', id);
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }
  }
  return true;
}

// Delete Quote
export async function deleteQuote(id: string): Promise<boolean> {
  const currentLocal = getLocalQuotes();
  const updatedLocal = currentLocal.filter(q => q.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));

  if (supabase && !id.startsWith('demo-') && !id.startsWith('q-')) {
    try {
      await supabase.from('quotes').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete failed:', err);
    }
  }
  return true;
}

// SQL creation script for easy setup in Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- Crear tabla de cotizaciones para Maceiras Catering
create table if not exists public.quotes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  guest_count integer default 1,
  date text,
  location text,
  message text,
  status text default 'Pendiente' check (status in ('Pendiente', 'Contactado', 'Confirmado', 'Cancelado')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS)
alter table public.quotes enable row level security;

-- Política de lectura pública para anon key (o para usuarios autenticados)
create policy "Permitir inserción pública de cotizaciones" 
  on public.quotes for insert 
  with check (true);

create policy "Permitir lectura de cotizaciones" 
  on public.quotes for select 
  using (true);

create policy "Permitir actualización de estado" 
  on public.quotes for update 
  using (true);
`;
