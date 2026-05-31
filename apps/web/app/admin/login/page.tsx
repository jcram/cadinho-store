"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { ApiError, api, setToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { access_token } = await api.login({ email, password });
      setToken(access_token);
      router.replace("/admin");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Falha ao entrar. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-ink/15 bg-cream-dark p-8"
      >
        <h1 className="font-display text-2xl tracking-wide text-sepia">
          Backoffice
        </h1>
        <p className="mt-1 font-body text-xs uppercase tracking-[0.16em] text-sepia-light">
          Acesso restrito · Cadinho
        </p>

        <label className="mt-6 block font-body text-xs uppercase tracking-[0.16em] text-sepia">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border border-ink/20 bg-cream px-3 py-2 font-body text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        <label className="mt-4 block font-body text-xs uppercase tracking-[0.16em] text-sepia">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full border border-ink/20 bg-cream px-3 py-2 font-body text-sm text-ink outline-none focus:border-accent"
          />
        </label>

        {error && (
          <p className="mt-4 font-body text-xs text-accent">{error}</p>
        )}

        <Button type="submit" className="mt-6 w-full" variant="primary">
          {loading ? "Entrando…" : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
