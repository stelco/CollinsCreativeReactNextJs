import Image from 'next/image';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: 'AI',
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
      
      <div className="fixed inset-0 z-0">
        <Image
          src="/plaque-fullsize-cropped.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

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