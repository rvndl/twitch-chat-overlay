import create from "zustand";

interface Emote {
  name: string;
  url: string;
}

interface EmotesState {
  emotes: Emote[];
  fetch: (name: string) => void;
}

export const useEmotesStore = create<EmotesState>((set) => ({
  emotes: [],
  fetch: async (name) => {
    set({ emotes: [] });
    const twitchEmotes = await (await fetch("/api/twitch-emotes")).json();
    const channelEmotes = await (
      await fetch("/api/channel-emotes/" + encodeURIComponent(name))
    ).json();

    const ffzEmotes = await (
      await fetch("/api/ffz-emotes/" + encodeURIComponent(name))
    ).json();

    const bttvEmotes = await (
      await fetch("/api/bttv-emotes/" + encodeURIComponent(name))
    ).json();

    const _7TVEmotes = await (
      await fetch("/api/7tv-emotes/" + encodeURIComponent(name))
    ).json();

    set({
      emotes: [
        ...twitchEmotes,
        ...channelEmotes,
        ...ffzEmotes,
        ...bttvEmotes,
        ..._7TVEmotes,
      ],
    });
  },
}));
