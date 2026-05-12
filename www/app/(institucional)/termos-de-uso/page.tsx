import Link from "next/link";

export default function TermosDeUsoPage() {
  const dataAtualizacao = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Termos de uso</h1>
        <p className="text-muted-foreground mb-8 text-lg">Última atualização: {dataAtualizacao}</p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Aceitação</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Ao acessar e utilizar este site, você concorda com estes termos. Se você não concorda
              com alguma parte, não utilize o serviço.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Uso do site</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="list-disc space-y-2 pl-6">
              <li>Você se compromete a fornecer dados corretos ao preencher formulários.</li>
              <li>É proibido usar o site para fins ilegais, abusivos ou para violar direitos de terceiros.</li>
              <li>Podemos suspender acessos em caso de uso indevido.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. Produtos e preços</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Buscamos manter informações de produto e preços atualizados, mas podem ocorrer erros.
              Em caso de divergência, poderemos corrigir as informações e confirmar com você antes
              de concluir o pedido.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Pagamento e pedidos</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Um pedido pode ser cancelado em situações como indisponibilidade de estoque ou suspeita
              de fraude. O pagamento é devido no momento da compra.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Entrega</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Prazos e custos de entrega variam conforme endereço e modalidade escolhida. Consulte a
              página de{" "}
              <Link href="/entrega" className="text-primary hover:underline">
                entrega
              </Link>{" "}
              para detalhes.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Trocas e devoluções</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Consulte nossa política de{" "}
              <Link href="/trocas-e-devolucoes" className="text-primary hover:underline">
                trocas e devoluções
              </Link>{" "}
              para prazos e condições.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. Privacidade</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              O tratamento de dados é descrito na{" "}
              <Link href="/privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Alterações</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Podemos atualizar estes termos periodicamente. Ao continuar utilizando o site após uma
              atualização, você concorda com a versão mais recente.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

