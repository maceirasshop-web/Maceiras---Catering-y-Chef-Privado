import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Phone, Mail, MapPin, ShoppingBag, Trash2 } from 'lucide-react';
import { QuoteFormData } from '../types';

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

    if (honeypot.trim() !== '') {
      console.warn('Bot submission blocked via honeypot filter.');
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 500);
      return;
    }

    let finalMessage = formData.message;
    if (selectedCatalogItems && selectedCatalogItems.length > 0) {
      const breakdownText = selectedCatalogItems
        .map(i => `• ${i.quantity}x ${i.product.title} (${i.product.unitText})`)
        .join('\n');

      finalMessage = `[PRODUCTOS SELECCIONADOS EN EL MENÚ]:\n${breakdownText}\n\n[MENSAJE / REQUERIMIENTOS]:\n${formData.message || 'Sin observaciones adicionales.'}`;
    }

    const { saveQuote } = await import('../lib/supabase');
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
    <section id="contacto" className="py-24 sm:py-28 bg-white relative border-t border-[#0A0A0A]/8">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-14 space-y-4 max-w-xl">
          <span className="kicker">Contacto</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] font-medium leading-tight tracking-[-0.03em]">
            Solicite una propuesta.
          </h2>
          <p className="text-[#5C5C5C] font-light text-base leading-relaxed">
            Completa el formulario. Respondemos en menos de 24 horas con una cotización a medida.
          </p>
        </div>

        {selectedCatalogItems && selectedCatalogItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-[#F7F7F5] border border-[#0A0A0A]/15 space-y-4 rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <h3 className="text-sm font-medium text-[#0A0A0A]">
                  Menú adjunto a la cotización
                </h3>
              </div>

              {onClearSelectedCatalogItems && (
                <button
                  type="button"
                  onClick={onClearSelectedCatalogItems}
                  className="text-xs text-[#5C5C5C] hover:text-[#0A0A0A] flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Quitar</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0A0A0A]">
              {selectedCatalogItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between p-2.5 bg-white border border-[#0A0A0A]/8">
                  <span className="font-medium">{quantity}× {product.title}</span>
                  <span className="text-[10px] text-[#5C5C5C] px-2 py-0.5 border border-[#0A0A0A]/10">
                    {product.subtitle}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#5C5C5C]">
              Estos productos se incluirán en la propuesta.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#F7F7F5] p-7 sm:p-12 border border-[#0A0A0A]/10 rounded-3xl"
        >
          {submitted ? (
            <div className="py-10 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#0A0A0A] text-[#F7F7F5] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl text-[#0A0A0A] font-light tracking-tight">
                  Solicitud recibida
                </h3>
                <p className="text-sm text-[#5C5C5C] font-light max-w-md mx-auto leading-relaxed">
                  Gracias, {formData.name}. Revisaremos los requerimientos y enviaremos una propuesta a <span className="text-[#0A0A0A] font-medium">{formData.email}</span>.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#0A0A0A]/8 max-w-md mx-auto text-left space-y-2 text-xs text-[#5C5C5C]">
                <div className="flex justify-between">
                  <span>Tipo de evento</span>
                  <span className="font-medium text-[#0A0A0A]">{formData.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Comensales</span>
                  <span className="font-medium text-[#0A0A0A]">{formData.guestCount} personas</span>
                </div>
                {formData.location && (
                  <div className="flex justify-between">
                    <span>Ubicación</span>
                    <span className="font-medium text-[#0A0A0A]">{formData.location}</span>
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
                className="btn-primary"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="kicker !text-[11px] block">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. María García"
                    className="input-pro"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="kicker !text-[11px] block">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className="input-pro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-2 sm:col-span-1">
                  <label htmlFor="eventType" className="kicker !text-[11px] block">
                    Tipo de evento *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="input-pro cursor-pointer"
                  >
                    <option value="Eventos personales">Cumpleaños, graduación u otro evento</option>
                    <option value="Menú semanal a domicilio">Menú semanal a domicilio</option>
                    <option value="Menú mensual a domicilio">Menú mensual a domicilio</option>
                    <option value="Chef Privado a Domicilio">Chef privado a domicilio</option>
                    <option value="Catering Premium para Eventos">Catering (matrimonio / social)</option>
                    <option value="Eventos Corporativos & Ejecutivos">Eventos corporativos</option>
                    <option value="Coffee Break & Lunch Ejecutivo">Coffee break / lunch ejecutivo</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="guestCount" className="kicker !text-[11px] block">
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
                    className="input-pro"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="kicker !text-[11px] block">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56 9 3193 9017"
                    className="input-pro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="date" className="kicker !text-[11px] block">
                    Fecha estimada
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input-pro"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="kicker !text-[11px] block">
                    Ubicación / Comuna
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ej. Las Condes, Vitacura, Lo Barnechea..."
                    className="input-pro"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="kicker !text-[11px] block">
                  Detalles o requerimientos
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Estilo del evento, restricciones alimentarias, recinto..."
                  className="input-pro resize-none"
                />
              </div>

              <div className="p-4 bg-white border border-[#0A0A0A]/10 text-xs text-[#5C5C5C] font-light">
                Cada propuesta se diseña sobre el brief: pax, recinto, tono y restricciones. Sin menús genéricos.
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto disabled:opacity-50"
                  id="submit-contact-btn"
                >
                  {loading ? (
                    <span>Enviando…</span>
                  ) : (
                    <>
                      <span>Enviar solicitud</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://wa.me/56931939017?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20catering%20y%20chef%20privado."
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 bg-[#F7F7F5] hover:bg-white transition-colors space-y-2 block rounded-3xl border border-[#0A0A0A]/8"
          >
            <Phone className="w-4 h-4 text-[#0A0A0A]" />
            <div className="kicker !text-[11px]">WhatsApp</div>
            <div className="text-sm font-medium text-[#0A0A0A]">+56 9 3193 9017</div>
          </a>
          <a
            href="mailto:maceiras.shop@gmail.com"
            className="p-7 bg-[#F7F7F5] hover:bg-white transition-colors space-y-2 block rounded-3xl border border-[#0A0A0A]/8"
          >
            <Mail className="w-4 h-4 text-[#0A0A0A]" />
            <div className="kicker !text-[11px]">Correo</div>
            <div className="text-sm font-medium text-[#0A0A0A]">maceiras.shop@gmail.com</div>
          </a>
          <div className="p-7 bg-[#F7F7F5] space-y-2 rounded-3xl border border-[#0A0A0A]/8">
            <MapPin className="w-4 h-4 text-[#0A0A0A]" />
            <div className="kicker !text-[11px]">Cobertura</div>
            <div className="text-sm font-medium text-[#0A0A0A]">Santiago, RM</div>
          </div>
        </div>
      </div>
    </section>
  );
};
