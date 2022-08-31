import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  const userDetails = await (
    await fetch("https://api.twitch.tv/helix/users?login=" + name, {
      headers: {
        Authorization: "Bearer a6bq8y6p0kep2chb5imd502mc8tq7m",
        "Client-Id": "cmh9stzetj25f3t6nsxykjt51z1l3j",
      },
    })
  ).json();

  const userId = userDetails.data[0].id;

  const channelBadges = await (
    await fetch(`https://badges.twitch.tv/v1/badges/channels/${userId}/display`)
  ).json();

  res.status(200).json({ ...channelBadges });
}
