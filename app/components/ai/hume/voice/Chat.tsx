"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { useVoice } from "@humeai/voice-react";

export default function ClientComponent({
  accessToken: initialToken,
}: {
  accessToken: string;
}) {
  const [accessToken, setAccessToken] = useState(initialToken);
  const [viewMode, setViewMode] = useState<'live' | 'history'>('live');
  const [resumeChatId, setResumeChatId] = useState<string | null>(null);
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  // Fetch fresh token on mount to avoid cached tokens
  useEffect(() => {
    const fetchFreshToken = async () => {
      try {
        const response = await fetch('/api/hume-token');
        if (response.ok) {
          const { accessToken: freshToken } = await response.json();
          if (freshToken) {
            console.log('Fresh token fetched, length:', freshToken.length);
            setAccessToken(freshToken);
          }
        }
      } catch (error) {
        console.error('Failed to fetch fresh token:', error);
      }
    };

    fetchFreshToken();
  }, []);

  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
    >
      <VoiceProvider
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
        onError={(error) => {
          toast.error(error.message);
        }}
      >
        <VoiceWrapper 
          ref={ref} 
          accessToken={accessToken} 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          configId={configId}
          resumeChatId={resumeChatId}
          setResumeChatId={setResumeChatId}
        />
      </VoiceProvider>
    </div>
  );
}

function VoiceWrapper({ 
  ref, 
  accessToken, 
  viewMode, 
  setViewMode,
  configId,
  resumeChatId,
  setResumeChatId
}: { 
  ref: React.RefObject<ComponentRef<typeof Messages>>;
  accessToken: string;
  viewMode: 'live' | 'history';
  setViewMode: (mode: 'live' | 'history') => void;
  configId?: string;
  resumeChatId: string | null;
  setResumeChatId: (id: string | null) => void;
}) {
  const { status, connect } = useVoice();
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [isResuming, setIsResuming] = useState(false);
  const [hasResumedMessages, setHasResumedMessages] = useState(false);
  const prevStatus = useRef(status.value);

  // Track when chat ends to trigger history refetch
  useEffect(() => {
    if (prevStatus.current === "connected" && status.value === "disconnected") {
      console.log("Chat ended, triggering history refetch");
      setRefetchTrigger(prev => prev + 1);
      setHasResumedMessages(false);
    }
    prevStatus.current = status.value;
  }, [status.value]);

  // Auto-connect when resuming a chat
  useEffect(() => {
    if (resumeChatId && status.value !== "connected") {
      console.log("Auto-resuming chat with chat_group_id:", resumeChatId);
      setIsResuming(true);
      connect({
        auth: { type: "accessToken", value: accessToken },
        ...(configId && { configId }),
        resumedChatGroupId: resumeChatId
      })
        .then(() => {
          console.log("Resumed chat successfully with chat_group_id:", resumeChatId);
          setResumeChatId(null);
          setIsResuming(false);
        })
        .catch((error) => {
          console.error("Failed to resume chat:", error);
          setResumeChatId(null);
          setIsResuming(false);
        });
    }
  }, [resumeChatId, status.value, connect, accessToken, configId, setResumeChatId]);

  return (
    <>
      <Messages 
        ref={ref} 
        accessToken={accessToken} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        refetchTrigger={refetchTrigger}
        onResumeChat={setResumeChatId}
        onResumedMessagesChange={setHasResumedMessages}
      />
      <Controls />
      {viewMode === 'live' && !resumeChatId && !isResuming && !hasResumedMessages && status.value !== "connected" && <StartCall configId={configId} accessToken={accessToken} resumedChatId={resumeChatId} onChatStarted={() => setResumeChatId(null)} />}
    </>
  );
}