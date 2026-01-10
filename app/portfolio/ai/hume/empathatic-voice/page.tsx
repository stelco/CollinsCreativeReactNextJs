import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamicImport from "next/dynamic";

const Chat = dynamicImport(() => import("@/app/components/ai/hume/voice/Chat"), {
  ssr: false,
});

export const dynamic = 'force-dynamic';

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  console.log("Access token generated:", accessToken ? "✓ Valid" : "✗ Invalid");
  console.log("Token length:", accessToken?.length);

  if (!accessToken) {
    throw new Error("Failed to generate Hume access token");
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
        <Chat accessToken={accessToken} historyHeight="" />
      </div>

    </main>
  );
}