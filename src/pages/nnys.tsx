import { AnimatePresence } from "framer-motion";
import { BadgesContext } from "../context/badges";
import { EmotesContext } from "../context/emotes";
import { MessageItem } from "../components/message/message";
import { useEffect, useRef } from "react";
import { useTmi } from "../hooks/use-tmi";
import { useEmotes } from "../hooks/use-emotes";
import { useBadges } from "../hooks/use-badges";

const NNYS = () => {
  const { messages, connect } = useTmi();
  const { emotes, fetch: fetchEmotes } = useEmotes();
  const { badges, fetch: fetchBadges } = useBadges();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.document.body.classList.add("overflow-hidden");

    fetchEmotes("xqc");
    fetchBadges("xqc");
    connect("xqc");
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="w-screen h-screen px-[20rem] py-[10vh]"
      style={{
        background: "url(/nnys-bg.png) no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-20 flex items-center justify-center w-full h-full p-12 ">
        <img src="/nnys-frame.svg" alt="" className="absolute" />
        <div className="z-10 w-full h-full overflow-hidden aspect-video">
          <BadgesContext.Provider value={badges}>
            <EmotesContext.Provider value={emotes}>
              <div className="overflow-hidden" ref={containerRef}>
                <AnimatePresence presenceAffectsLayout>
                  {messages.map((message) => (
                    <MessageItem
                      message={message}
                      animate
                      showNames
                      style="nnys"
                      key={message.user.id + message.message}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </EmotesContext.Provider>
          </BadgesContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default NNYS;
