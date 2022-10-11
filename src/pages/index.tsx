import { useState } from "react";
import { Commands } from "../components/commands";
import { Controls } from "../components/controls";
import { Footer } from "../components/footer";
import { MessageList } from "../components/message/message-list";
import { BadgesContext } from "../context/badges";
import { EmotesContext } from "../context/emotes";
import { useBadges } from "../hooks/use-badges";
import { useEmotes } from "../hooks/use-emotes";
import { useTmi } from "../hooks/use-tmi";
import { Settings } from "../interfaces/settings";

const Home = () => {
  const [settings, setSettings] = useState<Settings>({
    animate: true,
    showNames: false,
    style: "default",
  });
  const { messages, connect } = useTmi();
  const { emotes, fetch: fetchEmotes } = useEmotes();
  const { badges, fetch: fetchBadges } = useBadges();

  const handleOnConnect = (channelName: string) => {
    fetchEmotes(channelName);
    fetchBadges(channelName);
    connect(channelName);
  };

  const handleOnSettingsChange = (settings: Settings) => setSettings(settings);

  return (
    <div className="flex flex-col-reverse w-screen h-screen gap-4 p-4 bg-gray-900 md:flex-row">
      <div className="flex flex-col">
        <Controls
          onConnect={handleOnConnect}
          onSettingsChange={handleOnSettingsChange}
        />
        <div className="flex flex-col mt-4 gap-y-4 md:mt-auto">
          <Commands />
          <Footer />
        </div>
      </div>
      <div className="w-full h-full mt-auto">
        <BadgesContext.Provider value={badges}>
          <EmotesContext.Provider value={emotes}>
            <MessageList messages={messages} settings={settings} />
          </EmotesContext.Provider>
        </BadgesContext.Provider>
      </div>
    </div>
  );
};

export default Home;

