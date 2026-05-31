// Base URL usada SOMENTE no servidor (render SSR/ISR das páginas públicas).
// Fala direto com a API local (127.0.0.1:3001), sem dar a volta pela internet,
// pelo nginx ou pelo TLS — o que evita travas/timeout no render.
// Ordem: API_INTERNAL_URL (recomendado em produção) → NEXT_PUBLIC_API_URL → localhost.
export const SERVER_API_URL =
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:3001";

// Timeout curto para nunca pendurar o render caso a API esteja fora.
export const SERVER_FETCH_TIMEOUT_MS = 3000;
