import { ClipboardList, CreditCard, PackageOpen, RotateCcw } from "lucide-react"

import { PaginaInstitucional } from "@/components/institucional/pagina-institucional"

export default function TrocasEDevolucoesPage() {
  return (
    <PaginaInstitucional
      title="Trocas e devoluções"
      description="Veja prazos, condições e o passo a passo para solicitar troca, devolução ou reembolso. Mantemos o processo claro e objetivo."
      primaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
      secondaryCta={{ label: "Ver produtos", href: "/produtos" }}
      sections={[
        {
          title: "Prazos e condições",
          description: "Critérios gerais para elegibilidade.",
          icon: <ClipboardList className="size-5" />,
          items: [
            "Item sem sinais de uso indevido e com acessórios/embalagem quando aplicável",
            "Solicitação dentro do prazo informado para a categoria",
          ],
        },
        {
          title: "Como solicitar",
          description: "Passos simples para iniciar o processo.",
          icon: <RotateCcw className="size-5" />,
          items: ["Separe número do pedido e detalhes do problema", "Envie evidências (fotos/vídeos) quando necessário"],
        },
        {
          title: "Coleta ou postagem",
          description: "Devolução via postagem/coleta conforme modalidade.",
          icon: <PackageOpen className="size-5" />,
          items: ["Instruções de envio e etiqueta (quando aplicável)", "Acompanhamento do status até a conclusão"],
        },
        {
          title: "Reembolso",
          description: "Forma e prazo podem variar por meio de pagamento.",
          icon: <CreditCard className="size-5" />,
          items: ["Após análise/aprovação, inicia-se o processo de estorno", "Você recebe comunicação sobre cada etapa"],
        },
      ]}
      faq={[
        {
          question: "Posso devolver um produto aberto?",
          answer:
            "Depende da categoria e do estado do item. Em geral, avaliamos condições e itens inclusos. Consulte as condições acima e acione a Central de ajuda para o caso específico.",
        },
        {
          question: "Quanto tempo leva para o reembolso cair?",
          answer:
            "O prazo varia conforme o meio de pagamento e a instituição. Após aprovação, o estorno é iniciado e você recebe atualizações do processo.",
        },
        {
          question: "E se o produto chegar com defeito/avaria?",
          answer:
            "Registre evidências (fotos da embalagem e do item) e inicie o processo. Priorizamos casos de avaria para orientar rapidamente o próximo passo.",
        },
        {
          question: "Como acompanho o status da troca/devolução?",
          answer:
            "Você verá as etapas do processo e, quando aplicável, rastreio de postagem/coleta. Em dúvidas, use a Central de ajuda.",
        },
      ]}
      bottomCtaTitle="Precisa conferir prazos de entrega?"
      bottomCtaDescription="Veja também informações de envio e rastreio."
      bottomPrimaryCta={{ label: "Frete e entrega", href: "/frete-e-entrega" }}
      bottomSecondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
    />
  )
}
