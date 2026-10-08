
import type { Conversation } from "../types";

const key = (userId: string) => `smart-coach:conversations:${userId}`;

export function loadConversations(userId:string |null):Conversation[]{
    if(!userId) return[]; // logged out: nothing to load
    try{
        const raw = localStorage.getItem(key(userId));
        return raw? (JSON.parse(raw) as Conversation[]):[]
    }catch{
        return[]; // corrupted or blocked storage: start empty
    }
}
export function saveConversations(userId:string| null, list:Conversation[]){
    if(!userId) return;// logged out: never save
    try{
        localStorage.setItem(key(userId),JSON.stringify(list));
    }catch{
        // storage full or blocked: ignore, the chat still works in memory
    }
}