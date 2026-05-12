import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "Como escolher o acessório certo para o seu setup",
    excerpt: "Dicas práticas para combinar utilidade, estilo e custo-benefício.",
    href: "/products?category=accessories"
  },
  {
    title: "Áudio sem complicação: guia rápido",
    excerpt: "O básico para comparar fones e caixas e acertar na compra.",
    href: "/products?category=audio"
  },
  {
    title: "Promoções: como aproveitar melhor ofertas",
    excerpt: "Entenda como identificar descontos reais e evitar compras por impulso.",
    href: "/products?sale=1"
  }
] as const;

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Conteúdos e guias rápidos para ajudar na escolha de produtos e na experiência de compra.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/products">Ver catálogo</Link>
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.title}
            href={post.href}
            className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
            <p className="text-muted-foreground mt-2 text-sm">{post.excerpt}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
              Ler agora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

