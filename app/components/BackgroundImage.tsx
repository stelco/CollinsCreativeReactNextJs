'use client';

import React, { useEffect, useState } from 'react';
import cn from "classnames";

export default function BackgroundImage(props: React.HTMLAttributes<HTMLDivElement>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(htmlElement.getAttribute('data-mode') === 'dark' || htmlElement.getAttribute('data-mode') === 'system');
    });

    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-mode'] });

    // Initial check
    setIsDarkMode(htmlElement.getAttribute('data-mode') === 'dark');

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-0",
        props.className,
        { 'bg-light': !isDarkMode },
        { 'bg-dark': isDarkMode }
      )}
      {...props}
    />
  );
}