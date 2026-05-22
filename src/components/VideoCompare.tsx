'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  leftSrc: string;
  rightSrc: string;
  leftLabel?: string;
  rightLabel?: string;
  initial?: number;
  className?: string;
};

export default function VideoCompare({
  leftSrc,
  rightSrc,
  leftLabel,
  rightLabel,
  initial = 0.5,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef      = useRef<HTMLVideoElement | null>(null);
  const rightRef     = useRef<HTMLVideoElement | null>(null);
  const [t, setT]       = useState(initial);
  const [dragging, setDragging] = useState(false);

  // Keep right video in sync with left
  useEffect(() => {
    const lv = leftRef.current;
    const rv = rightRef.current;
    if (!lv || !rv) return;
    const sync = () => {
      if (Math.abs(rv.currentTime - lv.currentTime) > 0.12)
        rv.currentTime = lv.currentTime;
    };
    lv.addEventListener('timeupdate', sync);
    return () => lv.removeEventListener('timeupdate', sync);
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setT(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    containerRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };
  const stopDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    try { containerRef.current?.releasePointerCapture(e.pointerId); } catch {}
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.1 : 0.02;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); setT(v => Math.max(0, v - step)); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setT(v => Math.min(1, v + step)); }
    if (e.key === 'Home')       { e.preventDefault(); setT(0); }
    if (e.key === 'End')        { e.preventDefault(); setT(1); }
  };

  const percent = Math.round(t * 100);
  const clip    = `inset(0 ${100 - percent}% 0 0)`;

  return (
    <div
      ref={containerRef}
      className={[
        'relative aspect-video overflow-hidden select-none touch-none cursor-col-resize',
        'rounded-xl shadow ring-1 ring-black/10 bg-black',
        className,
      ].join(' ')}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onPointerLeave={stopDrag}
      onClick={(e) => updateFromClientX(e.clientX)}
    >
      {/* Left video — full, base layer */}
      <video
        ref={leftRef}
        src={leftSrc}
        autoPlay muted loop playsInline
        className='absolute inset-0 h-full w-full object-cover pointer-events-none select-none'
      />

      {/* Right video — clipped overlay */}
      <video
        ref={rightRef}
        src={rightSrc}
        autoPlay muted loop playsInline
        className='absolute inset-0 h-full w-full object-cover pointer-events-none select-none'
        style={{ clipPath: clip, WebkitClipPath: clip as string }}
      />

      {/* Divider + handle */}
      <div
        role='slider'
        aria-label='Video comparison position'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className='absolute top-0 bottom-0 z-10 w-8 -ml-4 outline-none'
        style={{ left: `${percent}%` }}
      >
        <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-white/70 bg-black/40 backdrop-blur-sm' />
      </div>

      {leftLabel && (
        <div className='absolute left-2 top-2 z-10 text-xs font-medium px-1.5 py-0.5 rounded bg-black/60 text-white'>
          {leftLabel}
        </div>
      )}
      {rightLabel && (
        <div className='absolute right-2 top-2 z-10 text-xs font-medium px-1.5 py-0.5 rounded bg-black/60 text-primary-400'>
          {rightLabel}
        </div>
      )}
    </div>
  );
}
