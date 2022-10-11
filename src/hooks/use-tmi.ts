import { useEffect, useState } from "react";
import { Client } from "tmi.js";
import { Message } from "../interfaces/message";

interface TmiOptions {
  historySize: number;
}

export const useTmi = ({ historySize }: TmiOptions = { historySize: 50 }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>();
  const [channel, setChannel] = useState<string | null>(null);

  useEffect(() => {
    if (!channel) return;

    const client = new Client({
      channels: [channel],
    });

    if (client.getChannels().length > 0) {
      client.disconnect();
    }

    client.connect();

    client.on("message", (_, user, message) => {
      setMessage({ user, message });
      setMessages((messages) => [
        ...messages.slice(-historySize),
        { user, message },
      ]);
    });

    return () => {
      client.disconnect();
    };
  }, [channel]);

  const connect = (channel: string) => {
    setMessages([]);
    setChannel(channel);
  };

  return { message, messages, connect };
};
