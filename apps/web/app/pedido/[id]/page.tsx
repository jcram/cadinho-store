import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PedidoStatus } from "@/components/PedidoStatus";
import { fetchPedido } from "@/lib/pedidos";

export const metadata: Metadata = {
  title: "Pedido — Cadinho Cultural",
};

export default async function PedidoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pedido = await fetchPedido(id);
  if (!pedido) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/discos"
        className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sepia-light transition-colors hover:text-accent"
      >
        ← Discos
      </Link>
      <PedidoStatus pedido={pedido} />
    </Container>
  );
}
