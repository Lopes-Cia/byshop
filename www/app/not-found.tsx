import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-muted-foreground text-sm tracking-widest uppercase">404</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Página não encontrada</h1>
      <p className="text-muted-foreground mt-4 max-w-xl">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Voltar para a home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/produtos">Ver produtos</Link>
        </Button>
      </div>
    </div>
  );
}
