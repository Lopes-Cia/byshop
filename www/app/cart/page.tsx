"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CouponBox from "@/components/CouponBox";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSummary } = useCartStore();
  const [hasHydrated, setHasHydrated] = useState(useCartStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useCartStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useCartStore.persist.hasHydrated()) setHasHydrated(true);
    return unsubscribe;
  }, []);

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const summary = getSummary();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven&#39;t added anything to your cart yet.
        </p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-6">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:text-red-700">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6">
          <CouponBox className="mb-6" />
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Subtotal</span>
              <span className="text-sm font-medium text-gray-900">${summary.subtotal.toFixed(2)}</span>
            </div>
            {summary.discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Discount</span>
                <span className="text-sm font-medium text-gray-900">
                  -${summary.discount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Shipping</span>
              <span className="text-sm font-medium text-gray-900">
                {summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Tax</span>
              <span className="text-sm font-medium text-gray-900">${summary.tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-primary text-2xl font-bold">${summary.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/checkout" className="flex-1">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
