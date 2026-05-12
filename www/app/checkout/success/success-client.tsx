"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrdersStore, type OrderStatus } from "@/stores/ordersStore";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" }).format(value);

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
  orderId: string | null;
};

export default function CheckoutSuccessClient({ orderId: initialOrderId }: Props) {
  const [hasHydrated, setHasHydrated] = useState(useOrdersStore.persist.hasHydrated());
  const lastCreatedOrderId = useOrdersStore((state) => state.lastCreatedOrderId);

  useEffect(() => {
    const unsubscribe = useOrdersStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useOrdersStore.persist.hasHydrated()) setHasHydrated(true);
    return unsubscribe;
  }, []);

  const orderId = useMemo(
    () => initialOrderId ?? lastCreatedOrderId ?? null,
    [initialOrderId, lastCreatedOrderId],
  );

  const order = useOrdersStore((state) =>
    orderId ? state.orders.find((o) => o.id === orderId) : undefined,
  );

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Pedido confirmado</h1>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Pedido confirmado</h1>
        <p className="text-muted-foreground mb-8">Não foi possível identificar o pedido criado.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline">
            <Link href="/orders">Ir para pedidos</Link>
          </Button>
          <Button asChild>
            <Link href="/products">Continuar comprando</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Pedido confirmado</h1>
        <p className="text-muted-foreground mb-8">
          Pedido <span className="font-medium text-gray-900">{orderId}</span> não encontrado no
          storage local.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline">
            <Link href="/orders">Ir para pedidos</Link>
          </Button>
          <Button asChild>
            <Link href="/products">Continuar comprando</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Pedido confirmado</h1>
        <p className="text-muted-foreground mt-3">Seu pedido foi criado com sucesso.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg">{order.id}</CardTitle>
                <CardDescription>{order.items.length} item(ns)</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[order.status]}>{statusLabel[order.status]}</Badge>
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(order.totals.total)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tracking</span>
              <span className="font-medium text-gray-900">{order.tracking.code}</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={`/orders/${encodeURIComponent(order.id)}`}>Ver detalhes do pedido</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/orders">Ver todos os pedidos</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Continuar comprando</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

