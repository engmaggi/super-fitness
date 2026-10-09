import { useTranslation } from "react-i18next";

type ClassSectionSkeletonProps = {
  pageSize?: number;
};

export function ClassSectionSkeleton({
  pageSize = 3,
}: ClassSectionSkeletonProps) {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-label={t("healthy.loading", "Loading meals...")}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <span className="sr-only">{t("healthy.loading", "Loading meals...")}</span>
      {Array.from({ length: pageSize }).map((_, i) => (
        <div
          key={i}
          className="h-80 w-full animate-pulse rounded-[28px] bg-white/10"
        />
      ))}
    </div>
  );
}

