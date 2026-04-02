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
  title: "Confidence Line Logistics",
  description: "Soluciones logísticas mundiales seguras, eficientes y confiables.",
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
