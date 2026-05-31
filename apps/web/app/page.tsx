import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { Waveform } from "@/components/Waveform";
import { ProximosEncontros } from "@/components/ProximosEncontros";
import { GarimpoDaSemana } from "@/components/GarimpoDaSemana";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <Image
          src="/hero.png"
          alt="Toca-discos vintage com vinil girando ao lado de uma pilha de discos sob luz de lampião"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />
        <Container className="relative z-10 py-28 sm:py-40">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-cream/60">
            Cadinho Cultural
          </p>
          <h1 className="mt-6 text-5xl uppercase leading-none tracking-[0.06em] sm:text-7xl">
            Cadinho
          </h1>
          <p className="mt-3 font-display text-xl uppercase tracking-[0.2em] text-accent">
            Música é Presença
          </p>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-cream/80">
            Discos, conversas e encontros que continuam girando.
          </p>
          <Waveform className="mt-8 h-10" barClassName="bg-accent/70" />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/discos">Explorar discos</Button>
            <Button href="/radio" variant="outline">
              Ouvir rádio
            </Button>
          </div>
        </Container>
      </section>

      {/* Garimpo da Semana — discos em destaque vindos da API */}
      <GarimpoDaSemana />

      {/* Próximos Encontros — layout pronto, dados virão do backend */}
      <ProximosEncontros />

      {/* Bloco escuro de demonstração (estilo Rádio) */}
      <section className="bg-ink text-cream">
        <Container className="py-16">
          <SectionHeader title="Rádio Cadinho" tone="dark" />
          <Card tone="dark" className="mt-8 flex items-center gap-5 p-6">
            <button
              type="button"
              aria-label="Tocar"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7L8 5Z" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                ● Ao Vivo
              </p>
              <p className="truncate font-body text-sm text-cream/80">
                Agora no ar — sessão de jazz brasileiro
              </p>
            </div>
            <Waveform
              className="hidden h-8 sm:flex"
              barClassName="bg-cream/30"
            />
          </Card>
        </Container>
      </section>
    </>
  );
}
