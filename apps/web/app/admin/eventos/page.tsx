"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Evento } from "@cadinho/shared";
import { Button } from "@/components/Button";
import { api } from "@/lib/api";

export default function AdminEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setEventos(await api.listEventos());
      setError(null);
    } catch {
      setError("Não foi possível carregar os encontros.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(evento: Evento) {
    if (!confirm(`Remover "${evento.nome}"?`)) return;
    await api.removeEvento(evento.id);
    setEventos((prev) => prev.filter((e) => e.id !== evento.id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-wide text-sepia">
          Encontros
        </h1>
        <Button href="/admin/eventos/new" variant="primary">
          Novo encontro
        </Button>
      </div>

      {loading && (
        <p className="mt-8 font-body text-sm text-sepia-light">Carregando…</p>
      )}
      {error && <p className="mt-8 font-body text-sm text-accent">{error}</p>}

      {!loading && !error && eventos.length === 0 && (
        <p className="mt-8 font-body text-sm text-sepia-light">
          Nenhum encontro cadastrado ainda.
        </p>
      )}

      {eventos.length > 0 && (
        <div className="mt-8 overflow-x-auto border border-ink/10">
          <table className="w-full border-collapse font-body text-sm">
            <thead>
              <tr className="bg-cream-dark text-left text-xs uppercase tracking-[0.14em] text-sepia">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">Destaque</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((e) => (
                <tr key={e.id} className="border-t border-ink/10">
                  <td className="px-4 py-3 font-bold text-ink">{e.nome}</td>
                  <td className="px-4 py-3 text-sepia">{e.tipo}</td>
                  <td className="px-4 py-3 text-sepia-light">
                    {e.link ? "Sim" : "—"}
                  </td>
                  <td className="px-4 py-3 text-sepia-light">
                    {e.destaque ? "Sim" : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3 text-xs uppercase tracking-[0.14em]">
                      <Link
                        href={`/admin/eventos/${e.id}`}
                        className="text-sepia hover:text-accent"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(e)}
                        className="cursor-pointer text-accent hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
