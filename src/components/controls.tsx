import { animate } from "framer-motion";
import { toNamespacedPath } from "path";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Client } from "tmi.js";
import { useChannelBadgesStore } from "../store/channel-badges";
import { useEmotesStore } from "../store/emotes";
import { useGlobalBadgesStore } from "../store/global-badges";
import { useMessagesStore } from "../store/messages";
import { Styles, useSettingsStore } from "../store/settings";

export const Controls = () => {
  const [channelName, setChannelName] = useState("");
  const [activeChannelName, setActiveChannelName] = useState("");
  const { add: addMessage, clear: clearMessages } = useMessagesStore(
    (store) => store
  );
  const fetchGlobalBadges = useGlobalBadgesStore(({ fetch }) => fetch);
  const fetchChannelBadges = useChannelBadgesStore(({ fetch }) => fetch);
  const fetchEmotes = useEmotesStore(({ fetch }) => fetch);
  const {
    animate,
    toggleAnimate,
    setStyle,
    style,
    showNames,
    toggleShowNames,
  } = useSettingsStore((state) => state);

  useEffect(() => {
    fetchGlobalBadges();
  }, []);

  useEffect(() => {
    clearMessages();
    fetchChannelBadges(activeChannelName);
    fetchEmotes(activeChannelName);

    const client = new Client({
      channels: [activeChannelName],
    });

    client.disconnect();
    client.connect();

    client.on("message", (_, user, message) => addMessage({ user, message }));

    return () => {
      client.disconnect();
    };
  }, [activeChannelName]);

  const handleOnConnect = () => {
    if (!channelName) return;

    setActiveChannelName(channelName);
  };

  const handleOnStyleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setStyle(e.target.value as Styles);

  const handleOnPopout = () => {
    if (!channelName) {
      toast.error("Please enter a channel name");
      return;
    }

    navigator.clipboard.writeText(
      `${window.location.href}popout/${channelName}/${style}/${
        showNames ? "1" : "0"
      }/${animate ? "1" : "0"}`
    );

    toast.success(
      "Overlay link copied to clipboard, you can now paste it in your browser source.",
      { duration: 4000 }
    );
  };

  return (
    <div className="p-4 border w-min bg-gray-800 rounded-md border-gray-700">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="mt-4">
        <div className="w-72 flex flex-col">
          <label
            htmlFor="channelId_input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Channel name
          </label>
          <input
            type="text"
            id="channelId_input"
            className=" border outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter channel name"
            onChange={(e) => setChannelName(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="submit"
              className="mt-2 text-white  focus:ring- focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onClick={handleOnConnect}
            >
              {activeChannelName ? "Connected" : "Connect"}
            </button>
            <button
              type="submit"
              className="mt-2 text-white  focus:ring- focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gray-800 hover:bg-gray-700 focus:ring-gray-800"
              onClick={handleOnPopout}
            >
              Copy URL
            </button>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-600 my-4" />
      <div className="flex flex-col gap-2">
        <div className="mb-2">
          <label
            htmlFor="styles"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Styles
          </label>
          <select
            id="styles"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleOnStyleChange}
          >
            <option value="default">Default</option>
            <option value="donk">Donk</option>
            <option value="nymn">NymN</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="animate-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            checked={animate}
            onChange={() => toggleAnimate()}
          />
          <label
            htmlFor="animate-checkbox"
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Animate new messages
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="show-names-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            checked={showNames}
            onChange={() => toggleShowNames()}
          />
          <label
            htmlFor="show-names-checkbox"
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Show usernames in custom styles
          </label>
        </div>
      </div>
    </div>
  );
};
