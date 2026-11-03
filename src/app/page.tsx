import { HeroSlider } from "@/features/home/hero-slider";
import FeaturedStudios from "@/features/home/featured-studios";
import StudioCategories from "@/features/home/studio-categories";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <FeaturedStudios />
      <StudioCategories />
    </main>
  );
}
