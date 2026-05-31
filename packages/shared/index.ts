export const DISCO_STATUS = ["disponivel", "esgotado"] as const;
export type DiscoStatus = (typeof DISCO_STATUS)[number];

export interface Disco {
  id: string;
  slug: string;
  titulo: string;
  artista: string;
  genero: string;
  ano: number;
  preco: number;
  capaUrl: string | null;
  descricao: string | null;
  estoque: number;
  status: DiscoStatus;
  destaque: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiscoInput {
  titulo: string;
  artista: string;
  genero: string;
  ano: number;
  preco: number;
  capaUrl?: string;
  descricao?: string;
  estoque?: number;
  status?: DiscoStatus;
  destaque?: boolean;
}

export type UpdateDiscoInput = Partial<CreateDiscoInput>;

export interface DiscoFilters {
  destaque?: boolean;
  genero?: string;
  status?: DiscoStatus;
}

export const EVENTO_TIPOS = [
  "Open Deck",
  "Listening Session",
  "Live Set",
  "Workshop",
  "Outro",
] as const;
export type EventoTipo = (typeof EVENTO_TIPOS)[number];

export interface Evento {
  id: string;
  slug: string;
  nome: string;
  tipo: string;
  descricao: string;
  fotoUrl: string | null;
  link: string | null;
  destaque: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventoInput {
  nome: string;
  tipo: string;
  descricao: string;
  fotoUrl?: string;
  link?: string;
  destaque?: boolean;
}

export type UpdateEventoInput = Partial<CreateEventoInput>;

export interface EventoFilters {
  destaque?: boolean;
  tipo?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  email: string;
}
