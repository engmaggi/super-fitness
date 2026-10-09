import type { CSSProperties } from "react"
import { Dumbbell } from "lucide-react"
import { Trans, useTranslation } from "react-i18next"
import WhyUsMasonary from "./why-us-masonary.tsx"

export default function whyUsSection() {
    const { t } = useTranslation()
    const points = t("whyUs.points", { returnObjects: true }) as readonly {
        title: string
        description: string
    }[]

    return (
        <section
            className="w-full py-4 px-4 lg:py-10 lg:px-20"
            style={{ "--why-us-mark": `"${t("whyUs.watermark")}"` } as CSSProperties}
        >
            <div className="container">
                <div className="flex lg:flex-row flex-col justify-between gap-13">
                    <div className="flex flex-col  justify-center lg:max-w-[48%] max-w-full ">

                        <div className="relative mb-3 flex items-center gap-2  before:pointer-events-none before:absolute before:-top-7 before:start-0 before:hidden before:font-heading before:text-5xl before:font-bold before:uppercase before:tracking-[0.08em] before:text-foreground/8 before:content-(--why-us-mark) lg:before:block">
                            <Dumbbell className="size-8 text-primary rotate-45" aria-hidden="true" />
                            <p className="font-heading text-sm font-bold text-primary  ">
                                {t("whyUs.eyebrow")}
                            </p>
                        </div>

                        <h2 className="max-w-xl font-heading text-xl lg:text-3xl leading-120 font-extrabold tracking-tight text-foreground sm:text-4xl relative before:pointer-events-none before:absolute before:top-6 before:start-0 before:hidden before:font-heading before:text-5xl before:font-bold before:uppercase before:tracking-[0.08em] before:text-foreground/8 before:content-(--why-us-mark) lg:before:block uppercase">
                            <Trans
                                i18nKey="whyUs.title"
                                components={{ highlight: <span className="text-primary" /> }}
                            />
                        </h2>

                        <p className="mt-5 max-w-xl text-lg lg:text-base leading-8 text-muted-foreground">
                            {t("whyUs.description")}
                        </p>
                        <div className="mt-16">
                            <div className="flex flex-col gap-8">
                                {points.map((point, index) => (
                                    <div key={point.title} className="flex items-center gap-6">
                                        <div>
                                            <div className=" border-primary rounded-full w-14.5 h-14.5 flex items-center justify-center bg-primary">
                                                <p className="text-foreground text-base ">{String(index + 1).padStart(2, "0")}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-bold capitalize text-foreground">{point.title}</p>
                                            <p className="text-foreground">{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="">
                        <WhyUsMasonary />
                    </div>
                </div>


            </div>
        </section>
    )
}
