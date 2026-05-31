"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Loja", href: "/loja" },
  { label: "Discos", href: "/discos" },
  { label: "Rádio", href: "/radio" },
  { label: "Cadinho Songs", href: "/songs" },
  { label: "Open Deck", href: "/open-deck" },
  { label: "Agenda", href: "/agenda" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="text-cream/80 transition-colors hover:text-cream"
    >
      {children}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-cream">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="leading-none">
          <span className="block font-display text-xl uppercase tracking-[0.2em]">
            Cadinho
          </span>
          <span className="block font-body text-[0.6rem] uppercase tracking-[0.45em] text-cream/60">
            Cultural
          </span>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <IconButton label="Buscar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton label="Conta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton label="Sacola">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
              <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
            </svg>
          </IconButton>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-cream lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-white/10 transition-[max-height] duration-300",
          open ? "max-h-96 border-t" : "max-h-0",
        )}
      >
        <Container>
          <ul className="flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-body text-sm uppercase tracking-[0.14em] text-cream/80 hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}
