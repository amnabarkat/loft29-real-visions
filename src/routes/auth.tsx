import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrderShell, Field, inputClass } from "@/components/loft/order-shell";
import { toast } from "sonner";

const title = "Staff Sign In — Loft 29";
const description = "Loft 29 staff sign-in for the order management dashboard.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <OrderShell>
      <div className="mx-auto max-w-sm py-16">
        <h1 className="display text-4xl text-foreground">Staff sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Loft 29 team access to the order dashboard.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <Field label="Email">
            <input
              type="email"
              required
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xs bg-primary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </OrderShell>
  );
}