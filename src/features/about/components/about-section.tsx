import { Link } from "react-router-dom"
import { Dumbbell, ArrowRight } from "lucide-react"
import { AboutFeatureGrid } from "@/features/about/components/about-feature-grid"
import { AboutMediaCollage } from "@/features/about/components/about-media-collage"
import { useLocalePath } from "@/lib/use-locale-path"

export function AboutSection() {
  const localePath = useLocalePath()

  return (
    <section className="w-full">
      <div className="grid w-full gap-8 bg-card/70 p-5  sm:p-7 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:p-10 xl:p-12">
        <AboutMediaCollage />

        <div className="relative flex flex-col before:pointer-events-none before:absolute before:-top-7 before:right-0 before:hidden before:font-heading before:text-7xl before:font-bold before:uppercase before:tracking-[0.08em] before:text-foreground/10 before:content-['About_Us'] lg:before:block">

          <div className="mb-3 flex items-center gap-2">
            <Dumbbell className="size-4 text-primary" aria-hidden="true" />
            <p className="font-heading text-sm font-bold text-primary uppercase">
              About Us
            </p>
          </div>

          <h2 className="max-w-xl font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-4xl">
            Empowering You To Achieve
            <span className="text-primary"> Your Fitness </span>
            Goals
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            We believe fitness is more than a workout. With top-tier facilities,
            certified trainers, and a supportive community, we guide every step
            of your journey.
          </p>

          <AboutFeatureGrid />

          <div className="mt-6 flex items-center ">
            <Link
              to={localePath("/classes")}
              className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-heading text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
            </Link>

            <div className="grid size-8 place-items-center rounded-full border-2 -ml-3 border-white border-primary bg-primary text-base">
              <ArrowRight
                className="size-4 rotate-315"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
