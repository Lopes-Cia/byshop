import TrackingClient from "./rastreamento-client";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getOrderId(searchParams?: Record<string, string | string[] | undefined>) {
  const raw = searchParams?.orderId;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export default async function TrackingPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const orderId = getOrderId(resolved);
  return <TrackingClient initialOrderId={orderId} />;
}
