import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/cart";
import { formatPkr } from "@/lib/menu-images";
import type { ReactNode } from "react";

export function OrderNav() {
  const { count, subtotal, hydrated } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link to="/" className="display text-2xl tracking-tight text-foreground">
          Loft<span className="text-primary">29</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/order"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-accent"
          >
            Menu
          </Link>
          <Link
            to="/checkout"
            className="rounded-xs border border-primary/60 bg-primary/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-primary/25"
          >
            Cart{hydrated && count > 0 ? ` · ${count} · ${formatPkr(subtotal)}` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function OrderShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <OrderNav />
      <main className="mx-auto max-w-[1400px] px-5 pb-32 pt-8 md:px-10">{children}</main>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xs border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";