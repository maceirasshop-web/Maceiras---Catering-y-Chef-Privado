import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Lock, AlertCircle, ShieldCheck, Database, CheckCircle2, RefreshCw, Trash2, Search,
  Filter, FileText, Calendar, MapPin, Users, Mail, Phone, ExternalLink, Copy, Check, Plus, Edit, BookOpen, Upload, Code
} from 'lucide-react';
import {
  fetchQuotes, updateQuoteStatus, deleteQuote, QuoteRequest,
  isSupabaseConfigured, SUPABASE_SQL_SCHEMA, fetchDbRecipes, saveDbRecipe, deleteDbRecipe
} from '../lib/supabase';
import { RecipeItem, RECIPES_DATA } from '../data/recipesData';
import { parseRecipeMarkdown } from '../utils/markdownParser';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigateHome }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Dashboard Active Tab: 'quotes' | 'recipes' | 'supabase'
  const [activeTab, setActiveTab] = useState<'quotes' | 'recipes' | 'supabase'>('quotes');

  // Quotes State
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [quoteSource, setQuoteSource] = useState<'supabase' | 'local'>('local');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [quotesLoading, setQuotesLoading] = useState(false);

  // Recipes CRUD State
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Partial<RecipeItem> | null>(null);
  const [markdownInput, setMarkdownInput] = useState('');
  const [recipeMode, setRecipeMode] = useState<'list' | 'form' | 'markdown'>('list');

  // Misc
  const [copiedSql, setCopiedSql] = useState(false);

  // Check auth session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('maceiras_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      loadQuotes();
      loadRecipes();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_ADMIN_PIN || 'maceiras2026';
    if (pinInput === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('maceiras_admin_auth', 'true');
      setPinError('');
      loadQuotes();
      loadRecipes();
    } else {
      setPinError('PIN de seguridad incorrecto.');
    }
  };

  const loadQuotes = async () => {
    setQuotesLoading(true);
    const res = await fetchQuotes();
    setQuotes(res.quotes);
    setQuoteSource(res.source);
    setQuotesLoading(false);
  };

  const loadRecipes = async () => {
    setRecipesLoading(true);
    const res = await fetchDbRecipes();
    setRecipes(res.recipes);
    setRecipesLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: QuoteRequest['status']) => {
    await updateQuoteStatus(id, newStatus);
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDeleteQuote = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta cotización?')) {
      await deleteQuote(id);
      setQuotes(prev => prev.filter(q => q.id !== id));
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote(null);
      }
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta receta?')) {
      await deleteDbRecipe(id);
      setRecipes(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSaveRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipe?.title) return;

    const recipeToSave: RecipeItem = {
      id: editingRecipe.id || 'receta-' + Date.now(),
      title: editingRecipe.title,
      subtitle: editingRecipe.subtitle || 'Especialidad Maceiras',
      description: editingRecipe.description || '',
      category: editingRecipe.category || 'principales',
      prepTime: editingRecipe.prepTime || '30 min',
      cookTime: editingRecipe.cookTime || '30 min',
      servings: editingRecipe.servings || 4,
      difficulty: editingRecipe.difficulty || 'Intermedio',
      image: editingRecipe.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      ingredients: editingRecipe.ingredients && editingRecipe.ingredients.length ? editingRecipe.ingredients : ['Ingredientes seleccionados'],
      pairing: editingRecipe.pairing || 'Vino reserva chileno',
      chefNote: editingRecipe.chefNote || '',
      steps: editingRecipe.steps && editingRecipe.steps.length ? editingRecipe.steps : [
        { number: '01', title: 'Preparación', instruction: 'Preparar ingredientes frescos.', tip: 'Servir a temperatura ideal.' }
      ]
    };

    await saveDbRecipe(recipeToSave);
    setEditingRecipe(null);
    setRecipeMode('list');
    loadRecipes();
  };

  const handleParseMarkdown = () => {
    if (!markdownInput.trim()) return;
    const parsed = parseRecipeMarkdown(markdownInput);
    setEditingRecipe(parsed);
    setRecipeMode('form');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // Filtered quotes logic
  const filteredQuotes = quotes.filter(q => {
    const matchesSearch =
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.phone.includes(searchTerm) ||
      (q.location && q.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'todos' || q.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: quotes.length,
    pendientes: quotes.filter(q => q.status === 'Pendiente').length,
    contactados: quotes.filter(q => q.status === 'Contactado').length,
    confirmados: quotes.filter(q => q.status === 'Confirmado').length,
  };

  // LOGIN SCREEN (FULL PAGE)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#2A2A2A] text-[#F5F2ED] font-sans flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#F5F2ED] text-[#2A2A2A] p-8 sm:p-10 rounded-xs shadow-2xl border border-white/10 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8 text-[#D27D56]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-sans font-medium">
              Suite Privada de Administración
            </span>
            <h1 className="font-serif text-3xl text-[#2A2A2A] font-light">
              Maceiras Admin
            </h1>
            <p className="text-xs text-[#2A2A2A]/70 font-light leading-relaxed">
              Ingresa el PIN de seguridad para gestionar cotizaciones y publicar recetas gourmet en vivo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="block text-[10px] uppercase tracking-widest text-[#5A5A40] font-medium">
                PIN de Seguridad
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xs bg-white border border-[#2A2A2A]/15 text-[#2A2A2A] text-center tracking-widest text-lg focus:outline-none focus:border-[#D27D56] transition-all"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-600 font-sans mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer shadow-md"
            >
              Ingresar al Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-[#2A2A2A]/10">
            <button
              onClick={onNavigateHome}
              className="text-xs text-[#5A5A40] hover:underline"
            >
              ← Volver al sitio principal
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // FULL PAGE ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#2A2A2A] font-sans antialiased flex flex-col">
      
      {/* Top Header Suite Navigation Bar */}
      <header className="bg-[#2A2A2A] text-[#F5F2ED] px-6 lg:px-12 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#D27D56]" />
          </div>
          <div>
            <h1 className="font-serif text-xl tracking-wider uppercase font-light text-[#F5F2ED]">
              Panel Admin <span className="text-[#D27D56]">Maceiras</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#EADDCA]/70 font-sans">
              Gestión de Cotizaciones & Recetas Gourmet
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="text-xs text-[#EADDCA] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Ver sitio público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('maceiras_admin_auth');
              setIsAuthenticated(false);
            }}
            className="px-3 py-1.5 rounded-xs bg-white/10 hover:bg-red-900/40 text-xs text-[#F5F2ED] transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Suite Container */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 space-y-8">
        
        {/* Suite Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A2A2A]/10 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-5 py-2.5 rounded-xs text-xs uppercase tracking-widest font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-[#5A5A40] text-[#F5F2ED] shadow-sm'
                  : 'bg-white text-[#2A2A2A]/70 border border-[#2A2A2A]/10 hover:bg-[#EADDCA]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#D27D56]" />
              <span>Cotizaciones ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-5 py-2.5 rounded-xs text-xs uppercase tracking-widest font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'recipes'
                  ? 'bg-[#5A5A40] text-[#F5F2ED] shadow-sm'
                  : 'bg-white text-[#2A2A2A]/70 border border-[#2A2A2A]/10 hover:bg-[#EADDCA]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#D27D56]" />
              <span>Gestión de Recetas ({recipes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('supabase')}
              className={`px-5 py-2.5 rounded-xs text-xs uppercase tracking-widest font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'supabase'
                  ? 'bg-[#5A5A40] text-[#F5F2ED] shadow-sm'
                  : 'bg-white text-[#2A2A2A]/70 border border-[#2A2A2A]/10 hover:bg-[#EADDCA]'
              }`}
            >
              <Database className="w-4 h-4 text-[#D27D56]" />
              <span>Estado Supabase SQL</span>
            </button>
          </div>

          {/* Database Source Badge */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#2A2A2A]/60">Base de datos activa:</span>
            {isSupabaseConfigured ? (
              <span className="px-2.5 py-1 rounded-xs bg-emerald-100 text-emerald-800 font-medium flex items-center gap-1 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Supabase En Vivo
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-xs bg-amber-100 text-amber-900 font-medium flex items-center gap-1 border border-amber-300" title="Configura VITE_SUPABASE_URL para conectar base en la nube">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                LocalStorage Fallback
              </span>
            )}
          </div>
        </div>

        {/* TAB 1: COTIZACIONES */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow text-center">
                <div className="text-[10px] uppercase tracking-widest text-[#5A5A40]">Total Solicitudes</div>
                <div className="font-serif text-3xl font-light text-[#2A2A2A] mt-1">{stats.total}</div>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow text-center border-l-4 border-l-amber-500">
                <div className="text-[10px] uppercase tracking-widest text-amber-700">Pendientes</div>
                <div className="font-serif text-3xl font-light text-amber-800 mt-1">{stats.pendientes}</div>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow text-center border-l-4 border-l-blue-500">
                <div className="text-[10px] uppercase tracking-widest text-blue-700">Contactados</div>
                <div className="font-serif text-3xl font-light text-blue-800 mt-1">{stats.contactados}</div>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow text-center border-l-4 border-l-emerald-500">
                <div className="text-[10px] uppercase tracking-widest text-emerald-700">Confirmados</div>
                <div className="font-serif text-3xl font-light text-emerald-800 mt-1">{stats.confirmados}</div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 card-shadow">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#2A2A2A]/40" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, correo, teléfono o ciudad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-xs text-[#2A2A2A] focus:outline-none focus:border-[#D27D56]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#5A5A40]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-xs text-[#2A2A2A] focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todos los Estados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="contactado">Contactados</option>
                  <option value="confirmado">Confirmados</option>
                </select>

                <button
                  onClick={loadQuotes}
                  className="p-2 rounded-xs bg-[#5A5A40] text-[#F5F2ED] hover:bg-[#D27D56] transition-colors cursor-pointer"
                  title="Recargar datos"
                >
                  <RefreshCw className={`w-4 h-4 ${quotesLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quotes Grid / Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className={`${selectedQuote ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3`}>
                {filteredQuotes.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-xs border border-[#2A2A2A]/10 text-xs text-[#2A2A2A]/60">
                    No se encontraron cotizaciones asociadas a este criterio.
                  </div>
                ) : (
                  filteredQuotes.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className={`p-5 rounded-xs border transition-all cursor-pointer bg-white ${
                        selectedQuote?.id === q.id 
                          ? 'border-[#D27D56] ring-1 ring-[#D27D56] shadow-md' 
                          : 'border-[#2A2A2A]/10 hover:border-[#5A5A40]/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg text-[#2A2A2A] font-medium">{q.name}</span>
                            <span className={`px-2 py-0.5 rounded-xs text-[9px] uppercase tracking-widest font-semibold ${
                              q.status === 'Pendiente' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                              q.status === 'Contactado' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                              q.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {q.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#5A5A40] font-medium">{q.event_type}</p>
                        </div>

                        <div className="text-right text-[11px] text-[#2A2A2A]/60 font-mono">
                          {new Date(q.created_at).toLocaleDateString('es-CL')}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#2A2A2A]/10 flex flex-wrap items-center justify-between text-xs text-[#2A2A2A]/80 gap-2">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#D27D56]" /> {q.guest_count} pers.</span>
                          {q.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#D27D56]" /> {q.location}</span>}
                        </div>
                        <span className="text-[#D27D56] font-medium">Ver ficha →</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Quote Detail Drawer */}
              {selectedQuote && (
                <div className="lg:col-span-5 bg-white p-6 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-6 h-fit sticky top-6">
                  <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-4">
                    <h3 className="font-serif text-xl text-[#2A2A2A]">Detalle de Solicitud</h3>
                    <button onClick={() => setSelectedQuote(null)} className="text-xs text-[#2A2A2A]/60 hover:text-black">Cerrar</button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="text-[10px] uppercase text-[#5A5A40] font-medium">Cliente</div>
                      <div className="text-base font-serif text-[#2A2A2A] font-normal">{selectedQuote.name}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] uppercase text-[#5A5A40] font-medium">Teléfono / WhatsApp</div>
                        <a href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-[#D27D56] hover:underline font-mono text-xs block">
                          {selectedQuote.phone}
                        </a>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-[#5A5A40] font-medium">Correo Electrónico</div>
                        <a href={`mailto:${selectedQuote.email}`} className="text-[#2A2A2A] font-mono text-xs block truncate">
                          {selectedQuote.email}
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-xs bg-[#F5F2ED] space-y-2 border border-[#2A2A2A]/10">
                      <div className="flex justify-between">
                        <span className="text-[#5A5A40]">Tipo de Evento:</span>
                        <span className="font-medium text-[#2A2A2A]">{selectedQuote.event_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5A5A40]">Comensales:</span>
                        <span className="font-medium text-[#2A2A2A]">{selectedQuote.guest_count} personas</span>
                      </div>
                      {selectedQuote.date && (
                        <div className="flex justify-between">
                          <span className="text-[#5A5A40]">Fecha Estimada:</span>
                          <span className="font-medium text-[#2A2A2A]">{selectedQuote.date}</span>
                        </div>
                      )}
                      {selectedQuote.location && (
                        <div className="flex justify-between">
                          <span className="text-[#5A5A40]">Ubicación:</span>
                          <span className="font-medium text-[#2A2A2A]">{selectedQuote.location}</span>
                        </div>
                      )}
                    </div>

                    {selectedQuote.message && (
                      <div className="space-y-1">
                        <div className="text-[10px] uppercase text-[#5A5A40] font-medium">Mensaje / Requerimientos</div>
                        <p className="p-3 bg-[#F5F2ED] rounded-xs italic text-[#2A2A2A]/80 font-serif leading-relaxed">
                          "{selectedQuote.message}"
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 pt-2 border-t border-[#2A2A2A]/10">
                      <div className="text-[10px] uppercase text-[#5A5A40] font-medium">Cambiar Estado</div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Pendiente', 'Contactado', 'Confirmado'] as QuoteRequest['status'][]).map(st => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(selectedQuote.id, st)}
                            className={`py-2 rounded-xs text-[10px] uppercase tracking-wider font-semibold cursor-pointer ${
                              selectedQuote.status === st 
                                ? 'bg-[#5A5A40] text-[#F5F2ED]' 
                                : 'bg-[#F5F2ED] text-[#2A2A2A]/70 border border-[#2A2A2A]/15 hover:bg-[#EADDCA]'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <button
                        onClick={() => handleDeleteQuote(selectedQuote.id)}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar cotización</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: GESTIÓN DE RECETAS (CRUD + MARKDOWN) */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            
            {/* Header Toolbar */}
            <div className="bg-white p-5 rounded-xs border border-[#2A2A2A]/10 flex items-center justify-between gap-4 card-shadow">
              <div>
                <h2 className="font-serif text-2xl text-[#2A2A2A] font-light">Publicidad de Recetas Gourmet</h2>
                <p className="text-xs text-[#2A2A2A]/70 font-light">Crea, edita o importa recetas estructuradas en Markdown para el sitio web.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingRecipe({
                      title: '',
                      subtitle: '',
                      description: '',
                      category: 'principales',
                      prepTime: '30 min',
                      cookTime: '30 min',
                      servings: 4,
                      difficulty: 'Intermedio',
                      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
                      ingredients: ['Filete de res 800g', 'Champiñones 400g'],
                      pairing: 'Vino reserva chileno',
                      chefNote: 'Servir recién preparado.',
                      steps: [
                        { number: '01', title: 'Acondicionamiento', instruction: 'Preparar los ingredientes frescos.', tip: 'Manener orden.' }
                      ]
                    });
                    setRecipeMode('form');
                  }}
                  className="px-4 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Receta</span>
                </button>

                <button
                  onClick={() => {
                    setMarkdownInput(`# Filete Wellington Artesanal con Risotto de Setas
**Subtítulo:** El clásico atemporal de la alta cocina internacional
**Categoría:** principales
**Tiempo Prep:** 45 min
**Tiempo Cocción:** 35 min
**Porciones:** 4
**Dificultad:** Chef Master
**Imagen:** https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80
**Maridaje:** Cabernet Sauvignon Reserva del Valle del Maipo.
**Nota del Chef:** Secar completamente la duxelles de hongos.

## Descripción
Aprende paso a paso la técnica maestra de Maceiras para sellar el corte de res y envolver en hojaldre crujiente.

## Ingredientes
- 800g de Lomo Vetado o Filete de Res
- 400g de Champiñones París y Portobello
- 200g de Jamón Serrano
- 1 masa de Hojaldre Artesanal de mantequilla

## Pasos
### Paso 1: Sellado y Adobo del Corte
Salpimentar el lomo de res. En una sartén a fuego muy alto, sellar la pieza durante 1 a 2 minutos por lado.
*Consejo:* Dejar reposar sobre una rejilla.

### Paso 2: Preparación de la Duxelles de Setas
Triturar muy fino los champiñones y saltearlos sin aceite hasta evaporar el líquido.
`);
                    setRecipeMode('markdown');
                  }}
                  className="px-4 py-2.5 rounded-xs bg-[#EADDCA]/60 text-[#2A2A2A] border border-[#2A2A2A]/15 text-xs uppercase tracking-widest font-medium hover:bg-[#5A5A40] hover:text-[#F5F2ED] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Code className="w-4 h-4 text-[#D27D56]" />
                  <span>Importar Markdown</span>
                </button>
              </div>
            </div>

            {/* RECIPE MODE: LIST */}
            {recipeMode === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((r) => (
                  <div key={r.id} className="bg-white rounded-xs border border-[#2A2A2A]/10 overflow-hidden card-shadow flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 w-full bg-[#EADDCA]">
                        <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-xs bg-[#F5F2ED] text-[9px] uppercase tracking-widest text-[#5A5A40] font-medium">
                          {r.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-lg text-[#2A2A2A] font-light">{r.title}</h3>
                        <p className="text-xs text-[#2A2A2A]/70 line-clamp-2 font-light">{r.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between border-t border-[#2A2A2A]/10 mt-2 text-xs">
                      <button
                        onClick={() => {
                          setEditingRecipe(r);
                          setRecipeMode('form');
                        }}
                        className="text-[#5A5A40] hover:text-[#D27D56] font-medium flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Editar
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(r.id)}
                        className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RECIPE MODE: MARKDOWN IMPORT */}
            {recipeMode === 'markdown' && (
              <div className="bg-white p-8 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-6">
                <div className="flex justify-between items-center border-b border-[#2A2A2A]/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl text-[#2A2A2A]">Importador de Recetas en Formato Markdown</h3>
                    <p className="text-xs text-[#2A2A2A]/70 font-light">Pega la receta estructurada en Markdown con etiquetas `#`, `**Subtítulo:**`, `## Ingredientes` y `### Paso X`.</p>
                  </div>
                  <button onClick={() => setRecipeMode('list')} className="text-xs text-[#5A5A40] hover:underline">Cancelar</button>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={14}
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                    className="w-full p-4 font-mono text-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none focus:border-[#D27D56]"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setRecipeMode('list')}
                    className="px-6 py-2.5 text-xs uppercase tracking-widest text-[#2A2A2A]/70 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleParseMarkdown}
                    className="px-8 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
                  >
                    Parsear e Importar Receta
                  </button>
                </div>
              </div>
            )}

            {/* RECIPE MODE: FORM CREATOR / EDITOR */}
            {recipeMode === 'form' && editingRecipe && (
              <form onSubmit={handleSaveRecipe} className="bg-white p-8 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-6">
                <div className="flex justify-between items-center border-b border-[#2A2A2A]/10 pb-4">
                  <h3 className="font-serif text-xl text-[#2A2A2A]">
                    {editingRecipe.id ? 'Editar Receta' : 'Nueva Receta Gourmet'}
                  </h3>
                  <button type="button" onClick={() => setRecipeMode('list')} className="text-xs text-[#5A5A40] hover:underline">Cancelar</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">Título de la Receta *</label>
                    <input
                      type="text"
                      required
                      value={editingRecipe.title || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })}
                      placeholder="Ej. Filete Wellington Artesanal"
                      className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none focus:border-[#D27D56]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">Subtítulo Descriptivo</label>
                    <input
                      type="text"
                      value={editingRecipe.subtitle || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, subtitle: e.target.value })}
                      placeholder="Ej. El clásico atemporal de la alta cocina"
                      className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none focus:border-[#D27D56]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-xs">
                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">Categoría</label>
                    <select
                      value={editingRecipe.category || 'principales'}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value as any })}
                      className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none"
                    >
                      <option value="principales">Platos Principales</option>
                      <option value="entrantes">Entrantes</option>
                      <option value="postres">Postres</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">Tiempo Prep</label>
                    <input
                      type="text"
                      value={editingRecipe.prepTime || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: e.target.value })}
                      placeholder="Ej. 45 min"
                      className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">Tiempo Cocción</label>
                    <input
                      type="text"
                      value={editingRecipe.cookTime || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, cookTime: e.target.value })}
                      placeholder="Ej. 35 min"
                      className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">Dificultad</label>
                    <select
                      value={editingRecipe.difficulty || 'Intermedio'}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, difficulty: e.target.value as any })}
                      className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none"
                    >
                      <option value="Fácil">Fácil</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                      <option value="Chef Master">Chef Master</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">URL de Imagen Fotográfica</label>
                  <input
                    type="text"
                    value={editingRecipe.image || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block uppercase tracking-wider text-[#5A5A40] font-medium">Descripción Principal</label>
                  <textarea
                    rows={3}
                    value={editingRecipe.description || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, description: e.target.value })}
                    className="w-full p-3 bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] rounded-xs focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-[#2A2A2A]/10">
                  <button
                    type="button"
                    onClick={() => setRecipeMode('list')}
                    className="px-6 py-2.5 text-xs uppercase tracking-widest text-[#2A2A2A]/70 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
                  >
                    Guardar y Publicar Receta
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* TAB 3: ESTADO SUPABASE SQL */}
        {activeTab === 'supabase' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-4">
              <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-4">
                <div>
                  <h2 className="font-serif text-2xl text-[#2A2A2A] font-light">Script de Creación de Tablas (Supabase SQL)</h2>
                  <p className="text-xs text-[#2A2A2A]/70 font-light">Copia y ejecuta este script en el SQL Editor de tu proyecto Supabase para habilitar la persistencia remota de cotizaciones y recetas.</p>
                </div>

                <button
                  onClick={() => copyToClipboard(SUPABASE_SQL_SCHEMA)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar SQL Schema</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="p-5 rounded-xs bg-[#2A2A2A] text-[#F5F2ED] text-xs font-mono overflow-x-auto max-h-96 leading-relaxed">
                  <code>{SUPABASE_SQL_SCHEMA}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
