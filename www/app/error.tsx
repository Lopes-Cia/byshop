"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-muted-foreground text-sm tracking-widest uppercase">Erro</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
        Algo deu errado
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl">
        Ocorreu um problema inesperado ao carregar esta página. Tente novamente.
      </p>
      {process.env.NODE_ENV !== "production" && (
        <div className="mt-6 w-full rounded-lg border bg-white p-4 text-left">
          <div className="text-xs font-semibold tracking-widest uppercase text-gray-700">
            Diagnóstico
          </div>
          <div className="mt-2 text-sm text-gray-800">{error.message}</div>
          {error.digest && <div className="text-muted-foreground mt-1 text-xs">{error.digest}</div>}
        </div>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Tentar novamente</Button>
        <Button asChild variant="outline">
          <Link href="/">Voltar para a home</Link>
        </Button>
      </div>
    </div>
  );
}

