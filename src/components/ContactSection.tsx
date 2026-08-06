import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Sparkles, Calendar, Users, Phone, Mail, MapPin, ChefHat, ShoppingBag, Trash2 } from 'lucide-react';
import { QuoteFormData } from '../types';
import { saveQuote } from '../lib/supabase';
import { SelectedItemState } from './MenuBuilderSection';

interface ContactSectionProps {
  initialServiceSelected?: string;
  selectedCatalogItems?: SelectedItemState[];
  onClearSelectedCatalogItems?: () => void;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialServiceSelected = '',
  selectedCatalogItems = [],
  onClearSelectedCatalogItems,
  isModalOpen = false,
  onCloseModal
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: 'Chef Privado a Domicilio',
    guestCount: 6,
    date: '',
    location: '',
    dietaryNotes: '',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialServiceSelected) {
      setFormData(prev => ({ ...prev, eventType: initialServiceSelected }));
    }
  }, [initialServiceSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Anti-Bot Filter: If honeypot hidden field is filled, silently block without saving
    if (honeypot.trim() !== '') {
      console.warn('Bot submission blocked via honeypot filter.');
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 500);
      return;
    }

    // Format selected catalog items into final message string if available
    let finalMessage = formData.message;
    if (selectedCatalogItems && selectedCatalogItems.length > 0) {
      const breakdownText = selectedCatalogItems
        .map(i => `• ${i.quantity}x ${i.product.title} (${i.product.unitText})`)
        .join('\n');
      
      finalMessage = `[PRODUCTOS SELECCIONADOS EN EL MENÚ]:\n${breakdownText}\n\n[MENSAJE / REQUERIMIENTOS]:\n${formData.message || 'Sin observaciones adicionales.'}`;
    }

    await saveQuote({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      event_type: formData.eventType,
      guest_count: Number(formData.guestCount),
      date: formData.date,
      location: formData.location,
      message: finalMessage,
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-28 bg-[#FAF8F5] relative border-t border-[#708238]/15">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header de la sección centrado y limpio */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#E07A5F] font-bold font-sans">
            Atención Personalizada
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1F2937] font-light leading-tight">
            Diseñemos tu velada <span className="italic font-normal text-[#E07A5F]">a medida</span>
          </h2>
          <p className="text-[#1F2937]/75 font-sans font-light text-base leading-relaxed">
            Completa el formulario para recibir una propuesta gastronómica personalizada en menos de 24 horas.
          </p>
        </div>

        {/* SI HAY PRODUCTOS SELECCIONADOS DEL MENU BUILDER: CARD DE DESGLOSE */}
        {selectedCatalogItems && selectedCatalogItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-white border border-[#708238] shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-[#708238]/20 pb-3">
              <div className="flex items-center gap-2 text-[#708238]">
                <ShoppingBag className="w-5 h-5 text-[#E07A5F]" />
                <h3 className="font-serif text-lg font-bold text-[#1F2937]">
                  Menú Personalizado Adjunto a la Cotización
                </h3>
              </div>

              {onClearSelectedCatalogItems && (
                <button
                  type="button"
                  onClick={onClearSelectedCatalogItems}
                  className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-mono cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Quitar selección</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1F2937]/85 font-sans">
              {selectedCatalogItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#708238]/15">
                  <span className="font-medium">{quantity}x {product.title}</span>
                  <span className="text-[10px] font-mono text-[#708238] font-bold bg-[#708238]/10 px-2 py-0.5 rounded-full">
                    {product.subtitle}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#708238] italic font-serif">
              ✓ Estos productos se incluirán automáticamente en tu propuesta de cotización.
            </p>
          </motion.div>
        )}

        {/* Contenedor del Formulario limpio y centrado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 sm:p-12 rounded-2xl border border-[#1F2937]/10 card-shadow relative overflow-hidden"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#708238] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2937] font-light">
                  Solicitud recibida con éxito
                </h3>
                <p className="text-sm text-[#1F2937]/75 font-light max-w-md mx-auto leading-relaxed">
                  Gracias, {formData.name}. Nuestro equipo de Maceiras revisará tus requerimientos para enviarte un menú detallado a <span className="font-semibold text-[#1F2937]">{formData.email}</span>.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/10 max-w-md mx-auto text-left space-y-2 text-xs text-[#1F2937]/80">
                <div className="flex justify-between">
                  <span className="text-[#708238] font-semibold">Tipo de evento:</span>
                  <span className="font-medium text-[#1F2937]">{formData.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#708238] font-semibold">Comensales estimados:</span>
                  <span className="font-medium text-[#1F2937]">{formData.guestCount} personas</span>
                </div>
                {formData.location && (
                  <div className="flex justify-between">
                    <span className="text-[#708238] font-semibold">Ubicación:</span>
                    <span className="font-medium text-[#1F2937]">{formData.location}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  if (onClearSelectedCatalogItems) onClearSelectedCatalogItems();
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    eventType: 'Chef Privado a Domicilio',
                    guestCount: 6,
                    date: '',
                    location: '',
                    dietaryNotes: '',
                    message: ''
                  });
                }}
                className="px-8 py-3.5 rounded-xl bg-[#708238] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#5A5A40] transition-colors cursor-pointer shadow-sm"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Anti-Bot Honeypot Field (Oculto para humanos, detecta bots automatizados) */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}>
                <label htmlFor="website_url_hp">No completar este campo</label>
                <input
                  type="text"
                  id="website_url_hp"
                  name="website_url_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                    Nombre completo <span className="text-[#E07A5F]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. María García"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                    Correo electrónico <span className="text-[#E07A5F]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F] transition-all"
                  />
                </div>
              </div>

              {/* Bloque 2: Detalles del Evento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2 sm:col-span-1">
                  <label htmlFor="eventType" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                    Tipo de evento <span className="text-[#E07A5F]">*</span>
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] transition-all cursor-pointer"
                  >
                    <option value="Chef Privado a Domicilio">Chef Privado a Domicilio</option>
                    <option value="Catering Premium para Eventos">Catering Premium (Matrimonios/Social)</option>
                    <option value="Eventos Corporativos & Ejecutivos">Eventos Corporativos VIP</option>
                    <option value="Experiencia de Catas & Maridaje">Catas Privadas & Sommelier</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="guestCount" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                    Nº de comensales
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    min="1"
                    max="300"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56 9 3193 9017"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] transition-all"
                  />
                </div>
              </div>

              {/* Bloque 3: Fecha & Ubicación opcional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                    Fecha estimada
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                    Ubicación / Comuna
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ej. Las Condes, Vitacura, Lo Barnechea, Santiago..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] transition-all"
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-[#708238] font-bold font-sans">
                  Detalles del mensaje o requerimientos especiales
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos el estilo de evento que imaginas, preferencias culinarias o necesidades especiales..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1F2937]/15 text-[#1F2937] text-sm focus:outline-none focus:border-[#E07A5F] transition-all resize-none"
                />
              </div>

              {/* Banner de servicio personalizado */}
              <div className="p-4 rounded-xl bg-[#708238]/10 border border-[#708238]/20 flex items-center gap-3 text-xs text-[#1F2937]/85">
                <ChefHat className="w-5 h-5 text-[#E07A5F] shrink-0" />
                <span>Cada propuesta en <strong>Maceiras</strong> es única y diseñada de manera 100% personalizada según tus gustos y el estilo de tu velada.</span>
              </div>

              {/* Botón de envío elegante */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-[#E07A5F] text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-[#d4664a] hover:shadow-lg active:scale-98 cursor-pointer disabled:opacity-50"
                  id="submit-contact-btn"
                >
                  {loading ? (
                    <span>Procesando propuesta...</span>
                  ) : (
                    <>
                      <span>Enviar solicitud de cotización</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </motion.div>

        {/* Canales directos de contacto */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-[#1F2937]/85">
          <a 
            href="https://wa.me/56931939017?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20catering%20y%20chef%20privado."
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white border border-[#1F2937]/10 card-shadow space-y-2 hover:border-[#E07A5F]/50 transition-colors block"
          >
            <Phone className="w-5 h-5 mx-auto text-[#E07A5F]" />
            <div className="font-medium text-[#1F2937]">Teléfono & WhatsApp</div>
            <div className="font-mono text-sm text-[#E07A5F] font-bold">+56 9 3193 9017</div>
          </a>
          <a 
            href="mailto:maceiras.shop@gmail.com"
            className="p-6 rounded-2xl bg-white border border-[#1F2937]/10 card-shadow space-y-2 hover:border-[#E07A5F]/50 transition-colors block"
          >
            <Mail className="w-5 h-5 mx-auto text-[#E07A5F]" />
            <div className="font-medium text-[#1F2937]">Correo Electrónico</div>
            <div className="font-mono text-sm text-[#E07A5F] font-bold">maceiras.shop@gmail.com</div>
          </a>
          <div className="p-6 rounded-2xl bg-white border border-[#1F2937]/10 card-shadow space-y-2">
            <MapPin className="w-5 h-5 mx-auto text-[#E07A5F]" />
            <div className="font-medium text-[#1F2937]">Cobertura de Servicio</div>
            <div className="font-semibold text-[#708238]">Santiago</div>
          </div>
        </div>

      </div>
    </section>
  );
};
