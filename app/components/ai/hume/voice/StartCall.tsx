import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonPortfolio } from '@/app/ui/button';
import { Phone } from "lucide-react";
import Image from 'next/image';

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>

      {status.value !== "connected" ? (
        <motion.div
          className={"inset-0 p-4 flex items-center justify-center bg-background"}
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
              <div className={"flex flex-col items-center gap-4 mb-[60px] md:mb-[0px] bg-gray-100 p-4 rounded-xl"}>
                <Image
                  src="/ai/hume-voice-cannon.png"
                  alt="Hume Voice Call"
                  objectFit="contain"
                  quality={100}
                  height={200}
                  width={200}
                />
                <div
                  style={{ width: '250px', margin: '20px 0' }}
                  className="text-center text-slate-600"
                >
                  Explore what's possible with the Empathic Voice Interface
                </div>
                <ButtonPortfolio
                  className={"z-50 flex items-center gap-1.5"}
                  onClick={() => {
                    connect()
                      .then(() => {})
                      .catch(() => {})
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
                  <span>Start Call</span>
                </ButtonPortfolio>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
