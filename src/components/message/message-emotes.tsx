import { useMemo } from "react";
import sanitize from "sanitize-html";
import { useEmotesStore } from "../../store/emotes";
import { getRandomCrayonColor } from "../../utils";

interface Props {
  message: string;
  donkMode?: boolean;
}

export const MessageWithEmotes = ({ message, donkMode = false }: Props) => {
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
  }, [message]);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: newMessage }}
      className="flex flex-wrap"
    ></span>
  );
};
