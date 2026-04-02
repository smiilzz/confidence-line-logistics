import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CoverageSection from "@/components/home/CoverageSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <HeroSection />
      <ServicesSection />
      <CoverageSection />
    </main>
  );
}
