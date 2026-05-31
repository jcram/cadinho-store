import type { Evento, EventoFilters } from "@cadinho/shared";
import { SERVER_API_URL, SERVER_FETCH_TIMEOUT_MS } from "@/lib/serverApi";

export async function fetchEventos(
  filters: EventoFilters = {},
): Promise<Evento[]> {
  const params = new URLSearchParams();
  if (filters.destaque !== undefined)
    params.set("destaque", String(filters.destaque));
  if (filters.tipo) params.set("tipo", filters.tipo);
  const qs = params.toString();

  try {
    const res = await fetch(`${SERVER_API_URL}/eventos${qs ? `?${qs}` : ""}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(SERVER_FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return [];
    return (await res.json()) as Evento[];
  } catch {
    return [];
  }
}
