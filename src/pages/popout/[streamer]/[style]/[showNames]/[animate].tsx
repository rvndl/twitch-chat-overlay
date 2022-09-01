import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Client } from "tmi.js";
import { MessageItem } from "../../../../../components/message/message-item";
import { useChannelBadgesStore } from "../../../../../store/channel-badges";
import { useEmotesStore } from "../../../../../store/emotes";
import { useGlobalBadgesStore } from "../../../../../store/global-badges";
import { useMessagesStore } from "../../../../../store/messages";
import { Styles } from "../../../../../store/settings";

const Popout = () => {
  const { messages, add: addMessage } = useMessagesStore((state) => state);
  const { badges: globalBadges, fetch: fetchGlobalBadges } =
    useGlobalBadgesStore((state) => state);
  const { badges: channelBadges, fetch: fetchChannelBadges } =
    useChannelBadgesStore((state) => state);
  const fetchEmotes = useEmotesStore(({ fetch }) => fetch);
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const streamer = router.query.streamer as string;
  const animate = router.query.animate as string;
  const style = router.query.style as Styles;
  const showNames = router.query.showNames as string;

  useEffect(() => {
    if (!streamer) return;

    fetchGlobalBadges();
    fetchChannelBadges(streamer);
    fetchEmotes(streamer);

    const client = new Client({
      channels: [streamer],
    });

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
            showNames={showNames === "1"}
            style={style}
            key={message.user.id + message.message}
          />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default Popout;
