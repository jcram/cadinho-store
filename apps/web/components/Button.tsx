import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-body text-xs font-bold uppercase tracking-[0.18em] px-6 py-3 transition-colors duration-200 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-sepia",
  outline: "border border-current hover:bg-current/10",
  ghost: "hover:text-accent",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: AsButton | AsLink) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
