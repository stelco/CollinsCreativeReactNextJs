import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamicImport from "next/dynamic";
import { Toaster } from "@/app/components/ai/hume/voice/ui/sonner";

const Chat = dynamicImport(() => import("@/app/components/ai/hume/voice/Chat"), {
  ssr: false,
});

export const dynamic = 'force-dynamic';

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error("Failed to generate Hume access token");
  }

  console.log("[Page] Access token received, length:", accessToken?.length);
  console.log("[Page] First 20 chars:", accessToken?.substring(0, 20));

  return (
    <main className="flex min-h-screen flex-col">

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          { label: 'AI', href: '/portfolio/ai' },
          {
            label: 'Empathatic Voice Chat',
            href: '/portfolio/ai/hume/empathatic-voice',
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

      <Toaster position="top-center" richColors={true} />

    </main>
  );
}