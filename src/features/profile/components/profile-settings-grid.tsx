import {
  CircleHelp,
  Globe,
  LockKeyhole,
  LogOut,
  Moon,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/context/use-auth";
import { useLocalePath } from "@/lib/use-locale-path";
import { ProfileSettingCard } from "./profile-setting-card";

export function ProfileSettingsGrid() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { setTheme, theme } = useTheme();
  const { logout } = useAuth();

  function handleLanguageChange(value: string) {
    if (value !== "en" && value !== "ar") return;

    void i18n.changeLanguage(value);
    navigate(value === "ar" ? "/ar/settings" : "/settings");
  }

  function handleLogout() {
    logout();
    toast.success(t("nav.loggedOut"));
    navigate(localePath("/"));
  }

  return (
    <>
      <div className="mx-auto mt-8 grid max-w-[550px] grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          to={localePath("/auth/change-password")}
          className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-foreground/40 bg-background/10 px-4 py-4 text-center text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <LockKeyhole aria-hidden="true" className="size-4 text-primary" />
          <span>{t("profile.changePassword")}</span>
        </Link>

        <ProfileSettingCard icon={Globe} title={t("profile.selectLanguage")}>
          <select
            aria-label={t("profile.selectLanguage")}
            value={i18n.resolvedLanguage?.startsWith("ar") ? "ar" : "en"}
            onChange={(event) => handleLanguageChange(event.target.value)}
            className="cursor-pointer bg-transparent text-center text-xs text-primary outline-none"
          >
            <option value="en">{t("common.english")}</option>
            <option value="ar">{t("common.arabic")}</option>
          </select>
        </ProfileSettingCard>

        <ProfileSettingCard
          icon={Moon}
          title={t("profile.mood")}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span
            aria-hidden="true"
            className={`relative mt-1 h-3.5 w-7 rounded-full transition ${
              theme === "dark" ? "bg-primary" : "bg-muted-foreground"
            }`}
          >
            <span
              className={`absolute top-0.5 size-2.5 rounded-full bg-white transition ${
                theme === "dark" ? "left-4" : "left-0.5"
              }`}
            />
          </span>
        </ProfileSettingCard>

        <ProfileSettingCard
          icon={ShieldCheck}
          title={t("profile.security")}
          onClick={() => navigate(localePath("/auth/change-password"))}
        />
        <ProfileSettingCard
          icon={ShieldCheck}
          title={t("profile.privacyPolicy")}
          onClick={() => toast.info(t("profile.comingSoon"))}
        />
        <ProfileSettingCard
          icon={CircleHelp}
          title={t("profile.help")}
          onClick={() => toast.info(t("profile.comingSoon"))}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-28 w-full max-w-[172px] flex-col items-center justify-center gap-2 rounded-xl border border-foreground/40 bg-background/10 px-4 py-4 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm transition hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <LogOut aria-hidden="true" className="size-4" />
          <span>{t("nav.logout")}</span>
        </button>
      </div>
    </>
  );
}
