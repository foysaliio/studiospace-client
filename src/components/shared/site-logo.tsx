import Link from "next/link";
import { Aperture } from "lucide-react";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className = "" }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 rounded-md font-bold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${className}`}
    >
      <Aperture className="size-8 shrink-0" aria-hidden="true" />
      <span>StudioSpace</span>
    </Link>
  );
}
