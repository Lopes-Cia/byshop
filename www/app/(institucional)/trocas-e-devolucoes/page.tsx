import Link from "next/link";

export default function TrocasEDevolucoesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Trocas e devoluções</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Veja as regras e o passo a passo para solicitar troca ou devolução.
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Condições gerais</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="list-disc space-y-2 pl-6">
              <li>O produto deve estar sem sinais de uso e com embalagem/acessórios originais.</li>
              <li>Guarde o comprovante de compra e, se possível, a embalagem externa.</li>
              <li>Produtos danificados por mau uso não são elegíveis para devolução.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Prazos</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="list-disc space-y-2 pl-6">
              <li>Devolução por arrependimento: até 7 dias corridos após o recebimento.</li>
              <li>Troca por defeito: conforme análise e disponibilidade.</li>
            </ul>
            <p className="text-muted-foreground">
              Estes prazos são um guia para o starter e podem ser ajustados conforme sua operação.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Como solicitar</h2>
          <div className="space-y-4 text-gray-700">
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Entre em contato pela página de{" "}
                <Link href="/contato" className="text-primary hover:underline">
                  contato
                </Link>
                .
              </li>
              <li>Informe o número do pedido e o motivo da solicitação.</li>
              <li>Você receberá as instruções de postagem e prazos de análise.</li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Reembolso</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Após o recebimento e aprovação da devolução, o reembolso é processado conforme o meio
              de pagamento utilizado.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Dúvidas</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Consulte também{" "}
              <Link href="/perguntas-frequentes" className="text-primary hover:underline">
                perguntas frequentes
              </Link>{" "}
              para respostas rápidas.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

