import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Conheça-nos</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white">Carreiras</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="/sobre" className="hover:text-white">Sobre a ByShop</Link></li>
              <li><Link href="#" className="hover:text-white">Relacoes com Investidores</Link></li>
              <li><Link href="#" className="hover:text-white">Sustentabilidade</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ganhe Dinheiro Conosco</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white">Venda na byShop</Link></li>
              <li><Link href="#" className="hover:text-white">Seja um Afiliado</Link></li>
              <li><Link href="#" className="hover:text-white">Anuncie seus Produtos</Link></li>
              <li><Link href="#" className="hover:text-white">Programa de Parceiros</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Deixe-nos Ajudar</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/minha-conta" className="hover:text-white">Sua conta</Link></li>
              <li><Link href="/meus-pedidos" className="hover:text-white">Seus pedidos</Link></li>
              <li><Link href="/frete-e-entrega" className="hover:text-white">Frete e entrega</Link></li>
              <li><Link href="/trocas-e-devolucoes" className="hover:text-white">Trocas e devoluções</Link></li>
              <li><Link href="/central-de-ajuda" className="hover:text-white">Central de ajuda</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-red-500">
              Formas de Pagamento
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white">Cartao byShop</Link></li>
              <li><Link href="#" className="hover:text-white">Pague com Pontos</Link></li>
              <li><Link href="#" className="hover:text-white">Recarregue seu Saldo</Link></li>
              <li><Link href="/cartoes-presente" className="hover:text-white">Cartões-presente</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image 
              src="/images/logo.png" 
              alt="byShop" 
              width={100} 
              height={28} 
              className="h-6 w-auto brightness-0 invert"
            />
          </Link>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <Link href="/termos" className="hover:text-white">Termos de uso</Link>
            <Link href="/privacidade" className="hover:text-white">Política de privacidade</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
          <p className="text-sm text-neutral-400">
            2024 byShop. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
