import { ChatUserstate } from "tmi.js";

export interface Message {
  user: ChatUserstate;
  message: string;
}
