import { createContext } from "react";
import { Emote } from "../interfaces/emote";

export const EmotesContext = createContext<Emote[]>([]);
