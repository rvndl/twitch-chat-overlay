import axios from "axios";
import { useState } from "react";
import { Badges } from "../interfaces/badges";

export const useBadges = () => {
  const [badges, setBadges] = useState<Badges>({ badge_sets: {} });

  const fetch = async (name: string) => {
    const res = await axios.get(`/api/channel-badges/${name}`);
    setBadges(res.data);
  };

  return { badges, fetch };
};
