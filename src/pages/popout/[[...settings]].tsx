import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { MessageItem } from "../../components/message/message";
import { BadgesContext } from "../../context/badges";
import { EmotesContext } from "../../context/emotes";
import { useBadges } from "../../hooks/use-badges";
import { useEmotes } from "../../hooks/use-emotes";
import { useTmi } from "../../hooks/use-tmi";
import { Style } from "../../interfaces/settings";
import { isModOrBroadcaster } from "../../utils";

function getPopoutSetting<T>(
  settings: string | string[] | undefined,
  index: number,
  defaultValue: T
): T {
  return settings?.[index] ? (settings[index] as unknown as T) : defaultValue;
}

const Popout = () => {
  const { message, messages, connect } = useTmi();
  const { emotes, fetch: fetchEmotes } = useEmotes();
  const { badges, fetch: fetchBadges } = useBadges();
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { settings } = router.query;

  const streamer = getPopoutSetting<string>(settings, 0, "");
  const style = getPopoutSetting<Style>(settings, 1, "default");
  const showNames = getPopoutSetting<string>(settings, 2, "0");
  const animate = getPopoutSetting<string>(settings, 3, "0");

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
    if (!message || !streamer) return;
    if (!isModOrBroadcaster(message.user)) return;

    if (message.message.includes("!refreshemotes")) {
      fetchEmotes(streamer);
    }
  }, [streamer, message]);

  return (
    <BadgesContext.Provider value={badges}>
      <EmotesContext.Provider value={emotes}>
        <div className="overflow-hidden" ref={containerRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <MessageItem
                message={message}
                animate={animate === "1"}
                showNames={showNames === "1"}
                style={style as Style}
                key={message.user.id + message.message}
              />
            ))}
          </AnimatePresence>
        </div>
      </EmotesContext.Provider>
    </BadgesContext.Provider>
  );
};

export default Popout;
