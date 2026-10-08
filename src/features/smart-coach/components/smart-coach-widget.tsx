import { useState } from "react";
import { useSmartCoachChat } from "../hooks/use-smart-coach-chat";
import { ChatWindow } from "./chat-window";
import botAvatar from "../assets/bot-avatar.png"

type SmartCoachWidgetProps = {
  userId: string | null;          // null = logged out
  onRequireLogin: () => void;     // what to do when a logged-out user clicks the robot
};

export function SmartCoachWidget({ userId, onRequireLogin }: SmartCoachWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  // the hook lives HERE (always mounted), so closing the window doesn't lose the chat
  const chat = useSmartCoachChat(userId);

  function handleToggle() {
    if (!userId) return onRequireLogin();   // logged out → login page, chat does not open
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Smart Coach" : "Open Smart Coach"}
        className="flex flex-col items-center"
      >
        <img src={botAvatar} alt="" className="w-20 drop-shadow-lg" />
        <span className="-mt-3 rounded-full bg-brand px-4 py-1 text-xs font-bold text-white shadow-md">
          {isOpen ? "Tap to Close" : "Hey Ask Me"}
        </span>
      </button>

      {isOpen && (
        <ChatWindow
          messages={chat.messages}
          conversations={chat.conversations}
          isLoading={chat.isLoading}
          error={chat.error}
          onSend={chat.sendMessage}
          onSelectConversation={chat.selectConversation}
          onNewChat={chat.startNewChat}
        />
      )}
    </div>
  );
}