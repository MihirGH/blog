export function Label({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`uppercase tracking-wide text-gray-700 text-lg font-bold ${className}`}
    >
      {label}
    </span>
  );
}
