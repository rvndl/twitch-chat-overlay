import type { NextApiRequest, NextApiResponse } from "next";

interface Emote {
  name: string;
  images: {
    url_1x: string;
    url_2x: string;
    url_4x: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query.name as string;
  const userDetails = await (
    await fetch("https://api.twitch.tv/helix/users?login=" + name, {
      headers: {
        Authorization: "Bearer a6bq8y6p0kep2chb5imd502mc8tq7m",
        "Client-Id": "cmh9stzetj25f3t6nsxykjt51z1l3j",
      },
    })
  ).json();

  const broadcasterId = userDetails.data[0].id;

  const emotes = await (
    await fetch(
      "https://api.twitch.tv/helix/chat/emotes?broadcaster_id=" + broadcasterId,
      {
        headers: {
          Authorization: "Bearer a6bq8y6p0kep2chb5imd502mc8tq7m",
          "Client-Id": "cmh9stzetj25f3t6nsxykjt51z1l3j",
        },
      }
    )
  ).json();

  const fotmatted = emotes.data.map(({ name, images }: Emote) => ({
    name,
    url: images.url_1x,
  }));

  res.status(200).json(fotmatted);
}
