import type { Disco, DiscoFilters } from "@cadinho/shared";
import { API_URL } from "@/lib/api";

export async function fetchDiscos(
  filters: DiscoFilters = {},
): Promise<Disco[]> {
  const params = new URLSearchParams();
  if (filters.destaque !== undefined)
    params.set("destaque", String(filters.destaque));
  if (filters.genero) params.set("genero", filters.genero);
  if (filters.status) params.set("status", filters.status);
  const qs = params.toString();

  try {
    const res = await fetch(`${API_URL}/discos${qs ? `?${qs}` : ""}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Disco[];
  } catch {
    return [];
  }
}
