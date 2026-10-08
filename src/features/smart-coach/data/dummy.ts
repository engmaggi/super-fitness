import type { Conversation, Message } from "../types";

export const dummyMessages: Message[]=[
{ id: "1", role: "bot",  content: "Hello How Can I Assist You Today ?" },
  { id: "2", role: "user", content: "Can You Please Tell Me How To Gain 20kg Weight?" },
  { id: "3", role: "bot",  content: "Of Course! I Will Be Glad To Help!" },
];

// export const dummyConversations: Conversation[] = [
//   { id: "1", title: "Lorem ipsum dolor sit amet" },
//   { id: "2", title: "Lorem ipsum dolor sit amet" },
//   { id: "3", title: "Lorem ipsum dolor sit amet" },
// ];