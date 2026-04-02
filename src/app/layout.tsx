import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogiTrust Global | Soluciones Logísticas de Clase Mundial",
  description: "Especialistas en transporte internacional, freight forwarding y gestión aduanera. Soluciones logísticas eficientes y seguras para su negocio a nivel global.",
  keywords: ["transporte internacional", "freight forwarding", "gestión aduanera", "logística global", "importación", "exportación"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-brand-secondary selection:text-white pt-20">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
