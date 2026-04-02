const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const srcApp = path.join(cwd, 'src', 'app');
const srcComps = path.join(cwd, 'src', 'components');

console.log("Iniciando rebranding a LogiTrust Global...");

// 1. Navbar.tsx
const navPath = path.join(srcComps, 'layout', 'Navbar.tsx');
let nav = fs.readFileSync(navPath, 'utf8');
nav = nav.replace(/Confidence Line Logistics/g, 'LogiTrust Global');
nav = nav.replace(/<button className="bg-white text-brand-primary font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">/g,
  '<a href="#contacto" className="bg-white text-brand-primary font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors inline-block">');
nav = nav.replace(/Cotizar ahora\s*<\/button>/g, 'Cotizar ahora</a>');
nav = nav.replace(/<button className="bg-white text-brand-primary font-bold px-6 py-2 rounded-full mt-2 w-full">/g,
  '<a href="#contacto" className="bg-white text-brand-primary flex items-center justify-center font-bold px-6 py-2 rounded-full mt-2 w-full">');
fs.writeFileSync(navPath, nav);

// 2. Footer.tsx
const footerPath = path.join(srcComps, 'layout', 'Footer.tsx');
let footer = fs.readFileSync(footerPath, 'utf8');
footer = footer.replace(/Confidence Line Logistics/g, 'LogiTrust Global');
footer = footer.replace(/Confidence Line/g, 'LogiTrust Global');
footer = footer.replace('info@confidenceline.cl', 'info@logitrustglobal.com');
fs.writeFileSync(footerPath, footer);

// 3. layout.tsx
const layoutPath = path.join(srcApp, 'layout.tsx');
let layout = fs.readFileSync(layoutPath, 'utf8');
layout = layout.replace('Confidence Line Logistics', 'LogiTrust Global');
fs.writeFileSync(layoutPath, layout);

// 4. API route
const routePath = path.join(srcApp, 'api', 'send', 'route.ts');
let route = fs.readFileSync(routePath, 'utf8');
route = route.replace(/Confidence Line/g, 'LogiTrust Global');
fs.writeFileSync(routePath, route);

// Component IDs and scroll margin for sticky navbar (h-20)
// 5. AboutSection.tsx
const aboutPath = path.join(srcComps, 'home', 'AboutSection.tsx');
let about = fs.readFileSync(aboutPath, 'utf8');
about = about.replace('<section className="w-full py-24 bg-white overflow-hidden">', '<section id="nosotros" className="w-full py-24 bg-white overflow-hidden scroll-mt-20">');
about = about.replace('Confidence Line Logistics', 'LogiTrust Global');
fs.writeFileSync(aboutPath, about);

// 6. ServicesSection.tsx ID
const servicesPath = path.join(srcComps, 'home', 'ServicesSection.tsx');
let services = fs.readFileSync(servicesPath, 'utf8');
services = services.replace('<section className="w-full py-24 bg-slate-50">', '<section id="servicios" className="w-full py-24 bg-slate-50 scroll-mt-20">');
fs.writeFileSync(servicesPath, services);

// 7. CoverageSection.tsx ID
const coveragePath = path.join(srcComps, 'home', 'CoverageSection.tsx');
let coverage = fs.readFileSync(coveragePath, 'utf8');
coverage = coverage.replace('<section className="w-full py-24 bg-[#001f3f] text-white overflow-hidden relative">', '<section id="cobertura" className="w-full py-24 bg-[#001f3f] text-white overflow-hidden relative scroll-mt-20">');
fs.writeFileSync(coveragePath, coverage);

// 8. QuoteSection.tsx ID
const quotePath = path.join(srcComps, 'home', 'QuoteSection.tsx');
let quote = fs.readFileSync(quotePath, 'utf8');
quote = quote.replace('<section className="w-full py-24 bg-slate-50 relative">', '<section id="contacto" className="w-full py-24 bg-slate-50 relative scroll-mt-20">');
fs.writeFileSync(quotePath, quote);

// 9. Create icon.svg for Favicon
const iconPath = path.join(srcApp, 'icon.svg');
fs.writeFileSync(iconPath, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#001f3f" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12l10-6 10 6-10 6z"></path>
  <path d="M2 12v6l10 6v-6"></path>
  <path d="M22 12v6l-10 6v-6"></path>
</svg>`);

// 10. Delete generic app icon if exists
try { fs.unlinkSync(path.join(srcApp, 'favicon.ico')); console.log("Favicon base.ico eliminado"); } catch (e) { }

// 11. Custom 404 page
const notFoundPath = path.join(srcApp, 'not-found.tsx');
fs.writeFileSync(notFoundPath, `
import Link from 'next/link';
import { PackageX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 w-full">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200">
        <PackageX className="w-12 h-12 text-slate-400" strokeWidth={1.5} />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-brand-primary mb-4 tracking-tight">Error 404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6 font-sans">
        Carga no encontrada
      </h2>
      <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed text-balance">
        Lo sentimos, la ruta logística que intentas rastrear no ha sido programada o el manifiesto se ha traspapelado.
      </p>
      <Link 
        href="/"
        className="px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-[#00152b] transition-all duration-300 shadow-md hover:-translate-y-1"
      >
        Volver a la Terminal Principal
      </Link>
    </div>
  );
}
`);

console.log("Rebranding, Icono, Smooth Scroll y 404 terminados.");
