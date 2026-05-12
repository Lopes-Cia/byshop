"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
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

export default function OrdersPage() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const nextPath = pathname;
  const [hasHydrated, setHasHydrated] = useState(useOrdersStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useOrdersStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useOrdersStore.persist.hasHydrated()) setHasHydrated(true);
    return unsubscribe;
  }, []);

  const orders = useOrdersStore((state) =>
    user ? state.orders.filter((order) => order.userId === user.id) : [],
  );

  const orderedList = useMemo(() => {
    return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [orders]);

  if (!user) {
    const encodedNext = encodeURIComponent(nextPath);
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Seus pedidos</h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Entre para visualizar seus pedidos e acompanhar entregas.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={`/auth/signin?next=${encodedNext}`}>Entrar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/auth/signup?next=${encodedNext}`}>Criar conta</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-muted-foreground mt-3">Carregando seus pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Pedidos</h1>
        <p className="text-muted-foreground mt-3">Pedidos criados localmente a partir do checkout.</p>
      </div>

      <div className="grid gap-4">
        {orderedList.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nenhum pedido encontrado</CardTitle>
              <CardDescription>
                Você está logado como <span className="font-medium">{user.email}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/products">Ir para produtos</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          orderedList.map((order) => (
            <Card key={order.id} className="py-0">
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <CardDescription>{formatDateTime(order.createdAt)}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusVariant[order.status]}>{statusLabel[order.status]}</Badge>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(order.totals.total)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-muted-foreground text-sm">
                  {order.items.length} item(ns) • Tracking {order.tracking.code}
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/orders/${encodeURIComponent(order.id)}`}>Ver detalhes</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
