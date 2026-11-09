import { Suspense } from "react";
import { AskGus } from "@/components/app/AskGus";
import { EmptyIntro } from "@/components/app/EmptyIntro";

// The URL's ?q= / ?code= are read on the server (they're runtime data), so the right screen
// streams in as HTML instead of waiting for JavaScript to hydrate. Until they resolve, the
// empty Ask Gus screen is the Suspense fallback and ships in the static shell.
function AskGusShell() {
  return (
    <div className="stack">
      <h1 className="app-title">Ask Gus</h1>
      <EmptyIntro />
    </div>
  );
}

async function AskGusFromUrl({ searchParams }: Pick<PageProps<"/app">, "searchParams">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim().slice(0, 80) : "";
  const code = typeof sp.code === "string" ? sp.code : null;
  return <AskGus q={q} code={code} />;
}

export default function AskGusPage(props: PageProps<"/app">) {
  return (
    <Suspense fallback={<AskGusShell />}>
      <AskGusFromUrl searchParams={props.searchParams} />
    </Suspense>
  );
}
