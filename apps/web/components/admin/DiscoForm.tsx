"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CreateDiscoInput, Disco, DiscoStatus } from "@cadinho/shared";
import { DISCO_STATUS } from "@cadinho/shared";
import { Button } from "@/components/Button";
import { ApiError, api } from "@/lib/api";

type Props = { disco?: Disco };

const inputClass =
  "mt-1 w-full border border-ink/20 bg-cream px-3 py-2 font-body text-sm text-ink outline-none focus:border-accent";
const labelClass =
  "block font-body text-xs uppercase tracking-[0.16em] text-sepia";

export function DiscoForm({ disco }: Props) {
  const router = useRouter();
  const editing = Boolean(disco);

  const [titulo, setTitulo] = useState(disco?.titulo ?? "");
  const [artista, setArtista] = useState(disco?.artista ?? "");
  const [genero, setGenero] = useState(disco?.genero ?? "");
  const [ano, setAno] = useState(String(disco?.ano ?? new Date().getFullYear()));
  const [preco, setPreco] = useState(String(disco?.preco ?? ""));
  const [estoque, setEstoque] = useState(String(disco?.estoque ?? 0));
  const [descricao, setDescricao] = useState(disco?.descricao ?? "");
  const [status, setStatus] = useState<DiscoStatus>(
    disco?.status ?? "disponivel",
  );
  const [destaque, setDestaque] = useState(disco?.destaque ?? false);
  const [capaUrl, setCapaUrl] = useState(disco?.capaUrl ?? "");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      setCapaUrl(await api.uploadCapa(file));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Falha no upload.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload: CreateDiscoInput = {
      titulo,
      artista,
      genero,
      ano: Number(ano),
      preco: Number(preco),
      estoque: Number(estoque),
      status,
      destaque,
      descricao: descricao || undefined,
      capaUrl: capaUrl || undefined,
    };

    try {
      if (disco) {
        await api.updateDisco(disco.id, payload);
      } else {
        await api.createDisco(payload);
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Falha ao salvar.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <h1 className="font-display text-2xl tracking-wide text-sepia">
        {editing ? "Editar disco" : "Novo disco"}
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Artista
          <input
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Gênero
          <input
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Ano
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            min={1900}
            max={2100}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Preço (R$)
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            min={0}
            step="0.01"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Estoque
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            min={0}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as DiscoStatus)}
            className={inputClass}
          >
            {DISCO_STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-end gap-2 font-body text-xs uppercase tracking-[0.16em] text-sepia">
          <input
            type="checkbox"
            checked={destaque}
            onChange={(e) => setDestaque(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Destaque (Garimpo da Semana)
        </label>
      </div>

      <label className={`${labelClass} mt-4`}>
        Descrição
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          className={inputClass}
        />
      </label>

      <div className="mt-4">
        <span className={labelClass}>Capa</span>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-ink/15 bg-cream-dark">
            {capaUrl ? (
              <Image
                src={capaUrl}
                alt="Capa"
                fill
                sizes="96px"
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center font-body text-[10px] uppercase tracking-[0.14em] text-sepia-light">
                Sem capa
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="font-body text-xs text-sepia"
          />
        </div>
        {uploading && (
          <p className="mt-2 font-body text-xs text-sepia-light">Enviando…</p>
        )}
      </div>

      {error && <p className="mt-4 font-body text-sm text-accent">{error}</p>}

      <div className="mt-8 flex gap-3">
        <Button type="submit" variant="primary">
          {saving ? "Salvando…" : editing ? "Salvar alterações" : "Criar disco"}
        </Button>
        <Button href="/admin" variant="outline" className="text-sepia">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
