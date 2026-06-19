'use client';

import { useState } from 'react';

import { asset } from '@/lib/asset';

type Props = {
  src: string;
  label: string;
  endMessage: string;
};

export default function SimToRealVideo({ src, label, endMessage }: Props) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-black'>
        <video
          src={asset(src)}
          autoPlay
          muted
          playsInline
          controls
          preload='metadata'
          className='h-full w-full object-contain'
          onEnded={() => setShowMessage(true)}
        />
        {showMessage && (
          <div className='absolute right-2 top-2 rounded-md bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm'>
            {endMessage}
          </div>
        )}
      </div>
      <p className='mt-1.5 text-center text-xs text-gray-500'>{label}</p>
    </div>
  );
}
