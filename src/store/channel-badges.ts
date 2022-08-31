import create from "zustand";

interface ChannelBadgesState {
  badges: any;
  fetch: (name: string) => void;
}

export const useChannelBadgesStore = create<ChannelBadgesState>((set) => ({
  badges: [],
  fetch: (name) => {
    fetch(`/api/channel-badges/${name}`).then((res) =>
      res.json().then((data) => {
        set({ badges: data });
      })
    );
  },
}));
