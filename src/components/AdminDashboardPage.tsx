import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, AlertCircle, ShieldCheck, Database, CheckCircle2, RefreshCw, Trash2, Search,
  Filter, FileText, Calendar, MapPin, Users, Mail, Phone, ExternalLink, Copy, Check, Plus, Edit,
  BookOpen, Upload, Code, MessageSquare, Key, Sparkles, ShoppingBag, Eye, ArrowRight
} from 'lucide-react';
import {
  fetchQuotes, updateQuoteStatus, deleteQuote, QuoteRequest,
  isSupabaseConfigured, SUPABASE_SQL_SCHEMA, fetchDbRecipes, saveDbRecipe, deleteDbRecipe
} from '../lib/supabase';
import { RecipeItem } from '../data/recipesData';
import { CATALOG_PRODUCTS, CatalogProduct } from '../data/catalogData';
import { parseRecipeMarkdown } from '../utils/markdownParser';
import { displaySrc } from './OptimizedImage';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigateHome }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Active Suite Tab: 'quotes' | 'recipes' | 'catalog' | 'settings'
  const [activeTab, setActiveTab] = useState<'quotes' | 'recipes' | 'catalog' | 'settings'>('quotes');

  // Quotes State
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [quoteSource, setQuoteSource] = useState<'supabase' | 'local'>('local');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [copiedProposalText, setCopiedProposalText] = useState(false);

  // Recipes CRUD & Markdown State
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Partial<RecipeItem> | null>(null);
  const [markdownInput, setMarkdownInput] = useState('');
  const [recipeMode, setRecipeMode] = useState<'list' | 'form' | 'markdown'>('list');

  // Catalog Products State
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>(CATALOG_PRODUCTS);
  const [editingCatalogItem, setEditingCatalogItem] = useState<Partial<CatalogProduct> | null>(null);
  const [showCatalogForm, setShowCatalogForm] = useState(false);

  // Settings State
  const [currentPinSetting, setCurrentPinSetting] = useState('');
  const [newPinSetting, setNewPinSetting] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  // Misc
  const [copiedSql, setCopiedSql] = useState(false);

  // Local preset uploaded images
  const localUploadedImages = [
    '/images/brocheta-capresse',
    '/images/canape-de-roast-beef',
    '/images/ceviche-mixto',
    '/images/tabla-de-charcuteria',
    '/images/empanada-de-coctel',
    '/images/canape-de-mermelada-de-cebolla',
    '/images/canape-de-huevo',
    '/images/canape-de-ave-pimenton',
    '/images/canape-de-palmito',
  ];

  useEffect(() => {
    const envPin = (import.meta.env.VITE_ADMIN_PIN || '').trim();
    const customPin = (localStorage.getItem('maceiras_admin_pin') || '').trim();
    const sessionAuth = sessionStorage.getItem('maceiras_admin_auth') === 'true';
    if ((!envPin && !customPin) || sessionAuth) {
      setIsAuthenticated(true);
      loadQuotes();
      loadRecipes();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = pinInput.trim();
    const customPin = (localStorage.getItem('maceiras_admin_pin') || '').trim();
    const envPin = (import.meta.env.VITE_ADMIN_PIN || '').trim();
    
    const validPins = [customPin, envPin].filter(Boolean);

    if (validPins.includes(entered)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('maceiras_admin_auth', 'true');
      setPinError('');
      loadQuotes();
      loadRecipes();
    } else {
      setPinError('PIN incorrecto.');
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
      image: editingRecipe.image || '/images/brocheta-capresse',
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

  const handleSaveCatalogProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCatalogItem?.title) return;

    const newItem: CatalogProduct = {
      id: editingCatalogItem.id || 'prod-' + Date.now(),
      title: editingCatalogItem.title,
      subtitle: editingCatalogItem.subtitle || 'Selección del Chef',
      category: editingCatalogItem.category || 'canapes',
      description: editingCatalogItem.description || '',
      unitText: editingCatalogItem.unitText || 'Porción (12 unidades)',
      image: editingCatalogItem.image || '/images/brocheta-capresse',
      badge: editingCatalogItem.badge
    };

    setCatalogProducts(prev => {
      const exists = prev.some(p => p.id === newItem.id);
      if (exists) {
        return prev.map(p => p.id === newItem.id ? newItem : p);
      }
      return [newItem, ...prev];
    });

    setEditingCatalogItem(null);
    setShowCatalogForm(false);
  };

  const handleDeleteCatalogProduct = (id: string) => {
    if (window.confirm('¿Eliminar este producto del catálogo?')) {
      setCatalogProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCurrent = currentPinSetting.trim();
    const customPin = (localStorage.getItem('maceiras_admin_pin') || '').trim();
    const envPin = (import.meta.env.VITE_ADMIN_PIN || '').trim();
    const validPins = [customPin, envPin].filter(Boolean);

    if (!validPins.includes(enteredCurrent)) {
      setPinChangeMsg('El PIN actual es incorrecto.');
      return;
    }
    if (newPinSetting.trim().length < 4) {
      setPinChangeMsg('El nuevo PIN debe tener al menos 4 caracteres.');
      return;
    }
    localStorage.setItem('maceiras_admin_pin', newPinSetting.trim());
    setPinChangeMsg('¡PIN actualizado correctamente!');
    setCurrentPinSetting('');
    setNewPinSetting('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleWhatsAppReply = (quote: QuoteRequest) => {
    const cleanPhone = quote.phone.replace(/[^0-9]/g, '');
    const message = `Hola ${quote.name}, te escribimos de Maceiras Catering y Chef Privado. Recibimos tu solicitud para tu evento de ${quote.event_type} (${quote.guest_count} personas). ¿Te gustaría agendar una breve llamada para revisar los detalles del menú?`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCopyProposal = (quote: QuoteRequest) => {
    const text = `COTIZACIÓN MACEIRAS CATERING & CHEF PRIVADO
Cliente: ${quote.name}
Correo: ${quote.email}
Teléfono: ${quote.phone}
Tipo de Evento: ${quote.event_type}
Comensales: ${quote.guest_count} personas
Fecha: ${quote.date || 'Por definir'}
Ubicación: ${quote.location || 'Santiago'}

[REQUERIMIENTOS / MENÚ]:
${quote.message || 'Sin observaciones'}`;

    navigator.clipboard.writeText(text);
    setCopiedProposalText(true);
    setTimeout(() => setCopiedProposalText(false), 2000);
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

  // LOGIN SCREEN (FULL PAGE ACCESO RESTRINGIDO)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1F2937] text-[#FAF8F5] font-sans flex items-center justify-center p-6 antialiased">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full bg-white text-[#1F2937] p-8 sm:p-10 rounded-2xl shadow-2xl border border-[#708238]/30 text-center space-y-6 relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-[#708238] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#708238] font-bold font-sans">
              Suite Privada de Administración
            </span>
            <h1 className="font-serif text-3xl text-[#1F2937] font-light">
              Maceiras Admin
            </h1>
            <p className="text-xs text-[#1F2937]/75 font-light leading-relaxed">
              Acceso restringido. Ingresa tu PIN de seguridad para acceder a cotizaciones y gestión del sitio.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5 relative">
              <label className="block text-[10px] uppercase tracking-widest text-[#708238] font-bold">
                PIN de Seguridad
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-center tracking-widest text-lg font-mono focus:outline-none focus:border-[#E07A5F]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-3.5 text-[#1F2937]/50 hover:text-[#1F2937]"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {pinError && (
                <p className="text-xs text-red-600 font-sans mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#5A5A40] transition-colors cursor-pointer shadow-md"
            >
              Ingresar al Dashboard VIP
            </button>
          </form>

          <div className="pt-2 border-t border-[#1F2937]/10">
            <button
              onClick={onNavigateHome}
              className="text-xs text-[#708238] hover:underline font-medium"
            >
              ← Volver al sitio principal
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // FULL PAGE ADMIN SUITE DASHBOARD
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2937] font-sans antialiased flex flex-col">
      
      {/* Top Navigation Header Bar */}
      <header className="bg-[#1F2937] text-[#FAF8F5] px-6 lg:px-12 py-4 flex items-center justify-between border-b border-white/10 shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#708238] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-xl tracking-wider uppercase font-light text-[#FAF8F5]">
              Panel Admin <span className="text-[#E07A5F] font-normal">Maceiras</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#EADDCA]/80 font-sans font-semibold">
              Suite de Gestión Gastronómica & Cotizaciones
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
            className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-red-900/50 text-xs text-[#FAF8F5] transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Suite Workspace Container */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 space-y-8">
        
        {/* Suite Tab Bar Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F2937]/10 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-[#708238] text-white shadow-md'
                  : 'bg-white text-[#1F2937]/80 border border-[#1F2937]/10 hover:bg-[#708238]/10'
              }`}
            >
              <FileText className="w-4 h-4 text-[#E07A5F]" />
              <span>Cotizaciones ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'recipes'
                  ? 'bg-[#708238] text-white shadow-md'
                  : 'bg-white text-[#1F2937]/80 border border-[#1F2937]/10 hover:bg-[#708238]/10'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#E07A5F]" />
              <span>Recetas ({recipes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-[#708238] text-white shadow-md'
                  : 'bg-white text-[#1F2937]/80 border border-[#1F2937]/10 hover:bg-[#708238]/10'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E07A5F]" />
              <span>Catálogo Arma tu Menú ({catalogProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#708238] text-white shadow-md'
                  : 'bg-white text-[#1F2937]/80 border border-[#1F2937]/10 hover:bg-[#708238]/10'
              }`}
            >
              <Key className="w-4 h-4 text-[#E07A5F]" />
              <span>Configuración & SQL</span>
            </button>
          </div>

          {/* Database Source Indicator Badge */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#1F2937]/60">Servidor DB:</span>
            {isSupabaseConfigured ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1.5 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Supabase Cloud Live
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center gap-1.5 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                LocalStorage Engine
              </span>
            )}
          </div>
        </div>

        {/* TAB 1: GESTIÓN DE COTIZACIONES */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {/* Stats Dashboard Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#1F2937]/10 card-shadow text-center">
                <div className="text-[10px] uppercase tracking-widest text-[#708238] font-bold">Total Solicitudes</div>
                <div className="font-serif text-3xl font-light text-[#1F2937] mt-1">{stats.total}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#1F2937]/10 card-shadow text-center border-l-4 border-l-amber-500">
                <div className="text-[10px] uppercase tracking-widest text-amber-700 font-bold">Pendientes</div>
                <div className="font-serif text-3xl font-light text-amber-800 mt-1">{stats.pendientes}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#1F2937]/10 card-shadow text-center border-l-4 border-l-blue-500">
                <div className="text-[10px] uppercase tracking-widest text-blue-700 font-bold">Contactados</div>
                <div className="font-serif text-3xl font-light text-blue-800 mt-1">{stats.contactados}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#1F2937]/10 card-shadow text-center border-l-4 border-l-emerald-500">
                <div className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold">Confirmados</div>
                <div className="font-serif text-3xl font-light text-emerald-800 mt-1">{stats.confirmados}</div>
              </div>
            </div>

            {/* Toolbar Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#1F2937]/10 flex flex-col sm:flex-row items-center justify-between gap-4 card-shadow">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#1F2937]/40" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, correo, teléfono o comuna..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-xs text-[#1F2937] focus:outline-none focus:border-[#E07A5F]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#708238]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-xs text-[#1F2937] focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todos los Estados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="contactado">Contactados</option>
                  <option value="confirmado">Confirmados</option>
                </select>

                <button
                  onClick={loadQuotes}
                  className="p-2.5 rounded-xl bg-[#708238] text-white hover:bg-[#5A5A40] transition-colors cursor-pointer"
                  title="Recargar datos"
                >
                  <RefreshCw className={`w-4 h-4 ${quotesLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quotes Table Grid & Drawer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className={`${selectedQuote ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3`}>
                {filteredQuotes.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-2xl border border-[#1F2937]/10 text-xs text-[#1F2937]/60">
                    No se encontraron cotizaciones asociadas a este criterio.
                  </div>
                ) : (
                  filteredQuotes.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white ${
                        selectedQuote?.id === q.id 
                          ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/20 shadow-md' 
                          : 'border-[#1F2937]/10 hover:border-[#708238]/40 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg text-[#1F2937] font-normal">{q.name}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold ${
                              q.status === 'Pendiente' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                              q.status === 'Contactado' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                              q.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {q.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#708238] font-bold">{q.event_type}</p>
                        </div>

                        <div className="text-right text-[11px] text-[#1F2937]/60 font-mono">
                          {new Date(q.created_at).toLocaleDateString('es-CL')}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#1F2937]/10 flex flex-wrap items-center justify-between text-xs text-[#1F2937]/80 gap-2">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#E07A5F]" /> {q.guest_count} pers.</span>
                          {q.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#E07A5F]" /> {q.location}</span>}
                        </div>
                        <span className="text-[#E07A5F] font-bold">Ver detalles →</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Quote Detail Drawer */}
              {selectedQuote && (
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#1F2937]/10 card-shadow space-y-6 h-fit sticky top-6">
                  <div className="flex items-center justify-between border-b border-[#1F2937]/10 pb-4">
                    <h3 className="font-serif text-xl text-[#1F2937]">Ficha de Cotización</h3>
                    <button onClick={() => setSelectedQuote(null)} className="text-xs text-[#1F2937]/60 hover:text-black font-mono">Cerrar</button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="text-[10px] uppercase text-[#708238] font-bold">Cliente</div>
                      <div className="text-base font-serif text-[#1F2937] font-normal">{selectedQuote.name}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] uppercase text-[#708238] font-bold">Teléfono / WhatsApp</div>
                        <a href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-[#E07A5F] hover:underline font-mono text-xs block font-bold">
                          {selectedQuote.phone}
                        </a>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-[#708238] font-bold">Correo Electrónico</div>
                        <a href={`mailto:${selectedQuote.email}`} className="text-[#1F2937] font-mono text-xs block truncate">
                          {selectedQuote.email}
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF8F5] space-y-2 border border-[#1F2937]/10">
                      <div className="flex justify-between">
                        <span className="text-[#708238] font-semibold">Tipo de Evento:</span>
                        <span className="font-medium text-[#1F2937]">{selectedQuote.event_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#708238] font-semibold">Comensales:</span>
                        <span className="font-medium text-[#1F2937]">{selectedQuote.guest_count} personas</span>
                      </div>
                      {selectedQuote.date && (
                        <div className="flex justify-between">
                          <span className="text-[#708238] font-semibold">Fecha Estimada:</span>
                          <span className="font-medium text-[#1F2937]">{selectedQuote.date}</span>
                        </div>
                      )}
                      {selectedQuote.location && (
                        <div className="flex justify-between">
                          <span className="text-[#708238] font-semibold">Ubicación:</span>
                          <span className="font-medium text-[#1F2937]">{selectedQuote.location}</span>
                        </div>
                      )}
                    </div>

                    {selectedQuote.message && (
                      <div className="space-y-1">
                        <div className="text-[10px] uppercase text-[#708238] font-bold">Detalles / Requerimientos</div>
                        <p className="p-3 bg-[#FAF8F5] rounded-xl text-[#1F2937]/85 font-sans leading-relaxed text-xs whitespace-pre-line border border-[#1F2937]/10">
                          {selectedQuote.message}
                        </p>
                      </div>
                    )}

                    {/* Acciones directas (WhatsApp 1-Click + Exportar) */}
                    <div className="space-y-2 pt-2 border-t border-[#1F2937]/10">
                      <div className="text-[10px] uppercase text-[#708238] font-bold">Acciones de Atención al Cliente</div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleWhatsAppReply(selectedQuote)}
                          className="py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Responder WhatsApp</span>
                        </button>

                        <button
                          onClick={() => handleCopyProposal(selectedQuote)}
                          className="py-2.5 rounded-xl bg-white border border-[#1F2937]/20 text-[#1F2937] text-[11px] font-bold hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {copiedProposalText ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#708238]" />
                              <span>Copiar Resumen</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Estado Selector */}
                    <div className="space-y-2 pt-2 border-t border-[#1F2937]/10">
                      <div className="text-[10px] uppercase text-[#708238] font-bold">Cambiar Estado</div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Pendiente', 'Contactado', 'Confirmado'] as QuoteRequest['status'][]).map(st => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(selectedQuote.id, st)}
                            className={`py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-all ${
                              selectedQuote.status === st 
                                ? 'bg-[#708238] text-white shadow-sm' 
                                : 'bg-[#FAF8F5] text-[#1F2937]/70 border border-[#1F2937]/15 hover:bg-[#708238]/10'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-[#1F2937]/10">
                      <button
                        onClick={() => handleDeleteQuote(selectedQuote.id)}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer font-medium"
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

        {/* TAB 2: GESTIÓN DE RECETAS (CRUD + MARKDOWN SPLIT PREVIEW) */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            
            {/* Header Toolbar */}
            <div className="bg-white p-5 rounded-2xl border border-[#1F2937]/10 flex flex-col sm:flex-row items-center justify-between gap-4 card-shadow">
              <div>
                <h2 className="font-serif text-2xl text-[#1F2937] font-light">Publicador de Recetas Gourmet</h2>
                <p className="text-xs text-[#1F2937]/70 font-light">Crea, edita o importa recetas estructuradas en Markdown con vista previa instantánea en vivo.</p>
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
                      image: '/images/brocheta-capresse',
                      ingredients: ['Filete de res 800g', 'Champiñones 400g'],
                      pairing: 'Vino reserva chileno',
                      chefNote: 'Servir recién preparado.',
                      steps: [
                        { number: '01', title: 'Acondicionamiento', instruction: 'Preparar los ingredientes frescos.', tip: 'Manener orden.' }
                      ]
                    });
                    setRecipeMode('form');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#5A5A40] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
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
**Imagen:** /images/brocheta-capresse
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
                  className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1F2937] border border-[#1F2937]/15 text-xs uppercase tracking-widest font-bold hover:bg-[#708238] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Code className="w-4 h-4 text-[#E07A5F]" />
                  <span>Importar Markdown</span>
                </button>
              </div>
            </div>

            {/* RECIPE MODE: LIST */}
            {recipeMode === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-[#1F2937]/10 overflow-hidden card-shadow flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 w-full bg-[#F3E9DC]">
                        <img src={displaySrc(r.image)} alt={r.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FAF8F5] text-[9px] uppercase tracking-widest text-[#708238] font-bold">
                          {r.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-lg text-[#1F2937] font-normal">{r.title}</h3>
                        <p className="text-xs text-[#1F2937]/75 line-clamp-2 font-light">{r.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between border-t border-[#1F2937]/10 mt-2 text-xs">
                      <button
                        onClick={() => {
                          setEditingRecipe(r);
                          setRecipeMode('form');
                        }}
                        className="text-[#708238] hover:text-[#E07A5F] font-bold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Editar
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(r.id)}
                        className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RECIPE MODE: MARKDOWN IMPORT & LIVE SPLIT PREVIEW */}
            {recipeMode === 'markdown' && (
              <div className="bg-white p-8 rounded-2xl border border-[#1F2937]/10 card-shadow space-y-6">
                <div className="flex justify-between items-center border-b border-[#1F2937]/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl text-[#1F2937]">Importador Markdown con Vista Previa en Vivo</h3>
                    <p className="text-xs text-[#1F2937]/75 font-light">Pega la receta estructurada en Markdown para visualizar cómo lucirá en el sitio público.</p>
                  </div>
                  <button onClick={() => setRecipeMode('list')} className="text-xs text-[#708238] hover:underline font-bold">Cancelar</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Markdown Editor */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-[#708238] font-bold">Código Markdown</label>
                    <textarea
                      rows={16}
                      value={markdownInput}
                      onChange={(e) => setMarkdownInput(e.target.value)}
                      className="w-full p-4 font-mono text-xs bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] rounded-xl focus:outline-none focus:border-[#E07A5F]"
                    />
                  </div>

                  {/* Right Column: Live Parsed Preview */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-[#708238] font-bold">Vista Previa Parseada</label>
                    {(() => {
                      const parsed = parseRecipeMarkdown(markdownInput);
                      return (
                        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#708238]/30 max-h-[380px] overflow-y-auto space-y-3 text-xs">
                          <h4 className="font-serif text-lg text-[#1F2937] font-bold">{parsed.title || 'Título de receta...'}</h4>
                          <p className="text-[#E07A5F] font-bold text-[10px] uppercase">{parsed.subtitle}</p>
                          <p className="text-[#1F2937]/80 italic">{parsed.description}</p>
                          <div className="font-mono text-[10px] text-[#708238]">Ingredientes ({parsed.ingredients.length}): {parsed.ingredients.join(', ')}</div>
                          <div className="space-y-1 pt-2 border-t border-[#1F2937]/10">
                            {parsed.steps.map((st, i) => (
                              <div key={i} className="p-2 bg-white rounded-lg border border-[#1F2937]/10">
                                <strong>Paso {st.number}: {st.title}</strong>
                                <p className="text-[11px] text-[#1F2937]/80">{st.instruction}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-[#1F2937]/10 pt-4">
                  <button
                    onClick={() => setRecipeMode('list')}
                    className="px-6 py-2.5 text-xs uppercase tracking-widest text-[#1F2937]/70 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleParseMarkdown}
                    className="px-8 py-2.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#5A5A40] transition-colors cursor-pointer shadow-md"
                  >
                    Cargar en Formulario de Edición →
                  </button>
                </div>
              </div>
            )}

            {/* RECIPE MODE: FORM CREATOR / EDITOR */}
            {recipeMode === 'form' && editingRecipe && (
              <form onSubmit={handleSaveRecipe} className="bg-white p-8 rounded-2xl border border-[#1F2937]/10 card-shadow space-y-6">
                <div className="flex justify-between items-center border-b border-[#1F2937]/10 pb-4">
                  <h3 className="font-serif text-xl text-[#1F2937]">
                    {editingRecipe.id ? 'Editar Receta Gourmet' : 'Nueva Receta Gourmet'}
                  </h3>
                  <button type="button" onClick={() => setRecipeMode('list')} className="text-xs text-[#708238] hover:underline font-bold">Cancelar</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#708238] font-bold">Título de la Receta *</label>
                    <input
                      type="text"
                      required
                      value={editingRecipe.title || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })}
                      placeholder="Ej. Filete Wellington Artesanal"
                      className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] rounded-xl focus:outline-none focus:border-[#E07A5F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block uppercase tracking-wider text-[#708238] font-bold">Subtítulo Descriptivo</label>
                    <input
                      type="text"
                      value={editingRecipe.subtitle || ''}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, subtitle: e.target.value })}
                      placeholder="Ej. El clásico atemporal de la alta cocina"
                      className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] rounded-xl focus:outline-none focus:border-[#E07A5F]"
                    />
                  </div>
                </div>

                {/* Preset uploaded image selector */}
                <div className="space-y-2 text-xs">
                  <label className="block uppercase tracking-wider text-[#708238] font-bold">Seleccionar Fotografía de la Galería Local</label>
                  <div className="flex flex-wrap gap-2">
                    {localUploadedImages.map((imgUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setEditingRecipe({ ...editingRecipe, image: imgUrl })}
                        className={`h-14 w-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          editingRecipe.image === imgUrl ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/30 scale-105' : 'border-[#1F2937]/20 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={displaySrc(imgUrl)} alt="Preset local" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={editingRecipe.image || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, image: e.target.value })}
                    placeholder="o ingresa una URL personalizada..."
                    className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block uppercase tracking-wider text-[#708238] font-bold">Descripción Principal</label>
                  <textarea
                    rows={3}
                    value={editingRecipe.description || ''}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, description: e.target.value })}
                    className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] rounded-xl focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-[#1F2937]/10">
                  <button
                    type="button"
                    onClick={() => setRecipeMode('list')}
                    className="px-6 py-2.5 text-xs uppercase tracking-widest text-[#1F2937]/70 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#5A5A40] transition-colors cursor-pointer shadow-md"
                  >
                    Guardar y Publicar Receta
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* TAB 3: GESTOR DEL CATÁLOGO "ARMA TU MENÚ" */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-[#1F2937]/10 flex items-center justify-between gap-4 card-shadow">
              <div>
                <h2 className="font-serif text-2xl text-[#1F2937] font-light">Gestión del Catálogo "Arma tu Menú"</h2>
                <p className="text-xs text-[#1F2937]/75 font-light">Administra los canapés, almuerzos y estaciones gastronómicas disponibles para cotización.</p>
              </div>

              <button
                onClick={() => {
                  setEditingCatalogItem({
                    title: '',
                    subtitle: 'Bocado de Autor',
                    category: 'canapes',
                    description: '',
                    unitText: 'Porción (12 unidades)',
                    image: '/images/brocheta-capresse',
                    badge: 'Nuevo'
                  });
                  setShowCatalogForm(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#5A5A40] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Producto</span>
              </button>
            </div>

            {/* Catalog Form Modal/Drawer */}
            {showCatalogForm && editingCatalogItem && (
              <form onSubmit={handleSaveCatalogProduct} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1F2937]/10 card-shadow space-y-4">
                <div className="flex justify-between items-center border-b border-[#1F2937]/10 pb-3">
                  <h3 className="font-serif text-xl text-[#1F2937]">Editar Producto del Catálogo</h3>
                  <button type="button" onClick={() => setShowCatalogForm(false)} className="text-xs text-[#708238] hover:underline font-bold">Cancelar</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="block uppercase text-[#708238] font-bold">Nombre del Producto *</label>
                    <input
                      type="text"
                      required
                      value={editingCatalogItem.title || ''}
                      onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, title: e.target.value })}
                      placeholder="Ej. Canapé de Palmito & Crema"
                      className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block uppercase text-[#708238] font-bold">Categoría</label>
                    <select
                      value={editingCatalogItem.category || 'canapes'}
                      onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, category: e.target.value as any })}
                      className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 rounded-xl"
                    >
                      <option value="canapes">Canapés & Finger Food</option>
                      <option value="almuerzos">Almuerzos & Banquetes</option>
                      <option value="estaciones">Estaciones en Vivo</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block uppercase text-[#708238] font-bold">Imagen del Producto</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {localUploadedImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setEditingCatalogItem({ ...editingCatalogItem, image: img })}
                        className={`h-12 w-16 rounded-lg overflow-hidden border-2 cursor-pointer ${
                          editingCatalogItem.image === img ? 'border-[#E07A5F] scale-105' : 'opacity-60'
                        }`}
                      >
                        <img src={displaySrc(img)} alt="Local" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#1F2937]/10">
                  <button type="button" onClick={() => setShowCatalogForm(false)} className="px-5 py-2 text-xs text-[#1F2937]/70 font-bold">Cancelar</button>
                  <button type="submit" className="px-6 py-2 rounded-xl bg-[#708238] text-white text-xs font-bold uppercase tracking-wider">Guardar Producto</button>
                </div>
              </form>
            )}

            {/* Catalog Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl border border-[#1F2937]/10 overflow-hidden card-shadow flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 w-full bg-[#F3E9DC]">
                      <img src={displaySrc(prod.image)} alt={prod.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-white text-[9px] uppercase tracking-widest text-[#708238] font-bold">
                        {prod.category}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="font-serif text-lg text-[#1F2937] font-normal">{prod.title}</h4>
                      <p className="text-xs text-[#1F2937]/75 line-clamp-2 font-light">{prod.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-[#1F2937]/10 mt-2 text-xs">
                    <button
                      onClick={() => {
                        setEditingCatalogItem(prod);
                        setShowCatalogForm(true);
                      }}
                      className="text-[#708238] hover:text-[#E07A5F] font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCatalogProduct(prod.id)}
                      className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONFIGURACIÓN & SUPABASE SQL */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-4xl mx-auto w-full">
            
            {/* PIN Change Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1F2937]/10 card-shadow space-y-4">
              <div className="flex items-center gap-3 border-b border-[#1F2937]/10 pb-4">
                <Key className="w-6 h-6 text-[#E07A5F]" />
                <div>
                  <h3 className="font-serif text-xl text-[#1F2937]">Cambiar PIN de Acceso Administrativo</h3>
                  <p className="text-xs text-[#1F2937]/70 font-light">Actualiza la clave secreta utilizada para ingresar a esta suite.</p>
                </div>
              </div>

              <form onSubmit={handleChangePin} className="space-y-4 max-w-md">
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#708238] font-bold">PIN Actual</label>
                  <input
                    type="password"
                    required
                    value={currentPinSetting}
                    onChange={(e) => setCurrentPinSetting(e.target.value)}
                    className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 rounded-xl font-mono text-center tracking-widest text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#708238] font-bold">Nuevo PIN</label>
                  <input
                    type="password"
                    required
                    value={newPinSetting}
                    onChange={(e) => setNewPinSetting(e.target.value)}
                    className="w-full p-3 bg-[#FAF8F5] border border-[#1F2937]/15 rounded-xl font-mono text-center tracking-widest text-base"
                  />
                </div>

                {pinChangeMsg && (
                  <p className={`text-xs font-bold ${pinChangeMsg.includes('correctamente') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {pinChangeMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#708238] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A5A40] transition-colors cursor-pointer shadow-sm"
                >
                  Actualizar PIN de Seguridad
                </button>
              </form>
            </div>

            {/* Supabase Schema SQL Script */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1F2937]/10 card-shadow space-y-4">
              <div className="flex items-center justify-between border-b border-[#1F2937]/10 pb-4">
                <div>
                  <h3 className="font-serif text-xl text-[#1F2937]">Script de Creación de Tablas (Supabase SQL)</h3>
                  <p className="text-xs text-[#1F2937]/75 font-light">Copia y ejecuta este script en el SQL Editor de Supabase para activar la base de datos remota.</p>
                </div>

                <button
                  onClick={() => copyToClipboard(SUPABASE_SQL_SCHEMA)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#5A5A40] transition-colors cursor-pointer shadow-sm"
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
                <pre className="p-5 rounded-xl bg-[#1F2937] text-[#FAF8F5] text-xs font-mono overflow-x-auto max-h-96 leading-relaxed">
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
