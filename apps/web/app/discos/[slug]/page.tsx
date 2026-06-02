import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Waveform } from "@/components/Waveform";
import { ComprarButton } from "@/components/ComprarButton";
import { fetchDiscoBySlug } from "@/lib/discos";

function formatPreco(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const disco = await fetchDiscoBySlug(slug);
  if (!disco) return { title: "Disco não encontrado — Cadinho Cultural" };
  return {
    title: `${disco.titulo} — ${disco.artista} | Cadinho Cultural`,
    description: disco.descricao ?? `${disco.titulo}, de ${disco.artista}.`,
  };
}

export default async function DiscoDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const disco = await fetchDiscoBySlug(slug);
  if (!disco) notFound();

  const disponivel = disco.status === "disponivel" && disco.estoque > 0;

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/discos"
        className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sepia-light transition-colors hover:text-accent"
      >
        ← Discos
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Capa */}
        <div className="relative aspect-square overflow-hidden border border-sepia/20 bg-sepia/10">
          {disco.capaUrl ? (
            <Image
              src={disco.capaUrl}
              alt={`Capa de ${disco.titulo}`}
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
            {disco.genero} · {disco.ano}
          </span>
          <h1 className="mt-3 text-3xl uppercase leading-tight tracking-[0.06em] text-sepia sm:text-4xl">
            {disco.titulo}
          </h1>
          <p className="mt-2 font-body text-base text-sepia-light">
            {disco.artista}
          </p>

          <Waveform className="mt-6 h-7" barClassName="bg-sepia/30" />

          <p className="mt-6 text-2xl font-bold text-ink">
            {formatPreco(disco.preco)}
          </p>
          <p className="mt-1 font-body text-xs uppercase tracking-[0.16em] text-sepia-light">
            {disponivel
              ? `Disponível · ${disco.estoque} em estoque`
              : "Esgotado"}
          </p>

          {disco.descricao && (
            <p className="mt-6 max-w-prose font-body text-sm leading-relaxed text-ink/80">
              {disco.descricao}
            </p>
          )}

          <ComprarButton disco={disco} disponivel={disponivel} />
        </div>
      </div>
    </Container>
  );
}
