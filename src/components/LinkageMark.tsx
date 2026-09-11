type Props = {
  className?: string;
};

/** A two-link chain with three joints — the same vocabulary as Fig. 1. */
export default function LinkageMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 19.5 11 11.5 19.5 14" />
      <circle cx="4.5" cy="19.5" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="11.5" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="14" r="2.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
