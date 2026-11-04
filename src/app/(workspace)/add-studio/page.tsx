"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

type StudioFormProps = {
  ownerName: string;
  ownerEmail: string;
};

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const inputStyle =
  "mt-2 block min-h-11 w-full min-w-0 rounded-sm border border-input bg-background px-3 py-2 text-base font-normal text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const labelStyle = "block min-w-0 text-sm font-medium";

const sectionTitle = "font-heading text-2xl tracking-tight sm:text-3xl";

export default function StudioForm({ ownerName, ownerEmail }: StudioFormProps) {
  const router = useRouter();
  const [photoMode, setPhotoMode] = useState<"url" | "file">("url");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    setSaving(true);
    setError("");

    try {
      let imageUrl = text("imageUrl");

      if (photoMode === "file") {
        const file = data.get("photo");

        if (!(file instanceof File) || !file.size) {
          throw new Error("Choose a cover photo.");
        }

        if (file.size > 3 * 1024 * 1024) {
          throw new Error("Choose a photo smaller than 3 MB.");
        }

        const uploadData = new FormData();
        uploadData.set("photo", file);

        const upload = await fetch("/api/studio-photo", {
          method: "POST",
          body: uploadData,
        });

        const result = await upload.json();

        if (!upload.ok) {
          throw new Error(result.message || "Could not upload your photo.");
        }

        imageUrl = result.imageUrl;
      }

      const studio = {
        title: text("title"),
        category: text("category"),
        location: text("location"),
        overview: text("overview"),
        hourlyRate: Number(text("hourlyRate")),
        securityDeposit: Number(text("securityDeposit")),
        maxCapacity: Number(text("maxCapacity")),
        amenities: text("amenities")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        imageUrl,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/studios`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studio),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not publish your studio.");
      }

      toast.success("Studio published.");
      router.push("/my-listings");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not publish your studio.";
      setError(message);
      toast.error(message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <fieldset disabled={saving} className="min-w-0 space-y-8">
        <section aria-labelledby="space-heading" className="space-y-4">
          <h2 id="space-heading" className={sectionTitle}>
            The space
          </h2>

          <label className={labelStyle}>
            Studio name
            <input
              name="title"
              required
              placeholder="e.g. Northlight Studio"
              className={inputStyle}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelStyle}>
              Category
              <select
                name="category"
                defaultValue=""
                required
                className={inputStyle}
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className={labelStyle}>
              Location
              <input
                name="location"
                required
                placeholder="Area, city"
                className={inputStyle}
              />
            </label>
          </div>

          <label className={labelStyle}>
            About the space
            <textarea
              name="overview"
              rows={4}
              required
              placeholder="Describe the room, its equipment and what a session here is like."
              className={`${inputStyle} resize-y`}
            />
          </label>

          <label className={labelStyle}>
            Amenities
            <input
              name="amenities"
              placeholder="Microphones, headphones, audio mixer"
              className={inputStyle}
            />
            <span className="mt-1.5 block text-xs font-normal text-muted-foreground">
              Separate each amenity with a comma.
            </span>
          </label>
        </section>

        <section
          aria-labelledby="photo-heading"
          className="border-t border-border pt-6"
        >
          <h2 id="photo-heading" className={sectionTitle}>
            Cover photo
          </h2>

          <div className="my-4 flex flex-wrap gap-2">
            {(["url", "file"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={photoMode === mode}
                onClick={() => setPhotoMode(mode)}
                className={`min-h-11 cursor-pointer rounded-sm px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                  photoMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {mode === "url" ? "Use image URL" : "Upload photo"}
              </button>
            ))}
          </div>

          {photoMode === "url" ? (
            <label className={labelStyle}>
              Image URL
              <input
                name="imageUrl"
                type="url"
                pattern="https://.+"
                required
                placeholder="https://"
                className={inputStyle}
              />
            </label>
          ) : (
            <label className={labelStyle}>
              Choose a photo
              <input
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                required
                className={`${inputStyle} file:mr-3 file:cursor-pointer file:font-medium`}
              />
              <span className="mt-1.5 block text-xs font-normal text-muted-foreground">
                JPG, PNG or WebP, up to 3 MB.
              </span>
            </label>
          )}
        </section>

        <section
          aria-labelledby="rate-heading"
          className="border-t border-border pt-6"
        >
          <h2 id="rate-heading" className={sectionTitle}>
            Session details
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className={labelStyle}>
              Hourly rate ($)
              <input
                name="hourlyRate"
                type="number"
                min="0.01"
                step="0.01"
                required
                className={inputStyle}
              />
            </label>

            <label className={labelStyle}>
              Security deposit ($)
              <input
                name="securityDeposit"
                type="number"
                min="0"
                step="0.01"
                defaultValue="0"
                required
                className={inputStyle}
              />
            </label>

            <label className={labelStyle}>
              Maximum capacity
              <input
                name="maxCapacity"
                type="number"
                min="1"
                step="1"
                required
                className={inputStyle}
              />
            </label>
          </div>
        </section>

        <section
          aria-labelledby="host-heading"
          className="rounded-sm bg-secondary p-4 sm:p-5"
        >
          <h2 id="host-heading" className={sectionTitle}>
            Your host details
          </h2>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <label className={labelStyle}>
              Name
              <input value={ownerName} readOnly className={inputStyle} />
            </label>
            <label className={labelStyle}>
              Email
              <input value={ownerEmail} readOnly className={inputStyle} />
            </label>
          </div>
        </section>
      </fieldset>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="group mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-4 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-wait disabled:opacity-60 sm:w-fit"
      >
        {saving ? "Publishing…" : "Publish studio"}
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}
