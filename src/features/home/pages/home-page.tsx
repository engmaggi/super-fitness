import { AboutSection } from "@/features/about/components/about-section";
import { MealsSection } from "@/features/healthy/components/meals-section";
import HeroSection from "../components/hero";
import WhyUsSection from "../components/whyUs";
import { ClassSection } from "@/features/class/components/class-section";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center ">
      <HeroSection />
      <AboutSection />
      <ClassSection />
      <WhyUsSection />
      <MealsSection />
    </div>
  );
}
