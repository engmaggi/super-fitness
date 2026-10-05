import { MoveUpRight } from "lucide-react"

type AboutFeature = {
  title: string
  description: string
}

const FEATURES: AboutFeature[] = [
  {
    title: "Personal Trainer",
    description:
      "Achieve your fitness goals with the guidance of our certified trainers.",
  },
  {
    title: "Cardio Programs",
    description:
      "From steady-state runs to interval sprints, our treadmill programs are built for progress.",
  },
  {
    title: "Quality Equipment",
    description:
      "Our gym is equipped with the latest cardio and strength machines.",
  },
  {
    title: "Healthy Nutrition",
    description:
      "Fuel your journey with customized meal plans that fit your lifestyle.",
  },
]

export function AboutFeatureGrid() {
  return (
    <div className="grid gap-5 pt-2 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
      {FEATURES.map((feature) => (
        <article
          key={feature.title}
          className="space-y-2 border-b border-border/70 pb-4 sm:border-b-0"
        >
          <div className="flex items-center gap-2.5">
            <MoveUpRight className="size-4 text-primary" aria-hidden="true" />
            <h3 className="font-heading text-lg font-bold text-foreground">
              {feature.title}
            </h3>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            {feature.description}
          </p>
        </article>
      ))}
    </div>
  )
}
