import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { DiscoCard } from "@/components/DiscoCard";
import { Waveform } from "@/components/Waveform";
import { fetchDiscos } from "@/lib/discos";

export const metadata: Metadata = {
  title: "Discos — Cadinho Cultural",
  description: "Todo o acervo de discos do Cadinho Cultural.",
};

export default async function DiscosPage() {
  const discos = await fetchDiscos();

  return (
    <Container className="py-16">
      <header>
        <h1 className="text-3xl uppercase tracking-[0.12em] text-sepia sm:text-4xl">
          Discos
        </h1>
        <p className="mt-3 font-body text-sm text-sepia-light">
          {discos.length > 0
            ? `${discos.length} ${discos.length === 1 ? "disco" : "discos"} no acervo`
            : "Acervo em construção"}
        </p>
        <Waveform className="mt-6 h-8" barClassName="bg-sepia/30" />
      </header>

      {discos.length === 0 ? (
        <p className="mt-10 font-body text-sm text-sepia-light">
          Em breve, novos discos por aqui.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {discos.map((d) => (
            <DiscoCard key={d.id} disco={d} />
          ))}
        </div>
      )}
    </Container>
  );
}
