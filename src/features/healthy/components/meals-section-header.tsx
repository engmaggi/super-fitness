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
        "relative w-full min-w-0 overflow-hidden px-0",
        isPage ? "min-h-screen pt-40 pb-20" : "pt-16 pb-15",
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
          "absolute left-0 right-0 z-[2] bg-secondary/90 backdrop-blur-md",
          isPage ? "top-0 bottom-0" : "top-17 bottom-44",
        ].join(" ")}
      />

      {/* Content */}
      <div className="relative z-[3] mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-20">
        {/* Badge & Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 pt-2 text-base sm:text-base font-semibold text-primary leading-6.5">
           <Dumbbell className="size-8 rotate-45" />
            {t("healthy.header.badge", "Healthy Nutritions")}
          </div>

          <h2 className="font-heading text-xl font-bold uppercase leading-[120%] text-white sm:text-4xl ">
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
