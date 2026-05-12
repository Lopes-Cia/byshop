import SignInClient from "./signin-client";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSafeNext(searchParams?: Record<string, string | string[] | undefined>) {
  const raw = searchParams?.next;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export default async function SignInPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const nextPath = getSafeNext(resolved);
  return <SignInClient nextPath={nextPath} />;
}
