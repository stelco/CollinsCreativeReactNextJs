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

type Chat = {
  id: string;
  chat_group_id: string;
  start_timestamp: number;
  end_timestamp?: number;
  status: string;
  event_count: number;
  metadata?: string;
};

type ChatsResponse = {
  chats_page: Chat[];
  page_number: number;
  page_size: number;
  pagination_direction: string;
  total_pages: number;
};

type HistoricalMessage = {
  role: string;
  content: string;
  timestamp: number;
  emotionFeatures?: any;
};

export default function ClientComponent({
  accessToken,
  historyHeight,
  onLoadChat,
  refetchTrigger = 0
}: {
  accessToken: string;
  historyHeight: string;
  onLoadChat?: (messages: HistoricalMessage[], chatId: string, chatGroupId: string) => void;
  refetchTrigger?: number;
}) {
  const timeout = useRef<number | null>(null);
  const [emotions, setEmotions] = useState<Partial<ReturnChatEvent>[]>([]);
  const [allChatEvents, setAllChatEvents] = useState<ReturnChatEvent[]>([]);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingChats, setIsLoadingChats] = useState(false);

  // use NEXT_PUBLIC_ for client side pages
  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;
  const chatId = process.env.NEXT_PUBLIC_HUME_CHAT_ID;

  // Fetch paginated list of chats
  useEffect(() => {
    const fetchChats = async () => {
      if (!accessToken) return;
      
      setIsLoadingChats(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_HUME_API_KEY;
        console.log("Using API key:", apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING");
        
        const response = await fetch(
          `https://api.hume.ai/v0/evi/chats?page_number=${pageNumber}&page_size=8&ascending_order=false`,
          {
            headers: {
              "X-Hume-Api-Key": apiKey || "",
            },
          }
        );

        if (response.ok) {
          const data: ChatsResponse = await response.json();
          setChats(data.chats_page);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoadingChats(false);
      }
    };

    fetchChats();
  }, [pageNumber, accessToken, refetchTrigger]);

  // Clear selected chat when refetchTrigger changes (chat ended)
  useEffect(() => {
    if (refetchTrigger > 0) {
      setSelectedChatId(null);
      setEmotions([]);
      setTranscript([]);
      setAllChatEvents([]);
    }
  }, [refetchTrigger]);

  // Fetch chat events for selected chat
  useEffect(() => {
    if (!selectedChatId && !chatId) {
      return;
    }

    const activeChatId = selectedChatId || chatId;
    if (!activeChatId) return;

    const fetchEvents = async () => {
      console.log("Fetching chat events for chatId:", activeChatId);

      const chatEvents = await fetchAllChatEvents(activeChatId);
      const topEmotions = getTopEmotions(chatEvents);
      const generatedTranscript = generateTranscript(chatEvents).split("\n");

      const formattedEmotions: Partial<ReturnChatEvent>[] = Object.entries(topEmotions).map(([emotion, score]) => ({
        id: `${emotion}-${score}`,
        chatId: activeChatId || "",
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

      // Prepare messages for Messages component if callback provided
      if (onLoadChat && selectedChatId) {
        const historicalMessages: HistoricalMessage[] = chatEvents
          .filter(event => event.type === "USER_MESSAGE" || event.type === "AGENT_MESSAGE")
          .map(event => ({
            role: event.role,
            content: event.messageText || "",
            timestamp: event.timestamp,
            emotionFeatures: event.emotionFeatures ? JSON.parse(event.emotionFeatures) : undefined
          }));
        const selectedChat = chats.find(c => c.id === selectedChatId);
        const chatGroupId = selectedChat?.chat_group_id || activeChatId;
        console.log("Calling onLoadChat with chatId:", activeChatId, "chatGroupId:", chatGroupId);
        onLoadChat(historicalMessages, activeChatId, chatGroupId);
      }
    };

    fetchEvents();
  }, [selectedChatId, chatId]);

  return (
    <div className="h-full bg-gray-50/50 dark:bg-gray-700/50 rounded-xl shadow-sm p-2 backdrop-blur-sm">
      <VoiceProvider>
        <div
          className="flex flex-col h-full overflow-hidden bg-gray-50/30 dark:bg-gray-700/30 rounded-lg"
        >
          <div className="overflow-auto h-full p-4 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-orange-500">
            {/* Chats List */}
            <div className="flex flex-col mb-2 pb-2 border-b-2 border-gray-200 dark:border-gray-500">
              <div className="text-[20px] text-orange-400 dark:text-orange-300 mb-3">Chat History</div>
              {isLoadingChats ? (
                <div className="text-sm">Loading chats...</div>
              ) : (
                <>
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        console.log("Selecting chat with ID:", chat.id);
                        setSelectedChatId(chat.id);
                      }}
                      className={`text-sm p-2 mb-1 rounded cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-800 ${
                        selectedChatId === chat.id ? 'bg-orange-200 dark:bg-orange-950' : ''
                      }`}
                    >
                      <div className="font-medium">
                        {new Date(chat.start_timestamp).toLocaleString()}
                      </div>
                      <div className="text-xs opacity-70">
                        Status: {chat.status} | Events: {chat.event_count}
                      </div>
                    </div>
                  ))}
                  
                  {/* Pagination Controls */}
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
                      disabled={pageNumber === 0}
                      className="text-xs px-3 py-1 bg-orange-400 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-xs">
                      Page {pageNumber + 1} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPageNumber(Math.min(totalPages - 1, pageNumber + 1))}
                      disabled={pageNumber >= totalPages - 1}
                      className="text-xs px-3 py-1 bg-orange-400 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* all chat events */}
            <div className="flex flex-col mt-2 mb-2 pb-2 border-b-2 border-gray-200 dark:border-gray-500">
            <div className="text-[20px] text-orange-400 dark:text-orange-300 mt-2">
              {selectedChatId ? (
                <>
                  Selected Chat
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 mb-3">
                    {chats.find(c => c.id === selectedChatId)?.start_timestamp 
                      ? new Date(chats.find(c => c.id === selectedChatId)!.start_timestamp).toLocaleString()
                      : selectedChatId}
                  </div>
                </>
              ) : 'All Chat Events'}
            </div>
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
