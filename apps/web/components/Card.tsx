import { cn } from "@/lib/cn";

type CardProps = {
  tone?: "cream" | "dark";
  className?: string;
  children: React.ReactNode;
};

export function Card({ tone = "cream", className, children }: CardProps) {
  return (
    <div
      className={cn(
        "border transition-colors duration-200",
        tone === "cream"
          ? "border-sepia/20 bg-cream-dark/40 hover:border-sepia/50"
          : "border-white/10 bg-ink-soft text-cream hover:border-white/30",
        className,
      )}
    >
      {children}
    </div>
  );
}
