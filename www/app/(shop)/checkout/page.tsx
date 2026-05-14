import { redirect } from "next/navigation"

export default function CheckoutPage() {
  // IA-first: rota legada (/checkout) redireciona para a rota canônica do fluxo de compra.
  redirect("/finalizar-compra")
}
