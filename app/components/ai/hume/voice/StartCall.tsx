import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonPortfolio } from '@/app/ui/button';
import { Phone } from "lucide-react";
import Image from 'next/image';

export default function StartCall({ accessToken }: { accessToken: string }) {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value != "connected" && (
        <div
          className={'background-animation flex-1'}
        >
          <animate></animate>
          <animate></animate>
          <animate></animate>
          <animate></animate>
          <motion.div
            className={"inset-0 p-4 mt-[40px] flex items-center justify-center bg-background"}
            style={{ zindex: "9999", position: "relative" }}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              enter: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          >
            <AnimatePresence>
              <motion.div
                variants={{
                  initial: { scale: 0.5 },
                  enter: { scale: 1 },
                  exit: { scale: 0.5 },
                }}
              >
                <div className={"flex flex-col items-center bg-gray-100 p-4 rounded-xl w-full max-w-[300px]"}>
                  <Image
                    src="/ai/hume-voice-small.png"
                    alt="Hume Voice Call"
                    objectFit="contain"
                    quality={100}
                    height={161}
                    width={180}
                  />
                  <div
                    style={{ width: '250px', margin: '20px 0' }}
                    className="text-center text-slate-600"
                  >
                    Hi there! I'm not here to answer your questions but I can have a friendly chat with you.                  
                    <br/>
                    Click the button below to start a conversation with me.
                    <br/>
                    You can also see an example response and the top 3 emotions from it.
                  </div>

                  <div className="flex flex-row flex-wrap justify-center gap-4 align-middle">

                      <ButtonPortfolio
                        className={"z-50 flex items-center gap-1.5"}
                        onClick={() => {
                          console.log("Attempting connection...");
                          console.log("Access token available:", !!accessToken);
                          console.log("Access token length:", accessToken?.length);
                          
                          connect()
                            .then(() => {
                              console.log("Connection successful!");
                            })
                            .catch((error) => {
                              console.error("Connection error:", error);
                            })
                            .finally(() => {});
                        }}
                      >
                        <span>
                          <Phone
                            className={"size-4 opacity-50"}
                            strokeWidth={2}
                            stroke={"currentColor"}
                          />
                        </span>
                        <span>Start Chat</span>
                      </ButtonPortfolio>                        
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
