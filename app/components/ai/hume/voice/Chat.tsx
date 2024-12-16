"use client";

import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import History from "./History";
import { useRef } from "react";

type MessagesRef = {
  scrollHeight: number;
  scrollTo: (options: ScrollToOptions) => void;
};

export default function ClientComponent({
  accessToken,
  historyHeight
}: {
  accessToken: string;
  historyHeight: string;
}) {
  const timeout = useRef<number | null>(null);
  const messagesRef = useRef<MessagesRef | null>(null);

  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div
      className={
        "relative grow flex flex-col mx-auto w-full"
      }
      style={{ maxHeight: "calc(100vh - 11.2rem)" }}
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (messagesRef.current) {
              const scrollHeight = messagesRef.current.scrollHeight;

              messagesRef.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <VoiceContent messagesRef={messagesRef} accessToken={accessToken} historyHeight={historyHeight} />
      </VoiceProvider>
    </div>
  );
}

const VoiceContent = ({ messagesRef, accessToken, historyHeight }: { messagesRef: React.RefObject<MessagesRef>, accessToken: string, historyHeight: string; }) => {
  const { status } = useVoice();

  console.log("status-----------", status);

  switch (status.value) {
    case "disconnected":
      return (
        <div className="flex flex-col md:items-start md:justify-start gap-4 lg:flex-row">
          <StartCall accessToken={accessToken} />
          <History
            accessToken={accessToken}
            historyHeight={ "calc(100vh - 11.8rem)" }
          />
        </div>
      );
    case "connected":
      return (
        <>
        <div className="flex flex-col md:items-start md:justify-start gap-4 lg:flex-row">
          <Messages ref={messagesRef} />
          <History
            accessToken={accessToken}
            historyHeight={ "calc(100vh - 17.2rem)" }
          />
        </div>
        <Controls />
        </>
      );
    default:
      return <div>Connecting...</div>;
  }
};