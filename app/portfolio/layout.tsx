'use client';

import SideNav from '@/app/ui/portfolio/sidenav';
import { useEffect } from 'react';
import "@/app/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://app.chatbit.co/embed.min.js";
    script.defer = true;
    document.body.appendChild(script);

    const scriptConfig = document.createElement('script');
    scriptConfig.innerHTML = `
      window.cbConfig = {     
        chatId: "17c64691-26fc-42d1-b35b-3fd235807059"
      };
    `;
    document.body.appendChild(scriptConfig);

    const handleFocus = () => {
      window.updateDOM && window.updateDOM();
    };

    const handleChatClose = () => {
      const chatWidget = document.querySelector('.chatbit-widget');
      if (chatWidget) {
        (chatWidget as HTMLElement).style.display = 'none';
      }
    };

    const closeButton = document.getElementById('closeChat');
    if (closeButton) {
      closeButton.addEventListener('click', handleChatClose);
    }

    window.addEventListener('focus', handleFocus);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(scriptConfig);
      window.removeEventListener('focus', handleFocus);
      if (closeButton) {
        closeButton.removeEventListener('click', handleChatClose);
      }
    };
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="z-10 w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}