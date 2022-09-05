import client from "../axios";

const API_URL = "https://api.7tv.app/v2";

interface Emote {
  name: string;
  urls: string[][];
}

export async function fetch7TvEmotes(channelId: string) {
  const globalEmotes = await (
    await client.get<Emote[]>(`${API_URL}/emotes/global`)
  ).data.map(({ name, urls }) => ({ name, url: urls[0][1] }));

  try {
    const channelEmotes = await (
      await client.get<Emote[]>(`${API_URL}/users/${channelId}/emotes`)
    ).data.map(({ name, urls }) => ({ name, url: urls[0][1] }));

    return [...globalEmotes, ...channelEmotes];
  } catch (error) {
    return [...globalEmotes];
  }
}
