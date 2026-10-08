import { PencilIcon, SendIcon } from "lucide-react";
import { useState, type FormEvent } from "react";

type ChatInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [text, setText] = useState("");

function handleSubmit(e: FormEvent)  {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;   // prevent empty messages / sending while waiting
    onSend(trimmed);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`m-3 flex shrink-0 items-center gap-2 rounded-full border border-white/50 px-3 py-2 ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <PencilIcon
       className="size-4 shrink-0 text-primary" aria-hidden="true" />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask Me Any Things"
        disabled={disabled}
        maxLength={500}
        className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none  placeholder:text-white/50"
      />

      <button
        type="submit"
        disabled={disabled || !text.trim()}
        aria-label="Send message"
        className="shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <SendIcon className="size-4 text-brand" />
      </button>
    </form>
  );
}