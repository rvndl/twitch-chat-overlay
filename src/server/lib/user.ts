import axios from "axios";

interface UserDetails {
  id: string;
}

type ResponseData = UserDetails[];

export async function getUser(username: string) {
  const { data } = await axios.get<ResponseData>(
    `https://api.ivr.fi/v2/twitch/user?login=${username}`
  );

  return data?.[0];
}
