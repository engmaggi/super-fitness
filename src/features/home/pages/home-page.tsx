import { AboutSection } from "@/features/about/components/about-section";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-16 py-24">
      <h1 className="font-heading text-page-title">Hero Section</h1>
      <AboutSection />
      <h2 className={"font-heading text-page-title"}>workout Section</h2>
      <h2 className={"font-heading text-page-title"}>why us Section</h2>
      <h2 className={"font-heading text-page-title"}>Healthy Section</h2>
    </div>
  );
}
