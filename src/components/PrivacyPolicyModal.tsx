import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, Lock, CheckCircle } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
              <ShieldCheck className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div>
              <h2 className="font-serif text-lg tracking-wider uppercase font-light text-[#F7F7F5]">
                Política de Privacidad
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-[#EDEDEC]/70">
                Maceiras Catering & Chef Privado
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
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">1. Compromiso de Privacidad</h3>
            <p>
              En <strong>Maceiras Catering & Chef Privado</strong> nos tomamos muy en serio la privacidad y protección de los datos personales de nuestros clientes y comensales en Chile, en conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">2. Recopilación de Datos</h3>
            <p>
              Los datos recabados a través de nuestro formulario de cotización (nombre, correo electrónico, teléfono, ubicación del evento y preferencias culinarias) se recopilan con el único fin de confeccionar propuestas gastronómicas personalizadas y coordinar la logística de nuestros servicios de catering o chef privado.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">3. Uso y Confidencialidad</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                <span>Sus datos **nunca** serán vendidos, alquilados ni transferidos a terceros con fines comerciales ni publicitarios.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                <span>La comunicación referente a su evento se realizará exclusivamente de manera directa vía correo electrónico o WhatsApp oficial.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                <span>Mantenemos medidas de seguridad organizativas e informáticas para salvaguardar su información.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-light">4. Sus Derechos</h3>
            <p>
              En cualquier momento, usted tiene derecho a solicitar la eliminación, rectificación o actualización de sus datos de nuestra base enviando un mensaje al correo <a href="mailto:maceiras.shop@gmail.com" className="text-[#0A0A0A] underline font-medium">maceiras.shop@gmail.com</a>.
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
