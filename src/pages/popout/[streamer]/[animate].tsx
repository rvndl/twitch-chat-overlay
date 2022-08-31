import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Client } from "tmi.js";
import { MessageItem } from "../../../components/message-item";
import { useChannelBadgesStore } from "../../../store/channel-badges";
import { useGlobalBadgesStore } from "../../../store/global-badges";
import { useMessagesStore } from "../../../store/messages";

const Popout = () => {
  const { messages, add: addMessage } = useMessagesStore((state) => state);
  const { badges: globalBadges, fetch: fetchGlobalBadges } =
    useGlobalBadgesStore((state) => state);
  const { badges: channelBadges, fetch: fetchChannelBadges } =
    useChannelBadgesStore((state) => state);
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const streamer = router.query.streamer as string;
  const animate = router.query.animate as string;

  useEffect(() => {
    if (!streamer) return;

    fetchGlobalBadges();
    fetchChannelBadges(streamer);

    const client = new Client({
      channels: [streamer],
    });

    client.disconnect();
    client.connect();

    client.on("message", (_, user, message) => addMessage({ user, message }));

    return () => {
      client.disconnect();
    };
  }, [streamer]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.lastElementChild?.scrollIntoView({
        behavior: animate === "1" ? "smooth" : "auto",
      });
    }
  }, [messages, animate]);

  return (
    <AnimatePresence>
      <div className="overflow-hidden" ref={containerRef}>
        {messages.map((message) => (
          <MessageItem
            globalBadges={globalBadges}
            channelBadges={channelBadges}
            message={message}
            animate={animate === "1"}
            key={message.user.id + message.message}
          />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default Popout;
