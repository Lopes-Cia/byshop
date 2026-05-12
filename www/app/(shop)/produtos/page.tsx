import { Suspense } from "react";
import ProductsClient from "./produtos-client";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-muted-foreground">Carregando produtos...</div>
        </div>
      }>
      <ProductsClient />
    </Suspense>
  );
}
