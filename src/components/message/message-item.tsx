import { useMemo } from "react";
import { Message } from "../../store/messages";
import { motion } from "framer-motion";
import { Styles } from "../../store/settings";
import { Donk } from "../donk";
import { useEmotesStore } from "../../store/emotes";
import sanitize from "sanitize-html";
import { shadeColor } from "../../utils";
import { MessageWithEmotes } from "./message-emotes";
import { DefaultStyle } from "./styles/default";
import { DonkStyle } from "./styles/donk";
import { NymNStyle } from "./styles/nymn";
import { DonkExtraStyle } from "./styles/donk-extra";

interface Props {
  message: Message;
  globalBadges: any;
  channelBadges: any;
  animate?: boolean;
  style?: Styles;
  showNames?: boolean;
}

export const MessageItem = ({
  message,
  globalBadges,
  channelBadges,
  animate = true,
  style = "default",
  showNames = true,
}: Props) => {
  const badgesWithUrl = useMemo(() => {
    return Object.entries(message.user.badges || {}).map(([key, value]) => {
      if (key === "subscriber") {
        const badge = channelBadges?.badge_sets?.[key]?.versions?.[value || -1];

        return {
          url: badge?.image_url_1x,
          title: badge?.title,
        };
      } else {
        const badge = globalBadges?.badge_sets?.[key]?.versions?.[value || "1"];
        return {
          url: badge?.image_url_1x,
          title: badge?.title,
        };
      }
    });
  }, [globalBadges, channelBadges, message]);

  return (
    <motion.div
      initial={animate && { opacity: 0, x: -10 }}
      animate={animate && { opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        textShadow: "rgb(0 0 0) 1px 1px 3px",
      }}
      className="flex font-bold"
    >
      {style === "default" && (
        <DefaultStyle message={message} badgesWithUrl={badgesWithUrl} />
      )}
      {style === "donk" && (
        <DonkStyle message={message} showNames={showNames} />
      )}
      {style === "donkExtra" && (
        <DonkExtraStyle message={message} showNames={showNames} />
      )}
      {style === "nymn" && (
        <NymNStyle message={message} showNames={showNames} />
      )}
    </motion.div>
  );
};
