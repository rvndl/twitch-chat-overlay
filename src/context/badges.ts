import { createContext } from "react";
import { Badges } from "../interfaces/badges";

export const BadgesContext = createContext<Badges>({ badge_sets: {} });
