import '@/app/ui/global.css';
import '@/app/ui/custom.css';
import '@/app/ui/animations.css';
import cn from "classnames";
import { exo2 } from '@/app/ui/fonts';
import BackgroundImage from '@/app/components/BackgroundImage';

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