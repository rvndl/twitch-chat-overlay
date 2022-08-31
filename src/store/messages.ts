import { ChatUserstate } from "tmi.js";
import create from "zustand";

export interface Message {
  user: ChatUserstate;
  message: string;
}

interface MessagesState {
  messages: Message[];
  add: (message: Message) => void;
  clear: () => void;
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  messages: [],
  add: (message) => {
    set((state) => ({
      messages: [...state.messages.slice(-50), message],
    }));
  },
  clear: () => set({ messages: [] }),
}));
