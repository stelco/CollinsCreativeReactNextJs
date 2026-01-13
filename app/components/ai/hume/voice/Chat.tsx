"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState, useEffect } from "react";
import { toast } from "sonner";

export default function ClientComponent({
  accessToken: initialToken,
}: {
  accessToken: string;
}) {
  const [accessToken, setAccessToken] = useState(initialToken);
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
        <Messages ref={ref} />
        <Controls />
        <StartCall configId={configId} accessToken={accessToken} />
      </VoiceProvider>
    </div>
  );
}