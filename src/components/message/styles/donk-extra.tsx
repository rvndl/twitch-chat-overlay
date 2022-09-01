import { Message } from "../../../store/messages";
import { Donk } from "../../donk";
import { MessageWithEmotes } from "../message-emotes";

interface Props {
  message: Message;
  showNames: boolean;
}

export const DonkExtraStyle = ({
  message: { user, message },
  showNames,
}: Props) => {
  return (
    <div
      className="flex mb-2"
      style={{ fontFamily: "crayon", letterSpacing: "2px", fontSize: "16px" }}
    >
      <div className="shrink-0" style={{ color: user.color || "gray" }}>
        <Donk />
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
        <MessageWithEmotes message={message} donkMode />
      </p>
    </div>
  );
};
