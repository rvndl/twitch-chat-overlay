import { ChatUserstate } from "tmi.js";
import { Message } from "../../../interfaces/message";
import { lightenColor, shadeColor } from "../../../utils";
import { MessageWithEmotes } from "../message-emotes";

interface Props {
  message: Message;
}

const styles = {
  default: ["#cac9c9", "/nnys-silver.png"],
  sub: ["#d2b21f", "/nnys.png"],
  vip: ["#b370f0", "/nnys-vip.png"],
  mod: ["#34a1f5", "/nnys-mod.png"],
};

const getStyle = (user: ChatUserstate) => {
  if (user.mod) {
    return styles.mod;
  }
  if (user.badges?.vip === "1") {
    return styles.vip;
  }
  if (user.subscriber) {
    return styles.sub;
  }

  return styles.default;
};

export const NNYSStyle = ({ message: { user, message } }: Props) => {
  const styles = getStyle(user);

  return (
    <div className="flex mb-2 text-4xl">
      <p
        className="flex items-center ml-1 font-bold shrink-0"
        style={{
          color: styles[0],
        }}
      >
        <div className="w-16 h-16 mr-1 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl">
            <img src={styles[1]} className="w-full h-full" />
          </div>
        </div>
        {user["display-name"]}:
      </p>
      <p className="flex flex-wrap ml-1">
        <MessageWithEmotes message={message} isCustom />
      </p>
    </div>
  );
};
