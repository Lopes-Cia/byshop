import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Descubra produtos
              <span className="text-primary block">premium</span>
            </h1>
            <p className="mb-8 max-w-lg text-xl text-gray-600">
              Qualidade excepcional e design moderno. Veja uma coleção selecionada de produtos
              premium feitos para o dia a dia.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/produtos">
                <Button size="lg" className="w-full sm:w-auto">
                  Ver produtos
                </Button>
              </Link>
              <Link href="/sobre">
                <Button variant="outline" size="lg" className="w-full bg-transparent sm:w-auto">
                  Saiba mais
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1511892549826-a48122d9b258?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Produto em destaque"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="font-bold text-white">50%</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Oferta especial</p>
                  <p className="text-sm text-gray-600">Por tempo limitado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
