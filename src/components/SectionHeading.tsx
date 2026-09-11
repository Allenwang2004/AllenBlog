type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function SectionHeading({ title, description, action }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-gray-200 pb-4 dark:border-gray-800">
      <div>
        <h2 className="display-tight text-3xl font-bold text-gray-900 dark:text-gray-50 sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-measure font-serif text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
