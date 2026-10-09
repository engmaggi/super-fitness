import { useTranslation } from "react-i18next";

export function ProfileLoadingState() {
  const { t } = useTranslation();

  return (
    <section
      role="status"
      aria-label={t("profile.loading")}
      className="flex flex-1 justify-center px-5 pb-16 pt-24 sm:px-8 sm:pt-28"
    >
      <span className="sr-only">{t("profile.loading")}</span>
      <div className="w-full max-w-4xl animate-pulse">
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="h-7 w-28 rounded bg-foreground/10" />
              <div className="h-3 w-20 rounded bg-foreground/10" />
              <div className="h-10 w-full max-w-52 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-138 grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-28 rounded-xl border border-foreground/10 bg-foreground/5"
            />
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <div className="h-28 w-full max-w-43 rounded-xl border border-foreground/10 bg-foreground/5" />
        </div>
      </div>
    </section>
  );
}

export function ProfileErrorState({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-32 text-center">
      <p className="font-semibold text-foreground">{t("profile.loadError")}</p>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        {error ?? t("profile.tryAgain")}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
      >
        {t("profile.retry")}
      </button>
    </section>
  );
}
