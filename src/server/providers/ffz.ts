import client from "../axios";

const API_URL = "https://api.betterttv.net/3/cached/frankerfacez";

interface Emote {
  code: string;
  images: {
    "1x": string;
  };
}

export async function fetchFfzEmotes(channelName: string) {
  const globalEmotes = await (
    await client.get<Emote[]>(`${API_URL}/emotes/global`)
  ).data.map(({ code, images }) => ({ name: code, url: images["1x"] }));

  const channelEmotes = (
    await client.get<Emote[]>(`${API_URL}/users/twitch/${channelName}`)
  ).data.map(({ code, images }) => ({ name: code, url: images["1x"] }));

  return [...globalEmotes, ...channelEmotes];
}
