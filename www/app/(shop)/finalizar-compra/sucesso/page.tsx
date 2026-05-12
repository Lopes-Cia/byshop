import CheckoutSuccessClient from "./sucesso-client";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string | string[] }>;
}) {
  const { orderId } = await searchParams;
  const resolvedOrderId = typeof orderId === "string" ? orderId : null;
  return <CheckoutSuccessClient orderId={resolvedOrderId} />;
}
