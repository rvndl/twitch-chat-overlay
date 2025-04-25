import { useEffect, useState } from "react";
import { Client } from "tmi.js";
import { Message } from "../interfaces/message";
import { isASCIIArt } from "../utils";

interface TmiOptions {
  historySize: number;
}

export const useTmi = (
  { historySize }: TmiOptions = { historySize: 1_000 }
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>();
  const [resub, setResub] = useState<string>();
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
      if (isASCIIArt(message)) {
        return;
      }

      setMessage({ user, message });
      setMessages((messages) => [
        ...messages.slice(-historySize),
        { user, message },
      ]);
    });

    client.on("resub", (_, username) => setResub(username));

    return () => {
      client.disconnect();
    };
  }, [channel]);

  const connect = (channel: string) => {
    setMessages([]);
    setChannel(channel);
  };

  return { message, messages, connect, resub };
};
