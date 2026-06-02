import type { Disco, DiscoFilters } from "@cadinho/shared";
import { SERVER_API_URL, SERVER_FETCH_TIMEOUT_MS } from "@/lib/serverApi";

export async function fetchDiscoBySlug(slug: string): Promise<Disco | null> {
  try {
    const res = await fetch(
      `${SERVER_API_URL}/discos/slug/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(SERVER_FETCH_TIMEOUT_MS),
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as Disco;
  } catch {
    return null;
  }
}

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
    const res = await fetch(`${SERVER_API_URL}/discos${qs ? `?${qs}` : ""}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(SERVER_FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return [];
    return (await res.json()) as Disco[];
  } catch {
    return [];
  }
}
