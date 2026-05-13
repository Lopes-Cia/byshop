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

export type Product = z.infer<typeof ProductSchema>
