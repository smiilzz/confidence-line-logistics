"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Ship } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-brand-primary/95 backdrop-blur-md shadow-md" : "bg-brand-primary"
      } text-white`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Ship size={32} className="text-white group-hover:text-brand-secondary transition-colors" />
          <span className="font-bold text-xl tracking-tight">Confidence Line Logistics</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="#servicios" className="hover:text-brand-secondary transition-colors">Servicios</Link>
          <Link href="#cobertura" className="hover:text-brand-secondary transition-colors">Red Logística</Link>
          <Link href="#nosotros" className="hover:text-brand-secondary transition-colors">Nosotros</Link>
          <Link href="#blog" className="hover:text-brand-secondary transition-colors">Recursos</Link>
          <Link href="#contacto" className="hover:text-brand-secondary transition-colors">Contacto</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-white text-brand-primary font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Cotizar ahora
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-primary absolute top-20 left-0 right-0 p-4 flex flex-col gap-4 shadow-lg border-t border-white/10">
          <Link href="#servicios" className="hover:text-brand-secondary p-2">Servicios</Link>
          <Link href="#cobertura" className="hover:text-brand-secondary p-2">Red Logística</Link>
          <Link href="#nosotros" className="hover:text-brand-secondary p-2">Nosotros</Link>
          <Link href="#blog" className="hover:text-brand-secondary p-2">Recursos</Link>
          <Link href="#contacto" className="hover:text-brand-secondary p-2">Contacto</Link>
          <button className="bg-white text-brand-primary font-bold px-6 py-2 rounded-full mt-2 w-full">
            Cotizar ahora
          </button>
        </div>
      )}
    </header>
  );
}
