import MainCanvas from "@/components/MainCanvas";
import HeroOverlay from "@/components/HeroOverlay";

export default function Home() {
  return (
    <main className="relative min-h-screen stars-bg">
      {/* 
        This scroll-container class defines the height of the page to permit scrolling.
        We defined height: 200vh in globals.css to map hero + one full-screen solar section.
        It sits behind the fixed canvas conceptually, or the canvas is fixed on top with pointer-events.
      */}
      <div className="scroll-container relative w-full pointer-events-none"></div>

      {/* The 3D Scene */}
      <MainCanvas />

      {/* Navbar + Scroll Indicator overlay */}
      <HeroOverlay />
    </main>
  );
}
