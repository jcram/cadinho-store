import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EventoCard } from "@/components/EventoCard";
import { Waveform } from "@/components/Waveform";
import { fetchEventos } from "@/lib/eventos";

export const metadata: Metadata = {
  title: "Agenda — Cadinho Cultural",
  description: "Todos os encontros do Cadinho Cultural.",
};

export default async function AgendaPage() {
  const eventos = await fetchEventos();

  return (
    <Container className="py-16">
      <header>
        <h1 className="text-3xl uppercase tracking-[0.12em] text-sepia sm:text-4xl">
          Agenda
        </h1>
        <p className="mt-3 font-body text-sm text-sepia-light">
          {eventos.length > 0
            ? `${eventos.length} ${eventos.length === 1 ? "encontro" : "encontros"}`
            : "Agenda em construção"}
        </p>
        <Waveform className="mt-6 h-8" barClassName="bg-sepia/30" />
      </header>

      {eventos.length === 0 ? (
        <p className="mt-10 font-body text-sm text-sepia-light">
          Em breve, novos encontros por aqui.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      )}
    </Container>
  );
}
