import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { workExperiences } from '@/configs/workExperienceConfigs';

const WorkExperienceSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="my-10">
      <style>{`
        .work-exp-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease-in-out, opacity 0.25s ease-in-out;
        }
        .work-exp-content.open {
          max-height: 1000px;
          opacity: 1;
        }
      `}</style>

      <div className="prose prose-lg dark:prose-dark">
        <h2>Work Experience</h2>
      </div>

      <div className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm shadow-gray-200/60 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
        {workExperiences.map((exp) => {
          const isOpen = openId === exp.id;

          return (
            <div key={exp.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : exp.id)}
                aria-expanded={isOpen}
                className={`group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors sm:px-7 ${
                  isOpen
                    ? 'bg-gray-50 dark:bg-gray-800/60'
                    : 'hover:bg-gray-50/80 dark:hover:bg-gray-800/40'
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-md ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 ${exp.color}`}
                >
                  {exp.logo}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {exp.role}
                    </span>
                    <span className="text-gray-400">·</span>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      {exp.company}
                    </span>
                    {exp.current && (
                      <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Current
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block truncate text-sm text-gray-500 dark:text-gray-400">
                    {exp.summary}
                  </span>
                </span>

                <span className="hidden shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400 sm:inline-block">
                  {exp.period}
                </span>

                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 rounded-full text-gray-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`work-exp-content ${isOpen ? 'open' : ''} bg-gray-50 dark:bg-gray-800/60`}
              >
                <div className="px-5 pb-6 pt-1 sm:px-7">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400 sm:hidden">
                    {exp.period}
                  </p>
                  <p className="mb-4 text-sm text-gray-400">
                    {exp.location}
                  </p>
                  <ul className="space-y-3 border-l-2 border-primary-200 pl-4 dark:border-primary-900">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkExperienceSection;
