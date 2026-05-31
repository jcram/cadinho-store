"use client";

import { use, useEffect, useState } from "react";
import type { Disco } from "@cadinho/shared";
import { DiscoForm } from "@/components/admin/DiscoForm";
import { api } from "@/lib/api";

export default function EditDiscoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [disco, setDisco] = useState<Disco | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getDisco(id)
      .then(setDisco)
      .catch(() => setError("Disco não encontrado."));
  }, [id]);

  if (error) return <p className="font-body text-sm text-accent">{error}</p>;
  if (!disco)
    return <p className="font-body text-sm text-sepia-light">Carregando…</p>;

  return <DiscoForm disco={disco} />;
}
