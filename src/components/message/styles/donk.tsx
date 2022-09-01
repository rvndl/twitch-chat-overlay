import { Message } from "../../../store/messages";
import { Donk } from "../../donk";
import { MessageWithEmotes } from "../message-emotes";

interface Props {
  message: Message;
  showNames: boolean;
}

export const DonkStyle = ({ message: { user, message }, showNames }: Props) => (
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
