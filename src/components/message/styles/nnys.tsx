import { Message } from "../../../interfaces/message";
import { lightenColor, shadeColor } from "../../../utils";
import { MessageWithEmotes } from "../message-emotes";

interface Props {
  message: Message;
}

export const NNYSStyle = ({ message: { user, message } }: Props) => {
  return (
    <div className="flex mb-2 text-4xl">
      <p
        className="flex items-center ml-1 font-bold shrink-0"
        style={{
          color: "#d2b21f",
        }}
      >
        <div
          className="w-16 h-16 mr-1 rounded-2xl"
          style={{
            // background:
            // "url(https://cdn.7tv.app/paint/01JEY00EDNVW20AWX2NPG4HTNF/layer/01JEY41GFMEX7R8YCVMDA8SSY6/1x.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl"
            style={{ backdropFilter: "blur(16px)" }}
          >
            <img src="/nnys.avif" className="w-full h-full" />
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
