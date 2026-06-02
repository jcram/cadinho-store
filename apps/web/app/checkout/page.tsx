import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CheckoutForm } from "@/components/CheckoutForm";
import { fetchDiscoBySlug } from "@/lib/discos";

export const metadata: Metadata = {
  title: "Checkout — Cadinho Cultural",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ disco?: string }>;
}) {
  const { disco: slug } = await searchParams;
  const disco = slug ? await fetchDiscoBySlug(slug) : null;
  const disponivel =
    disco && disco.status === "disponivel" && disco.estoque > 0;

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href={disco ? `/discos/${disco.slug}` : "/discos"}
        className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sepia-light transition-colors hover:text-accent"
      >
        ← Voltar
      </Link>

      <h1 className="mt-8 text-3xl uppercase tracking-[0.1em] text-sepia sm:text-4xl">
        Checkout
      </h1>

      {!disco ? (
        <p className="mt-8 font-body text-sm text-sepia-light">
          Disco não encontrado.{" "}
          <Link href="/discos" className="text-accent hover:underline">
            Ver o acervo
          </Link>
          .
        </p>
      ) : !disponivel ? (
        <p className="mt-8 font-body text-sm text-sepia-light">
          “{disco.titulo}” está esgotado no momento.
        </p>
      ) : (
        <CheckoutForm disco={disco} />
      )}
    </Container>
  );
}
