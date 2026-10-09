import { AboutSection } from "@/features/about/components/about-section";
import { MealsSection } from "@/features/healthy/components/meals-section";
import HeroSection from "../components/hero";
import WhyUsSection from "../components/whyUs";

export default function HomePage() {
  return (
      <div className="flex flex-1 flex-col items-center justify-center ">
      <HeroSection />
      <AboutSection />
      <h2 className={"font-heading text-page-title"}>workout Section</h2>
      <WhyUsSection />
      <MealsSection />
    </div>
  );
}
