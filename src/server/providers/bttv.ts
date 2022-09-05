import client from "../axios";

const API_URL = "https://api.betterttv.net/3/cached";

interface Emote {
  code: string;
  id: string;
}

interface BttvEmotes {
  channelEmotes: Emote[];
  sharedEmotes: Emote[];
}

export async function fetchBttvEmotes(channelId: string) {
  const globalBttvEmotes = (
    await client.get<Emote[]>(`${API_URL}/emotes/global`)
  ).data.map(({ code, id }) => ({
    name: code,
    url: `https://cdn.betterttv.net/emote/${id}/1x`,
  }));

  const channelData = (
    await client.get<BttvEmotes>(`${API_URL}/users/twitch/${channelId}`)
  ).data;

  const channelEmotes = channelData.channelEmotes.map(({ code, id }) => ({
    name: code,
    url: `https://cdn.betterttv.net/emote/${id}/1x`,
  }));

  const sharedEmotes = channelData.sharedEmotes.map(({ code, id }) => ({
    name: code,
    url: `https://cdn.betterttv.net/emote/${id}/1x`,
  }));

  return [...globalBttvEmotes, ...channelEmotes, ...sharedEmotes];
}
