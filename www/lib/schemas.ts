import { z } from "zod"

// Product schema - types will be inferred from this
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  image: z.string(),
  rating: z.number().min(0).max(5),
  reviews: z.number().min(0),
  category: z.string().optional(),
  badge: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  colors: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  sizes: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
})

// Cart item schema
export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  image: z.string(),
  quantity: z.number().min(1),
})

// User schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
})

// Auth forms schemas
export const SignInSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  })

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
})

// Checkout form schema
export const CheckoutSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipCode: z.string().min(5, "CEP deve ter pelo menos 5 caracteres"),
  cardNumber: z.string().min(16, "Número do cartão deve ter pelo menos 16 dígitos"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Digite no formato MM/AA"),
  cvv: z.string().min(3, "CVV deve ter pelo menos 3 dígitos"),
})

// Contact form schema
export const ContactSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().email("Digite um e-mail válido"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Assunto é obrigatório"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  orderNumber: z.string().optional(),
})

// Infer types from schemas
export type Product = z.infer<typeof ProductSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type User = z.infer<typeof UserSchema>
export type SignInForm = z.infer<typeof SignInSchema>
export type SignUpForm = z.infer<typeof SignUpSchema>
export type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>
export type CheckoutForm = z.infer<typeof CheckoutSchema>
export type ContactForm = z.infer<typeof ContactSchema>
