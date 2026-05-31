"use client";

import { use, useEffect, useState } from "react";
import type { Evento } from "@cadinho/shared";
import { EventoForm } from "@/components/admin/EventoForm";
import { api } from "@/lib/api";

export default function EditEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [evento, setEvento] = useState<Evento | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getEvento(id)
      .then(setEvento)
      .catch(() => setError("Encontro não encontrado."));
  }, [id]);

  if (error) return <p className="font-body text-sm text-accent">{error}</p>;
  if (!evento)
    return <p className="font-body text-sm text-sepia-light">Carregando…</p>;

  return <EventoForm evento={evento} />;
}
