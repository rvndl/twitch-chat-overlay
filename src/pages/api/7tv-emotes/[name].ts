import { url } from "inspector";
import type { NextApiRequest, NextApiResponse } from "next";

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

  const global7TVEmotes = await (
    await (await fetch("https://api.7tv.app/v2/emotes/global")).json()
  ).map(({ name, urls }: { name: any; urls: string[] }) => ({
    name: name,
    url: urls[0][1],
  }));

  const channel7TVEmotes = await (
    await (
      await fetch(`https://api.7tv.app/v2/users/${broadcasterId}/emotes`)
    ).json()
  ).map(({ name, urls }: { name: any; urls: string[] }) => ({
    name: name,
    url: urls[0][1],
  }));

  res.status(200).json([...global7TVEmotes, ...channel7TVEmotes]);
}
