import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '56931939017';
  const message = 'Hola, quisiera información sobre sus servicios de catering y chef privado con Maceiras.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 font-sans max-w-[calc(100vw-2rem)]">
      {/* Pop-up Tooltip Message (Mobile responsive width) */}
      {showTooltip && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 bg-white text-[#2A2A2A] p-3 sm:p-3.5 rounded-sm shadow-xl border border-[#2A2A2A]/10 max-w-[250px] sm:max-w-xs text-xs relative flex items-center gap-2.5">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#5A5A40] text-[#F5F2ED] flex items-center justify-center text-[10px] hover:bg-[#D27D56] transition-colors cursor-pointer shadow-sm"
            aria-label="Cerrar notificación"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] shrink-0" />
          <div className="space-y-0.5">
            <p className="font-medium text-[#2A2A2A] text-[11px] sm:text-xs">¿Tienes alguna duda?</p>
            <p className="text-[#2A2A2A]/70 text-[10px] sm:text-[11px] leading-tight">
              ¡Contáctanos directamente por WhatsApp!
            </p>
          </div>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-emerald-600/30 hover:bg-[#20ba59] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Soft ambient glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-md pointer-events-none group-hover:bg-[#25D366]/40 transition-colors" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 stroke-[2]" />
        
        {/* Desktop Hover Label */}
        <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xs bg-[#2A2A2A] text-[#F5F2ED] text-[11px] uppercase tracking-widest font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md border border-[#2A2A2A]/20">
          WhatsApp Directo
        </span>
      </a>
    </div>
  );
};
