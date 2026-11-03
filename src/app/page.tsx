import { HeroSlider } from "@/features/home/hero-slider";
import FeaturedStudios from "@/features/home/featured-studios";
import StudioCategories from "@/features/home/studio-categories";
import HowBookingWorks from "@/features/home/how-booking-works";
import HostSupport from "@/features/home/host-support";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <FeaturedStudios />
      <StudioCategories />
      <HowBookingWorks />
      <HostSupport />
    </main>
  );
}
