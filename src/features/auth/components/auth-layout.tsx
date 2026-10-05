import authBg from "@/assets/auth-bg.webp";
import authImage from "@/features/auth/assets/auth-side-img.webp";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    // Main wrapper: restricts height to viewport and prevents full-page scrolling
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Blurred background image layer */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${authBg})` }}
      />

      {/* Foreground overlay */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center bg-foreground" />

      {/* Content container: stacks vertically on mobile, horizontally on desktop */}
      <div className="relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center bg-background/60 backdrop-blur-xl xl:flex-row xl:rtl:flex-row-reverse">
        {/* Illustration section */}
        <div className="flex h-full w-full flex-col items-center justify-center border-b-2 border-primary/20 bg-background/20 drop-shadow-[0_4px_79.8px_rgba(0,0,0,0.25)] xl:w-1/2 xl:border-b-0 xl:border-e-2">
          <img
            src={authImage}
            alt="Auth Layout"
            className="max-h-full w-full max-w-[89.5%] object-contain p-4"
          />
        </div>

        {/* Dynamic content (Forms) with independent vertical scroll if needed */}
        <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto text-center xl:w-1/2 xl:py-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
