import Link from "next/link";
import { ShieldCheck, Truck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">Sobre a loja</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Um e-commerce moderno com foco em experiência, qualidade e entrega consistente.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/products">Explorar produtos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Falar com a gente</Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6">
          <div className="bg-primary/10 inline-flex h-12 w-12 items-center justify-center rounded-lg">
            <Truck className="text-primary h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Entrega clara</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Prazos e políticas apresentados de forma simples para reduzir dúvidas no checkout.
          </p>
        </div>
        <div className="rounded-xl border bg-white p-6">
          <div className="bg-primary/10 inline-flex h-12 w-12 items-center justify-center rounded-lg">
            <ShieldCheck className="text-primary h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Compra segura</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Boas práticas de UX e validações para diminuir erros e aumentar confiança.
          </p>
        </div>
        <div className="rounded-xl border bg-white p-6">
          <div className="bg-primary/10 inline-flex h-12 w-12 items-center justify-center rounded-lg">
            <Headphones className="text-primary h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Suporte</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Página de contato e FAQ para organizar o atendimento e reduzir tickets repetidos.
          </p>
        </div>
      </div>

      <div className="mt-14 rounded-xl border bg-white p-8">
        <h2 className="text-2xl font-semibold text-gray-900">Como este starter evolui</h2>
        <p className="text-muted-foreground mt-3">
          Este front é um ponto de partida para um ecossistema de e-commerces. As páginas
          essenciais (produtos, carrinho, checkout, políticas e suporte) ficam acessíveis por
          navegação sem links quebrados.
        </p>
      </div>
    </div>
  );
}

