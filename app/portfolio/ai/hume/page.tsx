import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

export const metadata = {
  title: 'Collins Creative | AI Hume Empathatic Voice Interface',
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
            label: 'Empathatic Voice Interface',
            href: '/portfolio/ai/hume/voice',
            active: true,
          },
        ]}
      />

      <div className={"grow flex flex-col"}>
        <Chat accessToken={accessToken} />
      </div>

    </main>
  );
}