import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useChannelBadgesStore } from "../../store/channel-badges";
import { useGlobalBadgesStore } from "../../store/global-badges";
import { useMessagesStore } from "../../store/messages";
import { useSettingsStore } from "../../store/settings";

import { MessageItem } from "./message-item";

export const MessageList = () => {
  const messages = useMessagesStore(({ messages }) => messages);
  const globalBadges = useGlobalBadgesStore(({ badges }) => badges);
  const channelBadges = useChannelBadgesStore(({ badges }) => badges);
  const { animate, style, showNames } = useSettingsStore((state) => state);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full bg-gray-800 border border-gray-700 rounded-md">
      <h2 className="p-4 text-xl font-semibold">Chat preview</h2>
      <AnimatePresence>
        <div
          ref={containerRef}
          className="overflow-y-auto overflow-x-hidden h-[95%] mt-auto p-2 justify-end flex flex-col"
        >
          {messages.map((message) => (
            <MessageItem
              globalBadges={globalBadges}
              channelBadges={channelBadges}
              message={message}
              animate={animate}
              showNames={showNames}
              style={style}
              key={message.user.id + message.message}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};
