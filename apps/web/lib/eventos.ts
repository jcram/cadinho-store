import type { Evento, EventoFilters } from "@cadinho/shared";
import { API_URL } from "@/lib/api";

export async function fetchEventos(
  filters: EventoFilters = {},
): Promise<Evento[]> {
  const params = new URLSearchParams();
  if (filters.destaque !== undefined)
    params.set("destaque", String(filters.destaque));
  if (filters.tipo) params.set("tipo", filters.tipo);
  const qs = params.toString();

  try {
    const res = await fetch(`${API_URL}/eventos${qs ? `?${qs}` : ""}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Evento[];
  } catch {
    return [];
  }
}
