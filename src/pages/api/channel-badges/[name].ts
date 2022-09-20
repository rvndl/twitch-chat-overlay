import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../server/lib/user";
import { fetchTwitchBadges } from "../../../server/providers/twitch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  const { id } = await getUser(name as string);
  const badges = await fetchTwitchBadges(id);

  res.status(200).json({ ...badges });
}
