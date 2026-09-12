import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '56931939017';
  const message = 'Hola, quisiera información sobre sus servicios de catering y chef privado con Maceiras.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 font-sans max-w-[calc(100vw-2rem)]">
      {showTooltip && (
        <div className="bg-white text-[#0A0A0A] p-3 sm:p-3.5 shadow-xl border border-[#0A0A0A]/10 max-w-[250px] sm:max-w-xs text-xs relative flex items-center gap-2.5">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0A0A0A] text-[#F7F7F5] flex items-center justify-center text-[10px] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="w-2 h-2 bg-[#25D366] shrink-0" />
          <div className="space-y-0.5">
            <p className="font-medium text-[#0A0A0A] text-[11px] sm:text-xs">¿Consulta directa?</p>
            <p className="text-[#5C5C5C] text-[10px] sm:text-[11px] leading-tight">
              Escríbenos por WhatsApp.
            </p>
          </div>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white shadow-lg hover:bg-[#20ba59] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 relative z-10 stroke-[1.75]" />
        <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0A0A0A] text-[#F7F7F5] font-display text-[12px] uppercase tracking-[0.14em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          WhatsApp
        </span>
      </a>
    </div>
  );
};
