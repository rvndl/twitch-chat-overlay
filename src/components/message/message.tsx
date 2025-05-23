import { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { DefaultStyle } from "./styles/default";
import { DonkStyle } from "./styles/donk";
import { DonkExtraStyle } from "./styles/donk-extra";
import { BadgesContext } from "../../context/badges";
import { Message } from "../../interfaces/message";
import { match } from "ts-pattern";
import { Style } from "../../interfaces/settings";
import { NymNStyle } from "./styles/nymn";
import { NNYSStyle } from "./styles/nnys";

interface Props {
  message: Message;
  animate?: boolean;
  style?: Style;
  showNames?: boolean;
  showIcon?: boolean;
  margin?: number;
  fontSize?: string;
}

export const MessageItem = ({
  message,
  animate = true,
  style = "default",
  showNames = true,
  showIcon = true,
  fontSize,
  margin,
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

  console.log(fontSize);

  return (
    <motion.div
      initial={animate && { opacity: 0, transform: "translateX(-10px)" }}
      animate={animate && { opacity: 1, transform: "translateX(0px)" }}
      transition={{ delay: 0.05 }}
      style={{
        textShadow:
          "0.07em 0 black, 0 0.07em black, -0.07em 0 black, 0 -0.07em black",
        fontSize: `${fontSize}px`,
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
          <NymNStyle
            message={message}
            showNames={showNames}
            showIcon={showIcon}
            margin={margin}
          />
        ))
        .with("nnys", () => <NNYSStyle message={message} />)
        .otherwise(() => (
          <DefaultStyle message={message} badgesWithUrl={badgesWithUrl} />
        ))}
    </motion.div>
  );
};
