import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = { id: string; name: string; price: number; quantity: number };

type CartState = { lines: CartLine[]; zoneId: string | null };

type CartContextValue = CartState & {
  hydrated: boolean;
  count: number;
  subtotal: number;
  add: (item: { id: string; name: string; price: number }, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setZoneId: (zoneId: string | null) => void;
};

const STORAGE_KEY = "loft29.cart.v1";
const CartContext = createContext<CartContextValue | null>(null);

function read(): CartState {
  if (typeof window === "undefined") return { lines: [], zoneId: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [], zoneId: null };
    const parsed = JSON.parse(raw) as CartState;
    return {
      lines: Array.isArray(parsed.lines) ? parsed.lines.filter((l) => l && l.id && l.quantity > 0) : [],
      zoneId: typeof parsed.zoneId === "string" ? parsed.zoneId : null,
    };
  } catch {
    return { lines: [], zoneId: null };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({ lines: [], zoneId: null });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const add = useCallback((item: { id: string; name: string; price: number }, quantity = 1) => {
    setState((prev) => {
      const existing = prev.lines.find((l) => l.id === item.id);
      const lines = existing
        ? prev.lines.map((l) =>
            l.id === item.id ? { ...l, quantity: Math.min(50, l.quantity + quantity) } : l,
          )
        : [...prev.lines, { ...item, quantity }];
      return { ...prev, lines };
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      lines:
        quantity <= 0
          ? prev.lines.filter((l) => l.id !== id)
          : prev.lines.map((l) => (l.id === id ? { ...l, quantity: Math.min(50, quantity) } : l)),
    }));
  }, []);

  const remove = useCallback((id: string) => {
    setState((prev) => ({ ...prev, lines: prev.lines.filter((l) => l.id !== id) }));
  }, []);

  const clear = useCallback(() => setState((prev) => ({ ...prev, lines: [] })), []);
  const setZoneId = useCallback((zoneId: string | null) => setState((prev) => ({ ...prev, zoneId })), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.quantity * l.price, 0);
    return { ...state, hydrated, count, subtotal, add, setQuantity, remove, clear, setZoneId };
  }, [state, hydrated, add, setQuantity, remove, clear, setZoneId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
