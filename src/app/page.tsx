import ClientConsoleFilters from "@/components/ClientConsoleFilters";
import HeroOverlay from "@/components/HeroOverlay";
import MainCanvasLoader from "@/components/MainCanvasLoader";

export default function Home() {
  return (
    <main className="relative min-h-screen stars-bg">
      <ClientConsoleFilters />
      <div className="scroll-container relative w-full pointer-events-none" />
      <MainCanvasLoader />
      <HeroOverlay />
    </main>
  );
}
