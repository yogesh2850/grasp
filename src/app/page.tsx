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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className={clsx(
          bgColor,
          textColor,
          'relative flex min-h-screen items-center justify-center overflow-hidden'
        )}
      >
        <div className='layout relative z-20 flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-16 text-center'>
          {/* Title */}
          <h1 className='mb-3 mt-4 text-5xl'>
            {siteContent.titleHighlights.map((part, i) => (
              <span key={i} className={part.highlight ? hlTextColor : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          {/* Venue tag */}
          <p className='mb-5 text-sm text-gray-500'>
            M.S. Thesis &mdash; University of Nebraska&ndash;Lincoln, 2026
          </p>

          {/* Authors */}
          <div className='mb-3 text-lg'>
            {siteContent.authors.map((author, i) => (
              <React.Fragment key={author.name}>
                {i > 0 && ', '}
                {author.url ? (
                  <UnderlineLink href={author.url}>{author.name}</UnderlineLink>
                ) : (
                  author.name
                )}
                {author.affiliations && (
                  <sup className='ml-0.5 text-xs text-primary-600'>{author.affiliations}</sup>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Affiliations as text list */}
          <div className='mb-6 flex flex-col items-center gap-1 text-xs text-gray-500'>
            {siteContent.affiliations.map((aff) => (
              <div key={aff.id} className='flex items-center gap-1.5'>
                <sup className='text-primary-600'>{aff.id}</sup>
                {aff.logo && (
                  <img
                    src={asset(aff.logo)}
                    alt=''
                    className='h-4 object-contain opacity-80'
                    loading='lazy'
                  />
                )}
                <span>{aff.label}</span>
              </div>
            ))}
          </div>

          {/* TL;DR */}
          <div className='mb-6 max-w-2xl rounded-xl border border-primary-200 bg-primary-50/60 px-6 py-4 text-left text-sm leading-relaxed text-gray-700'>
            <span className='font-bold text-primary-700'>TL;DR: </span>
            {siteContent.tldr}
          </div>

          {/* Links */}
          <div className='flex flex-row flex-wrap items-center justify-center gap-6'>
            <ArrowLink
              href={siteContent.links.arxiv}
              variant='light'
              size='large'
              icon={
                <img src={asset('/svg/arxiv.svg')} alt='arXiv' className={linkIconClass} loading='lazy' />
              }
            >
              arXiv Page
            </ArrowLink>
            <ArrowLink
              href={siteContent.links.github}
              variant='light'
              size='large'
              icon={
                <img src={asset('/svg/github.svg')} alt='GitHub' className={linkIconClass} loading='lazy' />
              }
            >
              GitHub Repo
            </ArrowLink>
          </div>
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

      {/* ── Graphical Abstract ───────────────────────────────────────────── */}
      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='mb-6 text-center'>Graphical Abstract</h2>
          {siteContent.graphicalAbstract ? (
            <img
              src={asset(siteContent.graphicalAbstract)}
              alt='Graphical abstract'
              className='mx-auto w-full max-w-4xl rounded-xl shadow-md'
            />
          ) : (
            <div className='mx-auto flex max-w-4xl items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-24 text-center text-sm text-gray-400'>
              <div>
                <p className='font-medium'>Graphical abstract coming soon</p>
                <p className='mt-1 text-xs'>
                  Add image to <code className='text-primary-500'>public/images/</code> and set{' '}
                  <code className='text-primary-500'>graphicalAbstract</code> in{' '}
                  <code className='text-primary-500'>site-content.ts</code>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Abstract ─────────────────────────────────────────────────────── */}
      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4 text-center'>Abstract</h2>
          <p className='text-pretty'>{siteContent.abstract}</p>
        </div>
      </section>

      {/* ── Video slider ─────────────────────────────────────────────────── */}
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

      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-6'>Overview</h2>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='rounded-xl border border-gray-200 p-6'>
              <h3 className='mb-2 text-lg font-semibold text-primary-600'>Problem</h3>
              <p className='text-sm leading-relaxed'>
                Maize stalk rot causes 10–30% annual yield losses by degrading internal stem tissue
                while leaving the outer canopy visually intact. The current field standard — a
                manual push test — cannot scale to the 30,000+ plants per acre needed for
                population-level assessment.
              </p>
            </div>
            <div className='rounded-xl border border-gray-200 p-6'>
              <h3 className='mb-2 text-lg font-semibold text-primary-600'>Approach</h3>
              <p className='text-sm leading-relaxed'>
                GRASP trains a mobile manipulator entirely in GPU-accelerated simulation
                (NVIDIA Isaac Lab) using reinforcement learning with deformable plant models.
                A SAM&nbsp;3 → YOLOv8-seg perception pipeline provides real-time stalk
                segmentation without any manual labelling.
              </p>
            </div>
            <div className='rounded-xl border border-gray-200 p-6'>
              <h3 className='mb-2 text-lg font-semibold text-primary-600'>Key Result</h3>
              <p className='text-sm leading-relaxed'>
                The RL policy successfully transfers from simulation to the physical xArm6 +
                Bunker&nbsp;Pro platform, executing controlled lateral push tests and recovering
                a continuous stiffness estimate — the first fully autonomous robotic push-test
                system for maize stalk phenotyping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Perception comparison ─────────────────────────────────────────── */}
      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout pb-4 pt-12'>
          <h2 className='mb-2'>Perception Pipeline</h2>
          <p className='mb-8 text-sm text-gray-500'>
            SAM&nbsp;3 zero-shot annotations are distilled into a real-time YOLOv8-seg model.
            Drag the slider to compare raw inputs and segmentation outputs.
          </p>
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

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4'>Methods</h2>

          {/* Hardware */}
          <div className='mb-12'>
            <h3 className='mb-3 text-xl font-semibold'>Hardware Platform</h3>
            <p className='mb-6 text-sm leading-relaxed text-gray-500'>
              The GRASP robot is a UFactory xArm6 (6-DOF, 5&nbsp;kg payload, ±0.1&nbsp;mm repeatability)
              mounted on an AgileX Bunker&nbsp;Pro tracked mobile base. A ZED&nbsp;X stereo camera
              provides RGB-D perception; a gripper-mounted depth camera provides close-range feedback
              for contact control.
            </p>
            <div className='grid gap-4 md:grid-cols-3'>
              {[
                { src: '/images/thesis/hardware/xarm6.png', label: 'UFactory xArm6' },
                { src: '/images/thesis/hardware/hardware.png', label: 'Full Platform' },
                { src: '/images/thesis/hardware/zed.jpg', label: 'ZED X Camera' },
              ].map((img) => (
                <div key={img.label} className='overflow-hidden rounded-xl border border-gray-200'>
                  <img
                    src={asset(img.src)}
                    alt={img.label}
                    className='w-full object-cover'
                    loading='lazy'
                  />
                  <p className='px-3 py-2 text-center text-xs text-gray-500'>{img.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Method figures from site-content */}
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

          {/* Contributions */}
          <h3 className='mb-4 text-xl font-semibold'>Contributions</h3>
          <ol className='ml-6 list-decimal space-y-3 text-sm leading-relaxed text-gray-600'>
            <li>
              A <strong>deformable plant-interaction simulation</strong> environment in NVIDIA Isaac Lab
              with FEM-based maize plant physics and per-episode stiffness randomisation over
              [10⁷, 10⁸]&nbsp;Pa.
            </li>
            <li>
              A <strong>reinforcement-learning formulation</strong> for autonomous stalk assessment
              decomposed into four phases — navigation, visual alignment, push quality, and stiffness
              estimation — with rewards tied to Euler–Bernoulli beam theory.
            </li>
            <li>
              A <strong>zero-shot-to-real-time perception pipeline</strong> using SAM&nbsp;3 for
              automated annotation of ~1,500 field images, distilled into a YOLOv8-seg model running
              at 30&nbsp;Hz.
            </li>
            <li>
              A <strong>calibrated camera-to-arm pipeline</strong> with CATIA-measured extrinsics,
              stereo-baseline correction, and depth-based 3-D push-point extraction.
            </li>
            <li>
              An <strong>agronomically grounded robotic phenotyping instrument</strong> that converts
              force–deflection measurements into a continuous stalk stiffness estimate.
            </li>
          </ol>
        </div>
      </section>

      {/* ── Citation ─────────────────────────────────────────────────────── */}
      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout pb-48 pt-4'>
          <h2 className='mb-4 mt-12'>Citation</h2>
          <pre className='ml-12 overflow-x-auto text-sm'>{siteContent.citation}</pre>
        </div>
      </section>
    </main>
  );
}
