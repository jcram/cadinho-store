import type { Pedido } from "@cadinho/shared";
import { SERVER_API_URL, SERVER_FETCH_TIMEOUT_MS } from "@/lib/serverApi";

export async function fetchPedido(id: string): Promise<Pedido | null> {
  try {
    const res = await fetch(
      `${SERVER_API_URL}/pedidos/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(SERVER_FETCH_TIMEOUT_MS),
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as Pedido;
  } catch {
    return null;
  }
}
