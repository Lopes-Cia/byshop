"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderTrackingTimeline } from "@/components/orders/order-tracking-timeline";
import { useOrdersStore, type OrderStatus } from "@/stores/ordersStore";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" }).format(value);

const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(date);
};

const statusLabel: Record<OrderStatus, string> = {
  processing: "Processando",
  paid: "Pago",
  shipped: "Enviado",
  delivered: "Entregue",
  canceled: "Cancelado",
};

const statusVariant: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  processing: "secondary",
  paid: "default",
  shipped: "outline",
  delivered: "default",
  canceled: "destructive",
};

type Props = {
  orderId: string;
};

export default function OrderDetailClient({ orderId }: Props) {
  const [hasHydrated, setHasHydrated] = useState(useOrdersStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useOrdersStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useOrdersStore.persist.hasHydrated()) setHasHydrated(true);
    return unsubscribe;
  }, []);

  const order = useOrdersStore((state) => state.orders.find((o) => o.id === orderId));

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Pedido</h1>
        <p className="text-muted-foreground mt-3">Carregando...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedido não encontrado</h1>
            <p className="text-muted-foreground mt-3 text-sm">ID: {orderId}</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/pedidos">Voltar</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sem dados locais</CardTitle>
            <CardDescription>
              Este projeto usa pedidos persistidos no navegador. Se você limpou o storage, o pedido
              pode ter sido removido.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/pedidos">Ir para pedidos</Link>
            </Button>
            <Button asChild>
              <Link href="/produtos">Ir para produtos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Detalhes do pedido</h1>
          <p className="text-muted-foreground mt-3 text-lg">{order.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant[order.status]}>{statusLabel[order.status]}</Badge>
          <Button asChild variant="outline">
            <Link href="/pedidos">Voltar</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumo</CardTitle>
            <CardDescription>Criado em {formatDateTime(order.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-gray-900">{order.customerEmail}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-gray-900">{formatCurrency(order.totals.total)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Itens</CardTitle>
            <CardDescription>{order.items.length} item(ns)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-900">{item.name}</div>
                  <div className="text-muted-foreground text-sm">Qtd: {item.quantity}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                  <div className="text-muted-foreground">{formatCurrency(item.price)} un.</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Totais</CardTitle>
            <CardDescription>Detalhamento do cálculo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(order.totals.subtotal)}</span>
            </div>
            {order.totals.discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Desconto</span>
                <span className="text-gray-900">-{formatCurrency(order.totals.discount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frete</span>
              <span className="text-gray-900">
                {order.totals.shipping === 0 ? "Grátis" : formatCurrency(order.totals.shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Impostos</span>
              <span className="text-gray-900">{formatCurrency(order.totals.tax)}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(order.totals.total)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Entrega</CardTitle>
            <CardDescription>Acompanhe o status e o tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Transportadora</span>
              <span className="text-gray-900">{order.tracking.carrier}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Código</span>
              <span className="font-medium text-gray-900">{order.tracking.code}</span>
            </div>
            <OrderTrackingTimeline status={order.status} />
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild size="sm">
                <Link href={`/rastreamento?orderId=${encodeURIComponent(order.id)}`}>Ver tracking</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={order.tracking.url} target="_blank" rel="noreferrer">
                  Abrir tracking da transportadora
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
