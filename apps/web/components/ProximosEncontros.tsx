import Link from "next/link";
import { Container } from "@/components/Container";
import { EventoCard } from "@/components/EventoCard";
import { fetchEventos } from "@/lib/eventos";

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
