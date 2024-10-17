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
        className={`${color} pill`}
        style={{
          padding: '5px 10px',
          borderRadius: '9999px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        {text}
      </div>
    </div>
  );
}