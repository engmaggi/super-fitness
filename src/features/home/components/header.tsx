import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, User, Settings, LogOut, LogIn } from "lucide-react";
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
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  function hasSession() {
    return Boolean(
      localStorage.getItem("token") ||
      localStorage.getItem("user") ||
      sessionStorage.getItem("token"),
    );
  }

  // Auth state.
  const [isLoggedIn, setIsLoggedIn] = useState(hasSession);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(hasSession());
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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 z-40 w-full bg-transparent">
      <div className="flex w-full min-h-20 items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 md:min-h-24 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Brand */}
        <Link
          to={localePath("/")}
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img
            src={headerLogo}
            alt="Super Fitness"
            className="h-14 w-auto object-contain sm:h-20 md:h-20"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:gap-10 font-heading text-base md:flex md:text-lg font-bold">
          {navItems.map((item) => {
            const active = isTabActive(item.path);
            return (
              <Link
                key={item.path}
                to={localePath(item.path)}
                className={`transition-colors duration-200 ${active
                    ? "text-primary font-bold"
                    : "text-white/90 hover:text-primary font-semibold"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t("nav.openMenu", "Open navigation menu")}
            className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-md transition-all hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          >
            <Menu className="size-5" />
          </button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="User Menu"
              className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:size-11"
            >
              <User className="size-5 text-white md:size-6" />
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

      {/* Mobile drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[82vw] border-r border-white/10 bg-neutral-950/95 p-0 text-white backdrop-blur-xl sm:w-80">
          <div className="flex h-full flex-col gap-6 px-5 py-6">
            <Link
              to={localePath("/")}
              onClick={closeMobileMenu}
              className="flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              <img
                src={headerLogo}
                alt="Super Fitness"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isTabActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={localePath(item.path)}
                    onClick={closeMobileMenu}
                    className={`rounded-2xl border px-4 py-3 text-base font-semibold transition-colors ${active
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-white/10 bg-white/5 text-white/90 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Account actions */}
            <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  navigate(localePath("/settings"));
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Settings className="size-4 text-white/70" />
                <span>{t("nav.settings", "Settings")}</span>
              </button>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/15"
                >
                  <LogOut className="size-4" />
                  <span>{t("nav.logout", "Logout")}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    navigate(localePath("/login"));
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-left text-sm font-medium text-primary transition-colors hover:bg-primary/15"
                >
                  <LogIn className="size-4" />
                  <span>{t("nav.login", "Login")}</span>
                </button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
