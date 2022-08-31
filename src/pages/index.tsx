import { Controls } from "../components/controls";
import { MessageList } from "../components/message-list";

const Home = () => {
  return (
    <div className="h-screen w-screen flex gap-4 p-4 bg-gray-900">
      <div className="flex flex-col">
        <Controls />
        <div className="mt-auto bg-gray-800 rounded-md p-2 border border-gray-700 text-sm font-medium text-gray-300">
          by Jozefbrzeczyszczykiewicz
        </div>
      </div>
      <div className="h-full mt-auto w-full">
        <MessageList />
      </div>
    </div>
  );
};

export default Home;

