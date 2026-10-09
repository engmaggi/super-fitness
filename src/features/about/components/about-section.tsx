import type { CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { Dumbbell } from "lucide-react"
import { Trans, useTranslation } from "react-i18next"
import { AboutFeatureGrid } from "@/features/about/components/about-feature-grid"
import { AboutMediaCollage } from "@/features/about/components/about-media-collage"
import { Button } from "@/components/ui/button"
import { useLocalePath } from "@/lib/use-locale-path"

export function AboutSection() {
  const navigate = useNavigate()
  const localePath = useLocalePath()
  const { t } = useTranslation()

  return (
    <section
      className="w-full"
      style={{ "--about-mark": `"${t("about.watermark")}"` } as CSSProperties}
    >
      <div className="grid w-full gap-8 bg-card/70 p-5  sm:p-7 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:p-10 xl:p-12">
        <AboutMediaCollage />

        <div className="relative flex flex-col before:pointer-events-none before:absolute before:-top-7 before:start-0 before:hidden before:font-heading before:text-5xl before:font-bold before:uppercase before:tracking-[0.08em] before:text-foreground/8 before:content-(--about-mark) lg:before:block">

          <div className="mb-3 flex items-center gap-2">
            <Dumbbell className="size-8 text-primary rotate-45" aria-hidden="true" />
            <p className="font-heading text-sm font-bold text-primary uppercase ">
              {t("about.eyebrow")}
            </p>
          </div>

          <h2 className="max-w-xl font-heading text-3xl leading-[120%] font-extrabold tracking-tight text-foreground sm:text-4xl relative before:pointer-events-none before:absolute before:top-6 before:start-0 before:hidden before:font-heading before:text-5xl before:font-bold before:uppercase before:tracking-[0.08em] before:text-foreground/8 before:content-(--about-mark) lg:before:block">
            <Trans
              i18nKey="about.title"
              components={{ highlight: <span className="text-primary" /> }}
            />
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            {t("about.description")}
          </p>

          <AboutFeatureGrid />

          <div className="mt-6 flex items-center ">
            <Button
              className="btn-arrow relative text-sm leading-140 lg:text-base lg:leading-none"
              variant="pill"
              onClick={() => navigate(localePath("/register"))}
            >
              {t("about.getStarted")}
            </Button>

          </div>
        </div>
      </div>
    </section>
  )
}
