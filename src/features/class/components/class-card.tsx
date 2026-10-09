import { Card, CardFooter, CardLink, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export type ClassCardProps = {
  classes?: {
    _id?: string;
    exercise?: string;
    short_youtube_demonstration_link?: string | null;
    in_depth_youtube_explanation_link?: string | null;
  };
  title?: string;
  image?: string;
  linkText?: string;
  onClick?: () => void;
  className?: string;
};

function getYouTubeThumbnail(url?: string | null): string {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    let videoId = "";

    if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    } else if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname.includes("youtube-nocookie.com")
    ) {
      videoId =
        parsedUrl.searchParams.get("v") ??
        parsedUrl.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] ??
        "";
    }

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "";
  } catch {
    return "";
  }
}

export function ClassCard({
  classes,
  title,
  image,
  linkText,
  onClick,
  className,
}: ClassCardProps) {
  const { t } = useTranslation();

  const displayTitle = title ?? classes?.exercise ?? "";
  const displayImage =
    image ??
    getYouTubeThumbnail(classes?.short_youtube_demonstration_link) ??
    "";

  const resolvedLinkText = linkText ?? t("healthy.explore", "Explore");

  return (
    <Card
      variant="media"
      onClick={onClick}
      className={[
        "relative h-72 sm:h-80 w-full cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[1.02]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {displayImage ? (
        <img
          src={displayImage}
          alt={displayTitle}
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-[28px] object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="absolute inset-0 rounded-[28px] bg-neutral-800" />
      )}

      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <CardFooter className="relative z-10">
        <CardTitle className="line-clamp-1">
          {displayTitle}
        </CardTitle>

        <CardLink onClick={onClick} className="cursor-pointer">
          {resolvedLinkText}
        </CardLink>
      </CardFooter>
    </Card>
  );
}