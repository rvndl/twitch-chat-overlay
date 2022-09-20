import axios from "axios";

interface UserDetails {
  id: string;
}

interface ResponseData {
  user: UserDetails;
}

export async function getUser(username: string) {
  const {
    data: { user },
  } = await axios.get<ResponseData>(
    `https://api.twitchdatabase.com/channels/${username}`
  );

  return user;
}
