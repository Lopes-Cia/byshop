import { FileText, LifeBuoy, Lock, RotateCcw, Truck } from "lucide-react"

import { PaginaInstitucional } from "@/components/institucional/pagina-institucional"

export default function CentralDeAjudaPage() {
  return (
    <PaginaInstitucional
      title="Central de ajuda"
      description="Encontre respostas rápidas sobre pedidos, entregas, trocas e sua conta. Se preferir, use os links abaixo para ir direto ao assunto."
      primaryCta={{ label: "Trocas e devoluções", href: "/trocas-e-devolucoes" }}
      secondaryCta={{ label: "Frete e entrega", href: "/frete-e-entrega" }}
      sections={[
        {
          title: "Entrega e rastreio",
          description: "Prazos, rastreamento e status do pedido.",
          icon: <Truck className="size-5" />,
          items: ["Acompanhe o envio com informações claras", "Entenda prazos por região e transportadora"],
          href: "/frete-e-entrega",
        },
        {
          title: "Trocas e devoluções",
          description: "Regras, prazos e passo a passo do processo.",
          icon: <RotateCcw className="size-5" />,
          items: ["Condições para troca/devolução", "Como solicitar reembolso ou troca"],
          href: "/trocas-e-devolucoes",
        },
        {
          title: "Termos e políticas",
          description: "Consulte as regras de uso e privacidade.",
          icon: <FileText className="size-5" />,
          items: ["Termos de uso do site", "Política de privacidade e cookies"],
          href: "/termos",
        },
        {
          title: "Privacidade",
          description: "Como tratamos seus dados e suas escolhas.",
          icon: <Lock className="size-5" />,
          items: ["Finalidades e bases de uso de dados", "Controle de preferências e direitos do usuário"],
          href: "/privacidade",
        },
        {
          title: "Atendimento",
          description: "Dúvidas gerais e orientações objetivas.",
          icon: <LifeBuoy className="size-5" />,
          items: ["Perguntas frequentes do catálogo", "Orientações para pós-venda"],
        },
      ]}
      faq={[
        {
          question: "Como acompanho meu pedido?",
          answer:
            "Acompanhe o status pela rota de rastreio do pedido (quando disponível) e confira prazos e etapas em “Frete e entrega”.",
        },
        {
          question: "Qual o prazo para solicitar troca ou devolução?",
          answer:
            "O prazo e as condições variam por categoria e estado do item. Veja o passo a passo completo em “Trocas e devoluções”.",
        },
        {
          question: "O que fazer se o produto chegar com avaria?",
          answer:
            "Separe fotos do item e da embalagem e inicie o processo de troca/devolução. A ByShop orienta os próximos passos com prioridade.",
        },
        {
          question: "Como funciona a política de privacidade?",
          answer:
            "Você encontra detalhes sobre dados coletados, finalidade, cookies e seus direitos em “Política de privacidade”.",
        },
        {
          question: "Posso excluir minha conta e meus dados?",
          answer:
            "Sim, quando aplicável. Consulte a seção de direitos do titular em “Política de privacidade” para entender as opções disponíveis.",
        },
        {
          question: "Onde encontro as regras de uso do site?",
          answer:
            "As regras, responsabilidades e condições de uso estão em “Termos de uso”.",
        },
      ]}
      bottomCtaTitle="Acesso rápido"
      bottomCtaDescription="Outras páginas institucionais úteis:"
      bottomPrimaryCta={{ label: "Política de privacidade", href: "/privacidade" }}
      bottomSecondaryCta={{ label: "Termos de uso", href: "/termos" }}
    />
  )
}
