import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { Message } from "../../interfaces/message";
import { Settings } from "../../interfaces/settings";
import { MessageItem } from "./message";

interface Props {
  messages: Message[];
  settings: Settings;
}

export const MessageList = ({ messages, settings }: Props) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 border border-gray-700 rounded-md">
      <h2 className="p-4 text-xl font-semibold">Chat preview</h2>
      <AnimatePresence>
        <div className="overflow-y-auto overflow-x-hidden h-[95%] mt-auto p-2 justify-end flex flex-col">
          {messages.map((message) => (
            <MessageItem
              message={message}
              animate={settings.animate}
              showNames={settings.showNames}
              showIcon={settings.showIcon}
              margin={settings.margin}
              style={settings.style}
              fontSize={settings.fontSize}
              key={message.user.id + message.message}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};
