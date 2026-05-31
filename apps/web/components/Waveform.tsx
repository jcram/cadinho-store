import { cn } from "@/lib/cn";

// Motivo gráfico de onda sonora usado nos cabeçalhos de seção.
// Alturas fixas (determinísticas) para render estável no servidor.
const BARS = [
  6, 14, 9, 20, 28, 16, 34, 22, 40, 18, 30, 12, 24, 38, 14, 8, 26, 36, 20, 10,
  32, 16, 42, 24, 12, 28, 18, 8, 22, 34, 14, 6,
];

export function Waveform({
  className,
  barClassName,
}: {
  className?: string;
  barClassName?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-[3px] h-10", className)}
    >
      {BARS.map((h, i) => (
        <span
          key={i}
          className={cn("w-[3px] rounded-full bg-sepia/40", barClassName)}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}
