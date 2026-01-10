//create a pill component
import React from 'react';
import { exo2 } from '@/app/ui/fonts';

type PillProps = {
  text: string;
  color: string;
};

export default function Pill({ text, color }: PillProps) {
  return (
    <div className={`${exo2.className}`}>
      <div
        className={`${color} pill md:py-2 md:px-2 text-xs md:text-sm`}
      >
        {text}
      </div>
    </div>
  );
}