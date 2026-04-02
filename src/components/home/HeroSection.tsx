'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Logística Global con Precisión Local
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-200 text-balance leading-relaxed">
            Conectamos tus operaciones con el mundo a través de rutas optimizadas y un compromiso inquebrantable con tus plazos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-[#00152b] text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Cotiza tu embarque
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-brand-primary text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Ver nuestros servicios
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
