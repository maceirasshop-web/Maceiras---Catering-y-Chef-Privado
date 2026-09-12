import React from 'react';
import { motion } from 'motion/react';
import { X, Scale, FileText, CheckCircle } from 'lucide-react';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A]/70 backdrop-blur-xs font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-[#F7F7F5] rounded-xs max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#0A0A0A]/20 overflow-hidden relative"
      >
        {/* Header */}
        <div className="bg-[#0A0A0A] text-[#F7F7F5] px-6 py-4 flex items-center justify-between border-b border-[#F7F7F5]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5C5C5C] text-[#F7F7F5] flex items-center justify-center">
              <Scale className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div>
              <h2 className="font-serif text-lg tracking-wider uppercase font-light text-[#F7F7F5]">
                Aviso Legal
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-[#EDEDEC]/70">
                Términos & Condiciones del Servicio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#F7F7F5] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#0A0A0A]/80 font-sans leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">1. Datos Identificativos</h3>
            <p>
              El presente portal web pertenece a <strong>Maceiras Catering & Chef Privado</strong>, marca dedicada a la prestación de servicios gastronómicos exclusivos, catering para eventos y chef a domicilio con cobertura en la ciudad de Santiago de Chile.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">2. Propiedad Intelectual</h3>
            <p>
              Todos los elementos visuales, logotipos, textos, menús, recetas e identidad de marca presentes en este sitio web están protegidos por las leyes de propiedad intelectual en Chile. Queda prohibida la reproducción total o parcial sin consentimiento previo expreso.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">3. Condiciones del Servicio</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                <span>Las propuestas enviadas a través de formularios o WhatsApp están sujetas a confirmación de disponibilidad de fechas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                <span>Cada menú se personaliza de acuerdo a las alergias o restricciones alimentarias notificadas oportunamente por el cliente.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">4. Contacto Oficial</h3>
            <p>
              Para consultas legales, comerciales o dudas sobre nuestras propuestas gastronómicas, puede comunicarse directamente a nuestro correo <a href="mailto:maceiras.shop@gmail.com" className="text-[#0A0A0A] underline font-medium">maceiras.shop@gmail.com</a> o teléfono <span className="font-mono text-[#0A0A0A]">+56 9 3193 9017</span>.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-[#EDEDEC]/30 border-t border-[#0A0A0A]/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="btn-primary !py-2.5 !px-6"
          >
            Entendido
          </button>
        </div>
      </motion.div>
    </div>
  );
};
