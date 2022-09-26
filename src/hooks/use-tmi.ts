import { useEffect, useState } from "react";
import { Client } from "tmi.js";
import { Message } from "../interfaces/message";

interface TmiOptions {
  historySize: number;
}

export const useTmi = ({ historySize }: TmiOptions = { historySize: 50 }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [channel, setChannel] = useState<string | null>(null);

  useEffect(() => {
    if (!channel) return;

    const client = new Client({
      channels: [channel],
    });

    console.log(client.readyState());

    client.connect();

    client.on("message", (_, user, message) =>
      setMessages((messages) => [
        ...messages.slice(-historySize),
        { user, message },
      ])
    );

    return () => {
      client.disconnect();
    };
  }, [channel]);

  const connect = (channel: string) => {
    setMessages([]);
    setChannel(channel);
  };

  return { messages, connect };
};
