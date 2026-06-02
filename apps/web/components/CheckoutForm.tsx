"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Disco } from "@cadinho/shared";
import { Button } from "@/components/Button";
import { ApiError, api } from "@/lib/api";

function formatPreco(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const inputClass =
  "mt-1 w-full border border-ink/20 bg-cream px-3 py-2 font-body text-sm text-ink outline-none focus:border-accent";
const labelClass =
  "block font-body text-xs uppercase tracking-[0.16em] text-sepia";

export function CheckoutForm({ disco }: { disco: Disco }) {
  const router = useRouter();
  const maxQtd = Math.max(1, disco.estoque);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(() => disco.preco * quantidade, [disco.preco, quantidade]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const pedido = await api.createPedido({
        nomeCliente: nome,
        emailCliente: email,
        itens: [{ discoId: disco.id, quantidade }],
      });
      router.push(`/pedido/${pedido.id}`);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Não foi possível criar o pedido.",
      );
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
      {/* Dados do cliente */}
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-lg tracking-wide text-sepia">
          Seus dados
        </h2>
        <div className="mt-4 grid gap-4">
          <label className={labelClass}>
            Nome
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className={`${labelClass} max-w-[8rem]`}>
            Quantidade
            <input
              type="number"
              min={1}
              max={maxQtd}
              value={quantidade}
              onChange={(e) =>
                setQuantidade(
                  Math.min(maxQtd, Math.max(1, Number(e.target.value) || 1)),
                )
              }
              className={inputClass}
            />
          </label>
        </div>

        {error && <p className="mt-4 font-body text-sm text-accent">{error}</p>}

        <Button type="submit" variant="primary" className="mt-6 w-full sm:w-auto">
          {saving ? "Gerando Pix…" : "Gerar Pix"}
        </Button>
      </form>

      {/* Resumo */}
      <aside className="border border-sepia/20 bg-cream-dark/40 p-6">
        <h2 className="font-display text-lg tracking-wide text-sepia">Resumo</h2>
        <div className="mt-4 flex justify-between font-body text-sm text-ink">
          <span>
            {disco.titulo}
            <span className="text-sepia-light"> × {quantidade}</span>
          </span>
          <span>{formatPreco(disco.preco * quantidade)}</span>
        </div>
        <p className="font-body text-xs text-sepia-light">{disco.artista}</p>
        <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 font-body text-base font-bold text-sepia">
          <span>Total</span>
          <span>{formatPreco(total)}</span>
        </div>
        <p className="mt-3 font-body text-[0.7rem] uppercase tracking-[0.14em] text-sepia-light">
          Pagamento via Pix
        </p>
      </aside>
    </div>
  );
}
