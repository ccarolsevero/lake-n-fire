import Link from "next/link";
import { SITE } from "@/lib/site";

export function Logo({
  light = false,
  size = "nav",
}: {
  light?: boolean;
  size?: "nav" | "lg";
}) {
  const height = size === "lg" ? "h-20 sm:h-24" : "h-12 sm:h-[3.35rem]";

  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label={SITE.name}>
      <img
        src="/logo.png"
        alt="Lake 'n Fire"
        width={372}
        height={312}
        className={`${height} w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
