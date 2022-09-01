import { Controls } from "../components/controls";
import { MessageList } from "../components/message-list";

const Home = () => {
  return (
    <div className="flex w-screen h-screen gap-4 p-4 bg-gray-900">
      <div className="flex flex-col">
        <Controls />
        <div className="flex flex-col mt-auto gap-y-4">
          <div className="p-2 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-md">
            <h2 className="text-lg">Changelog</h2>
            <ul className="mt-2 text-xs text-gray-300 list-disc list-inside">
              <li className="flex items-center">
                <p>
                  <strong>01/09/22</strong> - Improved message shadow. <br />
                  Reduced max emote width. Added gradient to NymN style
                </p>
              </li>
              <li className="flex items-center">
                <p>
                  <strong>01/09/22</strong> - Added <code>!vanish</code> support
                  for NymN style
                </p>
              </li>
              <li className="flex items-center">
                <p>
                  <strong>01/09/22</strong> - Fixed 7TV bug
                </p>
                <img
                  className="h-4 ml-1"
                  src="https://cdn.7tv.app/emote/62fa9b8a589348b4bf5a0cb9/1x"
                  alt="yeahbut7tv"
                />
              </li>
              <li className="flex items-center">
                <p>
                  <strong>01/09/22</strong> - Added option to hide usernames
                </p>
              </li>
              <li className="flex items-center">
                <p>
                  <strong>31/08/22</strong> - Initial release
                </p>
                <img
                  className="w-10 ml-1"
                  src="https://cdn.7tv.app/emote/61e85cd5699aab943eab76cc/1x"
                  alt="forsenLevel"
                />
              </li>
            </ul>
          </div>
          <div className="p-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-md">
            by JozefBrzeczyszczykiewicz
          </div>
        </div>
      </div>
      <div className="w-full h-full mt-auto">
        <MessageList />
      </div>
    </div>
  );
};

export default Home;

