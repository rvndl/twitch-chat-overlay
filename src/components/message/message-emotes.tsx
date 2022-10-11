import { useContext, useMemo } from "react";
import sanitize from "sanitize-html";
import { EmotesContext } from "../../context/emotes";
import { getRandomCrayonColor } from "../../utils";

interface Props {
  message: string;
  donkMode?: boolean;
}

export const MessageWithEmotes = ({ message, donkMode = false }: Props) => {
  const emotes = useContext(EmotesContext);

  const messageWithEmotes = useMemo(() => {
    const replacements: string[] = [];
    const sanitized = sanitize(message, {
      allowedTags: [],
      allowedAttributes: {},
    });

    sanitized.split(" ").forEach((word) => {
      const found = emotes.find((emote) => emote.name === word);
      if (found) {
        replacements.push(
          `<img src="${found.url}" style="display: flex; margin-left: 5px; margin-right: 5px; max-width: 60px; max-height: 24px;" />`
        );
      } else {
        if (donkMode) {
          replacements.push(
            `<span style="color: ${getRandomCrayonColor()}
            }; margin-left: 3px; margin-right: 3px;">${word}</span>`
          );
          return;
        }

        replacements.push(word);
      }
    });

    return replacements.join(" ");
  }, [message, donkMode, emotes]);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: messageWithEmotes }}
      className="inline-flex flex-wrap"
    ></span>
  );
};
