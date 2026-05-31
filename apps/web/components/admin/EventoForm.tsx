"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CreateEventoInput, Evento } from "@cadinho/shared";
import { EVENTO_TIPOS } from "@cadinho/shared";
import { Button } from "@/components/Button";
import { ApiError, api } from "@/lib/api";

type Props = { evento?: Evento };

const inputClass =
  "mt-1 w-full border border-ink/20 bg-cream px-3 py-2 font-body text-sm text-ink outline-none focus:border-accent";
const labelClass =
  "block font-body text-xs uppercase tracking-[0.16em] text-sepia";

export function EventoForm({ evento }: Props) {
  const router = useRouter();
  const editing = Boolean(evento);

  const [nome, setNome] = useState(evento?.nome ?? "");
  const [tipo, setTipo] = useState(evento?.tipo ?? EVENTO_TIPOS[0]);
  const [descricao, setDescricao] = useState(evento?.descricao ?? "");
  const [link, setLink] = useState(evento?.link ?? "");
  const [destaque, setDestaque] = useState(evento?.destaque ?? false);
  const [fotoUrl, setFotoUrl] = useState(evento?.fotoUrl ?? "");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      setFotoUrl(await api.uploadImagem(file));
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

    const payload: CreateEventoInput = {
      nome,
      tipo,
      descricao,
      destaque,
      link: link.trim() || undefined,
      fotoUrl: fotoUrl || undefined,
    };

    try {
      if (evento) {
        await api.updateEvento(evento.id, payload);
      } else {
        await api.createEvento(payload);
      }
      router.push("/admin/eventos");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Falha ao salvar.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <h1 className="font-display text-2xl tracking-wide text-sepia">
        {editing ? "Editar encontro" : "Novo encontro"}
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Nome
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Tipo
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className={inputClass}
          >
            {EVENTO_TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={`${labelClass} mt-4`}>
        Descrição
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          required
          className={inputClass}
        />
      </label>

      <label className={`${labelClass} mt-4`}>
        Link (botão &ldquo;Saiba Mais&rdquo;)
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://…"
          className={inputClass}
        />
        <span className="mt-1 block font-body text-[0.65rem] normal-case tracking-normal text-sepia-light">
          Opcional. Use a URL completa (com https://). Se vazio, o botão não aparece.
        </span>
      </label>

      <label className="mt-4 flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em] text-sepia">
        <input
          type="checkbox"
          checked={destaque}
          onChange={(e) => setDestaque(e.target.checked)}
          className="h-4 w-4 accent-accent"
        />
        Destaque (aparece em &ldquo;Próximos Encontros&rdquo; na home)
      </label>

      <div className="mt-4">
        <span className={labelClass}>Foto</span>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden border border-ink/15 bg-cream-dark">
            {fotoUrl ? (
              <Image
                src={fotoUrl}
                alt="Foto do encontro"
                fill
                sizes="128px"
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center font-body text-[10px] uppercase tracking-[0.14em] text-sepia-light">
                Sem foto
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
          {saving ? "Salvando…" : editing ? "Salvar alterações" : "Criar encontro"}
        </Button>
        <Button href="/admin/eventos" variant="outline" className="text-sepia">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
