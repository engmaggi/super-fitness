import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ProfileSettingCardProps = {
  icon: LucideIcon;
  title: string;
  children?: ReactNode;
  onClick?: () => void;
};

export function ProfileSettingCard({
  icon: Icon,
  title,
  children,
  onClick,
}: ProfileSettingCardProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick();
        }
      }}
      className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-foreground/40 bg-background/10 px-4 py-4 text-center text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Icon aria-hidden="true" className="size-4 text-primary" />
      <span>{title}</span>
      {children}
    </div>
  );
}
