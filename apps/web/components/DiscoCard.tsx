import Image from "next/image";
import Link from "next/link";
import type { Disco } from "@cadinho/shared";
import { Card } from "@/components/Card";

function formatPreco(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function DiscoCard({ disco }: { disco: Disco }) {
  return (
    <Link href={`/discos/${disco.slug}`} className="group block">
      <Card className="p-3 group-hover:border-sepia/60">
        <div className="relative aspect-square overflow-hidden bg-sepia/10">
          {disco.capaUrl && (
            <Image
              src={disco.capaUrl}
              alt={`Capa de ${disco.titulo}`}
              fill
              sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <p className="mt-3 font-body text-sm font-bold text-ink group-hover:text-accent">
          {disco.titulo}
        </p>
        <p className="font-body text-xs text-sepia-light">{disco.artista}</p>
        <p className="mt-1 font-body text-[0.65rem] uppercase tracking-wider text-sepia-light/70">
          {disco.genero} · {disco.ano}
        </p>
        <p className="mt-2 font-body text-sm font-bold text-sepia">
          {formatPreco(disco.preco)}
        </p>
      </Card>
    </Link>
  );
}
