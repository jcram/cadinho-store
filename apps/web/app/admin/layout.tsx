"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "@/lib/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [isLogin, pathname, router]);

  if (isLogin) return <>{children}</>;

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream font-body text-sm uppercase tracking-[0.18em] text-sepia-light">
        Carregando…
      </div>
    );
  }

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-ink/10 bg-cream-dark">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/admin"
            className="font-display text-lg tracking-wide text-sepia"
          >
            Cadinho · Backoffice
          </Link>
          <nav className="flex items-center gap-4 font-body text-xs uppercase tracking-[0.16em]">
            <Link href="/admin" className="hover:text-accent">
              Discos
            </Link>
            <Link href="/admin/eventos" className="hover:text-accent">
              Encontros
            </Link>
            <Link href="/admin/pedidos" className="hover:text-accent">
              Pedidos
            </Link>
            <button
              onClick={handleLogout}
              className="cursor-pointer text-sepia-light hover:text-accent"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
