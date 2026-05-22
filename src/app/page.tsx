'use client';

import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import '@/lib/env';

import Figure from '@/components/Figure';
import ImageCompare from '@/components/Compare';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import { siteContent } from '@/constant/site-content';
import { asset } from '@/lib/asset';

function PlaceholderVideo({ label }: { label: string }) {
  return (
    <div className='flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-white/30 bg-gray-800/80 px-6 text-center text-sm text-gray-300'>
      {label}
      <br />
      <span className='mt-2 text-xs text-gray-500'>
        Add MP4 under <code className='text-primary-400'>public/video/</code> and
        set path in <code className='text-primary-400'>src/constant/site-content.ts</code>
      </span>
    </div>
  );
}

function VideoBlock({ src }: { src: string }) {
  if (!src) {
    return (
      <PlaceholderVideo label='Video placeholder — path not set yet' />
    );
  }
  return (
    <video autoPlay muted controls loop className='mx-auto w-full rounded-md shadow-sm'>
      <source src={asset(src)} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}

export default function HomePage() {
  const textColor = 'text-gray-600';
  const bgColor = 'bg-white';
  const maskColor = 'bg-stone-300/70';
  const secondaryBgColor = 'bg-gray-100';
  const hlTextColor = 'text-primary-600';
  const linkIconClass = 'h-6 w-6 shrink-0';

  const sliderItems = siteContent.slider.map((item) => ({
    title: item.title,
    content: <VideoBlock src={item.video} />,
  }));

  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const middleChild = slider.children[1] as HTMLElement | undefined;
    if (!middleChild) return;
    const sliderWidth = slider.clientWidth;
    const tileWidth = middleChild.clientWidth;
    const targetScroll = middleChild.offsetLeft - (sliderWidth - tileWidth) / 2;
    slider.scrollLeft = targetScroll;
  }, []);

  return (
    <main>
      <section
        className={clsx(
          bgColor,
          textColor,
          'relative flex h-screen items-center justify-center overflow-hidden'
        )}
      >
        <div className='layout relative z-20 flex min-h-screen flex-col items-center justify-center p-4 text-center'>
          <h1 className='mb-4 mt-4 text-5xl'>
            {siteContent.titleHighlights.map((part, i) => (
              <span key={i} className={part.highlight ? hlTextColor : undefined}>
                {part.text}
              </span>
            ))}
          </h1>
          <div className='container pb-6'>
            <span className='text-lg'>
              {siteContent.authors.map((author, i) => (
                <React.Fragment key={author.name}>
                  {i > 0 && ', '}
                  {author.url ? (
                    <UnderlineLink href={author.url}>{author.name}</UnderlineLink>
                  ) : (
                    author.name
                  )}
                  {author.affiliations && (
                    <span className='align-super text-sm'>{author.affiliations}</span>
                  )}
                </React.Fragment>
              ))}
            </span>
          </div>
          <div className='container flex flex-row items-center justify-center space-x-8 text-lg'>
            <ArrowLink
              className='mt-6'
              href={siteContent.links.arxiv}
              variant='light'
              size='large'
              icon={
                <img
                  src={asset('/svg/arxiv.svg')}
                  alt='arXiv logo'
                  className={linkIconClass}
                  loading='lazy'
                />
              }
            >
              arXiv Page
            </ArrowLink>
            <ArrowLink
              className='mt-6'
              href={siteContent.links.github}
              variant='light'
              size='large'
              icon={
                <img
                  src={asset('/svg/github.svg')}
                  alt='GitHub logo'
                  className={linkIconClass}
                  loading='lazy'
                />
              }
            >
              GitHub Repo
            </ArrowLink>
          </div>
        </div>
        <div
          className={clsx(
            'absolute z-10 min-h-full min-w-full max-w-none',
            maskColor
          )}
        />
        <div className='absolute bottom-4 left-4 z-20 text-left text-sm'>
          {siteContent.affiliations.map((aff) => (
            <p key={aff.id} className='mb-2'>
              <span className='align-super text-sm'>{aff.id}</span>
              <span className='ml-2'>{aff.label}</span>
            </p>
          ))}
        </div>
        {siteContent.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            className='absolute inset-0 z-0 h-full w-full object-cover object-top'
          >
            <source src={asset(siteContent.heroVideo)} type='video/mp4' />
          </video>
        ) : (
          <div className='absolute inset-0 z-0 bg-gradient-to-br from-stone-500 via-stone-400 to-stone-600' />
        )}
      </section>

      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4 text-center'>Abstract</h2>
          <p className='text-pretty'>{siteContent.abstract}</p>
        </div>
      </section>

      <section className='bg-dark py-8 text-gray-200'>
        <div className='relative'>
          <div
            ref={sliderRef}
            className='scrollbar-dark flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-48 pb-2'
            aria-label='Project highlights slider'
          >
            {sliderItems.map((item) => (
              <article
                key={item.title}
                className='w-[85%] flex-none snap-center rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-2xl backdrop-blur md:w-[70%] lg:w-[55%]'
              >
                <h3 className='mb-4 text-2xl font-semibold'>{item.title}</h3>
                {item.content}
              </article>
            ))}
          </div>
          <div className='pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-dark to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-dark to-transparent' />
        </div>
      </section>

      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout pb-4 pt-4'>
          <h2 className='mb-4 mt-12'>Qualitative Comparison</h2>
        </div>
        <div className='wide-layout grid grid-cols-2 items-stretch gap-2 pb-12 lg:grid-cols-4'>
          {siteContent.comparisons.map((cmp, i) => (
            <ImageCompare
              key={i}
              leftSrc={asset(cmp.leftSrc)}
              rightSrc={asset(cmp.rightSrc)}
              leftAlt={cmp.leftLabel}
              rightAlt={cmp.rightLabel}
              initial={0.5}
              leftLabel={cmp.leftLabel}
              rightLabel={cmp.rightLabel}
              className='col-span-1 aspect-[4/3]'
            />
          ))}
        </div>
      </section>

      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4'>Methods</h2>
          {siteContent.figures.map((fig) => (
            <React.Fragment key={fig.idx}>
              <Figure
                img_src={asset(fig.src)}
                caption={fig.caption}
                isDark={false}
                idx={fig.idx}
              />
              <div className='pb-16' />
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout pb-48 pt-4'>
          <h2 className='mb-4 mt-12'>Citation</h2>
          <pre className='ml-12 overflow-x-auto text-sm'>{siteContent.citation}</pre>
        </div>
      </section>
    </main>
  );
}
