export default function StudioDetailsLoading() {
  return (
    <main className="site-container min-w-0 pb-12 pt-4 sm:pb-16 sm:pt-5">
      <div role="status">
        <span className="sr-only">Loading studio details</span>

        <div aria-hidden="true" className="motion-safe:animate-pulse">
          {/* Back to Explore studios */}
          <div className="mb-3 flex min-h-11 items-center gap-2">
            <div className="size-4 rounded-sm bg-muted" />
            <div className="h-3 w-24 rounded-sm bg-muted" />
          </div>

          {/* Studio cover, category, title and location */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted sm:aspect-[2/1] lg:aspect-[2.88/1]">
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/15 to-transparent p-5 sm:p-8 lg:p-10">
              <div className="h-3 w-20 rounded-sm bg-background/70" />
              <div className="mt-3 h-9 w-3/4 max-w-md rounded-sm bg-background/80 sm:h-12" />
              <div className="mt-3 h-3.5 w-32 rounded-sm bg-background/70" />
            </div>
          </div>

          {/* Hourly rate, capacity, deposit and booking button */}
          <div className="mt-4 grid gap-5 rounded-sm bg-muted px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-8 lg:py-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {["rate", "capacity", "deposit"].map((item) => (
                <div key={item} className="min-w-0">
                  <div className="h-3 w-20 max-w-full rounded-sm bg-foreground/10" />
                  <div className="mt-2 h-7 w-14 max-w-full rounded-sm bg-foreground/15" />
                </div>
              ))}
            </div>

            <div className="h-12 w-full rounded-sm bg-foreground/20 lg:w-56" />
          </div>

          {/* About the space, host and amenities */}
          <div className="mt-9 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <div className="h-8 w-48 rounded-sm bg-muted" />
              <div className="mt-4 space-y-2.5">
                <div className="h-4 w-full rounded-sm bg-muted" />
                <div className="h-4 w-4/5 rounded-sm bg-muted" />
              </div>

              <div className="mt-7 h-3 w-20 rounded-sm bg-muted" />
              <div className="mt-3 h-4 w-32 rounded-sm bg-muted" />
              <div className="mt-2 h-3 w-40 rounded-sm bg-muted" />
            </div>

            <div>
              <div className="h-8 w-32 rounded-sm bg-muted" />
              <div className="mt-3 divide-y divide-border">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-11 items-center justify-between gap-4"
                  >
                    <div className="h-3.5 w-28 rounded-sm bg-muted" />
                    <div className="size-3 rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10 border-t border-border pt-7 sm:mt-14">
            <div className="h-8 w-24 rounded-sm bg-muted" />
            <div className="mt-4 h-4 w-36 rounded-sm bg-muted" />
          </div>
        </div>
      </div>
    </main>
  );
}
