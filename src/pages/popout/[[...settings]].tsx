import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { MessageItem } from "../../components/message/message-item";
import { BadgesContext } from "../../context/badges";
import { EmotesContext } from "../../context/emotes";
import { useBadges } from "../../hooks/use-badges";
import { useEmotes } from "../../hooks/use-emotes";
import { useTmi } from "../../hooks/use-tmi";

const Popout = () => {
  const { messages, connect } = useTmi();
  const { emotes, fetch: fetchEmotes } = useEmotes();
  const { badges, fetch: fetchBadges } = useBadges();
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { settings } = router.query;

  const streamer = settings?.[0];
  const style = settings?.[1];
  const showNames = settings?.[2];
  const animate = settings?.[3];

  useEffect(() => {
    if (!streamer) return;

    fetchEmotes(streamer);
    fetchBadges(streamer);
    connect(streamer);
  }, [streamer]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.lastElementChild?.scrollIntoView({
        behavior: animate === "1" ? "smooth" : "auto",
      });
    }
  }, [messages, animate]);

  useEffect(() => {
    if (!streamer) return;
    const refresh = messages.find(
      (m) =>
        (m.user.mod === true || m.user.badges?.broadcaster === "1") &&
        m.message === "-refreshemotes"
    );
    if (refresh) fetchEmotes(streamer);
  }, [messages]);

  return (
    <BadgesContext.Provider value={badges}>
      <EmotesContext.Provider value={emotes}>
        <AnimatePresence>
          <div className="overflow-hidden" ref={containerRef}>
            {messages.map((message) => (
              <MessageItem
                message={message}
                animate={animate === "1"}
                showNames={showNames === "1"}
                style={style}
                key={message.user.id + message.message}
              />
            ))}
          </div>
        </AnimatePresence>
      </EmotesContext.Provider>
    </BadgesContext.Provider>
  );
};

export default Popout;