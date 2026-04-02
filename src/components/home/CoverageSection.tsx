import React from 'react';

const locations = [
  { name: 'Santiago', top: '78%', left: '26%' },
  { name: 'Miami', top: '42%', left: '24%' },
  { name: 'Shanghai', top: '44%', left: '82%' },
  { name: 'Rotterdam', top: '24%', left: '48%' },
  { name: 'Santos', top: '70%', left: '33%' },
];

export default function CoverageSection() {
  return (
    <section id="cobertura" className="w-full py-24 bg-[#001f3f] text-white overflow-hidden relative scroll-mt-20">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-sky-400/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Content & Stats */}
          <div className="space-y-8 lg:pr-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Conectividad Total sin Fronteras
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Nuestra red de agentes globales nos permite operar en más de 150 países, garantizando que tu carga llegue a destino sin importar la distancia, con total seguridad y trazabilidad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-10 pt-6">
              <div className="space-y-2">
                <p className="text-5xl md:text-6xl font-extrabold text-sky-400">150+</p>
                <p className="text-sm md:text-base font-semibold text-slate-300 uppercase tracking-widest">Países</p>
              </div>
              <div className="hidden sm:block w-px bg-white/20"></div>
              <div className="space-y-2">
                <p className="text-5xl md:text-6xl font-extrabold text-sky-400">500+</p>
                <p className="text-sm md:text-base font-semibold text-slate-300 uppercase tracking-widest">Agentes Globales</p>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-[4/3] flex items-center justify-center">
            {/* Background SVG Map with invert to make it white layout */}
            <div 
              className="absolute inset-0 bg-no-repeat bg-center bg-contain invert opacity-20"
              style={{
                backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg")'
              }}
            />
            
            {/* Overlaid Animated Dots */}
            {locations.map((loc, i) => (
              <div 
                key={i} 
                className="absolute"
                style={{ top: loc.top, left: loc.left }}
              >
                <div className="relative flex items-center justify-center group cursor-pointer">
                  {/* Ping Animation */}
                  <span className="absolute inline-flex h-4 w-4 md:h-6 md:w-6 animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  {/* Core Dot */}
                  <span className="relative inline-flex h-2 w-2 md:h-3 md:w-3 rounded-full bg-white shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
                  
                  {/* Label Tooltip */}
                  <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs md:text-sm font-semibold text-white drop-shadow-md whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
                    {loc.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
