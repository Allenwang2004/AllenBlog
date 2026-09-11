import Image from 'next/image';
import { useState } from 'react';

import CustomLink from '@/components/CustomLink';
import SectionHeading from '@/components/SectionHeading';
import { workExperiences } from '@/configs/workExperienceConfigs';

/**
 * The roles are genuinely a sequence, so they get a timeline rail. Joint
 * markers on the rail echo the linkage in Fig. 1.
 */
const WorkExperienceSection = () => {
  const [openId, setOpenId] = useState<string | null>(
    workExperiences[0]?.id ?? null
  );

  return (
    <section id="work" className="py-8">
      <SectionHeading title="Work" />

      <ol className="mt-12">
        {workExperiences.map((exp, index) => {
          const isOpen = openId === exp.id;
          const isLast = index === workExperiences.length - 1;
          const tileRadius =
            exp.logoShape === 'circle' ? 'rounded-full' : 'rounded-lg';

          return (
            <li
              key={exp.id}
              className="grid gap-x-10 lg:grid-cols-[8.5rem_1fr]"
            >
              <p className="tabular hidden pt-8 font-mono text-sm leading-6 text-gray-500 dark:text-gray-400 lg:block">
                {exp.period}
              </p>

              <div
                className={`relative pl-8 ${
                  isLast
                    ? 'pb-2'
                    : 'border-l border-gray-200 pb-2 dark:border-gray-800'
                }`}
              >
                <h3 className="sr-only">
                  {exp.role}, {exp.company}
                </h3>

                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : exp.id)}
                  aria-expanded={isOpen}
                  className="group relative flex w-full items-center gap-5 rounded-md py-7 text-left"
                >
                  {isLast && (
                    <span
                      aria-hidden
                      className="absolute left-[-32px] top-0 h-1/2 w-px bg-gray-200 dark:bg-gray-800"
                    />
                  )}

                  {/* Joint marker: inked ring over a paper core. */}
                  <span
                    aria-hidden
                    className={`absolute left-[-37.5px] top-1/2 size-[11px] -translate-y-1/2 rounded-full border-2 bg-paper transition-colors dark:bg-gray-900 ${
                      exp.current
                        ? 'border-brass-500'
                        : 'border-gray-400 dark:border-gray-600'
                    }`}
                  />
                  <span
                    className={`relative flex size-20 shrink-0 items-center justify-center overflow-hidden bg-surface ring-1 ring-gray-900/[0.07] transition-shadow group-hover:ring-gray-900/20 dark:bg-gray-800 dark:ring-gray-50/10 dark:group-hover:ring-gray-50/25 sm:size-28 ${tileRadius}`}
                    style={
                      exp.logoBg ? { backgroundColor: exp.logoBg } : undefined
                    }
                  >
                    {exp.image ? (
                      <Image
                        src={exp.image}
                        alt=""
                        layout="fill"
                        objectFit={exp.logoBg ? 'contain' : 'cover'}
                        sizes="112px"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        {exp.logo}
                      </span>
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="font-serif text-[1.375rem] font-semibold leading-tight text-gray-700 decoration-primary-500/50 underline-offset-4 group-hover:underline dark:text-gray-200 sm:text-2xl">
                        {exp.role}
                      </span>
                      <span className="text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brass-100 px-2.5 py-0.5 text-xs font-medium text-brass-600 dark:bg-brass-900/60 dark:text-brass-300">
                          <span className="size-1.5 rounded-full bg-brass-500" />
                          Current
                        </span>
                      )}
                    </span>

                    <span className="tabular mt-2 block font-mono text-sm text-gray-500 dark:text-gray-400 lg:hidden">
                      {exp.period}
                    </span>
                  </span>

                  <span className="shrink-0 self-center text-sm font-medium text-gray-400 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {isOpen ? 'Less' : 'More'}
                  </span>
                </button>

                <div className={`disclosure ${isOpen ? 'open' : ''}`}>
                  <div>
                    <div className="pb-8 sm:pl-32">
                      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                        {exp.location}
                      </p>

                      <ul className="mt-5 max-w-measure space-y-4">
                        {exp.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="relative pl-6 font-serif text-[17px] leading-relaxed text-gray-700 dark:text-gray-300"
                          >
                            <span
                              aria-hidden
                              className="absolute left-0 top-[0.7em] h-px w-3 bg-primary-500"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {exp.link && (
                        <CustomLink
                          href={exp.link.href}
                          className="group/link mt-7 flex max-w-measure items-center gap-4 rounded-lg border border-gray-200 bg-surface p-3 transition-colors hover:border-gray-400 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-600"
                        >
                          <span className="h-20 w-28 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
                            {(exp.link.image ?? exp.image) && (
                              <img
                                src={exp.link.image ?? exp.image}
                                alt=""
                                className="size-full object-cover"
                              />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-base font-semibold text-gray-900 group-hover/link:text-primary-600 dark:text-gray-100 dark:group-hover/link:text-primary-400">
                              {exp.link.title}
                            </span>
                            <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                              {exp.link.description}
                            </span>
                          </span>
                        </CustomLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default WorkExperienceSection;
