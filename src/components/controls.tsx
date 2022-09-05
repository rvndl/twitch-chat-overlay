import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Settings } from "../interfaces/settings";

interface Props {
  onConnect: (channelName: string) => void;
  onSettingsChange: (settings: Settings) => void;
}

export const Controls = ({ onConnect, onSettingsChange }: Props) => {
  const [channel, setChannel] = useState("");
  const [settings, setSettings] = useState<Settings>({
    animate: true,
    showNames: false,
    style: "default",
  });

  useEffect(() => {
    onSettingsChange(settings);
  }, [settings]);

  const handleOnPopout = () => {
    if (!channel) {
      toast.error("Please enter a channel name");
      return;
    }

    let popoutUrl = `${window.location.href}popout/${channel}/${
      settings.style
    }/${settings.showNames ? 1 : 0}/${settings.animate ? 1 : 0}`;

    navigator.clipboard.writeText(popoutUrl);

    toast.success(
      "Overlay link copied to clipboard, you can now paste it in your browser source.",
      { duration: 4000 }
    );
  };

  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded-md w-min">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="mt-4">
        <div className="flex flex-col w-72">
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
            onChange={(e) => setChannel(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="submit"
              className="mt-2 text-white  focus:ring- focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onClick={() => onConnect(channel)}
            >
              Connect
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
      <hr className="my-4 border-t border-gray-600" />
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
            onChange={(e) => {
              setSettings((s) => ({ ...s, style: e.target.value as any }));
            }}
          >
            <option value="default">Default</option>
            <option value="donk">Donk</option>
            <option value="donkExtra">Extra donk</option>
            <option value="nymn">NymN</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="animate-checkbox"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2"
            checked={settings.animate}
            onChange={() => {
              setSettings((s) => ({ ...s, animate: !s.animate }));
            }}
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
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2"
            checked={settings.showNames}
            onChange={() => {
              setSettings((s) => ({ ...s, showNames: !s.showNames }));
            }}
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
