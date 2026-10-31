import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-4xl font-bold">StudioSpace</h1>

      <p className="text-center text-muted-foreground">
        Find your next creative workspace.
      </p>

      <Button>Explore Studios</Button>
    </main>
  );
}
