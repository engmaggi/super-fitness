import healthyBg from "@/assets/healthy-section.jpg";
import { Dumbbell } from "lucide-react";
import type { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";

type MealsSectionHeaderProps = {
  /** Slot rendered below the heading (e.g. tabs, cards) */
  children?: ReactNode;
  /** Whether this header is used as the full Healthy page */
  isPage?: boolean;
};

export function MealsSectionHeader({
  children,
  isPage = false,
}: MealsSectionHeaderProps) {
  const { t } = useTranslation();

  return (
    <section
      className={[
        "relative w-screen overflow-hidden -mx-[calc((100vw-100%)/2)] px-0",
        isPage ? "min-h-screen pt-40 pb-20" : "py-20",
      ].join(" ")}
    >
      {/* Background image */}
      <img
        src={healthyBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Watermark text behind overlay */}
      <div
        className={[
          "pointer-events-none absolute left-1/2  -translate-x-1/2 select-none whitespace-nowrap",
          isPage ? "z-3 top-26" : "z-[1] top-2 sm:top-8",
        ].join(" ")}
      >
        <span className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-[0.18em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.25)]">
          {t("healthy.header.watermark", "HEALTHY")}
        </span>
      </div>

      {/* Overlay */}
      <div
        className={[
          "absolute left-0 right-0 z-[2] bg-background/60 backdrop-blur-xl",
          isPage ? "top-0 bottom-0" : "top-17 bottom-44",
        ].join(" ")}
      />

      {/* Content */}
      <div className="relative z-[3] mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-16">
        {/* Badge & Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-lg sm:text-base font-semibold text-primary">
            <Dumbbell className="size-4" />
            {t("healthy.header.badge", "Healthy Nutritions")}
          </div>

          <h2 className="font-heading text-3xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-5xl">
            <Trans
              i18nKey="healthy.header.titleHtml"
              components={{
                br: <br className="hidden sm:block" />,
                highlight: <span className="text-primary" />,
              }}
            >
              Fuel Your Fitness Journey With <br className="hidden sm:block" />
              Customized <span className="text-primary">Meal Plans</span> For
              You
            </Trans>
          </h2>
        </div>

        {/* Slot */}
        {children}
      </div>
    </section>
  );
}
