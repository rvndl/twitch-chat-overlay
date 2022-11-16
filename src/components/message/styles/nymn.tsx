import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Message } from "../../../interfaces/message";
import { lightenColor, shadeColor } from "../../../utils";
import { MessageWithEmotes } from "../message-emotes";

const vanishCommands = ["!vanish", "!vent", "vanish0"];

interface Props {
  message: Message;
  showNames: boolean;
}

export const NymNStyle = ({ message: { user, message }, showNames }: Props) => {
  const [played, setPlayed] = useState(false);
  const userColor = lightenColor(user.color);
  const shadedColor = shadeColor(userColor, 30);

  const vanish = vanishCommands.some((command) => message.includes(command));
  const image = useMemo(() => {
    if (user.mod) {
      return "/grinch-christmas.png";
    }

    if (user.badges?.vip) {
      return "/vip-christmas.png";
    }

    return "/nymn-christmas.png";
  }, [user]);

  const snowball = message.startsWith("!snowball");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (snowball) {
      timeout = setTimeout(() => setPlayed(true), 1700);
    }

    return () => clearTimeout(timeout);
  }, [snowball]);

  return (
    <div className="flex mb-2">
      <div
        className="relative w-8 h-8 shrink-0"
        style={{
          background: `linear-gradient(0deg, ${shadedColor} 0%, ${userColor} 100%)`,
        }}
      >
        <AnimatePresence>
          {snowball && !played && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                initial={{ rotate: -200 }}
                animate={{ rotate: [-200, -200, 0] }}
                transition={{ delay: 0.7 }}
                src="/glove.png"
                className="absolute z-10 -top-1 -right-3"
                alt=""
              />
              <motion.img
                initial={{ right: 0 }}
                animate={{ right: "-100vw", opacity: 0.5 }}
                transition={{ delay: 1.2, duration: 1.4 }}
                src="/snowball.png"
                className="absolute right-0 w-5 -top-1 animate-spin"
                alt=""
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.img
          animate={
            vanish && {
              x: "100vw",
              opacity: 0,
              rotate: [0, -10, 10, -10, 10, -10, 10, -10, 10, -10, 10, -10],
            }
          }
          transition={{ delay: 1, duration: 2 }}
          src={image}
          className="w-8 h-8 shrink-0"
        />
      </div>
      {showNames && (
        <p className="flex ml-1 shrink-0" style={{ color: userColor }}>
          {user["display-name"]}:
        </p>
      )}
      <p className="flex flex-wrap ml-1">
        <MessageWithEmotes message={message} />
      </p>
    </div>
  );
};
