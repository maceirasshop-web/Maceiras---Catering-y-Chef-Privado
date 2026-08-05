import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, ShieldCheck, Database, Server, Search, Filter, 
  CheckCircle2, Clock, MessageCircle, Trash2, Eye, RefreshCw, 
  ExternalLink, Copy, Check, User, Calendar, MapPin, Users, Phone, Mail, AlertCircle 
} from 'lucide-react';
import { fetchQuotes, updateQuoteStatus, deleteQuote, isSupabaseConfigured, SUPABASE_SQL_SCHEMA, QuoteRequest } from '../lib/supabase';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'quotes' | 'config'>('quotes');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const defaultPin = import.meta.env.VITE_ADMIN_PIN || 'maceiras2026';

  // Check session storage on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('maceiras_admin_authed');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch quotes when authenticated and modal opens
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadQuotes();
    }
  }, [isOpen, isAuthenticated]);

  const loadQuotes = async () => {
    setLoading(true);
    const res = await fetchQuotes();
    setQuotes(res.quotes);
    setDataSource(res.source);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === defaultPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('maceiras_admin_authed', 'true');
      setPinError('');
      setPinInput('');
      loadQuotes();
    } else {
      setPinError('PIN de seguridad incorrecto. Intenta nuevamente.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('maceiras_admin_authed');
  };

  const handleStatusChange = async (id: string, newStatus: QuoteRequest['status']) => {
    await updateQuoteStatus(id, newStatus);
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote({ ...selectedQuote, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta cotización?')) {
      await deleteQuote(id);
      setQuotes(prev => prev.filter(q => q.id !== id));
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote(null);
      }
    }
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

  // Calculate statistics
  const stats = {
    total: quotes.length,
    pendientes: quotes.filter(q => q.status === 'Pendiente').length,
    contactados: quotes.filter(q => q.status === 'Contactado').length,
    confirmados: quotes.filter(q => q.status === 'Confirmado').length,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A2A2A]/70 backdrop-blur-md font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-[#F5F2ED] rounded-xs max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl border border-[#2A2A2A]/20 overflow-hidden relative"
      >
        {/* Header Bar */}
        <div className="bg-[#2A2A2A] text-[#F5F2ED] px-6 py-4 flex items-center justify-between border-b border-[#F5F2ED]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#D27D56]" />
            </div>
            <div>
              <h2 className="font-serif text-lg tracking-wider uppercase font-light text-[#F5F2ED]">
                Panel Admin <span className="text-[#D27D56]">Maceiras</span>
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-[#EADDCA]/70">
                Gestión de Cotizaciones & Base de Datos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-[10px] font-mono border ${
                isSupabaseConfigured 
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' 
                  : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
              }`}>
                <Database className="w-3 h-3" />
                {isSupabaseConfigured ? 'Supabase Conectado' : 'Modo Demo (Local)'}
              </span>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xs bg-[#5A5A40] hover:bg-[#D27D56] text-[#F5F2ED] text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cerrar Sesión
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#F5F2ED] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="flex-1 flex items-center justify-center p-6 bg-[#F5F2ED]">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-xs border border-[#2A2A2A]/10 card-shadow text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-[#D27D56]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#2A2A2A] font-light">
                  Acceso Restringido Admin
                </h3>
                <p className="text-xs text-[#2A2A2A]/70 font-light leading-relaxed">
                  Ingresa tu PIN de seguridad para gestionar las solicitudes de catering de Maceiras.
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
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-center tracking-widest text-lg focus:outline-none focus:border-[#D27D56] transition-all"
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
                  className="w-full py-3 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
                >
                  Ingresar al Dashboard
                </button>

                <p className="text-[11px] text-[#2A2A2A]/50 italic font-mono pt-2">
                  PIN predeterminado de prueba: <code className="text-[#2A2A2A] font-bold">maceiras2026</code>
                </p>
              </form>
            </div>
          </div>
        ) : (
          /* MAIN ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F5F2ED]">
            {/* Top Navigation Tabs */}
            <div className="px-6 pt-4 bg-[#EADDCA]/30 border-b border-[#2A2A2A]/10 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`px-5 py-2.5 rounded-t-xs text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer border-t border-x ${
                    activeTab === 'quotes'
                      ? 'bg-white text-[#2A2A2A] border-[#2A2A2A]/15 border-b-white -mb-px'
                      : 'bg-transparent text-[#2A2A2A]/70 border-transparent hover:text-[#2A2A2A]'
                  }`}
                >
                  Solitudes de Cotización ({quotes.length})
                </button>

                <button
                  onClick={() => setActiveTab('config')}
                  className={`px-5 py-2.5 rounded-t-xs text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer border-t border-x ${
                    activeTab === 'config'
                      ? 'bg-white text-[#2A2A2A] border-[#2A2A2A]/15 border-b-white -mb-px'
                      : 'bg-transparent text-[#2A2A2A]/70 border-transparent hover:text-[#2A2A2A]'
                  }`}
                >
                  Conexión Supabase & Vercel
                </button>
              </div>

              <button
                onClick={loadQuotes}
                disabled={loading}
                className="mb-2 px-3 py-1.5 rounded-xs bg-white border border-[#2A2A2A]/10 text-[#5A5A40] hover:text-[#D27D56] text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Recargar cotizaciones"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Actualizar</span>
              </button>
            </div>

            {/* TAB 1: QUOTES MANAGEMENT */}
            {activeTab === 'quotes' && (
              <div className="flex-1 p-6 flex flex-col overflow-hidden space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-medium">Total Solicitudes</span>
                    <div className="font-serif text-2xl text-[#2A2A2A]">{stats.total}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-amber-600 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pendientes
                    </span>
                    <div className="font-serif text-2xl text-amber-700">{stats.pendientes}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-blue-600 font-medium flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> En Gestión
                    </span>
                    <div className="font-serif text-2xl text-blue-700">{stats.contactados}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Confirmadas
                    </span>
                    <div className="font-serif text-2xl text-emerald-700">{stats.confirmados}</div>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xs border border-[#2A2A2A]/10">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-[#2A2A2A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por cliente, correo o ciudad..."
                      className="w-full pl-9 pr-4 py-2 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/10 text-xs text-[#2A2A2A] focus:outline-none focus:border-[#D27D56]"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                    <Filter className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    {['todos', 'pendiente', 'contactado', 'confirmado', 'cancelado'].map(st => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                          statusFilter === st
                            ? 'bg-[#5A5A40] text-[#F5F2ED]'
                            : 'bg-[#F5F2ED] text-[#2A2A2A]/70 hover:bg-[#EADDCA]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Container */}
                <div className="flex-1 bg-white rounded-xs border border-[#2A2A2A]/10 overflow-hidden flex flex-col">
                  <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#2A2A2A] text-[#F5F2ED] text-[10px] uppercase tracking-widest font-sans border-b border-[#2A2A2A]">
                          <th className="py-3 px-4 font-medium">Fecha</th>
                          <th className="py-3 px-4 font-medium">Cliente</th>
                          <th className="py-3 px-4 font-medium">Tipo de Evento</th>
                          <th className="py-3 px-4 font-medium">Comensales</th>
                          <th className="py-3 px-4 font-medium">Ubicación</th>
                          <th className="py-3 px-4 font-medium">Estado</th>
                          <th className="py-3 px-4 font-medium text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2A2A2A]/10 text-xs font-sans">
                        {filteredQuotes.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-[#2A2A2A]/50 font-light italic">
                              No se encontraron cotizaciones con los criterios seleccionados.
                            </td>
                          </tr>
                        ) : (
                          filteredQuotes.map(q => {
                            const dateFormatted = new Date(q.created_at).toLocaleDateString('es-CL', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            });

                            const statusColors = {
                              Pendiente: 'bg-amber-100 text-amber-800 border-amber-300',
                              Contactado: 'bg-blue-100 text-blue-800 border-blue-300',
                              Confirmado: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                              Cancelado: 'bg-rose-100 text-rose-800 border-rose-300',
                            };

                            const cleanPhone = q.phone.replace(/[^0-9]/g, '');
                            const waUrl = `https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(q.name)},%20te%20contactamos%20de%20Maceiras%20Catering%20respecto%20a%20tu%20solicitud.`;

                            return (
                              <tr key={q.id} className="hover:bg-[#F5F2ED]/60 transition-colors">
                                <td className="py-3.5 px-4 font-mono text-[11px] text-[#2A2A2A]/70">
                                  {dateFormatted}
                                </td>
                                <td className="py-3.5 px-4 font-medium text-[#2A2A2A]">
                                  <div>{q.name}</div>
                                  <div className="text-[11px] text-[#2A2A2A]/60 font-normal">{q.email}</div>
                                </td>
                                <td className="py-3.5 px-4 text-[#2A2A2A]/80">
                                  {q.event_type}
                                </td>
                                <td className="py-3.5 px-4 font-mono text-[#2A2A2A]">
                                  {q.guest_count} pax
                                </td>
                                <td className="py-3.5 px-4 text-[#2A2A2A]/70">
                                  {q.location || 'No especificada'}
                                </td>
                                <td className="py-3.5 px-4">
                                  <select
                                    value={q.status}
                                    onChange={(e) => handleStatusChange(q.id, e.target.value as any)}
                                    className={`px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-wider font-semibold border cursor-pointer focus:outline-none ${statusColors[q.status]}`}
                                  >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Contactado">Contactado</option>
                                    <option value="Confirmado">Confirmado</option>
                                    <option value="Cancelado">Cancelado</option>
                                  </select>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-xs bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                                      title="WhatsApp Directo al Cliente"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                    <button
                                      onClick={() => setSelectedQuote(q)}
                                      className="p-1.5 rounded-xs bg-[#5A5A40]/10 text-[#5A5A40] hover:bg-[#5A5A40] hover:text-[#F5F2ED] transition-colors cursor-pointer"
                                      title="Ver detalle completo"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(q.id)}
                                      className="p-1.5 rounded-xs bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                                      title="Eliminar registro"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SUPABASE & VERCEL CONFIGURATION */}
            {activeTab === 'config' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {/* Connection Status Card */}
                <div className="bg-white p-6 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-4">
                  <div className="flex items-center gap-3">
                    <Server className="w-6 h-6 text-[#D27D56]" />
                    <div>
                      <h3 className="font-serif text-xl text-[#2A2A2A]">Estado de Conexión Supabase</h3>
                      <p className="text-xs text-[#2A2A2A]/70">
                        Configuración de persistencia de datos remota para Maceiras.
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xs border flex items-center justify-between ${
                    isSupabaseConfigured 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-3 text-xs">
                      <Database className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="font-medium">
                          {isSupabaseConfigured 
                            ? 'Conexión activa con proyecto Supabase' 
                            : 'Modo Local Storage Activo (Sin llaves Supabase)'}
                        </div>
                        <div className="text-[11px] opacity-80 mt-0.5">
                          {isSupabaseConfigured 
                            ? `URL: ${import.meta.env.VITE_SUPABASE_URL}`
                            : 'Las cotizaciones se están guardando localmente en este navegador. Configura tus llaves de Vercel/Supabase para sincronización remota.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SQL Schema Copy Box */}
                <div className="bg-white p-6 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg text-[#2A2A2A]">1. Script de Creación de Tabla (SQL Editor)</h3>
                      <p className="text-xs text-[#2A2A2A]/70">
                        Ejecuta este código en el SQL Editor de tu Dashboard de Supabase para crear la tabla <code className="bg-[#F5F2ED] px-1.5 py-0.5 rounded font-mono">quotes</code>.
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(SUPABASE_SQL_SCHEMA)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-wider font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedSql ? 'Copiado' : 'Copiar SQL'}</span>
                    </button>
                  </div>

                  <pre className="bg-[#2A2A2A] text-[#F5F2ED] p-4 rounded-xs text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed border border-[#2A2A2A]">
                    {SUPABASE_SQL_SCHEMA}
                  </pre>
                </div>

                {/* Vercel Environment Variables Guide */}
                <div className="bg-white p-6 rounded-xs border border-[#2A2A2A]/10 card-shadow space-y-4">
                  <h3 className="font-serif text-lg text-[#2A2A2A]">2. Configuración de Variables en Vercel</h3>
                  <p className="text-xs text-[#2A2A2A]/70 leading-relaxed">
                    Al desplegar en <strong>Vercel</strong>, agrega las siguientes variables de entorno en el menú <em>Project Settings &gt; Environment Variables</em>:
                  </p>

                  <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                    <div className="p-3 bg-[#F5F2ED] rounded-xs border border-[#2A2A2A]/10 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#D27D56]">VITE_SUPABASE_URL</span>
                        <span className="text-[#2A2A2A]/60 block text-[11px]">Ejemplo: https://xxxxxxxxxxxx.supabase.co</span>
                      </div>
                    </div>
                    <div className="p-3 bg-[#F5F2ED] rounded-xs border border-[#2A2A2A]/10 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#D27D56]">VITE_SUPABASE_ANON_KEY</span>
                        <span className="text-[#2A2A2A]/60 block text-[11px]">Tu clave pública eyJhbGciOi...</span>
                      </div>
                    </div>
                    <div className="p-3 bg-[#F5F2ED] rounded-xs border border-[#2A2A2A]/10 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#D27D56]">VITE_ADMIN_PIN</span>
                        <span className="text-[#2A2A2A]/60 block text-[11px]">PIN personalizado para acceder a este panel (Default: maceiras2026)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedQuote && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xs max-w-lg w-full p-6 space-y-5 border border-[#2A2A2A]/20 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedQuote(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-[#2A2A2A]/60 hover:text-[#2A2A2A]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#D27D56] font-medium font-sans">
                  Detalle de Solicitud
                </span>
                <h3 className="font-serif text-2xl text-[#2A2A2A]">{selectedQuote.name}</h3>
                <p className="text-xs text-[#2A2A2A]/60">Recibido el {new Date(selectedQuote.created_at).toLocaleString('es-CL')}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#2A2A2A]/10 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#5A5A40]" />
                  <span><strong>Correo:</strong> {selectedQuote.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#5A5A40]" />
                  <span><strong>Teléfono:</strong> {selectedQuote.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#5A5A40]" />
                  <span><strong>Comensales:</strong> {selectedQuote.guest_count} personas</span>
                </div>
                {selectedQuote.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#5A5A40]" />
                    <span><strong>Fecha estimada:</strong> {selectedQuote.date}</span>
                  </div>
                )}
                {selectedQuote.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#5A5A40]" />
                    <span><strong>Ubicación:</strong> {selectedQuote.location}</span>
                  </div>
                )}

                {selectedQuote.message && (
                  <div className="p-3 bg-[#F5F2ED] rounded-xs border border-[#2A2A2A]/10 mt-2 space-y-1">
                    <strong className="block text-[11px] uppercase tracking-wider text-[#5A5A40]">Mensaje / Restricciones:</strong>
                    <p className="text-xs text-[#2A2A2A]/80 italic">{selectedQuote.message}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#2A2A2A]/10 flex items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(selectedQuote.name)},%20te%20contactamos%20de%20Maceiras%20Catering.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-[#25D366] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#20ba59] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-2 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-wider font-medium"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
