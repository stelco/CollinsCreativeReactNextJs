import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

export const metadata = {
  title: 'Collins Creative | AI Hume Empathatic Voice Interface',
  description: 'This project features a sample implementation of Hume`s Empathic Voice Interface using Hume`s React SDK. Here, we have a simple EVI that uses the Next.js App Router. Ive integrated the Hume SDK into my portfolio and created a simple chat interface where you can interact with the EVI and have an empathatic conversation.',
};

const Chat = dynamic(() => import("@/app/components/ai/hume/voice/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return (
    <main className="flex min-h-screen flex-col">

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          { label: 'AI', href: '/portfolio/ai' },
          {
            label: 'Empathatic Voice Chat',
            href: '/portfolio/ai/hume/voice',
            active: true,
          },
        ]}
      />

      <CardIntro
        CardContent={{
          title: 'Artificial Intelligence Experiments',
          buttonLink: true,
          buttonLinkUrl: '/portfolio/ai',
          value2: 'Back to AI Home Page',
        }}
      />

      <div className={"grow flex flex-col"}>
        <Chat accessToken={accessToken} />
      </div>

    </main>
  );
}