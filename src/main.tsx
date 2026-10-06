import { ThemeProvider } from "next-themes"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
import "./index.css"
import "./lib/i18n.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)
