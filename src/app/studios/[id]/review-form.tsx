"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { mutationFetch } from "@/lib/mutation-fetch";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const actionStyle =
  `group inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 ` +
  `rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground ` +
  `transition-colors duration-200 hover:bg-primary/85 ${focusStyle}`;

const arrowStyle =
  "motion-safe:transition-transform motion-safe:duration-200 " +
  "motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5";

export default function ReviewForm({ studioId }: { studioId: string }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const studioPath = `/studios/${encodeURIComponent(studioId)}`;
  const loginHref = `/login?next=${encodeURIComponent(studioPath)}`;

  async function postReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPosting) return;

    const text = comment.trim();
    if (!rating || !text) {
      toast.error("Choose a rating and write a comment.");
      return;
    }

    setIsPosting(true);

    try {
      const response = await mutationFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api${studioPath}/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comment: text }),
        },
      );

      if (response.status === 401) {
        toast.error("Please log in to post your review.");
        router.push(loginHref);
        return;
      }

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        toast.error(result?.message || "Could not post your review.");
        return;
      }

      setRating(0);
      setComment("");
      toast.success("Your review has been posted.");
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setIsPosting(false);
    }
  }

  if (isPending) {
    return (
      <p role="status" className="mt-6 text-sm text-muted-foreground">
        Checking sign-in…
      </p>
    );
  }

  if (!session?.user) {
    return (
      <Link href={loginHref} className={`${actionStyle} mt-6`}>
        Log in to review
        <ArrowUpRight size={16} aria-hidden="true" className={arrowStyle} />
      </Link>
    );
  }

  return (
    <form
      onSubmit={postReview}
      aria-label="Write a studio review"
      className="mt-6 max-w-xl border-t border-border pt-5"
    >
      <fieldset disabled={isPosting}>
        <legend className="text-sm font-medium">Your rating</legend>

        <div className="mt-1 flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="relative cursor-pointer">
              <input
                type="radio"
                name="studio-rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
                required
                aria-label={`${value} out of 5 stars`}
                className="peer sr-only"
              />
              <span className="grid size-11 place-items-center rounded-sm transition-colors hover:bg-muted peer-focus-visible:outline-2 peer-focus-visible:outline-ring">
                <Star
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={
                    value <= rating
                      ? "fill-current text-foreground"
                      : "text-muted-foreground"
                  }
                />
              </span>
            </label>
          ))}
        </div>

        <label
          htmlFor="studio-review"
          className="mt-3 block text-sm font-medium"
        >
          Your review
        </label>
        <textarea
          id="studio-review"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
          maxLength={1000}
          rows={3}
          placeholder="How was your session at this studio?"
          className={`mt-2 block w-full resize-y rounded-sm border border-input bg-background px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground ${focusStyle}`}
        />

        <button
          type="submit"
          disabled={isPosting}
          className={`${actionStyle} mt-3 disabled:cursor-wait disabled:opacity-60`}
        >
          {isPosting ? "Posting…" : "Post review"}
          <ArrowUpRight size={16} aria-hidden="true" className={arrowStyle} />
        </button>
      </fieldset>
    </form>
  );
}
