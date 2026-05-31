import { Container } from "@/components/Container";
import { DiscoCard } from "@/components/DiscoCard";
import { SectionHeader } from "@/components/SectionHeader";
import { fetchDiscos } from "@/lib/discos";

export async function GarimpoDaSemana() {
  const discos = (await fetchDiscos({ destaque: true })).slice(0, 5);

  return (
    <Container className="py-16">
      <SectionHeader
        title="Garimpo da Semana"
        action={{ label: "Ver todos os discos", href: "/discos" }}
      />

      {discos.length === 0 ? (
        <p className="mt-8 font-body text-sm text-sepia-light">
          Em breve, novos garimpos por aqui.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {discos.map((d) => (
            <DiscoCard key={d.id} disco={d} />
          ))}
        </div>
      )}
    </Container>
  );
}
