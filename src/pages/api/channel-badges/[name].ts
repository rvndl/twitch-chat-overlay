import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../server/axios";
import { fetchTwitchBadges } from "../../../server/providers/twitch";

interface UserDetails {
  data: {
    id: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  const { data: userDetails } = await client.get<UserDetails>(
    `https://api.twitch.tv/helix/users?login=${name}`
  );

  const userId = userDetails.data[0].id;

  const badges = await fetchTwitchBadges(userId);

  res.status(200).json({ ...badges });
}
