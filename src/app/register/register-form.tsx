"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const inputStyle =
  "block min-h-12 w-full min-w-0 rounded-sm border border-input bg-background px-3.5 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 hover:border-foreground/40 focus-visible:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const labelStyle = "mb-2 block text-sm font-medium text-foreground";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const image = String(form.get("image") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setError("");

    if (!name) {
      setError("Enter your full name.");
      return;
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      setError(
        "Use at least 6 characters with an uppercase and a lowercase letter.",
      );
      return;
    }

    setPending(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        image,
        password,
      });

      if (result.error) {
        setError(
          result.error.message || "Registration failed. Please try again.",
        );
        setPending(false);
        return;
      }

      toast.success("Registration complete. Please log in.");
      router.replace("/login");
    } catch {
      setError("Could not reach StudioSpace. Please try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={pending} className="grid gap-5">
      <div>
        <label htmlFor="register-name" className={labelStyle}>
          Full name
        </label>
        <input
          id="register-name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          required
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="register-email" className={labelStyle}>
          Email address
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="register-image" className={labelStyle}>
          Photo URL
        </label>
        <input
          id="register-image"
          name="image"
          type="url"
          pattern="https://.+"
          title="Enter a photo URL starting with https://"
          placeholder="https://"
          required
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="register-password" className={labelStyle}>
          Password
        </label>

        <div className="relative">
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            aria-describedby="register-password-hint"
            placeholder="Create a password"
            maxLength={128}
            required
            className={`${inputStyle} pr-14`}
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-controls="register-password"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute inset-y-0 right-1 my-auto inline-flex size-11 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            {showPassword ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        <p
          id="register-password-hint"
          className="mt-2 text-xs leading-5 text-muted-foreground"
        >
          At least 6 characters with one uppercase and one lowercase letter.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm leading-6 text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 enabled:hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
        <ArrowUpRight
          size={17}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}
