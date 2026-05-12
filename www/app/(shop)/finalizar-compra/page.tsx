"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CouponBox from "@/components/CouponBox";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useOrdersStore } from "@/stores/ordersStore";
import { useForm } from "@/hooks/useForm";
import { CheckoutSchema, type CheckoutForm } from "@/lib/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSummary, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const createOrder = useOrdersStore((state) => state.createOrder);
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(CheckoutSchema);
  const [hasHydrated, setHasHydrated] = useState(useCartStore.persist.hasHydrated());
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);

  useEffect(() => {
    const unsubscribe = useCartStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useCartStore.persist.hasHydrated()) setHasHydrated(true);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (hasHydrated && items.length === 0 && !hasPlacedOrder) router.replace("/carrinho");
  }, [hasHydrated, hasPlacedOrder, items.length, router]);

  const onSubmit = async (formData: CheckoutForm) => {
    setHasPlacedOrder(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const totals = getSummary();
    const order = createOrder({
      items,
      totals,
      userId: user?.id ?? null,
      customerEmail: formData.email,
    });

    clearCart();
    router.push(`/finalizar-compra/sucesso?orderId=${encodeURIComponent(order.id)}`);
  };

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Finalizar compra</h1>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-8">
          Adicione itens ao carrinho antes de finalizar a compra.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/carrinho">
            <Button variant="outline" className="w-full bg-transparent sm:w-auto">
              Voltar ao carrinho
            </Button>
          </Link>
          <Link href="/produtos">
            <Button className="w-full sm:w-auto">Ver produtos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const summary = getSummary();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Finalizar compra</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Checkout Form */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
            className="space-y-6">
            {/* Contact Information */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Contato</h2>
              <div>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={data.email || ""}
                  onChange={(e) => setValue("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Endereço de entrega</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    type="text"
                    placeholder="Nome"
                    value={data.firstName || ""}
                    onChange={(e) => setValue("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Sobrenome"
                    value={data.lastName || ""}
                    onChange={(e) => setValue("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Input
                  type="text"
                  placeholder="Endereço"
                  value={data.address || ""}
                  onChange={(e) => setValue("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Input
                    type="text"
                    placeholder="Cidade"
                    value={data.city || ""}
                    onChange={(e) => setValue("city", e.target.value)}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Estado"
                    value={data.state || ""}
                    onChange={(e) => setValue("state", e.target.value)}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="CEP"
                    value={data.zipCode || ""}
                    onChange={(e) => setValue("zipCode", e.target.value)}
                    className={errors.zipCode ? "border-red-500" : ""}
                  />
                  {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Pagamento</h2>
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Número do cartão"
                    value={data.cardNumber || ""}
                    onChange={(e) => setValue("cardNumber", e.target.value)}
                    className={errors.cardNumber ? "border-red-500" : ""}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="MM/AA"
                      value={data.expiryDate || ""}
                      onChange={(e) => setValue("expiryDate", e.target.value)}
                      className={errors.expiryDate ? "border-red-500" : ""}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="CVV"
                      value={data.cvv || ""}
                      onChange={(e) => setValue("cvv", e.target.value)}
                      className={errors.cvv ? "border-red-500" : ""}
                    />
                    {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Processando..." : "Fazer pedido"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-8 rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Resumo do pedido</h2>

            <div className="mb-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">Qtd.: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <CouponBox compact className="mb-6" />

            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between">
                  <span>Desconto</span>
                  <span>-${summary.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Entrega</span>
                <span>{summary.shipping === 0 ? "Grátis" : `$${summary.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Impostos</span>
                <span>${summary.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-semibold">
                <span>Total</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
