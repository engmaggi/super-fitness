
export type Role = "user" | "bot";

export type Message ={
    id: string;
    role: Role;
    content : string;
}

export type Conversation ={
    id: string;
    title: string;
    createdAt:number;
    messages:Message[];
}