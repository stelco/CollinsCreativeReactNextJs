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
  description: 'The official Next.js Learn Dashboard built with App Router | Customised by Steven collins',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
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