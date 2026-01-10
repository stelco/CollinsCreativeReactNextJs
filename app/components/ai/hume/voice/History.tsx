"use client";

import { VoiceProvider } from "@humeai/voice-react";
import { fetchAllChatEvents, getTopEmotions, generateTranscript } from "@/app/lib/history";
import { useRef, useEffect, useState } from "react";

type ReturnChatEvent = {
  id: string;
  chatId: string;
  timestamp: number;
  role: string;
  type: string;
  messageText?: string;
  emotionFeatures?: string;
  metadata?: string;
};

export default function ClientComponent({
  accessToken,
  historyHeight
}: {
  accessToken: string;
  historyHeight: string;
}) {
  const timeout = useRef<number | null>(null);
  const [emotions, setEmotions] = useState<Partial<ReturnChatEvent>[]>([]);
  const [allChatEvents, setAllChatEvents] = useState<ReturnChatEvent[]>([]);
  const [transcript, setTranscript] = useState<string[]>([]);

  // use NEXT_PUBLIC_ for client side pages
  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;
  const chatId = process.env.NEXT_PUBLIC_HUME_CHAT_ID;

  useEffect(() => {
    if (!chatId) {
      console.error("NEXT_PUBLIC_HUME_CHAT_ID is not defined");
      return;
    }

    const fetchEvents = async () => {
      console.log("Fetching chat events for chatId:", chatId);

      const chatEvents = await fetchAllChatEvents(chatId);
      const topEmotions = getTopEmotions(chatEvents);
      const generatedTranscript = generateTranscript(chatEvents).split("\n");

      const formattedEmotions: Partial<ReturnChatEvent>[] = Object.entries(topEmotions).map(([emotion, score]) => ({
        id: `${emotion}-${score}`,
        chatId: chatId || "",
        timestamp: Date.now(),
        role: "emotion",
        type: "emotion",
        messageText: `${emotion} - ${score}`,
        emotionFeatures: "",
        metadata: ""
      }));
      console.log("Top 3 Emotions---------", formattedEmotions);

      setEmotions(formattedEmotions);
      setAllChatEvents(chatEvents);
      setTranscript(generatedTranscript);
    };

    fetchEvents();
  }, [chatId]);

  return (
    <div style={{ maxHeight: "calc(100vh - 11.2rem)", display: "flex", justifyContent: "center" }}
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
      >

        <div
        className="flex flex-col max-w-[500px] p-4 mt-4 justify-end
         bg-gray-100 rounded-xl shadow-sm bg-grey-100 text-slate-500 dark:bg-gray-600 dark:text-slate-100"
        style={{ height: historyHeight }}>
        <div className="overflow-auto h-full">

            {/* all chat events */}
            <div className="flex flex-col mt-2 mb-2 pb-2 border-b-2 border-gray-200 dark:border-gray-500">
            <div className="text-[20px] text-orange-400 dark:text-orange-300 mt-2">All Chat Events</div>
            {allChatEvents
              .filter(message => message.role === "USER" || message.role === "AGENT")
              .map((message, index) => (
                <div key={index} className="text-sm mt-[3px] mb-[3px]">
                <span className={ message.role == "AGENT" ? 'text-orange-400' : 'text-orange-500'}>{message.role}:</span> {message.messageText}
                </div>
            ))}
            </div>

            {/* transcript */}
            <div className="flex flex-col mt-2 mb-2 pb-2 border-b-2 border-gray-200 dark:border-gray-500">
            <div className="text-[20px] text-orange-400 dark:text-orange-300 mt-2">Transcript</div>
            {transcript.map((line, index) => (
                <div key={index} className="text-sm">
                {line}
                </div>
            ))}
            </div>

            {/* top 3 emotions */}
            <div className="flex flex-col mt-2 mb-2 pb-2 border-b-2 border-gray-200 dark:border-gray-500">
            <div className="text-[20px] text-orange-400 dark:text-orange-300">Top 3 Emotions</div>
            {emotions.map((emotion, index) => (
                <div key={index} className="text-sm">
                    {emotion.messageText}%
                </div>
            ))}
            </div>

        </div>
        </div>

      </VoiceProvider>
    </div>
  );
}
