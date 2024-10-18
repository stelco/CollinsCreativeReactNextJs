import '@/app/ui/global.css';
import '@/app/ui/custom.css';
import { exo2 } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Collins Creative',
    default: 'Collins Creative',
  },
  description: 'The official Next.js Learn Dashboard built with App Router | Customised by Steven collins',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${exo2.className} antialiased`}>{children}</body>
    </html>
  );
}