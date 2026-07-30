'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import '@/lib/env';

import Figure from '@/components/Figure';
import ImageCompare from '@/components/Compare';
import VideoCompare from '@/components/VideoCompare';
import SimToRealVideo from '@/components/SimToRealVideo';
import StepViewer from '@/components/StepViewer';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import { siteContent } from '@/constant/site-content';
import { asset } from '@/lib/asset';

/* ─── Nav ───────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Introduction',      href: '#abstract'       },
  { label: 'Contributions',    href: '#contributions'  },
  { label: 'Methodology',      href: '#methodology'    },
  { label: 'Results',     href: '#results'      },
  { label: 'Q & A',       href: '#qa'           },
  { label: 'Citation',    href: '#citation'     },
];

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // highlight the section currently in view
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-gray-900/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className='mx-auto flex max-w-5xl items-center justify-center gap-1 overflow-x-auto px-4 py-3'>
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.slice(1);
          return (
            <a
              key={href}
              href={href}
              className={clsx(
                'whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                active === id
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/20'
              )}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const textColor        = 'text-gray-600';
  const bgColor          = 'bg-white';
  const secondaryBgColor = 'bg-gray-100';
  const hlTextColor      = 'text-primary-600';
  const linkIconClass    = 'h-6 w-6 shrink-0';
  const authorSecondLineStart = siteContent.authors.findIndex(
    (author) => author.name === 'Krishna Muvva',
  );

  return (
    <>
      <StickyNav />

      <main className='pt-0'>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className={clsx(bgColor, textColor, 'relative flex min-h-screen items-center justify-center overflow-hidden')}>
          <div className='layout relative z-20 flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-20 text-center'>

            {/* Title — GRASP as white→dark-grey gradient, subtitle white */}
            <h1 className='mb-3 mt-4 text-5xl font-bold leading-tight'>
              {siteContent.titleHighlights.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.highlight
                      ? 'bg-gradient-to-b from-emerald-400 to-emerald-700 bg-clip-text text-transparent'
                      : 'text-white'
                  }
                >
                  {part.text}
                </span>
              ))}
            </h1>

            {/* Authors */}
            <div
              className='mb-3 mt-2 text-xl font-medium text-white'
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              {siteContent.authors.map((author, i) => (
                <React.Fragment key={author.name}>
                  {i > 0 && (i === authorSecondLineStart ? <br /> : ', ')}
                  {author.url ? (
                    <a
                      href={author.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline decoration-white/40 underline-offset-2 transition-colors hover:text-green-300 hover:decoration-green-300'
                    >
                      {author.name}
                    </a>
                  ) : (
                    author.name
                  )}
                  {author.affiliations && (
                    <sup className='ml-0.5 text-sm text-gray-300'>{author.affiliations}</sup>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Affiliations */}
            <div
              className='mb-6 flex flex-col items-center gap-1.5 text-base font-light text-white/75'
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              {siteContent.affiliations.map((aff) => (
                <div key={aff.id} className='flex items-center gap-2'>
                  <sup className='text-gray-300'>{aff.id}</sup>
                  {aff.logo && (
                    <img src={asset(aff.logo)} alt='' className='h-5 object-contain opacity-90' loading='lazy' />
                  )}
                  <span>{aff.label}</span>
                </div>
              ))}
            </div>

            {/* Links — white pill buttons */}
            <div className='flex flex-row flex-wrap items-center justify-center gap-3'>
              {[
                { href: siteContent.links.arxiv,    icon: '/svg/arxiv.svg',    label: 'arXiv Page (coming soon)', alt: 'arXiv',    external: true },
                { href: siteContent.links.github,   icon: '/svg/github.svg',   label: 'GitHub Repo', alt: 'GitHub',   external: true },
                { href: siteContent.links.dataset,  icon: '/images/icons/huggingface.png', label: 'Dataset & Weights',         alt: 'Hugging Face Dataset & Weights', external: true },
                { href: siteContent.links.assembly, icon: '/images/icons/assembly.png', label: 'Assembly CAD files',        alt: 'Assembly', external: true },
                { href: '#results',                 icon: '/images/icons/results.png', label: 'Results',                   alt: 'Results',  external: false },
              ].map(({ href, icon, label, alt, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className='flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:border-white'
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  <img src={asset(icon)} alt={alt} className='h-5 w-5' loading='lazy' />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Base gradient always present */}
          <div className='absolute inset-0 z-0 bg-gradient-to-br from-stone-500 via-stone-400 to-stone-600' />

          {/* GIF background at 40% opacity, on top of gradient */}
          {siteContent.heroGif && (
            <img
              src={asset(siteContent.heroGif)}
              alt=''
              aria-hidden='true'
              className='absolute inset-0 z-[1] h-full w-full object-cover object-center'
              style={{ opacity: 0.4 }}
            />
          )}

          {/* MP4 video overrides everything if set */}
          {siteContent.heroVideo && (
            <video autoPlay loop muted playsInline
              className='absolute inset-0 z-[2] h-full w-full object-cover object-top'
              style={{ opacity: 0.5 }}>
              <source src={asset(siteContent.heroVideo)} type='video/mp4' />
            </video>
          )}
        </section>

        {/* ── TL;DR ────────────────────────────────────────────────────── */}
        <section className={clsx(bgColor, textColor)}>
          <div className='layout py-10'>
            <div className='mx-auto max-w-3xl rounded-2xl border border-primary-200 bg-primary-50 px-8 py-6'>
              <p className='text-base leading-relaxed text-gray-700'>
                <span className='text-lg font-bold text-primary-700'>TL;DR: </span>
                {siteContent.tldr}
              </p>
            </div>
          </div>
        </section>

        {/* ── Abstract (with graphical abstract image above text) ───────── */}
        <section id='abstract' className={clsx(bgColor, textColor)}>
          <div className='layout py-12'>
            <h2 className='pb-6 text-center'>Introduction</h2>

            {/* Graphical abstract image */}
            {siteContent.graphicalAbstract ? (
              <img
                src={asset(siteContent.graphicalAbstract)}
                alt='Graphical abstract'
                className='mx-auto mb-8 w-full max-w-4xl rounded-xl shadow-md'
              />
            ) : (
              <div className='mx-auto mb-8 flex max-w-4xl items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-20 text-center text-sm text-gray-400'>
                <div>
                  <p className='font-medium'>Graphical abstract coming soon</p>
                  <p className='mt-1 text-xs'>
                    Set <code className='text-primary-500'>graphicalAbstract</code> in{' '}
                    <code className='text-primary-500'>site-content.ts</code>
                  </p>
                </div>
              </div>
            )}

            <div className='space-y-4'>
              {siteContent.abstract.split('\n\n').map((para, i) => (
                <p key={i} className='text-pretty'>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Key Contributions ────────────────────────────────────────── */}
        <section id='contributions' className={clsx(secondaryBgColor, textColor)}>
          <div className='layout py-12'>
            <div className='mx-auto max-w-3xl'>
              <h2 className='mb-8 text-center'>Key Contributions</h2>
              <ul className='space-y-5 text-sm leading-relaxed text-gray-600'>
                <li>
                  <strong>
                    <span className='bg-gradient-to-b from-emerald-400 to-emerald-700 bg-clip-text text-transparent'>GRASP</span>
                    {' Dataset — '}
                  </strong>
                  21,541 field images auto-annotated through a SAM-3 → YOLOv8/v11/v26-seg pipeline, enabling zero-shot stalk segmentation with no manual labeling and real-time inference at 30 Hz on edge hardware.
                </li>
                <li>
                  <strong>
                    <span className='bg-gradient-to-b from-emerald-400 to-emerald-700 bg-clip-text text-transparent'>GRASP</span>
                    {' Platform — '}
                  </strong>
                  A UFactory xArm6 manipulator mounted on an AgileX Bunker Pro mobile base, paired with a ZED X stereo camera for real-time 3D stalk localization and autonomous push execution under field conditions.
                </li>
                <li>
                  <strong>
                    <span className='bg-gradient-to-b from-emerald-400 to-emerald-700 bg-clip-text text-transparent'>GRASP</span>
                    {' Framework — '}
                  </strong>
                  A sim-to-real robotic pipeline that locates maize stalks, performs controlled diagnostic pushes, and estimates stalk stiffness directly from proprioceptive interaction data.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Methodology ──────────────────────────────────────────────── */}
        <section id='methodology' className={clsx(bgColor, textColor)}>
          <div className='layout py-12'>
            <h2 className='mb-10 pb-2 border-b border-gray-200'>Methodology</h2>

            {/* ── 1. Hardware ── */}
            <div className='mb-14'>
              <h3 className='mb-1 text-2xl font-semibold'>Hardware</h3>
              <p className='mb-6 text-sm leading-relaxed text-gray-500'>
                The GRASP robot is a UFactory xArm6 (6-DOF, 5&nbsp;kg payload, ±0.1&nbsp;mm
                repeatability) mounted on an AgileX Bunker&nbsp;Pro tracked mobile base. A
                ZED&nbsp;X stereo camera provides RGB-D perception; a gripper-mounted depth
                camera provides close-range feedback for contact control.
              </p>
              <div className='grid gap-6 md:grid-cols-[3fr_2fr]'>
                {/* Left — hardware photo (60%) */}
                <div className='overflow-hidden rounded-xl border border-gray-200'>
                  <img
                    src={asset('/images/thesis/hardware/hardware_complete.png')}
                    alt='GRASP hardware platform'
                    className='w-full object-contain'
                    loading='lazy'
                  />
                </div>

                {/* Right — 3D CAD viewer (40%) */}
                <div>
                  <div className='overflow-hidden rounded-xl border border-gray-200' style={{ transform: 'rotateY(180deg) rotateX(180deg)' }}>
                    <StepViewer
                      src={asset('/models/Transformer_assambly.stp')}
                      className='aspect-square w-full'
                    />
                  </div>
                  <p className='mt-2 text-center text-xs text-gray-400'>
                    Camera Mounting <span className='italic text-gray-300'>— drag to rotate and explore the full CAD file</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ── 2. Perception Pipeline ── */}
            <div className='mb-14'>
              <h3 className='mb-1 text-2xl font-semibold'>Perception Pipeline</h3>
              <p className='mb-6 text-sm leading-relaxed text-gray-500'>
                SAM&nbsp;3 zero-shot annotations are used to train a real-time YOLOv8-seg model
                running at 30&nbsp;Hz. Drag each slider to compare input and output.
              </p>
              <div className='grid gap-6 md:grid-cols-2'>
                {/* 1. Dataset rows slider */}
                <div>
                  <ImageCompare
                    leftSrc={asset('/images/thesis/perception/dataset_row1.png')}
                    rightSrc={asset('/images/thesis/perception/dataset_row2.png')}
                    leftAlt='Dataset Row 1'
                    rightAlt='Dataset Row 2'
                    initial={0.5}
                    leftLabel='Row 1'
                    rightLabel='Row 2'
                    className='aspect-[4/3] w-full' fit='contain'
                    rightBg='#ffffff'
                  />
                  <p className='mt-2 text-center text-xs text-gray-400'>Diverse Dataset used for training</p>
                </div>

                {/* SAM3 image comparisons */}
                {siteContent.comparisons.slice(1, 2).map((cmp, i) => (
                  <div key={i}>
                    <ImageCompare
                      leftSrc={asset(cmp.leftSrc)} rightSrc={asset(cmp.rightSrc)}
                      leftAlt={cmp.leftLabel}       rightAlt={cmp.rightLabel}
                      initial={0.5}
                      leftLabel={cmp.leftLabel}     rightLabel={cmp.rightLabel}
                      className='aspect-[4/3] w-full' fit='contain'
                    />
                    <p className='mt-2 text-center text-xs text-gray-400'>
                      SAM 3 Masks Case 1 and 2
                    </p>
                  </div>
                ))}

                {/* 3D Point Cloud reveal */}
                <div>
                  <ImageCompare
                    leftSrc={asset('/images/thesis/perception/3d_pc.gif')}
                    rightSrc={asset('/images/blank.svg')}
                    leftAlt='3D Point Cloud'
                    rightAlt=''
                    initial={0.5}
                    leftLabel='3D Point Cloud'
                    className='aspect-[4/3] w-full' fit='contain'
                    rightBg='#ffffff'
                  />
                  <p className='mt-2 text-center text-xs text-gray-400'>3D Point Cloud</p>
                </div>

                {/* YOLOv11n vs YOLOv11l video comparison */}
                <div>
                  <VideoCompare
                    leftSrc={asset('/video/yolo_v11n.mp4')}
                    rightSrc={asset('/video/yolo_v11l.mp4')}
                    leftLabel='YOLOv11n'
                    rightLabel='YOLOv11l'
                    className='aspect-[4/3] w-full'
                  />
                  <p className='mt-2 text-center text-xs text-gray-400'>
                    YOLOv11n vs YOLOv11l — stalk detection overlay
                  </p>
                </div>
              </div>
            </div>

            {/* ── 3. Isaac Lab Setup ── */}
            <div className={clsx(secondaryBgColor, 'mb-14 rounded-2xl p-6')}>
              <h3 className='mb-1 text-2xl font-semibold'>Isaac Lab Setup</h3>
              <p className='mb-6 text-sm leading-relaxed text-gray-500'>
                Deformable maize plant models with FEM physics are placed in GPU-parallel Isaac Lab
                environments. Stalk stiffness is randomised log-uniformly over [5×10⁷, 10⁸]&nbsp;Pa
                each episode.
              </p>
              <div className='grid gap-6 md:grid-cols-2'>
                {/* 1. Maize plant vs mesh video comparison */}
                <div>
                  <VideoCompare
                    leftSrc={asset('/video/correct_maize.mp4')}
                    rightSrc={asset('/video/correct_maize_mesh.mp4')}
                    leftLabel='Maize Plant'
                    rightLabel='Plant Mesh'
                    initial={0.43}
                    className='aspect-[4/3] w-full'
                  />
                  <p className='mt-2 text-center text-xs text-gray-400'>
                    Maize Plant / Plant Mesh
                  </p>
                </div>

                {/* 2. Plant Mesh / Textured Render */}
                {[siteContent.comparisons[2]].map((cmp) => (
                  <div key={cmp.leftLabel}>
                    <ImageCompare
                      leftSrc={asset(cmp.leftSrc)} rightSrc={asset(cmp.rightSrc)}
                      leftAlt={cmp.leftLabel}       rightAlt={cmp.rightLabel}
                      initial={0.5}
                      leftLabel={cmp.leftLabel}     rightLabel={cmp.rightLabel}
                      className='aspect-[4/3] w-full' fit='contain'
                      rightBg='#ffffff'
                    />
                    <p className='mt-2 text-center text-xs text-gray-400'>
                      {cmp.leftLabel} / {cmp.rightLabel}
                    </p>
                  </div>
                ))}

                {/* 3. Raw RGB / Segmentation */}
                {[siteContent.comparisons[0]].map((cmp) => (
                  <div key={cmp.leftLabel}>
                    <ImageCompare
                      leftSrc={asset(cmp.leftSrc)} rightSrc={asset(cmp.rightSrc)}
                      leftAlt={cmp.leftLabel}       rightAlt={cmp.rightLabel}
                      initial={0.5}
                      leftLabel={cmp.leftLabel}     rightLabel={cmp.rightLabel}
                      className='aspect-[4/3] w-full' fit='contain'
                      rightBg='#ffffff'
                    />
                    <p className='mt-2 text-center text-xs text-gray-400'>
                      {cmp.leftLabel} / {cmp.rightLabel}
                    </p>
                  </div>
                ))}

                {/* 4. Scene Layout / Scene Variant */}
                {[siteContent.comparisons[3]].map((cmp) => (
                  <div key={cmp.leftLabel}>
                    <ImageCompare
                      leftSrc={asset(cmp.leftSrc)} rightSrc={asset(cmp.rightSrc)}
                      leftAlt={cmp.leftLabel}       rightAlt={cmp.rightLabel}
                      initial={0.5}
                      leftLabel={cmp.leftLabel}     rightLabel={cmp.rightLabel}
                      className='aspect-[4/3] w-full' fit='contain'
                      rightBg='#ffffff'
                    />
                    <p className='mt-2 text-center text-xs text-gray-400'>
                      {cmp.leftLabel} / {cmp.rightLabel}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 4. Isaac Lab Training ── */}
            <div className='mb-6'>
              <h3 className='mb-1 text-2xl font-semibold'>Isaac Lab Training</h3>
              <div className='mt-6 grid gap-6 md:grid-cols-2'>
                {/* RL training pipeline image — full width */}
                <div className='col-span-2 overflow-hidden rounded-xl border border-gray-200 bg-white'>
                  <img
                    src={asset('/images/thesis/rl/isaac_lab_training.png')}
                    alt='Isaac Lab training'
                    className='mx-auto block w-[80%] object-contain'
                    loading='lazy'
                  />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── Results ──────────────────────────────────────────────────── */}
        <section id='results' className={clsx(secondaryBgColor, textColor)}>
          <div className='layout py-12'>
            <h2 className='pb-4'>Results</h2>
            <p className='mb-10 text-sm text-gray-500'>
              The GRASP policy was evaluated both in simulation and on the physical robot across
              a range of stalk stiffness values. Key metrics include reward convergence, stiffness
              estimation accuracy, and sim-to-real transfer success rate.
            </p>

            {/* Summary stat cards */}
            <div className='mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {[
                { stat: '30 Hz',    label: 'Real-time perception',        sub: 'YOLOv8-seg on edge hardware' },
                { stat: '10×',      label: 'Stiffness range covered',     sub: '5×10⁶ – 10⁸ Pa randomised' },
                { stat: '21,541',   label: 'Field images 0 shot annotated', sub: 'Zero manual labelling' },
                { stat: 'Sim→Real', label: 'Policy transfer',             sub: 'xArm6 + Bunker Pro' },
              ].map(({ stat, label, sub }) => (
                <div key={label} className='rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm'>
                  <p className='mb-1 text-3xl font-bold text-primary-600'>{stat}</p>
                  <p className='text-sm font-medium text-gray-700'>{label}</p>
                  <p className='mt-1 text-xs text-gray-400'>{sub}</p>
                </div>
              ))}
            </div>

            {/* Real-plant result images */}
            <h3 className='mb-4 text-xl font-semibold'>Real plants for testing</h3>
            <div className='mb-8 flex flex-col gap-3'>
              <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
                {[
                  { name: '2_12_YELLOW', caption: '2/12 (Yellow)' },
                  { name: '2_19_YELLOW', caption: '2/19 (Yellow)' },
                  { name: '3_12_YELLOW', caption: '3/12 (Yellow)' },
                ].map(({ name, caption }) => (
                  <div key={name}>
                    <img
                      src={asset(`/images/thesis/results/${name}.png`)}
                      alt={caption}
                      className='w-full rounded-xl border border-gray-200 object-contain'
                      loading='lazy'
                    />
                    <p className='mt-1.5 text-center text-xs text-gray-600'>{caption}</p>
                  </div>
                ))}
              </div>
              <div className='flex flex-wrap justify-center gap-3'>
                {[
                  { name: '2_5_GREEN',  caption: '2/5 (Green)'  },
                  { name: '3_19_GREEN', caption: '3/19 (Green)' },
                ].map(({ name, caption }) => (
                  <div key={name} className='w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.5rem)]'>
                    <img
                      src={asset(`/images/thesis/results/${name}.png`)}
                      alt={caption}
                      className='w-full rounded-xl border border-gray-200 object-contain'
                      loading='lazy'
                    />
                    <p className='mt-1.5 text-center text-xs text-gray-600'>{caption}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Result placeholders */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {[
                {
                  label: 'YOLO Training curves',
                  image: '/images/thesis/results/metrics_mAP50_95M_yolo.png',
                  alt: 'YOLO mAP50-95M training metrics',
                },
                {
                  label: 'Stiffness Estimation (proprioception vs distillation methods)',
                  image: '/images/thesis/results/soft_probability_heatmap_4k.png',
                  alt: 'Soft probability heatmap for stiffness estimation methods',
                },
                {
                  label: 'Sim-to-real performance in real time (results are shown as P(soft))',
                  colSpan: 2,
                  videos: [
                    {
                      src: '/video/3_19_GREEN_clip.mp4',
                      label: '3/19 (Green)',
                      endMessage: 'P(soft) = 0.733',
                    },
                    {
                      src: '/video/2_19_YELLOW_clip.mp4',
                      label: '2/19 (Yellow)',
                      endMessage: 'P(soft) = 0.514',
                    },
                  ],
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={clsx(
                    'w-full overflow-hidden rounded-xl border bg-white',
                    'colSpan' in item && item.colSpan === 2 && 'md:col-span-2',
                    'image' in item && item.image
                      ? 'border-gray-200'
                      : 'videos' in item && item.videos
                        ? 'border-gray-200'
                        : 'flex aspect-[4/3] flex-col items-center justify-center border-2 border-dashed border-gray-300 px-6 text-center',
                  )}
                >
                  {'image' in item && item.image ? (
                    <>
                      <img
                        src={asset(item.image)}
                        alt={item.alt}
                        className='w-full object-contain'
                        loading='lazy'
                      />
                      <p className='border-t border-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-500'>
                        {item.label}
                      </p>
                    </>
                  ) : 'videos' in item && item.videos ? (
                    <>
                      <p className='border-b border-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-500'>
                        {item.label}
                      </p>
                      <div className='grid grid-cols-1 gap-3 p-3 sm:grid-cols-2'>
                        {item.videos.map((video) => (
                          <SimToRealVideo
                            key={video.src}
                            src={video.src}
                            label={video.label}
                            endMessage={video.endMessage}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className='font-medium text-gray-500'>{item.label}</p>
                      <p className='mt-1 text-xs text-gray-300'>coming soon</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Q & A ────────────────────────────────────────────────────── */}
        <section id='qa' className={clsx(bgColor, textColor)}>
          <div className='layout py-12'>
            <h2 className='mb-8 text-center'>🌽 Questions and Answers</h2>
            <div className='mx-auto max-w-3xl' style={{ marginTop: '2rem' }}>

              <p><strong>Q: 🌾 Why simulate plants instead of just collecting real push data?</strong></p>
              <p style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }} className='text-sm leading-relaxed text-gray-600'>
                Real-field data collection doesn't scale. Stiffness varies by more than an order of magnitude from plant to plant and week to week — capturing that range means walking every row with a setup, running trials on plants that can't be reused, and still ending up with data too narrow to cover edge cases. Simulation lets us randomize stiffness over the full biological range in every episode, run thousands of parallel pushes overnight, and never harm a plant.
              </p>

              <p><strong>Q: 📏 Isn't measuring stiffness just measuring force?</strong></p>
              <p style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }} className='text-sm leading-relaxed text-gray-600'>
                Force alone tells you how hard you pushed, not how stiff the plant is. Stiffness is the slope of the force–deflection curve — that is, resistance per unit of bending. Push at the wrong angle, wrong height, or too fast, and that slope becomes meaningless noise.
                {' '}That's why GRASP enforces a quality contact: the arm must approach frontally, engage at mid-stalk height, and sustain the push long enough to drive a measurable 20° tilt. Only then does the GRU estimator see the clean interaction sequence it needs to recover Young's modulus reliably.
              </p>

              <p><strong>Q: 🌿 Can GRASP generalize to other crops?</strong></p>
              <p style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }} className='text-sm leading-relaxed text-gray-600'>
                The method generalizes; the specific policy needs retraining. GRASP's reward design is built on Euler–Bernoulli beam theory, which holds for any approximately cantilevered stem — sorghum, sugarcane, sunflower, young trees. Adapting to a new crop means swapping the deformable plant model and re-randomizing stiffness over that species' biological range. The reward structure, control stack, and GRU estimator stay the same.
                {' '}The real bottleneck is vision. End-to-end policies don't generalize well to new visual scenes, so detecting the stalk and localizing the push point on an unseen crop would require retraining the segmentation model on that species. This is the most practical barrier to sim-to-real transfer.
              </p>

              <p><strong>Q: 🤖 Why Does an End-to-End Reinforcement Learning Policy Fail for Sim-to-Real Plant Interaction?</strong></p>
              <p style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }} className='text-sm leading-relaxed text-gray-600'>
                Because the task combines perception, contact, and deformable plant mechanics, the RL policy must learn an extremely long causal chain from pixels to stiffness. Small sim-to-real errors in plant geometry, material properties, contact dynamics, and camera observations compound, causing the learned policy to overfit simulation behavior. RL also requires millions of interactions, which are impractical on real plants, and the latent variable of interest (stiffness) is not directly observable from vision alone. By decomposing the problem into perception, IK-based contact, and a proprioceptive stiffness estimator, GRASP avoids the sim-to-real fragility and poor sample efficiency of end-to-end reinforcement learning.
              </p>

              <p><strong>Q: 🔧 What can't GRASP do yet?</strong></p>
              <p style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }} className='text-sm leading-relaxed text-gray-600'>
                Quite a bit. GRASP currently handles one stalk at a time; row-level throughput still requires a person to drive the platform. At the highest stiffness values tested, success rates drop — the policy hasn't fully learned to push hard enough without losing contact.
                {' '}The bigger open problem is outdoor deployment. Wind causes the stalk to sway continuously, which breaks the locked push-point assumption and disrupts the force–deflection signal the GRU relies on. The current system was developed and evaluated in controlled indoor conditions; making it robust to field dynamics is the most significant gap between the lab and real agricultural use.
              </p>

            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section className={clsx(secondaryBgColor, textColor)}>
          <div className='layout py-10 text-center'>
            <h2 className='mb-6'>Paper &amp; Contact</h2>
            <div className='flex flex-wrap items-center justify-center gap-3'>
              <a
                href={siteContent.links.arxiv}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 rounded-full bg-gray-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700'
              >
                <img src={asset('/svg/arxiv.svg')} alt='arXiv' className='h-5 w-5' />
                arXiv
              </a>
              <a
                href='mailto:yogeshchawla2850@gmail.com'
                className='flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
                Contact
              </a>
            </div>
          </div>
        </section>

        {/* ── Citation ─────────────────────────────────────────────────── */}
        <section id='citation' className={clsx(secondaryBgColor, textColor)}>
          <div className='layout pb-48 pt-12'>
            <h2 className='mb-4'>Citation</h2>
            <pre className='ml-12 overflow-x-auto text-sm'>{siteContent.citation}</pre>
          </div>
        </section>

      <footer className='bg-white'>
        <div className='layout py-8 text-center text-sm text-gray-500'>
          Website template modified from{' '}
          <a
            href='https://co-me-tokens.github.io/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-2 hover:text-gray-700'
          >
            Co-Me
          </a>
          .
        </div>
      </footer>

      </main>
    </>
  );
}
