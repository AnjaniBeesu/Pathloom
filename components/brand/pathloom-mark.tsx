import { cn } from "@/lib/utils";

export function PathloomMark({ className }: { className?: string }) {
  return (
    <svg className={cn("h-7 w-7", className)} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 7.5c0-1.1.9-2 2-2h6.5c1.1 0 2 .9 2 2v3.1c0 1.1-.9 2-2 2H10c-1.1 0-2 .9-2 2v3.9c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M22 20.5c0 1.1-.9 2-2 2h-6.5c-1.1 0-2-.9-2-2v-3.1c0-1.1.9-2 2-2H18c1.1 0 2-.9 2-2v-3.9c0-1.1-.9-2-2-2H8c-1.1 0-2-.9-2-2" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="22" cy="20.5" r="1.8" fill="var(--accent)" />
    </svg>
  );
}
