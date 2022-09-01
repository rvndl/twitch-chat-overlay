import { Changelog } from "../components/changelog";
import { Controls } from "../components/controls";
import { Footer } from "../components/footer";
import { MessageList } from "../components/message/message-list";

const Home = () => {
  return (
    <div className="flex w-screen h-screen gap-4 p-4 bg-gray-900">
      <div className="flex flex-col">
        <Controls />
        <div className="flex flex-col mt-auto gap-y-4">
          <Changelog />
          <Footer />
        </div>
      </div>
      <div className="w-full h-full mt-auto">
        <MessageList />
      </div>
    </div>
  );
};

export default Home;

