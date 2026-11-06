import Link from "next/link";
import { Gus } from "@/components/ds";
import { SITE } from "@/data/site";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${SITE.name}, home`}>
      <Gus size={40} mood="idle" />
      {SITE.name}
    </Link>
  );
}
