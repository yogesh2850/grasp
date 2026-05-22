'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import '@/lib/env';

import Figure from '@/components/Figure';
import ImageCompare from '@/components/Compare';
import VideoCompare from '@/components/VideoCompare';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import { siteContent } from '@/constant/site-content';
import { asset } from '@/lib/asset';

/* ─── Nav ───────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Abstract',    href: '#abstract'     },
  { label: 'Overview',    href: '#overview'     },
  { label: 'Methodology', href: '#methodology'  },
  { label: 'Results',     href: '#results'      },
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
                      ? 'bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent'
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
                  {i > 0 && ', '}
                  {author.url ? (
                    <a
                      href={author.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline decoration-white/40 underline-offset-2 transition-colors hover:text-black hover:decoration-black'
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
              className='mb-6 flex flex-col items-center gap-1.5 text-sm font-light text-white/75'
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
                { href: siteContent.links.arxiv,   icon: '/svg/arxiv.svg',   label: 'arXiv Page',   alt: 'arXiv'   },
                { href: siteContent.links.github,  icon: '/svg/github.svg',  label: 'GitHub Repo',  alt: 'GitHub'  },
                { href: siteContent.links.dataset, icon: '/svg/dataset.svg', label: 'Dataset',      alt: 'Dataset' },
              ].map(({ href, icon, label, alt }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
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
            <video autoPlay loop muted
              className='absolute inset-0 z-[2] h-full w-full object-cover object-top'
              style={{ opacity: 0.4 }}>
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
            <h2 className='pb-6 text-center'>Abstract</h2>

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

            <p className='text-pretty'>{siteContent.abstract}</p>
          </div>
        </section>

        {/* ── Overview ─────────────────────────────────────────────────── */}
        <section id='overview' className='bg-dark py-12 text-gray-200'>
          <div className='layout'>
            <h2 className='pb-6 text-white'>Overview</h2>
            <div className='grid gap-8 md:grid-cols-3'>
              {[
                {
                  title: 'Problem',
                  body: 'Maize stalk rot causes 10–30% annual yield losses by degrading internal stem tissue while leaving the outer canopy visually intact. The current field standard — a manual push test — cannot scale to the 30,000+ plants per acre needed for population-level assessment.',
                },
                {
                  title: 'Approach',
                  body: 'GRASP trains a mobile manipulator entirely in GPU-accelerated simulation (NVIDIA Isaac Lab) using reinforcement learning with deformable plant models. A SAM 3 → YOLOv8-seg perception pipeline provides real-time stalk segmentation without any manual labelling.',
                },
                {
                  title: 'Key Result',
                  body: 'The RL policy successfully transfers from simulation to the physical xArm6 + Bunker Pro platform, executing controlled lateral push tests and recovering a continuous stiffness estimate — the first fully autonomous robotic push-test system for maize stalk phenotyping.',
                },
              ].map(({ title, body }) => (
                <div key={title} className='rounded-xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur'>
                  <h3 className='mb-2 text-lg font-semibold text-primary-400'>{title}</h3>
                  <p className='text-sm leading-relaxed text-gray-300'>{body}</p>
                </div>
              ))}
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
              <div className='mx-auto max-w-2xl overflow-hidden rounded-xl border border-gray-200'>
                <img
                  src={asset('/images/thesis/hardware/hardware_complete.png')}
                  alt='GRASP hardware platform'
                  className='w-full object-contain'
                  loading='lazy'
                />
              </div>
            </div>

            {/* ── 2. Perception Pipeline ── */}
            <div className='mb-14'>
              <h3 className='mb-1 text-2xl font-semibold'>Perception Pipeline</h3>
              <p className='mb-6 text-sm leading-relaxed text-gray-500'>
                SAM&nbsp;3 zero-shot annotations are distilled into a real-time YOLOv8-seg model
                running at 30&nbsp;Hz. Drag each slider to compare input and output.
              </p>
              <div className='grid gap-6 md:grid-cols-2'>
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
                      {cmp.leftLabel} / {cmp.rightLabel}
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
            <div className='mb-14'>
              <h3 className='mb-1 text-2xl font-semibold'>Isaac Lab Setup</h3>
              <p className='mb-6 text-sm leading-relaxed text-gray-500'>
                Deformable maize plant models with FEM physics are placed in GPU-parallel Isaac Lab
                environments. Stalk stiffness is randomised log-uniformly over [10⁷, 10⁸]&nbsp;Pa
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
              <div className='mt-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-14 text-center text-sm text-gray-400'>
                <p className='font-medium'>Content coming soon</p>
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
                { stat: '10×',      label: 'Stiffness range covered',     sub: '10⁷ – 10⁸ Pa randomised' },
                { stat: '~1,500',   label: 'Field images auto-annotated', sub: 'Zero manual labelling' },
                { stat: 'Sim→Real', label: 'Policy transfer',             sub: 'xArm6 + Bunker Pro' },
              ].map(({ stat, label, sub }) => (
                <div key={label} className='rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm'>
                  <p className='mb-1 text-3xl font-bold text-primary-600'>{stat}</p>
                  <p className='text-sm font-medium text-gray-700'>{label}</p>
                  <p className='mt-1 text-xs text-gray-400'>{sub}</p>
                </div>
              ))}
            </div>

            {/* Qualitative sim results */}
            <h3 className='mb-3 text-xl font-semibold'>Simulation Environment</h3>
            <p className='mb-10 text-sm leading-relaxed text-gray-500'>
              The RL policy was trained with up to 5 parallel Isaac Lab environments, each
              episode randomising stalk stiffness log-uniformly over [10⁷, 10⁸]&nbsp;Pa.
            </p>

            {/* Sim-to-real */}
            <h3 className='mb-3 text-xl font-semibold'>Sim-to-Real Transfer</h3>
            <p className='mb-10 text-sm leading-relaxed text-gray-500'>
              The trained policy was deployed on the physical xArm6 + Bunker&nbsp;Pro platform
              without any real-world fine-tuning. The perception pipeline (YOLOv8-seg + depth
              unprojection) ran in real time, providing 3-D push targets to the IK controller
              at 30&nbsp;Hz. Results showed successful stalk contact and lateral deflection
              across most tested conditions.
            </p>

            {/* Placeholder for result plots */}
            <div className='rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 text-center text-sm text-gray-400'>
              <p className='font-medium'>Result plots / videos coming soon</p>
              <p className='mt-1 text-xs'>
                Add learning curves, stiffness estimation plots, or demo videos here
              </p>
            </div>
          </div>
        </section>

        {/* ── Citation ─────────────────────────────────────────────────── */}
        <section id='citation' className={clsx(bgColor, textColor)}>
          <div className='layout pb-48 pt-12'>
            <h2 className='mb-4'>Citation</h2>
            <pre className='ml-12 overflow-x-auto text-sm'>{siteContent.citation}</pre>
          </div>
        </section>

      </main>
    </>
  );
}
