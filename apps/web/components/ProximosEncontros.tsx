import Image from "next/image";
import Link from "next/link";
import type { Evento } from "@cadinho/shared";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { fetchEventos } from "@/lib/eventos";
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

function EventoCard({ evento }: { evento: Evento }) {
  return (
    <Card tone="dark" className="flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full">
        {evento.fotoUrl ? (
          <Image
            src={evento.fotoUrl}
            alt={`Foto de ${evento.nome}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            unoptimized
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-accent">
          {evento.tipo}
        </span>
        <h3 className="mt-2 text-base uppercase tracking-[0.1em] text-cream">
          {evento.nome}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-cream/70">
          {evento.descricao}
        </p>
        {evento.link && (
          <Button
            href={evento.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="mt-5 self-start text-cream"
          >
            Saiba Mais
          </Button>
        )}
      </div>
    </Card>
  );
}

export async function ProximosEncontros() {
  const eventos = await fetchEventos({ destaque: true });

  return (
    <Container className="py-16">
      <div>
        <h2 className="text-2xl uppercase tracking-[0.12em] text-sepia sm:text-3xl">
          Próximos Encontros
        </h2>
        <Link
          href="/agenda"
          className="mt-2 inline-block font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sepia-light transition-colors hover:text-accent"
        >
          Ver agenda completa →
        </Link>
      </div>

      {eventos.length === 0 ? (
        <p className="mt-8 font-body text-sm text-sepia-light">
          Em breve, novos encontros por aqui.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      )}
    </Container>
  );
}
