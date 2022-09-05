import axios from "axios";
import { useState } from "react";
import { Emote } from "../interfaces/emote";

export const useEmotes = () => {
  const [emotes, setEmotes] = useState<Emote[]>([]);

  const fetch = async (name: string) => {
    const res = await axios.get(`/api/channel-emotes/${name}`);
    setEmotes(res.data);
  };

  return { emotes, fetch };
};
