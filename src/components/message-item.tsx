import { useMemo } from "react";
import { Message } from "../store/messages";
import { motion } from "framer-motion";
import { Styles, useSettingsStore } from "../store/settings";
import { Donk } from "./donk";
import Nymn from "../assets/nymn.png";

interface Props {
  message: Message;
  globalBadges: any;
  channelBadges: any;
  animate?: boolean;
  style?: Styles;
}

export const MessageItem = ({
  message,
  globalBadges,
  channelBadges,
  animate = true,
  style = "default",
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
      // {...(animate && { layout: "position" })}
      initial={animate && { opacity: 0, x: -10 }}
      animate={animate && { opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="flex font-bold"
    >
      {style === "default" && (
        <DefaultStyle message={message} badgesWithUrl={badgesWithUrl} />
      )}
      {style === "donk" && <DonkStyle message={message} />}
      {style === "nymn" && <NymNStyle message={message} />}
    </motion.div>
  );
};

const DefaultStyle = ({
  message: { user, message },
  badgesWithUrl,
}: {
  message: Message;
  badgesWithUrl: any[];
}) => {
  return (
    <div className="flex drop-shadow-md">
      <div className="flex items-start shrink-0">
        {badgesWithUrl.map((badge) => (
          <img src={badge.url} key={badge.url} className="mr-1 shrink-0 mt-1" />
        ))}
      </div>
      <p className="flex shrink-0" style={{ color: user.color || "gray" }}>
        {user["display-name"]}:
      </p>
      <p className="flex ml-1 flex-wrap">{message}</p>
    </div>
  );
};

const DonkStyle = ({ message: { user, message } }: { message: Message }) => (
  <div className="flex drop-shadow-md mb-2">
    <div style={{ color: user.color || "gray" }}>
      <Donk />
    </div>
    <p className="flex shrink-0 ml-1" style={{ color: user.color || "gray" }}>
      {user["display-name"]}:
    </p>
    <p className="flex ml-1 flex-wrap">{message}</p>
  </div>
);

const NymNStyle = ({ message: { user, message } }: { message: Message }) => (
  <div className="flex drop-shadow-md mb-2">
    <div className="w-8 h-8" style={{ backgroundColor: user.color || "gray" }}>
      <img src="/nymn.png" className="w-8 h-8" />
    </div>
    <p className="flex shrink-0 ml-1" style={{ color: user.color || "gray" }}>
      {user["display-name"]}:
    </p>
    <p className="flex ml-1 flex-wrap">{message}</p>
  </div>
);
