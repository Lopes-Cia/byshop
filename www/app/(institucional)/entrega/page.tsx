import Link from "next/link";

export default function EntregaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Entrega</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Informações sobre prazos, valores e rastreamento do seu pedido.
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Modalidades</h2>
          <div className="text-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Modalidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Prazo estimado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Custo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Rastreamento
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      Padrão
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      5–7 dias úteis
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      $5.99 (grátis acima de $100)
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">Sim</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      Expresso
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      2–3 dias úteis
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">$12.99</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">Sim</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      Internacional
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      7–21 dias úteis
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      Varia por destino
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">Sim</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Prazo de processamento</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Pedidos normalmente são processados em 1–2 dias úteis. O prazo de entrega começa a
              contar após a confirmação do pagamento e o processamento do pedido.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Rastreamento</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Quando o pedido é enviado, você recebe um código de rastreamento. Você pode acompanhar
              pela página de{" "}
              <Link href="/rastreamento" className="text-primary hover:underline">
                rastreamento
              </Link>{" "}
              ou na área de{" "}
              <Link href="/pedidos" className="text-primary hover:underline">
                pedidos
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Observações</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="list-disc space-y-2 pl-6">
              <li>O frete pode variar conforme peso, dimensões e destino.</li>
              <li>Prazos podem sofrer alteração por fatores externos (transportadora, clima, etc.).</li>
              <li>Para entrega internacional, impostos/taxas podem ser cobrados pelo país de destino.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
