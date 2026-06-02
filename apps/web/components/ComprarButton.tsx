"use client";

import { useRouter } from "next/navigation";
import type { Disco } from "@cadinho/shared";
import { Button } from "@/components/Button";

export function ComprarButton({
  disco,
  disponivel,
}: {
  disco: Disco;
  disponivel: boolean;
}) {
  const router = useRouter();

  if (!disponivel) {
    return (
      <Button
        variant="outline"
        className="mt-8 w-full cursor-not-allowed opacity-60 sm:w-auto"
        disabled
      >
        Esgotado
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      className="mt-8 w-full sm:w-auto"
      onClick={() => router.push(`/checkout?disco=${disco.slug}`)}
      aria-label={`Comprar ${disco.titulo}`}
    >
      Comprar com Pix
    </Button>
  );
}
