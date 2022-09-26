import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../server/lib/user";
import { fetchTwitchBadges } from "../../../server/providers/twitch";

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
  const badges = await fetchTwitchBadges(id);

  res.status(200).json({ ...badges });
}
