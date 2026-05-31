import Link from "next/link";
import { Container } from "@/components/Container";
import { Waveform } from "@/components/Waveform";

const FOOTER_LINKS = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
  { label: "Trocas e Devoluções", href: "/trocas" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", path: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5-2.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8ZM4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" },
  { label: "YouTube", href: "#", path: "M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Zm7 1.5v5l4.5-2.5L10 9.5Z" },
  { label: "Spotify", href: "#", path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm4 13a.8.8 0 0 1-1.1.3c-2.5-1.5-5.6-1.8-9.2-1a.8.8 0 1 1-.3-1.6c4-.9 7.4-.5 10.2 1.2.4.2.5.7.4 1.1Zm1.3-3a1 1 0 0 1-1.3.3c-2.8-1.7-7-2.2-10.4-1.2a1 1 0 1 1-.5-1.9c3.8-1.1 8.5-.5 11.8 1.5.4.3.6.9.4 1.3Z" },
  { label: "SoundCloud", href: "#", path: "M4 14v3m3-5v5m3-7v7m3-9v9m3-7a3 3 0 0 1 0 6h-3" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl uppercase leading-tight tracking-[0.08em] text-cream sm:text-4xl">
              Música é
              <br />
              Presença
            </h2>
            <Waveform className="mt-5 h-7" barClassName="bg-cream/25" />
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-cream/60">
              Discos, conversas e encontros que continuam girando. Saiba mais
              sobre o Cadinho.
            </p>
          </div>

          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-cream/80">
              Receba novidades
            </p>
            <form className="mt-4 flex border-b border-cream/30 focus-within:border-cream">
              <input
                type="email"
                required
                placeholder="seu@email.com"
                aria-label="Seu e-mail"
                className="w-full bg-transparent py-2 font-body text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 font-body text-xs font-bold uppercase tracking-[0.16em] text-cream/80 transition-colors hover:text-accent"
              >
                Inscrever
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-cream/60 transition-colors hover:text-cream"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-cream/50">
            © {new Date().getFullYear()} Cadinho Cultural. Todos os direitos
            reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-body text-xs uppercase tracking-[0.12em] text-cream/50 transition-colors hover:text-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
