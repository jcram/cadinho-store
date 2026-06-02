"use client";

import { useEffect, useState } from "react";
import type { Pedido, PedidoStatus } from "@cadinho/shared";
import { api } from "@/lib/api";

function formatPreco(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_STYLE: Record<PedidoStatus, string> = {
  pendente: "bg-amber-200/60 text-amber-900",
  pago: "bg-emerald-200/60 text-emerald-900",
  cancelado: "bg-red-200/60 text-red-900",
};

const FILTROS: { label: string; value: string }[] = [
  { label: "Todos", value: "" },
  { label: "Pendentes", value: "pendente" },
  { label: "Pagos", value: "pago" },
  { label: "Cancelados", value: "cancelado" },
];

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    api
      .listPedidos(filtro || undefined)
      .then((data) => ativo && (setPedidos(data), setError(null)))
      .catch(() => ativo && setError("Não foi possível carregar os pedidos."))
      .finally(() => ativo && setLoading(false));
    return () => {
      ativo = false;
    };
  }, [filtro]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl tracking-wide text-sepia">
          Pedidos
        </h1>
        <div className="flex gap-2 font-body text-xs uppercase tracking-[0.14em]">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={
                "cursor-pointer border px-3 py-1.5 transition-colors " +
                (filtro === f.value
                  ? "border-sepia bg-sepia text-cream"
                  : "border-ink/20 text-sepia hover:border-sepia/60")
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <p className="mt-8 font-body text-sm text-sepia-light">Carregando…</p>
      )}
      {error && <p className="mt-8 font-body text-sm text-accent">{error}</p>}

      {!loading && !error && pedidos.length === 0 && (
        <p className="mt-8 font-body text-sm text-sepia-light">
          Nenhum pedido por aqui ainda.
        </p>
      )}

      {pedidos.length > 0 && (
        <div className="mt-8 overflow-x-auto border border-ink/10">
          <table className="w-full border-collapse font-body text-sm">
            <thead>
              <tr className="bg-cream-dark text-left text-xs uppercase tracking-[0.14em] text-sepia">
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Itens</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id} className="border-t border-ink/10 align-top">
                  <td className="px-4 py-3 font-bold text-ink">
                    #{p.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sepia-light">
                    {formatData(p.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sepia">
                    {p.nomeCliente}
                    <span className="block text-xs text-sepia-light">
                      {p.emailCliente}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sepia-light">
                    {p.itens.map((i) => (
                      <span key={i.id} className="block">
                        {i.titulo} × {i.quantidade}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 font-bold text-sepia whitespace-nowrap">
                    {formatPreco(p.total)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-block px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] " +
                        STATUS_STYLE[p.status]
                      }
                    >
                      {p.status}
                    </span>
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
