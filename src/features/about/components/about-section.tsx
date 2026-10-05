import { Dumbbell, MoveRight } from "lucide-react"
import { AboutFeatureGrid } from "@/features/about/components/about-feature-grid"
import { AboutMediaCollage } from "@/features/about/components/about-media-collage"

export function AboutSection() {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-[0_20px_50px_-28px_rgb(0_0_0_/_0.55)] backdrop-blur-md sm:p-7 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:p-10">
        <AboutMediaCollage />

        <div className="relative flex flex-col before:pointer-events-none before:absolute before:-top-7 before:right-0 before:hidden before:font-heading before:text-7xl before:font-bold before:tracking-wide before:text-foreground/10 before:uppercase before:content-['ABOUT_US'] lg:before:block">

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

          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3 font-heading text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <span className="grid size-6 place-items-center rounded-full bg-primary-foreground/15">
                <MoveRight className="size-4" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
