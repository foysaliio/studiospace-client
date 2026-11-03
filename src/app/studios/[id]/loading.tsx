export default function StudioDetailsLoading() {
  return (
    <main className="site-container py-8 sm:py-12 md:py-16">
      <div role="status">
        <span className="sr-only">Loading studio details</span>

        <div aria-hidden="true" className="motion-safe:animate-pulse">
          <div className="mb-5 flex min-h-11 items-center">
            <div className="h-4 w-28 rounded-sm bg-muted" />
          </div>

          <div className="mb-7 md:mb-9">
            <div className="mb-3 h-4 w-24 rounded-sm bg-muted" />
            <div className="h-10 w-3/4 max-w-md rounded-sm bg-muted sm:h-12" />
            <div className="mt-3 h-5 w-36 rounded-sm bg-muted" />
          </div>

          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
            <div className="aspect-[4/3] self-start rounded-sm bg-muted" />

            <div>
              <div className="h-8 w-44 rounded-sm bg-muted" />

              <div className="mt-4 space-y-3">
                <div className="h-4 rounded-sm bg-muted" />
                <div className="h-4 w-4/5 rounded-sm bg-muted" />
              </div>

              <div className="mt-6 divide-y divide-border border-y border-border">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex justify-between gap-4 py-3">
                    <div className="h-5 w-28 rounded-sm bg-muted" />
                    <div className="h-5 w-14 rounded-sm bg-muted" />
                  </div>
                ))}
              </div>

              <div className="mt-7 h-7 w-24 rounded-sm bg-muted" />
              <div className="mt-3 flex flex-wrap gap-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-8 w-20 rounded-sm bg-muted" />
                ))}
              </div>

              <div className="mt-7 h-7 w-24 rounded-sm bg-muted" />
              <div className="mt-3 h-4 w-32 rounded-sm bg-muted" />
              <div className="mt-2 h-4 w-44 rounded-sm bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
