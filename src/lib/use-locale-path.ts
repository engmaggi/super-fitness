import { useLocation } from "react-router-dom"

export function useLocalePath() {
  const { pathname } = useLocation()
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/")

  return (path: string) => {
    const normalized = path.startsWith("/") ? path : `/${path}`
    if (!isArabic) return normalized
    if (normalized === "/") return "/ar"
    return `/ar${normalized}`
  }
}
