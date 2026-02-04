"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import History from "./History";
import { AnimatePresence, motion } from "motion/react";
import { ComponentRef, forwardRef, useState, useEffect } from "react";

type HistoricalMessage = {
  role: string;
  content: string;
  timestamp: number;
  emotionFeatures?: any;
};

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  { 
    accessToken?: string; 
    viewMode: 'live' | 'history'; 
    setViewMode: (mode: 'live' | 'history') => void; 
    refetchTrigger?: number;
    onResumeChat?: (chatGroupId: string) => void;
    onResumedMessagesChange?: (hasMessages: boolean) => void;
  }
>(function Messages({ accessToken = "", viewMode, setViewMode, refetchTrigger = 0, onResumeChat, onResumedMessagesChange }, ref) {
  const { messages } = useVoice();
  const [historicalMessages, setHistoricalMessages] = useState<HistoricalMessage[]>([]);
  const [currentHistoricalChatId, setCurrentHistoricalChatId] = useState<string | null>(null);
  const [currentChatGroupId, setCurrentChatGroupId] = useState<string | null>(null);
  const [resumedMessages, setResumedMessages] = useState<HistoricalMessage[]>([]);

  // Clear resumed messages when chat ends (refetchTrigger changes)
  useEffect(() => {
    if (refetchTrigger > 0 && resumedMessages.length > 0) {
      console.log("Clearing resumed messages after chat end");
      setResumedMessages([]);
      if (onResumedMessagesChange) onResumedMessagesChange(false);
    }
  }, [refetchTrigger, resumedMessages.length, onResumedMessagesChange]);

  const handleLoadHistoricalChat = (chatMessages: HistoricalMessage[], chatId: string, chatGroupId: string) => {
    console.log("handleLoadHistoricalChat received chatId:", chatId, "chatGroupId:", chatGroupId);
    setHistoricalMessages(chatMessages);
    setCurrentHistoricalChatId(chatId);
    setCurrentChatGroupId(chatGroupId);
    setViewMode('history');
  };

  const handleBackToLive = () => {
    setViewMode('live');
    setHistoricalMessages([]);
    setCurrentHistoricalChatId(null);
    setCurrentChatGroupId(null);
    setResumedMessages([]);
    if (onResumedMessagesChange) onResumedMessagesChange(false);
  };

  const handleResume = () => {
    console.log("handleResume called with chatGroupId:", currentChatGroupId);
    if (currentChatGroupId && onResumeChat) {
      // Keep the historical messages for display when resuming
      setResumedMessages(historicalMessages);
      if (onResumedMessagesChange) onResumedMessagesChange(true);
      setViewMode('live');
      setHistoricalMessages([]);
      setCurrentHistoricalChatId(null);
      setCurrentChatGroupId(null);
      onResumeChat(currentChatGroupId);
    }
  };

  const displayMessages = viewMode === 'live' ? messages : [];

  return (
    <div className="flex gap-6 grow overflow-hidden p-4 mb-[170px] md:mb-[20px] ml-[-15px]">

      {/* Left Column - Messages */}
      <div className="flex-1 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl shadow-sm p-2 backdrop-blur-sm">
        <div className="h-full overflow-hidden bg-gray-50/30 dark:bg-gray-700/30 rounded-lg">
          <motion.div
            layoutScroll
            className="h-full overflow-auto p-3 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-orange-500"
            ref={ref}
          >
        {viewMode === 'history' && (
          <div className="mb-4 p-3 bg-orange-100 dark:bg-orange-950 rounded flex justify-between items-center">
            <span className="text-sm font-medium">Viewing Historical Chat</span>
            <div className="flex gap-2">
              <button
                onClick={handleResume}
                className="text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Resume Chat
              </button>
              <button
                onClick={handleBackToLive}
                className="text-xs px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
              >
                Back to Live
              </button>
            </div>
          </div>
        )}
        <motion.div className="flex flex-col gap-4 pb-24">
          {viewMode === 'live' ? (
            <AnimatePresence mode={"popLayout"}>
              {/* Show resumed historical messages first if they exist */}
              {resumedMessages.map((msg, index) => (
                <div
                  key={`resumed-${index}`}
                  className={cn(
                    "w-[60%]",
                    "bg-card",
                    "border border-border rounded bg-orange-100 text-slate-800",
                    msg.role === "USER" ? "ml-auto" : ""
                  )}
                >
                  <div className={"flex items-center justify-between pt-4 px-3"}>
                    <div
                      className={cn(
                        "text-xs capitalize font-medium leading-none opacity-50 tracking-tight"
                      )}
                    >
                      {msg.role.toLowerCase()}
                    </div>
                    <div
                      className={cn(
                        "text-xs capitalize font-medium leading-none opacity-50 tracking-tight"
                      )}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                        second: undefined,
                      })}
                    </div>
                  </div>
                  <div className={"pb-3 px-3"}>{msg.content}</div>
                  {msg.emotionFeatures && (
                    <Expressions values={msg.emotionFeatures} />
                  )}
                </div>
              ))}
              {/* Then show new live messages */}
              {displayMessages.map((msg, index) => {
              if (
                msg.type === "user_message" ||
                msg.type === "assistant_message"
              ) {
                return (
                  <motion.div
                    key={msg.type + index}
                    className={cn(
                      "w-[60%]",
                      "bg-card",
                      "border border-border rounded bg-orange-100 text-slate-800",
                      msg.type === "user_message" ? "ml-auto" : ""
                    )}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 0,
                    }}
                  >
                    <div className={"flex items-center justify-between pt-4 px-3"}>
                      <div
                        className={cn(
                          "text-xs capitalize font-medium leading-none opacity-50 tracking-tight"
                        )}
                      >
                        {msg.message.role}
                      </div>
                      <div
                        className={cn(
                          "text-xs capitalize font-medium leading-none opacity-50 tracking-tight"
                        )}
                      >
                        {msg.receivedAt.toLocaleTimeString(undefined, {
                          hour: "numeric",
                          minute: "2-digit",
                          second: undefined,
                        })}
                      </div>
                    </div>
                    <div className={"pb-3 px-3"}>{msg.message.content}</div>
                    <Expressions values={{ ...msg.models.prosody?.scores }} />
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
          ) : (
            /* Historical Messages */
            historicalMessages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "w-[60%]",
                  "bg-card",
                  "border border-border rounded bg-orange-100 text-slate-800",
                  msg.role === "USER" ? "ml-auto" : ""
                )}
              >
                <div className={"flex items-center justify-between pt-4 px-3"}>
                  <div
                    className={cn(
                      "text-xs capitalize font-medium leading-none opacity-50 tracking-tight"
                    )}
                  >
                    {msg.role.toLowerCase()}
                  </div>
                  <div
                    className={cn(
                      "text-xs capitalize font-medium leading-none opacity-50 tracking-tight"
                    )}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "2-digit",
                      second: undefined,
                    })}
                  </div>
                </div>
                <div className={"pb-3 px-3"}>{msg.content}</div>
                {msg.emotionFeatures && (
                  <Expressions values={msg.emotionFeatures} />
                )}
              </div>
            ))
          )}
        </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Column - History */}
      <div className="hidden lg:block w-80 flex-shrink-0 overflow-auto pl-3 relative z-50 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700 hover:scrollbar-thumb-orange-500 mr-[-15px]">
        <History 
          accessToken={accessToken} 
          historyHeight="100%" 
          onLoadChat={handleLoadHistoricalChat}
          refetchTrigger={refetchTrigger}
        />
      </div>

    </div>
  );
});

export default Messages;
