import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Sparkles, Calendar, Users, Phone, Mail, MapPin, ChefHat } from 'lucide-react';
import { QuoteFormData } from '../types';

import { saveQuote } from '../lib/supabase';

interface ContactSectionProps {
  initialServiceSelected?: string;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialServiceSelected = '', 
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
    
    await saveQuote({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      event_type: formData.eventType,
      guest_count: Number(formData.guestCount),
      date: formData.date,
      location: formData.location,
      message: formData.message,
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-28 bg-[#F5F2ED] relative border-t border-[#2A2A2A]/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header de la sección centrado y limpio */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium font-sans">
            Atención Personalizada
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2A2A2A] font-light leading-tight">
            Diseñemos tu velada <span className="italic font-normal">a medida</span>
          </h2>
          <p className="text-[#2A2A2A]/70 font-sans font-light text-base leading-relaxed">
            Completa el formulario para recibir una propuesta gastronómica personalizada en menos de 24 horas.
          </p>
        </div>

        {/* Contenedor del Formulario limpio y centrado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 sm:p-12 rounded-xs border border-[#2A2A2A]/10 card-shadow relative overflow-hidden"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#F5F2ED]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A] font-light">
                  Solicitud recibida con éxito
                </h3>
                <p className="text-sm text-[#2A2A2A]/70 font-light max-w-md mx-auto">
                  Gracias, {formData.name}. Nuestro equipo de Maceiras revisará tus requerimientos para enviarte un menú detallado a <span className="font-medium text-[#2A2A2A]">{formData.email}</span>.
                </p>
              </div>

              <div className="p-6 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/10 max-w-md mx-auto text-left space-y-2 text-xs text-[#2A2A2A]/80">
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Tipo de evento:</span>
                  <span className="font-medium text-[#2A2A2A]">{formData.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Comensales estimados:</span>
                  <span className="font-medium text-[#2A2A2A]">{formData.guestCount} personas</span>
                </div>
                {formData.location && (
                  <div className="flex justify-between">
                    <span className="text-[#5A5A40]">Ubicación:</span>
                    <span className="font-medium text-[#2A2A2A]">{formData.location}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
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
                className="px-8 py-3 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-[#D27D56] transition-colors cursor-pointer"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Bloque 1: Datos Personales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                    Nombre completo <span className="text-[#D27D56]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. María García"
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] focus:ring-1 focus:ring-[#D27D56] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                    Correo electrónico <span className="text-[#D27D56]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] focus:ring-1 focus:ring-[#D27D56] transition-all"
                  />
                </div>
              </div>

              {/* Bloque 2: Detalles del Evento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2 sm:col-span-1">
                  <label htmlFor="eventType" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                    Tipo de evento <span className="text-[#D27D56]">*</span>
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] transition-all cursor-pointer"
                  >
                    <option value="Chef Privado a Domicilio">Chef Privado a Domicilio</option>
                    <option value="Catering Premium para Eventos">Catering Premium (Matrimonios/Social)</option>
                    <option value="Eventos Corporativos & Ejecutivos">Eventos Corporativos VIP</option>
                    <option value="Experiencia de Catas & Maridaje">Catas Privadas & Sommelier</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="guestCount" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
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
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56 9 3193 9017"
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] transition-all"
                  />
                </div>
              </div>

              {/* Bloque 3: Fecha & Ubicación opcional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                    Fecha estimada
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                    Ubicación / Ciudad
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ej. Santiago, Viña del Mar, Zapallar..."
                    className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] transition-all"
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-[#5A5A40] font-medium font-sans">
                  Detalles del mensaje o requerimientos especiales
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos el estilo de evento que imaginas, preferencias culinarias o necesidades especiales..."
                  className="w-full px-4 py-3 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/15 text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D27D56] transition-all resize-none"
                />
              </div>

              {/* Banner de servicio personalizado */}
              <div className="p-4 rounded-xs bg-[#F5F2ED] border border-[#2A2A2A]/10 flex items-center gap-3 text-xs text-[#2A2A2A]/80">
                <ChefHat className="w-5 h-5 text-[#D27D56] shrink-0" />
                <span>Cada propuesta en <strong>Maceiras</strong> es única y diseñada de manera 100% personalizada según tus gustos y el estilo de tu velada.</span>
              </div>

              {/* Botón de envío elegante */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xs bg-[#5A5A40] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:bg-[#D27D56] hover:shadow-lg active:scale-98 cursor-pointer disabled:opacity-50"
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-[#2A2A2A]/80">
          <a 
            href="https://wa.me/56931939017?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20catering%20y%20chef%20privado."
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xs bg-white border border-[#2A2A2A]/10 card-shadow space-y-2 hover:border-[#D27D56]/50 transition-colors block"
          >
            <Phone className="w-5 h-5 mx-auto text-[#D27D56]" />
            <div className="font-medium text-[#2A2A2A]">Teléfono & WhatsApp</div>
            <div className="font-mono text-sm text-[#D27D56]">+56 9 3193 9017</div>
          </a>
          <a 
            href="mailto:maceiras.shop@gmail.com"
            className="p-6 rounded-xs bg-white border border-[#2A2A2A]/10 card-shadow space-y-2 hover:border-[#D27D56]/50 transition-colors block"
          >
            <Mail className="w-5 h-5 mx-auto text-[#D27D56]" />
            <div className="font-medium text-[#2A2A2A]">Correo Electrónico</div>
            <div className="font-mono text-sm text-[#D27D56]">maceiras.shop@gmail.com</div>
          </a>
          <div className="p-6 rounded-xs bg-white border border-[#2A2A2A]/10 card-shadow space-y-2">
            <MapPin className="w-5 h-5 mx-auto text-[#D27D56]" />
            <div className="font-medium text-[#2A2A2A]">Cobertura de Servicio</div>
            <div>Santiago · Viña del Mar · Zapallar · Todo Chile</div>
          </div>
        </div>

      </div>
    </section>
  );
};
