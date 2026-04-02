import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CoverageSection from "@/components/home/CoverageSection";
import AboutSection from "@/components/home/AboutSection";
import QuoteSection from "@/components/home/QuoteSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <HeroSection />
      <ServicesSection />
      <CoverageSection />
      <AboutSection />
      <QuoteSection />
    </main>
  );
}
