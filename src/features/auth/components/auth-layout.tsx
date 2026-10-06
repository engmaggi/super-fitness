import authBg from "@/assets/auth-bg.webp";
import authImage from "@/features/auth/assets/auth-side-img.webp";
import { useTranslation } from "react-i18next";
import { Outlet, useMatches } from "react-router-dom";
export default function AuthLayout() {
  const { t } = useTranslation();
  const matches = useMatches();
  const headerKey = matches
   .map((match) => match.handle as { headerKey: string } | undefined)
   .findLast((handle) => handle?.headerKey)?.headerKey

  return (
    // Main wrapper: restricts height to viewport and prevents full-page scrolling
    <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden">
      {/* Blurred background image layer */}
      <div
        className="absolute inset-0  bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${authBg})` }}
      />

      {/* Foreground overlay */}
      {headerKey && (
      <div className="relative z-10 flex w-full flex-col items-center justify-center bg-foreground py-20 px-auto" >
      <h1 className="text-50 font-bold font-heading text-surface">{t(headerKey)}</h1>
      </div>
      ) }
      {/* Content container: stacks vertically on mobile, horizontally on desktop */}
      <div className="relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center bg-background/60 backdrop-blur-xl xl:flex-row xl:rtl:flex-row-reverse">
        {/* Illustration section */}
        <div className="flex h-full w-full flex-col items-center justify-center border-b-2 border-primary/20 bg-background/20 py-16 drop-shadow-[0_4px_79.8px_rgba(0,0,0,0.25)] xl:w-1/2 xl:border-b-0 xl:border-e-2 xl:py-40">
          <img
            src={authImage}
            alt="Auth Layout"
            className="max-h-full w-full max-w-[89.5%] object-contain p-4"
          />
        </div>

        {/* Dynamic content (Forms) with independent vertical scroll if needed */}
        <div className="flex h-full w-full flex-col items-center justify-center py-10  text-center px-5 xl:w-1/2 xl:py-0 xl:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
