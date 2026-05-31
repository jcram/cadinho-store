"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Disco } from "@cadinho/shared";
import { Button } from "@/components/Button";
import { api } from "@/lib/api";

function formatPreco(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function AdminDiscosPage() {
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setDiscos(await api.listDiscos());
      setError(null);
    } catch {
      setError("Não foi possível carregar os discos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(disco: Disco) {
    if (!confirm(`Remover "${disco.titulo}"?`)) return;
    await api.removeDisco(disco.id);
    setDiscos((prev) => prev.filter((d) => d.id !== disco.id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-wide text-sepia">
          Discos
        </h1>
        <Button href="/admin/discos/new" variant="primary">
          Novo disco
        </Button>
      </div>

      {loading && (
        <p className="mt-8 font-body text-sm text-sepia-light">Carregando…</p>
      )}
      {error && <p className="mt-8 font-body text-sm text-accent">{error}</p>}

      {!loading && !error && discos.length === 0 && (
        <p className="mt-8 font-body text-sm text-sepia-light">
          Nenhum disco cadastrado ainda.
        </p>
      )}

      {discos.length > 0 && (
        <div className="mt-8 overflow-x-auto border border-ink/10">
          <table className="w-full border-collapse font-body text-sm">
            <thead>
              <tr className="bg-cream-dark text-left text-xs uppercase tracking-[0.14em] text-sepia">
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Artista</th>
                <th className="px-4 py-3">Gênero</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Destaque</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {discos.map((d) => (
                <tr key={d.id} className="border-t border-ink/10">
                  <td className="px-4 py-3 font-bold text-ink">{d.titulo}</td>
                  <td className="px-4 py-3 text-sepia">{d.artista}</td>
                  <td className="px-4 py-3 text-sepia-light">{d.genero}</td>
                  <td className="px-4 py-3 text-sepia">{formatPreco(d.preco)}</td>
                  <td className="px-4 py-3 text-sepia-light">{d.status}</td>
                  <td className="px-4 py-3 text-sepia-light">
                    {d.destaque ? "Sim" : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3 text-xs uppercase tracking-[0.14em]">
                      <Link
                        href={`/admin/discos/${d.id}`}
                        className="text-sepia hover:text-accent"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(d)}
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
