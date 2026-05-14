import { z } from "zod"

export const ProductColorSchema = z.object({
  name: z.string(),
  value: z.string(),
})

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  brand: z.string().optional(),
  category: z.string(),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative().optional(),
  discount: z.number().int().min(0).max(100).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().int().min(0).optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  colors: z.array(ProductColorSchema).optional(),
  images: z.array(z.string()).min(1),
  inStock: z.boolean().optional(),
  emoji: z.string().optional(),
})

// IA-first: item de carrinho persistível (serializável) e usado para cálculo de totais.
export const CartItemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  variant: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().min(1),
  emoji: z.string().optional(),
})

// IA-first: cupom simples para checkout mock; inclui opção de frete grátis.
export const CouponSchema = z.object({
  code: z.string().trim().min(1),
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(["percent", "fixed", "shipping"]),
  value: z.number().positive(),
  minSubtotal: z.number().nonnegative().optional(),
  expiresAt: z.string().optional(),
  active: z.boolean(),
})

// IA-first: schemas de pedido (persistência + telas de acompanhamento/conta).
export const OrderStatusSchema = z.enum(["processing", "paid", "shipped", "delivered", "canceled"])

// IA-first: tracking mockado para fluxo de compra (sucesso e meus pedidos).
export const OrderTrackingSchema = z.object({
  carrier: z.string().min(1),
  code: z.string().min(1),
  url: z.string().url(),
})

// IA-first: totals aceitam campos ausentes para compatibilidade com dados persistidos antigos.
export const OrderTotalsSchema = z.object({
  subtotal: z.number().nonnegative().default(0),
  shipping: z.number().nonnegative().default(0),
  tax: z.number().nonnegative().default(0),
  discount: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0),
})

export const OrderSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().min(1),
  customerEmail: z.string().email(),
  items: CartItemSchema.array(),
  totals: OrderTotalsSchema,
  status: OrderStatusSchema,
  couponCode: z.string().nullable(),
  tracking: OrderTrackingSchema.optional(),
})

export type Product = z.infer<typeof ProductSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type Coupon = z.infer<typeof CouponSchema>
export type OrderStatus = z.infer<typeof OrderStatusSchema>
export type OrderTracking = z.infer<typeof OrderTrackingSchema>
export type OrderTotals = z.infer<typeof OrderTotalsSchema>
export type Order = z.infer<typeof OrderSchema>
