import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '56931939017';
  const message = 'Hola, quisiera información sobre sus servicios de catering y chef privado con Maceiras.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 font-sans">
      {/* Pop-up Tooltip Message */}
      {showTooltip && (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 bg-[#2A2A2A] text-[#F5F2ED] p-3.5 rounded-xs shadow-xl border border-[#D27D56]/30 max-w-xs text-xs relative flex items-start gap-2.5">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center text-[10px] hover:bg-[#D27D56] transition-colors cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="w-2 h-2 rounded-full bg-[#25D366] shrink-0 mt-1 animate-pulse" />
          <div className="space-y-1">
            <p className="font-medium text-[#F5F2ED]">¿Consultas para tu evento?</p>
            <p className="text-[#F5F2ED]/70 text-[11px] leading-relaxed">
              Habla directo con nuestro equipo de atención en Chile por WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulsing Aura Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

        <MessageCircle className="w-7 h-7 relative z-10 stroke-[2]" />
        
        {/* Hover Label for Desktop */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xs bg-[#2A2A2A] text-[#F5F2ED] text-[11px] uppercase tracking-widest font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md border border-[#2A2A2A]/20">
          WhatsApp Directo
        </span>
      </a>
    </div>
  );
};
