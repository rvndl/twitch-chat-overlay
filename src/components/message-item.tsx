import { useMemo } from "react";
import { Message } from "../store/messages";
import { motion } from "framer-motion";
import { Styles } from "../store/settings";
import { Donk } from "./donk";
import { useEmotesStore } from "../store/emotes";
import sanitize from "sanitize-html";
import { shadeColor } from "../utils";

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
      // {...(animate && { layout: "position" })}
      initial={animate && { opacity: 0, x: -10 }}
      animate={animate && { opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        textShadow: "rgb(0 0 0) 0px 0px 2px",
      }}
      className="flex font-bold"
    >
      {style === "default" && (
        <DefaultStyle message={message} badgesWithUrl={badgesWithUrl} />
      )}
      {style === "donk" && (
        <DonkStyle message={message} showNames={showNames} />
      )}
      {style === "nymn" && (
        <NymNStyle message={message} showNames={showNames} />
      )}
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
    <div className="flex mb-1">
      <div className="flex items-start shrink-0">
        {badgesWithUrl.map((badge) => (
          <img src={badge.url} key={badge.url} className="mt-1 mr-1 shrink-0" />
        ))}
      </div>
      <p className="flex shrink-0" style={{ color: user.color || "gray" }}>
        {user["display-name"]}:
      </p>
      <p className="flex flex-wrap ml-1">
        <MessageWithEmotes message={message} />
      </p>
    </div>
  );
};

const DonkStyle = ({
  message: { user, message },
  showNames,
}: {
  message: Message;
  showNames: boolean;
}) => (
  <div className="flex mb-2">
    <div className="shrink-0" style={{ color: user.color || "gray" }}>
      <Donk />
    </div>
    {showNames && (
      <p className="flex ml-1 shrink-0" style={{ color: user.color || "gray" }}>
        {user["display-name"]}:
      </p>
    )}
    <p className="flex flex-wrap ml-1">
      <MessageWithEmotes message={message} />
    </p>
  </div>
);

const NymNStyle = ({
  message: { user, message },
  showNames,
}: {
  message: Message;
  showNames: boolean;
}) => {
  const userColor = user.color || "#ccc";
  const shadedColor = shadeColor(userColor, 50);

  return (
    <div className="flex mb-2">
      <div
        className="w-8 h-8 shrink-0"
        style={{
          background: `linear-gradient(0deg, ${shadedColor} 0%, ${userColor} 100%)`,
        }}
      >
        <motion.img
          animate={
            (message.includes("!vanish") || message.includes("!vent")) && {
              x: "100vw",
              opacity: 0,
              rotate: [0, -10, 10, -10, 10, -10, 10, -10, 10, -10, 10, -10],
            }
          }
          transition={{ delay: 1, duration: 2 }}
          src="/nymn.png"
          className="w-8 h-8 shrink-0"
        />
      </div>
      {showNames && (
        <p
          className="flex ml-1 shrink-0"
          style={{ color: user.color || "gray" }}
        >
          {user["display-name"]}:
        </p>
      )}
      <p className="flex flex-wrap ml-1">
        <MessageWithEmotes message={message} />
      </p>
    </div>
  );
};

const MessageWithEmotes = ({ message }: { message: string }) => {
  const emotes = useEmotesStore(({ emotes }) => emotes);

  const newMessage = useMemo(() => {
    const replacements: any[] = [];
    const sanitized = sanitize(message, {
      allowedTags: [],
      allowedAttributes: {},
    });
    sanitized.split(" ").forEach((word) => {
      const found = emotes.find((emote) => emote.name === word);
      if (found) {
        replacements.push(
          ` <img src="${found.url}" style="display: flex; margin-left: 5px; margin-right: 5px; max-width: 60px; max-height: 24px;" /> `
        );
      } else {
        replacements.push(word);
      }
    });

    return replacements.join(" ");
  }, [message]);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: newMessage }}
      className="flex flex-wrap"
    ></span>
  );
};
