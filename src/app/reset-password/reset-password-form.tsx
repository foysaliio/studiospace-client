"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const inputStyle = `min-h-12 w-full rounded-sm border border-input bg-background pl-3.5 pr-14 text-base text-foreground transition-colors duration-200 hover:border-foreground/40 aria-invalid:border-destructive ${focusStyle}`;

function PasswordToggle({
  visible,
  inputId,
  label,
  onClick,
}: {
  visible: boolean;
  inputId: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${visible ? "Hide" : "Show"} ${label}`}
      aria-controls={inputId}
      onClick={onClick}
      className={`absolute inset-y-0 right-1 my-auto grid size-11 place-items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground ${focusStyle}`}
    >
      {visible ? (
        <EyeOff size={18} aria-hidden="true" />
      ) : (
        <Eye size={18} aria-hidden="true" />
      )}
    </button>
  );
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const confirmRef = useRef<HTMLInputElement>(null);

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = new FormData(event.currentTarget);
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    setError("");
    setMismatch(false);

    if (
      newPassword.length < 6 ||
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword)
    ) {
      setError(
        "Use at least 6 characters with an uppercase and a lowercase letter.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMismatch(true);
      confirmRef.current?.focus();
      return;
    }

    setPending(true);

    try {
      const result = await authClient.resetPassword({ token, newPassword });

      if (result.error) {
        setError(
          result.error.message ||
            "Could not reset your password. Request a new link from login.",
        );
        setPending(false);
        return;
      }

      toast.success("Password updated");
      router.replace("/login");
    } catch {
      setError("Could not reach StudioSpace. Please try again.");
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => {
        setMismatch(false);
        setError("");
      }}
      aria-busy={pending}
      className="grid gap-5"
    >
      <div>
        <label
          htmlFor="new-password"
          className="mb-2 block text-sm font-medium"
        >
          New password
        </label>

        <div className="relative">
          <input
            id="new-password"
            name="newPassword"
            type={showNew ? "text" : "password"}
            autoComplete="new-password"
            aria-describedby="password-hint"
            required
            maxLength={128}
            className={inputStyle}
          />
          <PasswordToggle
            visible={showNew}
            inputId="new-password"
            label="new password"
            onClick={() => setShowNew((visible) => !visible)}
          />
        </div>

        <p
          id="password-hint"
          className="mt-2 text-xs leading-5 text-muted-foreground"
        >
          At least 6 characters, including one uppercase and one lowercase
          letter.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="mb-2 block text-sm font-medium"
        >
          Confirm new password
        </label>

        <div className="relative">
          <input
            ref={confirmRef}
            id="confirm-password"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            aria-invalid={mismatch}
            aria-describedby={mismatch ? "confirm-error" : undefined}
            required
            maxLength={128}
            className={inputStyle}
          />
          <PasswordToggle
            visible={showConfirm}
            inputId="confirm-password"
            label="password confirmation"
            onClick={() => setShowConfirm((visible) => !visible)}
          />
        </div>

        {mismatch && (
          <p
            id="confirm-error"
            role="alert"
            className="mt-2 text-sm text-destructive"
          >
            The passwords don’t match. Enter the same password in both fields.
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 enabled:hover:bg-primary/85 disabled:opacity-60 ${focusStyle}`}
      >
        {pending ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}
