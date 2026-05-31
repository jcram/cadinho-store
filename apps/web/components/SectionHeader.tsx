import Link from "next/link";
import { cn } from "@/lib/cn";
import { Waveform } from "@/components/Waveform";

type SectionHeaderProps = {
  title: string;
  action?: { label: string; href: string };
  tone?: "cream" | "dark";
  className?: string;
};

export function SectionHeader({
  title,
  action,
  tone = "cream",
  className,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div className="flex items-center gap-5">
        <h2
          className={cn(
            "text-2xl uppercase tracking-[0.12em] sm:text-3xl",
            dark ? "text-cream" : "text-sepia",
          )}
        >
          {title}
        </h2>
        <Waveform
          className="hidden h-8 sm:flex"
          barClassName={dark ? "bg-cream/30" : "bg-sepia/35"}
        />
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn(
            "shrink-0 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-colors",
            dark
              ? "text-cream/70 hover:text-cream"
              : "text-sepia-light hover:text-accent",
          )}
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
