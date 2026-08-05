import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/cateringData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="opiniones" className="py-20 bg-[#F5F2ED] relative border-t border-[#2A2A2A]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D27D56] font-medium font-sans">
            Experiencias Memorables
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2A2A] font-light">
            Lo que dicen <span className="italic font-normal">nuestros comensales</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white p-8 rounded-xs border border-[#2A2A2A]/10 card-shadow flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#D27D56]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#EADDCA]" />

                <p className="font-serif text-base text-[#2A2A2A] leading-relaxed italic font-light">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2A2A]/10 flex items-center justify-between text-xs font-sans">
                <div>
                  <div className="font-medium text-[#2A2A2A]">{testimonial.client}</div>
                  <div className="text-[#5A5A40] text-[11px]">{testimonial.role}</div>
                </div>
                <div className="flex items-center gap-1 text-[#5A5A40] bg-[#EADDCA]/40 border border-[#2A2A2A]/10 px-2.5 py-1 rounded-xs text-[9px] uppercase tracking-wider">
                  <MapPin className="w-3 h-3 text-[#D27D56]" />
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
