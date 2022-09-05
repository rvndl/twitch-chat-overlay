import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../server/axios";
import { fetch7TvEmotes } from "../../../server/providers/7tv";
import { fetchBttvEmotes } from "../../../server/providers/bttv";
import { fetchFfzEmotes } from "../../../server/providers/ffz";
import { fetchTwitchEmotes } from "../../../server/providers/twitch";

interface UserDetails {
  data: {
    id: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query.name as string;
  if (!name) {
    res.json({ error: "Missing name" });
    return;
  }

  const { data: userDetails } = await client.get<UserDetails>(
    `https://api.twitch.tv/helix/users?login=${name}`
  );

  const userId = userDetails.data[0].id;

  const twitchEmotes = fetchTwitchEmotes(userId);
  const bttvEmotes = fetchBttvEmotes(userId);
  const ffzEmotes = fetchFfzEmotes(userId);
  const sevenTvEmotes = fetch7TvEmotes(userId);

  const emotes = await Promise.all([
    twitchEmotes,
    bttvEmotes,
    ffzEmotes,
    sevenTvEmotes,
  ]);

  res.status(200).json([...emotes.flat()]);
}
