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

  const globalFFZEmotes = await (
    await (
      await fetch(
        "https://api.betterttv.net/3/cached/frankerfacez/emotes/global"
      )
    ).json()
  ).map(({ code, images }: { code: any; images: any }) => ({
    name: code,
    url: images["1x"],
  }));

  const channelFFZEmotes = await (
    await (
      await fetch(
        "https://api.betterttv.net/3/cached/frankerfacez/users/twitch/" +
          broadcasterId
      )
    ).json()
  ).map(({ code, images }: { code: any; images: any }) => ({
    name: code,
    url: images["1x"],
  }));

  res.status(200).json([...globalFFZEmotes, ...channelFFZEmotes]);
}
