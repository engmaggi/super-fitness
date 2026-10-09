import { LogIn, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/lib/use-locale-path";

export function ProfileGuestState() {
  const { t } = useTranslation();
  const localePath = useLocalePath();

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(ellipse_at_83%_38%,rgba(255,106,0,0.1),transparent_30%),radial-gradient(ellipse_at_50%_85%,rgba(255,255,255,0.06),transparent_34%)]"
      />
      <section className="relative w-full max-w-lg rounded-3xl border border-foreground/15 bg-card/70 p-8 text-center shadow-2xl backdrop-blur-md sm:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
          <UserRound aria-hidden="true" className="size-8" />
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
          {t("profile.guestTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {t("profile.guestDescription")}
        </p>
        <Link
          to={localePath("/login")}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <LogIn aria-hidden="true" className="size-4" />
          {t("profile.login")}
        </Link>
        <Link
          to={localePath("/")}
          className="mt-4 block text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          {t("profile.backHome")}
        </Link>
      </section>
    </main>
  );
}
