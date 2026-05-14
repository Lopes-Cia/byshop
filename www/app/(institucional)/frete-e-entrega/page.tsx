import { MapPin, PackageCheck, Truck } from "lucide-react"

import { PaginaInstitucional } from "@/components/institucional/pagina-institucional"

export default function FreteEEntregaPage() {
  return (
    <PaginaInstitucional
      title="Frete e entrega"
      description="Entenda como funcionam os prazos, o rastreio e as etapas de entrega. Mantemos comunicação clara do pedido até a sua porta."
      primaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
      secondaryCta={{ label: "Ver produtos", href: "/produtos" }}
      sections={[
        {
          title: "Prazos e regiões",
          description: "Estimativas variam por localidade e modalidade.",
          icon: <MapPin className="size-5" />,
          items: [
            "Prazo informado no checkout e confirmado após o pedido",
            "Atualizações de status durante a separação e expedição",
          ],
        },
        {
          title: "Rastreio",
          description: "Acompanhe cada etapa do envio.",
          icon: <Truck className="size-5" />,
          items: ["Código de rastreio quando disponível", "Eventos de trânsito e entrega atualizados"],
        },
        {
          title: "Recebimento",
          description: "Boas práticas para receber seu pedido com segurança.",
          icon: <PackageCheck className="size-5" />,
          items: [
            "Confira a embalagem e o produto no recebimento",
            "Em caso de avaria, registre evidências para suporte/troca",
          ],
        },
      ]}
      faq={[
        {
          question: "Como sei o prazo de entrega do meu pedido?",
          answer:
            "O prazo é exibido no checkout e pode variar por localidade e modalidade. Após a confirmação do pedido, você verá o status das etapas até a entrega.",
        },
        {
          question: "Quando vou receber o código de rastreio?",
          answer:
            "Quando a transportadora disponibiliza rastreio, o código aparece após a expedição. Algumas modalidades podem atualizar status sem código público.",
        },
        {
          question: "O que acontece se eu não estiver em casa?",
          answer:
            "A transportadora pode tentar novas entregas ou direcionar para retirada conforme a política de cada parceiro. Em caso de dúvidas, use a Central de ajuda.",
        },
        {
          question: "E se o pedido atrasar?",
          answer:
            "Em atrasos, verifique o histórico do rastreio e o status do pedido. Se persistir, acione a Central de ajuda para orientação do próximo passo.",
        },
      ]}
      bottomCtaTitle="Precisa de mais ajuda?"
      bottomCtaDescription="Veja também nossa política de trocas e devoluções para casos de avaria ou necessidade de retorno."
      bottomPrimaryCta={{ label: "Trocas e devoluções", href: "/trocas-e-devolucoes" }}
      bottomSecondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
    />
  )
}
