'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  className?: string;
};

export default function StepViewer({ src, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef    = useRef<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setStatus('loading');

    import('online-3d-viewer').then((OV) => {
      if (viewerRef.current?.Destroy) viewerRef.current.Destroy();

      const viewer = new (OV as any).EmbeddedViewer(el, {
        backgroundColor:  new (OV as any).RGBAColor(245, 245, 245, 255),
        defaultColor:     new (OV as any).RGBColor(180, 180, 180),
        edgeSettings:     new (OV as any).EdgeSettings(true, new (OV as any).RGBColor(80, 80, 80), 1),
        onModelLoaded:    () => setStatus('ready'),
        onModelLoadError: () => setStatus('error'),
      });

      viewerRef.current = viewer;
      viewer.LoadModelFromUrlList([src]);
    }).catch(() => setStatus('error'));

    return () => {
      if (viewerRef.current?.Destroy) {
        viewerRef.current.Destroy();
        viewerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className={['relative', className].join(' ')}>
      <div ref={containerRef} className='absolute inset-0' />

      {status === 'loading' && (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50 text-xs text-gray-400'>
          <svg className='h-5 w-5 animate-spin' viewBox='0 0 24 24' fill='none'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
          </svg>
          Loading 3D model…
        </div>
      )}

      {status === 'error' && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-50 text-xs text-red-400'>
          Failed to load 3D model
        </div>
      )}
    </div>
  );
}
