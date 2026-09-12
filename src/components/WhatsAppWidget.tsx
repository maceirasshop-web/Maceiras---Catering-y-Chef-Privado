import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '56931939017';
  const message = 'Hola, quisiera información sobre sus servicios de catering y chef privado con Maceiras.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-row items-center gap-3 font-sans max-w-[calc(100vw-2rem)]">
      {showTooltip && (
        <div className="bg-white text-[#0A0A0A] px-4 py-3 shadow-xl border border-[#0A0A0A]/8 max-w-[230px] sm:max-w-xs text-xs relative flex items-center gap-2.5 rounded-2xl">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0A0A0A] text-[#F7F7F5] flex items-center justify-center text-[10px] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
          <div className="space-y-0.5 pr-1">
            <p className="font-medium text-[#0A0A0A] text-[12px] sm:text-[13px]">¿Consulta directa?</p>
            <p className="text-[#5C5C5C] text-[11px] leading-tight">
              Escríbenos por WhatsApp.
            </p>
          </div>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba59] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 relative z-10 stroke-[1.75]" />
      </a>
    </div>
  );
};
