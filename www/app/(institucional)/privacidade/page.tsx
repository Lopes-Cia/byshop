import Link from "next/link";

export default function PoliticaDePrivacidadePage() {
  const dataAtualizacao = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Política de privacidade</h1>
        <p className="text-muted-foreground mb-8 text-lg">Última atualização: {dataAtualizacao}</p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. O que coletamos</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="list-disc space-y-2 pl-6">
              <li>Dados informados por você em formulários (ex.: e-mail e endereço).</li>
              <li>Dados necessários para processar pedidos (ex.: itens do carrinho e histórico).</li>
              <li>Informações técnicas básicas (ex.: navegador, páginas acessadas) para melhorar a experiência.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Como usamos</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="list-disc space-y-2 pl-6">
              <li>Para processar pedidos e fornecer suporte.</li>
              <li>Para melhorar navegação, páginas e fluxos de compra.</li>
              <li>Para enviar comunicações quando você optar por recebê-las.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. Compartilhamento</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Não vendemos seus dados. Podemos compartilhar informações apenas quando necessário para
              operar o serviço (ex.: provedores) ou por obrigação legal.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Seus direitos</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Você pode solicitar acesso, correção ou exclusão de dados, quando aplicável. Para isso,
              utilize a página de{" "}
              <Link href="/contato" className="text-primary hover:underline">
                contato
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Alterações</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Podemos atualizar esta política periodicamente. Ao continuar usando o site após uma
              atualização, você concorda com a versão mais recente.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

