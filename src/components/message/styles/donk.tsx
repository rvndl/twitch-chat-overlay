import { Message } from "../../../interfaces/message";
import { lightenColor } from "../../../utils";
import { Donk } from "../../icons";
import { MessageWithEmotes } from "../message-emotes";

interface Props {
  message: Message;
  showNames: boolean;
}

export const DonkStyle = ({ message: { user, message }, showNames }: Props) => {
  const userColor = lightenColor(user.color);

  return (
    <div className="flex mb-2">
      <div className="shrink-0" style={{ color: userColor }}>
        <Donk />
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
