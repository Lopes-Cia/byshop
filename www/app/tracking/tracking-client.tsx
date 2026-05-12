"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OrderTrackingTimeline } from "@/components/orders/order-tracking-timeline";
import { useOrdersStore } from "@/stores/ordersStore";

type Props = {
  initialOrderId: string | null;
};

const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(date);
};

export default function TrackingClient({ initialOrderId }: Props) {
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(useOrdersStore.persist.hasHydrated());
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId ?? "");

  useEffect(() => {
    const unsubscribe = useOrdersStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useOrdersStore.persist.hasHydrated()) setHasHydrated(true);
    return unsubscribe;
  }, []);

  useEffect(() => {
    setOrderIdInput(initialOrderId ?? "");
  }, [initialOrderId]);

  const normalizedOrderId = useMemo(() => {
    if (!initialOrderId) return null;
    const trimmed = initialOrderId.trim();
    return trimmed.length > 0 ? trimmed : null;
  }, [initialOrderId]);

  const order = useOrdersStore((state) =>
    normalizedOrderId ? state.orders.find((o) => o.id === normalizedOrderId) : undefined,
  );

  const orders = useOrdersStore((state) => state.orders);

  const submit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      router.push("/tracking");
      return;
    }
    router.push(`/tracking?orderId=${encodeURIComponent(trimmed)}`);
  };

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Tracking</h1>
        <p className="text-muted-foreground mt-3">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Tracking do pedido</h1>
        <p className="text-muted-foreground">
          Informe o ID do pedido (ex.: <span className="font-medium">ord_...</span>) para acompanhar o
          status.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Buscar pedido</CardTitle>
          <CardDescription>Busca local (pedidos persistidos no navegador).</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={(event) => {
              event.preventDefault();
              submit(orderIdInput);
            }}>
            <Input
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="ord_..."
              autoComplete="off"
            />
            <div className="flex gap-2">
              <Button type="submit">Buscar</Button>
              <Button type="button" variant="outline" onClick={() => submit("")}>
                Limpar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {!normalizedOrderId ? (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dica</CardTitle>
              <CardDescription>
                Você encontra o ID do pedido em <Link href="/orders" className="underline">/orders</Link>
                .
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="text-muted-foreground">
                Se você acabou de finalizar uma compra, também dá para abrir o pedido pela página de
                sucesso do checkout.
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild>
                  <Link href="/orders">Ver pedidos</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/products">Ver produtos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {orders.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recentes</CardTitle>
                <CardDescription>Atalhos para seus pedidos locais mais recentes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="truncate font-medium text-gray-900">{o.id}</div>
                      <div className="text-muted-foreground text-sm">Criado em {formatDateTime(o.createdAt)}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => submit(o.id)}>
                        Abrir tracking
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/orders/${encodeURIComponent(o.id)}`}>Ver pedido</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      ) : !order ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pedido não encontrado</CardTitle>
            <CardDescription>ID: {normalizedOrderId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-muted-foreground">
              Este projeto armazena pedidos apenas no navegador. Se você limpou o storage ou está em
              outro dispositivo, o pedido pode não existir aqui.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline">
                <Link href="/orders">Ir para pedidos</Link>
              </Button>
              <Button asChild>
                <Link href="/products">Ir para produtos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
              <CardDescription>Pedido {order.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Criado em</span>
                  <span className="font-medium text-gray-900">{formatDateTime(order.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tracking</span>
                  <span className="font-medium text-gray-900">{order.tracking.code}</span>
                </div>
              </div>

              <OrderTrackingTimeline status={order.status} />

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild>
                  <Link href={`/orders/${encodeURIComponent(order.id)}`}>Ver detalhes do pedido</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={order.tracking.url} target="_blank" rel="noreferrer">
                    Abrir tracking da transportadora
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

