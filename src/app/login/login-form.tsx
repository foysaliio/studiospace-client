"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const inputStyle = `block min-h-12 w-full rounded-sm border border-input bg-background px-3.5 text-base text-foreground transition-colors duration-200 hover:border-foreground/40 ${focusStyle}`;

function getReturnPath() {
  const current = new URL(window.location.href);
  const next = current.searchParams.get("next");

  if (!next?.startsWith("/")) return "/";

  const target = new URL(next, current.origin);

  if (target.origin !== current.origin) return "/";

  return target.pathname + target.search + target.hash;
}

export default function LoginForm() {
  const router = useRouter();
  const [resetMode, setResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function switchMode(reset: boolean) {
    setResetMode(reset);
    setShowPassword(false);
    setError("");
    setNotice("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = new FormData(event.currentTarget);
    setError("");
    setNotice("");
    setPending(true);

    try {
      if (resetMode) {
        const result = await authClient.requestPasswordReset({
          email: email.trim(),
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (result.error) {
          throw new Error("Could not request a reset link. Please try again.");
        }

        const message =
          "If an account uses this email, check its inbox for a reset link.";
        setNotice(message);
        toast.success(message);
        return;
      }

      const result = await authClient.signIn.email({
        email: email.trim(),
        password: String(form.get("password") ?? ""),
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Could not log in. Please try again.",
        );
      }

      toast.success("Welcome back!");
      router.replace(getReturnPath());
      router.refresh();

      router.replace(getReturnPath());
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      setError(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} aria-busy={pending} className="grid gap-5">
        {resetMode && (
          <div>
            <h2 className="font-heading text-3xl tracking-tight">
              Reset your password
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter the email address you use for StudioSpace.
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium"
          >
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className={inputStyle}
          />
        </div>

        {!resetMode && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-x-3">
              <label htmlFor="login-password" className="text-sm font-medium">
                Password
              </label>
              <button
                type="button"
                disabled={pending}
                onClick={() => switchMode(true)}
                className={`inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground ${focusStyle}`}
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`${inputStyle} pr-14`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-controls="login-password"
                onClick={() => setShowPassword((visible) => !visible)}
                className={`absolute inset-y-0 right-1 my-auto grid size-11 place-items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground ${focusStyle}`}
              >
                {showPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="text-sm text-foreground">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={`group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 enabled:hover:bg-primary/85 disabled:opacity-60 ${focusStyle}`}
        >
          {resetMode
            ? pending
              ? "Requesting link…"
              : "Send reset link"
            : pending
              ? "Logging in…"
              : "Log in"}
          <ArrowUpRight
            size={17}
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          />
        </button>

        {resetMode && (
          <button
            type="button"
            disabled={pending}
            onClick={() => switchMode(false)}
            className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground ${focusStyle}`}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to login
          </button>
        )}
      </form>
    </>
  );
}
