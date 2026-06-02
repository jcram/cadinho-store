import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Waveform } from "@/components/Waveform";
import { fetchEventoBySlug } from "@/lib/eventos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const evento = await fetchEventoBySlug(slug);
  if (!evento) return { title: "Encontro não encontrado — Cadinho Cultural" };
  return {
    title: `${evento.nome} — Cadinho Cultural`,
    description: evento.descricao,
  };
}

export default async function EventoDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const evento = await fetchEventoBySlug(slug);
  if (!evento) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/agenda"
        className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sepia-light transition-colors hover:text-accent"
      >
        ← Agenda
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Foto */}
        <div className="relative aspect-[4/3] overflow-hidden border border-sepia/20 bg-sepia/10">
          {evento.fotoUrl ? (
            <Image
              src={evento.fotoUrl}
              alt={`Foto de ${evento.nome}`}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              unoptimized
              priority
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full items-center justify-center text-sepia/30"
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="flex flex-col">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            {evento.tipo}
          </span>
          <h1 className="mt-3 text-3xl uppercase leading-tight tracking-[0.06em] text-sepia sm:text-4xl">
            {evento.nome}
          </h1>

          <Waveform className="mt-6 h-7" barClassName="bg-sepia/30" />

          <p className="mt-6 max-w-prose whitespace-pre-line font-body text-sm leading-relaxed text-ink/80">
            {evento.descricao}
          </p>

          {evento.link ? (
            <Button
              href={evento.link}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-8 w-full sm:w-auto"
            >
              Garantir presença
            </Button>
          ) : (
            <p className="mt-8 font-body text-xs uppercase tracking-[0.16em] text-sepia-light">
              Inscrições em breve
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
