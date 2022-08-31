import create from "zustand";

interface GlobalBadgesState {
  badges: any;
  fetch: () => void;
}

export const useGlobalBadgesStore = create<GlobalBadgesState>((set) => ({
  badges: [],
  fetch: () => {
    fetch("https://badges.twitch.tv/v1/badges/global/display").then((res) =>
      res.json().then((data) => {
        set({ badges: data });
      })
    );
  },
}));
