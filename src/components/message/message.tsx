import { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { DefaultStyle } from "./styles/default";
import { DonkStyle } from "./styles/donk";
import { NymNStyle } from "./styles/nymn";
import { DonkExtraStyle } from "./styles/donk-extra";
import { BadgesContext } from "../../context/badges";
import { Message } from "../../interfaces/message";
import { match } from "ts-pattern";
import { Style } from "../../interfaces/settings";

interface Props {
  message: Message;
  animate?: boolean;
  style?: Style;
  showNames?: boolean;
}

export const MessageItem = ({
  message,
  animate = true,
  style = "default",
  showNames = true,
}: Props) => {
  const badges = useContext(BadgesContext);

  const badgesWithUrl = useMemo(() => {
    return Object.entries(message.user.badges || {}).map(([key, value]) => {
      if (key === "subscriber") {
        const badge: any = badges?.badge_sets?.[key]?.versions?.[value || -1];

        return {
          url: badge?.image_url_1x,
          title: badge?.title,
        };
      } else {
        const badge: any = badges?.badge_sets?.[key]?.versions?.[value || "1"];
        return {
          url: badge?.image_url_1x,
          title: badge?.title,
        };
      }
    });
  }, [badges, message]);

  return (
    <motion.div
      initial={animate && { opacity: 0, x: -10 }}
      animate={animate && { opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        textShadow: "rgb(0 0 0) 1px 1px 3px",
        ...(style !== "donkExtra" && {
          WebkitTextStrokeWidth: "0.5px",
          WebkitTextStrokeColor: "rgba(0, 0, 0, 0.75)",
        }),
      }}
      className="flex font-bold"
    >
      {match(style)
        .with("donk", () => (
          <DonkStyle message={message} showNames={showNames} />
        ))
        .with("donkExtra", () => (
          <DonkExtraStyle message={message} showNames={showNames} />
        ))
        .with("nymn", () => (
          <NymNStyle message={message} showNames={showNames} />
        ))
        .otherwise(() => (
          <DefaultStyle message={message} badgesWithUrl={badgesWithUrl} />
        ))}
    </motion.div>
  );
};
