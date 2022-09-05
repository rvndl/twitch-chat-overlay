import client from "../axios";

const EMOTES_URL = "https://api.twitch.tv/helix/chat/emotes";
const BADGES_URL = "https://badges.twitch.tv/v1/badges";

interface Emote {
  name: string;
  images: {
    url_1x: string;
  };
}

interface TwitchEmotes {
  data: Emote[];
}

export async function fetchTwitchEmotes(channelId: string) {
  const globalEmotes = (
    await client.get<TwitchEmotes>(`${EMOTES_URL}/global`)
  ).data.data.map(({ name, images }) => ({ name, url: images.url_1x }));

  const channelEmotes = (
    await client.get<TwitchEmotes>(`${EMOTES_URL}?broadcaster_id=${channelId}`)
  ).data.data.map(({ name, images }) => ({ name, url: images.url_1x }));

  return [...globalEmotes, ...channelEmotes];
}

export async function fetchTwitchBadges(channelId: string) {
  const globalBadges = await (
    await client.get(`${BADGES_URL}/global/display`)
  ).data;

  const channelBadges = await (
    await client.get(`${BADGES_URL}/channels/${channelId}/display`)
  ).data;

  return {
    badge_sets: { ...globalBadges.badge_sets, ...channelBadges.badge_sets },
  };
}
