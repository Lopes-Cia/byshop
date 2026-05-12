import OrderDetailClient from "./detalhe-pedido-client";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetailClient orderId={decodeURIComponent(id)} />;
}
