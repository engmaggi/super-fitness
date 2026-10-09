import { AiError } from "../api/ai-error";

export function getFriendlyError(e:unknown):string{
    if(e instanceof AiError && e.status === 429){
      return "The coach is busy right now. Please wait a few seconds and try again.";
  }
  return "Something went wrong, please try again";
}