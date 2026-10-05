import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Settings, LogOut, LogIn } from "lucide-react";
import { toast } from "sonner";
import headerLogo from "@/assets/headerLogo.png";
import { useLocalePath } from "@/lib/use-locale-path";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  // Track authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(
      localStorage.getItem("token") ||
      localStorage.getItem("user") ||
      sessionStorage.getItem("token"),
    );
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(
        Boolean(
          localStorage.getItem("token") ||
          localStorage.getItem("user") ||
          sessionStorage.getItem("token"),
        ),
      );
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success(t("nav.loggedOut", "Logged out successfully"));
    navigate(localePath("/login"));
  };

  const navItems = [
    { label: t("nav.home", "Home"), path: "/" },
    { label: t("nav.about", "About"), path: "/about" },
    { label: t("nav.classes", "Classes"), path: "/classes" },
    { label: t("nav.healthy", "Healthy"), path: "/healthy" },
  ];

  const isTabActive = (itemPath: string) => {
    const target = localePath(itemPath);
    if (itemPath === "/") {
      return location.pathname === "/" || location.pathname === "/ar";
    }
    return (
      location.pathname === target || location.pathname.startsWith(`${target}/`)
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent">
      <div className="flex w-full min-h-24 items-center justify-between px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36 py-4">
        {/* Logo */}
        <Link
          to={localePath("/")}
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img
            src={headerLogo}
            alt="Super Fitness"
            className="h-12 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-6 sm:gap-10 font-heading text-base md:text-lg font-bold">
          {navItems.map((item) => {
            const active = isTabActive(item.path);
            return (
              <Link
                key={item.path}
                to={localePath(item.path)}
                className={`transition-colors duration-200 ${
                  active
                    ? "text-primary font-bold"
                    : "text-white/90 hover:text-primary font-semibold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Icon & Dropdown */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="User Menu"
              className="flex size-10 md:size-11 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <User className="size-5 md:size-6 text-white" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-48 min-w-44 rounded-xl border border-white/10 bg-neutral-900/95 p-1.5 shadow-2xl backdrop-blur-xl text-white"
            >
              <DropdownMenuItem
                onClick={() => navigate(localePath("/settings"))}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
              >
                <Settings className="size-4 text-white/70" />
                <span>{t("nav.settings", "Settings")}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-white/10" />

              {isLoggedIn ? (
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/15 cursor-pointer transition-colors"
                >
                  <LogOut className="size-4" />
                  <span>{t("nav.logout", "Logout")}</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => navigate(localePath("/login"))}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/15 cursor-pointer transition-colors"
                >
                  <LogIn className="size-4" />
                  <span>{t("nav.login", "Login")}</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
