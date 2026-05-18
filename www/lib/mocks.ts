import { OrderSchema, type Order } from "@/lib/schemas"

export const MOCK_CUSTOMER = {
  firstName: "Cliente",
  lastName: "ByShop",
  email: "cliente@byshop.com",
  phone: "11999999999",
  address: {
    cep: "01001-000",
    street: "Rua Exemplo",
    number: "123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
  },
} as const

// IA-first: pedidos de exemplo do cliente (úteis para desenvolvimento/refatoração de telas).
export const MOCK_CUSTOMER_ORDERS: Order[] = OrderSchema.array().parse([
  {
    id: "ord_2026_05_01_001",
    createdAt: "2026-05-01T14:20:00.000Z",
    customerEmail: MOCK_CUSTOMER.email,
    items: [{ id: 2, name: "Headphone JBL T460BT", variant: "Preto", price: 199.99, quantity: 1, emoji: "🎧" }],
    totals: { subtotal: 199.99, shipping: 9.99, tax: 16.0, discount: 0, total: 225.98 },
    status: "processing",
    couponCode: null,
    payment: { method: "card", label: "Cartão •••• 1111" },
    tracking: { carrier: "MockExpress", code: "TRK-9K3LQ2A1", url: "https://tracking.mock/TRK-9K3LQ2A1" },
  },
  {
    id: "ord_2026_04_18_002",
    createdAt: "2026-04-18T09:05:00.000Z",
    customerEmail: MOCK_CUSTOMER.email,
    items: [
      { id: 3, name: "Caixa de Som Bluetooth", variant: "Branco", price: 79.99, quantity: 1, emoji: "🔊" },
      { id: 4, name: "Teclado Mecânico", variant: "Preto", price: 249.9, quantity: 1, emoji: "⌨️" },
    ],
    totals: { subtotal: 329.89, shipping: 0, tax: 26.39, discount: 32.99, total: 323.29 },
    status: "paid",
    couponCode: "SAVE10",
    payment: { method: "pix", label: "Pix" },
    tracking: { carrier: "MockExpress", code: "TRK-X8P1M4Z9", url: "https://tracking.mock/TRK-X8P1M4Z9" },
  },
  {
    id: "ord_2026_03_30_003",
    createdAt: "2026-03-30T21:44:00.000Z",
    customerEmail: MOCK_CUSTOMER.email,
    items: [
      { id: 1, name: "Puma AXIS TR Boot", variant: "Preto / Tamanho 42", price: 125.0, quantity: 1, emoji: "👟" },
      { id: 10, name: "SSD 1TB NVMe", variant: "Preto", price: 499.9, quantity: 1, emoji: "💾" },
      { id: 3, name: "Mouse Gamer RGB", variant: "Preto", price: 129.9, quantity: 1, emoji: "🖱️" },
    ],
    totals: { subtotal: 754.8, shipping: 0, tax: 60.38, discount: 0, total: 815.18 },
    status: "shipped",
    couponCode: "FREESHIP",
    payment: { method: "boleto", label: "Boleto" },
    tracking: { carrier: "MockExpress", code: "TRK-4T7H2N5B", url: "https://tracking.mock/TRK-4T7H2N5B" },
  },
])
