import { motion } from "framer-motion";
import { Message } from "../../../interfaces/message";
import { lightenColor, shadeColor } from "../../../utils";
import { MessageWithEmotes } from "../message-emotes";

const vanishCommands = ["!vanish", "!vent", "vanish0"];

interface Props {
  message: Message;
  showNames: boolean;
}

export const NymNStyle = ({ message: { user, message }, showNames }: Props) => {
  const userColor = lightenColor(user.color);
  const shadedColor = shadeColor(userColor, 30);

  const vanish = vanishCommands.some((command) => message.includes(command));

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
            vanish && {
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