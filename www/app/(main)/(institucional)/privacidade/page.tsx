import { Cookie, FileText, Lock, UserCheck } from "lucide-react"

import { PaginaInstitucional } from "@/components/institucional/pagina-institucional"

export default function PrivacidadePage() {
  return (
    <PaginaInstitucional
      title="Política de privacidade"
      description="Entenda como coletamos, usamos e protegemos seus dados. Este conteúdo é um modelo para validação do template e pode ser substituído pelo texto oficial."
      note="Conteúdo demonstrativo (mock) — não constitui aconselhamento jurídico."
      primaryCta={{ label: "Termos de uso", href: "/termos" }}
      secondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
      sections={[
        {
          title: "Dados coletados",
          description: "Exemplos de dados usados para operar a loja.",
          icon: <FileText className="size-5" />,
          items: [
            "Dados de conta e contato (nome, e-mail, telefone)",
            "Dados de compra (itens, pagamentos, status do pedido)",
          ],
        },
        {
          title: "Finalidades",
          description: "Por que usamos seus dados.",
          icon: <UserCheck className="size-5" />,
          items: [
            "Processar pedidos, pagamentos e entrega",
            "Suporte, prevenção a fraude e melhoria de experiência",
          ],
        },
        {
          title: "Cookies",
          description: "Preferências e funcionalidades do site.",
          icon: <Cookie className="size-5" />,
          items: ["Manter sessão e preferências", "Métricas e diagnóstico de uso (quando aplicável)"],
        },
        {
          title: "Segurança",
          description: "Medidas para proteger informações.",
          icon: <Lock className="size-5" />,
          items: [
            "Controles de acesso e boas práticas de proteção",
            "Monitoramento para reduzir riscos de uso indevido",
          ],
        },
      ]}
      faq={[
        {
          question: "A ByShop vende meus dados?",
          answer:
            "Não. Usamos dados para operar a plataforma e prestar o serviço. Compartilhamentos (quando necessários) são limitados a parceiros essenciais, como logística e pagamentos.",
        },
        {
          question: "Posso solicitar correção ou exclusão de dados?",
          answer:
            "Quando aplicável, sim. Você pode solicitar revisão/atualização e entender as possibilidades por meio da Central de ajuda.",
        },
        {
          question: "Quais cookies são utilizados?",
          answer:
            "Cookies podem manter sessão, preferências e apoiar melhorias. Quando houver, você poderá gerenciar preferências conforme disponibilizado na experiência do site.",
        },
      ]}
      bottomCtaTitle="Mais informações"
      bottomCtaDescription="Confira também os Termos de uso para conhecer condições de navegação e compra."
      bottomPrimaryCta={{ label: "Termos de uso", href: "/termos" }}
      bottomSecondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
    />
  )
}
