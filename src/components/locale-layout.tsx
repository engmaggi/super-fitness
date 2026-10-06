import { useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"

type LocaleLayoutProps = {
  locale: "en" | "ar"
}

export default function LocaleLayout({ locale }: LocaleLayoutProps) {
  const { i18n } = useTranslation()

  useLayoutEffect(() => {
    if (!i18n.language.startsWith(locale)) {
      void i18n.changeLanguage(locale)
    }
  }, [i18n, locale])

  return <Outlet />
}
