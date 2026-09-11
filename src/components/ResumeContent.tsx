import SectionHeading from '@/components/SectionHeading';

const ResumeContent = () => {
  return (
    <div className="py-16">
      <SectionHeading
        title="Résumé"
        action={
          <a
            href="/resume.pdf"
            download
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-gray-900 hover:bg-gray-900/[0.04] dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-400 dark:hover:bg-gray-50/[0.04]"
          >
            Download PDF
          </a>
        }
      />

      <div className="mt-10 overflow-hidden rounded-lg border border-gray-200 bg-surface transition-colors dark:border-gray-800 dark:bg-gray-800/40">
        <iframe
          src="/resume.pdf"
          className="block h-[80vh] min-h-[560px] w-full"
          title="Resume PDF"
        />
      </div>
    </div>
  );
};

export default ResumeContent;
