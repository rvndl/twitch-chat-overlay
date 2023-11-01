import client from "../axios";

const API_URL = "https://7tv.io/v3";

interface GlobalEmoteSet {
  id: string;
}

interface Account {
  emote_set: {
    id: string;
  };
}

interface Emote {
  name: string;
  data: {
    host: {
      url: string;
      files: {
        name: string;
      }[];
    };
  };
}

interface EmoteSet {
  emotes: Emote[];
}

function emoteMapper(emote: Emote) {
  return {
    name: emote.name,
    url: `${emote.data.host.url}/${emote.data.host.files[4].name}`,
  };
}

export async function fetch7TvEmotes(channelId: string) {
  const globalEmotesData = await client.get<GlobalEmoteSet>(
    `${API_URL}/emote-sets/global`
  );

  const globalEmoteSet = await (
    await client.get<EmoteSet>(
      `${API_URL}/emote-sets/${globalEmotesData.data.id}`
    )
  ).data.emotes.map(emoteMapper);

  try {
    const accountData = await client.get<Account>(
      `${API_URL}/users/twitch/${channelId}`
    );

    const channelEmoteSet = await (
      await client.get<EmoteSet>(
        `${API_URL}/emote-sets/${accountData.data.emote_set.id}`
      )
    ).data.emotes.map(emoteMapper);

    return [...globalEmoteSet, ...channelEmoteSet];
  } catch (error) {
    return [...globalEmoteSet];
  }
}
