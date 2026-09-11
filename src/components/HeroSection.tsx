'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import CustomLink from '@/components/CustomLink';

const KinematicBand = dynamic(() => import('@/components/KinematicBand'), {
  ssr: false,
  loading: () => (
    <div className="drafting-grid h-[160px] w-full rounded-xl border border-gray-300/70 bg-surface dark:border-gray-800 dark:bg-gray-950/40 sm:h-[240px] lg:h-[300px]" />
  ),
});

const ROLES = ['Software Engineer', 'AI Engineer', 'Robotics Researcher'];

/** Corner registration marks, as on a drawing plate. */
const CORNERS = [
  '-left-2 -top-2 border-l border-t',
  '-right-2 -top-2 border-r border-t',
  '-bottom-2 -left-2 border-b border-l',
  '-bottom-2 -right-2 border-b border-r',
];

export default function HeroSection() {
  // Render the first role on the server so the line is never empty, then hand
  // over to the typewriter once hydrated.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="py-16 lg:py-20">
      <div className="grid items-center gap-x-10 gap-y-12 md:grid-cols-12 lg:gap-x-14">
        <div className="md:col-span-7">
          <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
            HI, I AM
          </p>

          <h1 className="display mt-3 text-[clamp(2.75rem,8.5vw,5.75rem)] font-bold text-gray-900 dark:text-gray-50">
            ALLEN WANG
          </h1>

          <p className="mt-6 flex min-h-11 items-center text-2xl font-semibold text-primary-600 dark:text-primary-400 sm:text-3xl">
            {mounted ? (
              <TypeAnimation
                sequence={[ROLES[0], 2000, ROLES[1], 2000, ROLES[2], 2000]}
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
              />
            ) : (
              <span>{ROLES[0]}</span>
            )}
          </p>

          <p className="mt-6 max-w-measure font-serif text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            I build end-to-end AI systems and applications. Currently in the
            robotics sector, focusing on research of Vision-Language-Action
            (VLA) models and cross embodiment problems.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
            <CustomLink
              href="#writing"
              className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-primary-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-primary-400"
            >
              Read the notes
            </CustomLink>
            <CustomLink
              href="#work"
              className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:border-gray-900 hover:bg-gray-900/[0.04] dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-400 dark:hover:bg-gray-50/[0.04]"
            >
              See the work
            </CustomLink>
          </div>
        </div>

        <div className="md:col-span-5">
          <figure className="m-0 w-full max-w-[22rem] md:mx-auto lg:max-w-[26rem]">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/10 dark:bg-gray-800 dark:ring-gray-50/10">
                <Image
                  src="/photo.jpg"
                  alt="Allen Wang"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 100vw"
                  priority
                />
              </div>
              {CORNERS.map((corner) => (
                <span
                  key={corner}
                  aria-hidden
                  className={`pointer-events-none absolute size-5 border-primary-600/45 dark:border-primary-400/45 ${corner}`}
                />
              ))}
            </div>

            <figcaption className="mt-5 font-mono text-xs text-gray-500 dark:text-gray-400">
              Research Assistant at Academia Sinica, Taipei
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mt-14 lg:mt-16">
        <KinematicBand />
      </div>
    </div>
  );
}
