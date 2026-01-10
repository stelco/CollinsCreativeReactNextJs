'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/portfolio/nav-links';
import CollinsCreativeLogo from '@/app/ui/cc-logo';
import cn from "classnames";

export default function SideNav(props: React.HTMLAttributes<HTMLDivElement>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(htmlElement.getAttribute('data-mode') === 'dark');
    });

    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-mode'] });

    // Initial check
    setIsDarkMode(htmlElement.getAttribute('data-mode') === 'dark');

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-full flex-col px-4 pt-4 md:px-2">
      <Link
        className={cn("mb-2 flex h-20 items-end justify-start rounded-xl border p-3 md:h-40 bg-gradient-to-r from-orange-500 to-transparent", "dark:from-gray-800 dark:to-transparent")}
        href="/"
      >
        <div className="text-white text-bevel">
          <CollinsCreativeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>
        <div className='hidden h-auto w-full md:block relative'>
          <iframe 
            className="mb-3"
            width="100%"
            height="60"
            src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&hide_artwork=1&feed=%2Fstec74%2Fplaylists%2Feclectric-mix-series%2F">
          </iframe>

          {/*use cn to apply dark mode overlay around iframe*/}
          <div className={
            cn("",
              props.className,
              { '': !isDarkMode },
              { 'mixcloud-overlay': isDarkMode }
          )}>
          </div>

        </div>
      </div>
    </div>
  );
}
