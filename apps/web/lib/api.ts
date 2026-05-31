import type {
  CreateDiscoInput,
  CreateEventoInput,
  Disco,
  DiscoFilters,
  Evento,
  EventoFilters,
  LoginInput,
  LoginResponse,
  UpdateDiscoInput,
  UpdateEventoInput,
} from "@cadinho/shared";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const TOKEN_KEY = "cadinho_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = Array.isArray(body.message)
        ? body.message.join(", ")
        : (body.message ?? message);
    } catch {
      // resposta sem corpo JSON
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function jsonHeaders(): HeadersInit {
  return { "Content-Type": "application/json" };
}

export const api = {
  login(input: LoginInput) {
    return request<LoginResponse>("/auth/login", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify(input),
    });
  },

  listDiscos(filters: DiscoFilters = {}) {
    const params = new URLSearchParams();
    if (filters.destaque !== undefined)
      params.set("destaque", String(filters.destaque));
    if (filters.genero) params.set("genero", filters.genero);
    if (filters.status) params.set("status", filters.status);
    const qs = params.toString();
    return request<Disco[]>(`/discos${qs ? `?${qs}` : ""}`);
  },

  getDisco(id: string) {
    return request<Disco>(`/discos/${id}`);
  },

  getDiscoBySlug(slug: string) {
    return request<Disco>(`/discos/slug/${slug}`);
  },

  createDisco(input: CreateDiscoInput) {
    return request<Disco>(
      "/discos",
      { method: "POST", headers: jsonHeaders(), body: JSON.stringify(input) },
      true,
    );
  },

  updateDisco(id: string, input: UpdateDiscoInput) {
    return request<Disco>(
      `/discos/${id}`,
      { method: "PATCH", headers: jsonHeaders(), body: JSON.stringify(input) },
      true,
    );
  },

  removeDisco(id: string) {
    return request<{ id: string; deleted: boolean }>(
      `/discos/${id}`,
      { method: "DELETE" },
      true,
    );
  },

  listEventos(filters: EventoFilters = {}) {
    const params = new URLSearchParams();
    if (filters.destaque !== undefined)
      params.set("destaque", String(filters.destaque));
    if (filters.tipo) params.set("tipo", filters.tipo);
    const qs = params.toString();
    return request<Evento[]>(`/eventos${qs ? `?${qs}` : ""}`);
  },

  getEvento(id: string) {
    return request<Evento>(`/eventos/${id}`);
  },

  createEvento(input: CreateEventoInput) {
    return request<Evento>(
      "/eventos",
      { method: "POST", headers: jsonHeaders(), body: JSON.stringify(input) },
      true,
    );
  },

  updateEvento(id: string, input: UpdateEventoInput) {
    return request<Evento>(
      `/eventos/${id}`,
      { method: "PATCH", headers: jsonHeaders(), body: JSON.stringify(input) },
      true,
    );
  },

  removeEvento(id: string) {
    return request<{ id: string; deleted: boolean }>(
      `/eventos/${id}`,
      { method: "DELETE" },
      true,
    );
  },

  // Upload de imagem genérico (capas de disco e fotos de evento) — mesmo endpoint.
  async uploadImagem(file: File): Promise<string> {
    const form = new FormData();
    form.append("file", file);
    const { url } = await request<{ url: string; filename: string }>(
      "/uploads/capa",
      { method: "POST", body: form },
      true,
    );
    return `${API_URL}${url}`;
  },

  uploadCapa(file: File): Promise<string> {
    return this.uploadImagem(file);
  },
};

export { ApiError };
