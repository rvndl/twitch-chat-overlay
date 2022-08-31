import { Controls } from "../components/controls";
import { MessageList } from "../components/message-list";

const Home = () => {
  return (
    <div className="h-screen w-screen flex gap-4 p-4 bg-gray-900">
      <div className="flex flex-col">
        <Controls />
        <div className=" flex flex-col gap-y-4 mt-auto">
          <div className="p-2 bg-gray-800 rounded-md border border-gray-700 text-sm font-medium text-white">
            <h2 className="text-lg">Changelog</h2>
            <ul className="list-disc list-inside text-gray-300 mt-2 text-xs">
              <li className="flex items-center">
                <strong>31/08/22</strong> - Initial release{" "}
                <img
                  className="w-10"
                  src="https://cdn.7tv.app/emote/61e85cd5699aab943eab76cc/1x"
                  alt="forsenLevel"
                />
              </li>
            </ul>
          </div>
          <div className="p-2 bg-gray-800 rounded-md border border-gray-700 text-sm font-medium text-gray-300">
            by JozefBrzeczyszczykiewicz
          </div>
        </div>
      </div>
      <div className="h-full mt-auto w-full">
        <MessageList />
      </div>
    </div>
  );
};

export default Home;

