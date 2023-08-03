import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../server/lib/user";
import { fetch7TvEmotes } from "../../../server/providers/7tv";
import { fetchBttvEmotes } from "../../../server/providers/bttv";
import { fetchFfzEmotes } from "../../../server/providers/ffz";
import { fetchTwitchEmotes } from "../../../server/providers/twitch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query.name as string;
  if (!name) {
    res.json({ error: "Missing name" });
    return;
  }

  const { id } = await getUser(name);

  const twitchEmotes = fetchTwitchEmotes(id);
  const bttvEmotes = fetchBttvEmotes(id);
  const ffzEmotes = fetchFfzEmotes(id);
  const sevenTvEmotes = fetch7TvEmotes(id);

  const emotes = await Promise.all([
    twitchEmotes,
    bttvEmotes,
    ffzEmotes,
    sevenTvEmotes,
  ]);

  res.status(200).json([...emotes.flat()]);
}
