"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { focusStyle } from "@/components/shared/workspace-ui";

type DeleteStudioProps = {
  studioId: string;
  title: string;
};

export default function DeleteStudio({ studioId, title }: DeleteStudioProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const keepButtonRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const descriptionId = useId();

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function openDialog() {
    setError("");
    dialogRef.current?.showModal();
    keepButtonRef.current?.focus();
  }

  async function deleteStudio() {
    if (deleting) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/studios/${encodeURIComponent(studioId)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.status === 401) {
        dialogRef.current?.close();
        toast.error("Please log in to delete your studio.");
        router.push("/login?next=/my-listings");
        return;
      }

      const result = await response.json();

      if (response.status === 404) {
        dialogRef.current?.close();
        toast.error(result.message);
        router.refresh();
        return;
      }

      if (!response.ok) {
        setError(result.message || "Could not delete studio.");
        return;
      }

      dialogRef.current?.close();
      toast.success("Studio deleted.");
      router.refresh();
    } catch {
      setError("Could not complete the request. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={`Delete ${title}`}
        aria-haspopup="dialog"
        onClick={openDialog}
        className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${focusStyle}`}
      >
        <Trash2 size={14} aria-hidden="true" />
        Delete
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        onCancel={(event) => {
          if (deleting) event.preventDefault();
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-sm overflow-y-auto rounded-sm border border-border bg-background p-5 text-foreground shadow-xl backdrop:bg-black/50 sm:p-7"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Studio listing
        </p>

        <h2
          id={headingId}
          className="mt-2 font-heading text-3xl tracking-tight"
        >
          Delete this studio?
        </h2>

        <p
          id={descriptionId}
          className="mt-3 break-words text-sm leading-6 text-muted-foreground"
        >
          <strong className="font-medium text-foreground">{title}</strong> will
          be permanently removed from My Studio Listings and Explore Studios.
        </p>

        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button
            ref={keepButtonRef}
            type="button"
            disabled={deleting}
            onClick={() => dialogRef.current?.close()}
            className={`min-h-11 cursor-pointer rounded-sm border border-input px-3 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-60 ${focusStyle}`}
          >
            Keep studio
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={deleteStudio}
            className={`min-h-11 cursor-pointer rounded-sm bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 disabled:cursor-wait disabled:opacity-60 ${focusStyle}`}
          >
            {deleting ? "Deleting…" : "Delete studio"}
          </button>
        </div>
      </dialog>
    </>
  );
}
