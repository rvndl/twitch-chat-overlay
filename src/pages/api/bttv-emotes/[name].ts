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

  const globalBTTVEmotes = await (
    await (
      await fetch("https://api.betterttv.net/3/cached/emotes/global")
    ).json()
  ).map(({ code, id }: { code: any; id: any }) => ({
    name: code,
    url: `https://cdn.betterttv.net/emote/${id}/1x`,
  }));

  const BTTVEmotes = await await (
    await fetch(
      "https://api.betterttv.net/3/cached/users/twitch/" + broadcasterId
    )
  ).json();

  const channelEmotes = BTTVEmotes.channelEmotes.map(
    ({ code, id }: { code: any; id: any }) => ({
      name: code,
      url: `https://cdn.betterttv.net/emote/${id}/1x`,
    })
  );

  const sharedEmotes = BTTVEmotes.sharedEmotes.map(
    ({ code, id }: { code: any; id: any }) => ({
      name: code,
      url: `https://cdn.betterttv.net/emote/${id}/1x`,
    })
  );

  res
    .status(200)
    .json([...globalBTTVEmotes, ...channelEmotes, ...sharedEmotes]);
}
