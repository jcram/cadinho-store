"use client";

import { useState } from "react";
import type { Pedido } from "@cadinho/shared";
import { Button } from "@/components/Button";
import { ApiError, api } from "@/lib/api";

function formatPreco(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// QR decorativo (simulação) — substituído pelo QR real do PSP depois.
function FakeQR() {
  return (
    <div
      aria-hidden="true"
      className="grid h-44 w-44 grid-cols-7 gap-1 border border-ink/15 bg-cream p-3"
    >
      {Array.from({ length: 49 }).map((_, i) => {
        const on = (i * 7 + ((i * i) % 5) + (i % 3)) % 3 === 0;
        return (
          <span
            key={i}
            className={on ? "bg-ink" : "bg-transparent"}
          />
        );
      })}
    </div>
  );
}

export function PedidoStatus({ pedido: inicial }: { pedido: Pedido }) {
  const [pedido, setPedido] = useState(inicial);
  const [pagando, setPagando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(pedido.pixCopiaECola);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setError("Não foi possível copiar. Selecione o código manualmente.");
    }
  }

  async function simularPagamento() {
    setError(null);
    setPagando(true);
    try {
      setPedido(await api.pagarPedido(pedido.id));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Falha ao confirmar o pagamento.",
      );
      setPagando(false);
    }
  }

  const pago = pedido.status === "pago";

  return (
    <div className="mt-8 max-w-2xl">
      {/* Itens */}
      <div className="border border-sepia/20 bg-cream-dark/40 p-6">
        <h2 className="font-display text-lg tracking-wide text-sepia">
          Pedido #{pedido.id.slice(-6).toUpperCase()}
        </h2>
        <ul className="mt-4 space-y-2">
          {pedido.itens.map((item) => (
            <li
              key={item.id}
              className="flex justify-between font-body text-sm text-ink"
            >
              <span>
                {item.titulo}
                <span className="text-sepia-light"> × {item.quantidade}</span>
              </span>
              <span>{formatPreco(item.preco * item.quantidade)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 font-body text-base font-bold text-sepia">
          <span>Total</span>
          <span>{formatPreco(pedido.total)}</span>
        </div>
      </div>

      {pago ? (
        <div className="mt-8 border border-sepia/20 bg-cream-dark/40 p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-cream">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-4 font-display text-xl tracking-wide text-sepia">
            Pagamento confirmado
          </h3>
          <p className="mt-2 font-body text-sm text-sepia-light">
            Enviamos a confirmação para {pedido.emailCliente}. Obrigado pela
            compra! 🎶
          </p>
          <Button href="/discos" variant="outline" className="mt-6 text-sepia">
            Voltar ao acervo
          </Button>
        </div>
      ) : (
        <div className="mt-8 border border-sepia/20 bg-cream-dark/40 p-6">
          <h3 className="font-display text-lg tracking-wide text-sepia">
            Pague com Pix
          </h3>
          <p className="mt-1 font-body text-xs uppercase tracking-[0.14em] text-sepia-light">
            Escaneie o QR ou use o copia e cola
          </p>

          <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <FakeQR />
            <div className="min-w-0 flex-1">
              <p className="font-body text-xs uppercase tracking-[0.14em] text-sepia">
                Pix copia e cola
              </p>
              <p className="mt-1 max-h-24 overflow-auto break-all border border-ink/15 bg-cream p-3 font-body text-xs text-ink">
                {pedido.pixCopiaECola}
              </p>
              <button
                onClick={copiar}
                className="mt-2 cursor-pointer font-body text-xs font-bold uppercase tracking-[0.16em] text-accent hover:underline"
              >
                {copiado ? "Copiado!" : "Copiar código"}
              </button>
            </div>
          </div>

          {error && <p className="mt-4 font-body text-sm text-accent">{error}</p>}

          <div className="mt-6 border-t border-ink/10 pt-5">
            <p className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-sepia-light">
              Ambiente de teste — pagamento simulado
            </p>
            <Button
              variant="primary"
              className="mt-3 w-full sm:w-auto"
              onClick={simularPagamento}
            >
              {pagando ? "Confirmando…" : "Já paguei (simular)"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
