import type { HTMLAttributes } from "react";

type ChipProps = HTMLAttributes<HTMLSpanElement>;

export default function Chip({ className = "", ...props }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[rgba(245,243,238,0.1)] bg-[rgba(17,17,17,0.6)] px-3 py-1 text-xs font-medium tracking-tight text-[var(--color-text-secondary)]  ${className}`}
      {...props}
    />
  );
}

