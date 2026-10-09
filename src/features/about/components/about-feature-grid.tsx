import { MoveUpRight } from "lucide-react"
import { useTranslation } from "react-i18next"

type AboutFeature = {
  title: string
  description: string
}

export function AboutFeatureGrid() {
  const { t } = useTranslation()
  const features = t("about.features", { returnObjects: true }) as readonly AboutFeature[]

  return (
    <div className="grid gap-5 pt-2 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
      {features.map((feature) => (
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
