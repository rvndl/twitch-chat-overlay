import { useMemo } from "react";
import { Message } from "../store/messages";
import { motion } from "framer-motion";

interface Props {
  message: Message;
  globalBadges: any;
  channelBadges: any;
  animate?: boolean;
}

export const MessageItem = ({
  message: { user, message },
  globalBadges,
  channelBadges,
  animate = true,
}: Props) => {
  const badgesWithUrl = useMemo(() => {
    return Object.entries(user.badges || {}).map(([key, value]) => {
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
  }, [globalBadges, channelBadges, user]);

  return (
    <motion.div
      {...(animate && { layout: "position" })}
      initial={animate && { opacity: 0, x: -10 }}
      animate={animate && { opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="flex font-bold"
    >
      <div className="flex drop-shadow-md">
        <div className="flex items-start shrink-0">
          {badgesWithUrl.map((badge) => (
            <img
              src={badge.url}
              key={badge.url}
              className="mr-1 shrink-0 mt-1"
            />
          ))}
        </div>
        <p className="flex shrink-0 " style={{ color: user.color || "gray" }}>
          {user["display-name"]}:
        </p>
        <p className="flex ml-1 flex-wrap">{message}</p>
      </div>
    </motion.div>
  );
};
