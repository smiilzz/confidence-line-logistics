import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
