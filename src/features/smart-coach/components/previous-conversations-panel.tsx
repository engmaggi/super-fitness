import type { Conversation } from "../types";
import { ConversationItem } from "./conversation-item";


type PreviousConversationsPanelProps = {
  conversations: Conversation[];
  onSelect: (id: string) => void;
  onNewChat: () => void;
};

export function PreviousConversationsPanel({
  conversations,
  onSelect,
  onNewChat,
}: PreviousConversationsPanelProps) {
  return (
    <div className="rounded-sm bg-zinc-900/95 ">
      <h3 className="px-3 pb-2 pt-3 text-center text-xl font-semibold text-white">
        Previous Conversations
      </h3>

      {conversations.length === 0 ? (
        <p className="px-3 py-6 text-center text-xs text-white/60">No conversations yet</p>
      ) : (
        <div className="max-h-56 overflow-y-auto">
          {conversations.map((c) => (
            <ConversationItem key={c.id} title={c.title} onClick={() => onSelect(c.id)} />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onNewChat}
        className="w-full rounded-b-xl px-3 py-2 text-center text-[11px] font-semibold text-primary hover:bg-white/5"
      >
        + New chat
      </button>
    </div>
  );
}