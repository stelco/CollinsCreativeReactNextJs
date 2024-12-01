import '@/app/ui/global.css';
import '@/app/ui/custom.css';
import cn from "classnames";
import { exo2 } from '@/app/ui/fonts';
import { Metadata } from 'next';
import BackgroundImage from '@/app/components/BackgroundImage';

export const metadata: Metadata = {
  title: {
    template: '%s | Collins Creative',
    default: 'Collins Creative',
  },
  description: 'This is the online portfolio of Steven Collins. It is a Next.js app with Tailwind CSS, TypeScript and Heroicons. It showcases my more recent technical and design skills. Im also experimenting with new AI technologies and integrating them into the site.',
  metadataBase: new URL('https://www.collinscreative.co.uk'),
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Place any <script> tags here */}
      </head>
      <body
        className={cn(exo2.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <BackgroundImage />
        {children}
      </body>
    </html>
  );
}