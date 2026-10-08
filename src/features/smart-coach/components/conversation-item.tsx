import { ChevronRightIcon } from "lucide-react";

type ConversationItemProps = {
  title: string;
  onClick: () => void;
};

export function ConversationItem({ title, onClick }: ConversationItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-2 border-b border-white/10 px-3 py-2 text-left text-[11px] text-white hover:bg-white/5"
    >
      <span className="truncate">{title}</span>
      <ChevronRightIcon className="size-3 shrink-0 text-brand" aria-hidden="true" />
    </button>
  );
}