import Image from "next/image";
import Link from "next/link";
import type { Evento } from "@cadinho/shared";
import { Card } from "@/components/Card";
import { cn } from "@/lib/cn";

// Placeholder de imagem para encontros sem foto.
function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center bg-white/5", className)}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="text-cream/25"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    </div>
  );
}

export function EventoCard({ evento }: { evento: Evento }) {
  return (
    <Link href={`/agenda/${evento.slug}`} className="group block">
      <Card
        tone="dark"
        className="flex h-full flex-col overflow-hidden group-hover:border-white/40"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {evento.fotoUrl ? (
            <Image
              src={evento.fotoUrl}
              alt={`Foto de ${evento.nome}`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder className="h-full w-full" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-accent">
            {evento.tipo}
          </span>
          <h3 className="mt-2 text-base uppercase tracking-[0.1em] text-cream group-hover:text-accent">
            {evento.nome}
          </h3>
          <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-cream/70">
            {evento.descricao}
          </p>
          <span className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream/60 group-hover:text-accent">
            Ver detalhes →
          </span>
        </div>
      </Card>
    </Link>
  );
}
