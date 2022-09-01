import { Message } from "../../../store/messages";
import { MessageWithEmotes } from "../message-emotes";

interface Props {
  message: Message;
  badgesWithUrl: any[];
}

export const DefaultStyle = ({
  message: { user, message },
  badgesWithUrl,
}: Props) => {
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
