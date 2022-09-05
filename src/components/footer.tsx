import { Github } from "./icons";

export const Footer = () => (
  <div className="flex justify-center p-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-md">
    <a
      href="https://github.com/rvndl/chat-overlay"
      target="_blank"
      rel="noreferrer"
      className="flex items-center"
    >
      Checkout at GitHub
      <span className="block w-5 h-5 ml-2">
        <Github />
      </span>
    </a>
  </div>
);
