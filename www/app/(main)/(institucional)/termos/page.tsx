import { FileText, ShieldCheck, ShoppingBag, UserRound } from "lucide-react"

import { PaginaInstitucional } from "@/components/institucional/pagina-institucional"

export default function TermosPage() {
  return (
    <PaginaInstitucional
      title="Termos de uso"
      description="Condições de uso do site e da experiência de compra. Este conteúdo é um modelo para validação do template e pode ser substituído pelo texto oficial."
      note="Conteúdo demonstrativo (mock) — não constitui aconselhamento jurídico."
      primaryCta={{ label: "Política de privacidade", href: "/privacidade" }}
      secondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
      sections={[
        {
          title: "Conta e segurança",
          description: "Responsabilidades do usuário e boas práticas.",
          icon: <UserRound className="size-5" />,
          items: [
            "Manter dados de acesso em sigilo e atualizados",
            "Responsabilizar-se por ações realizadas na conta",
          ],
        },
        {
          title: "Pedidos e pagamentos",
          description: "Regras gerais de compra e confirmação.",
          icon: <ShoppingBag className="size-5" />,
          items: [
            "Pedidos estão sujeitos à confirmação de pagamento",
            "Preços e disponibilidade podem variar e serão confirmados no checkout",
          ],
        },
        {
          title: "Uso do site",
          description: "Condições para acesso e uso dos conteúdos.",
          icon: <FileText className="size-5" />,
          items: [
            "Não usar o site para fins ilícitos ou fraudulentos",
            "Respeitar direitos e políticas aplicáveis",
          ],
        },
        {
          title: "Limitações e responsabilidade",
          description: "Escopo e limites razoáveis do serviço.",
          icon: <ShieldCheck className="size-5" />,
          items: [
            "A ByShop busca manter informações atualizadas, mas pode haver divergências pontuais",
            "Em caso de dúvidas, consulte a Central de ajuda",
          ],
        },
      ]}
      faq={[
        {
          question: "Estes termos podem mudar?",
          answer:
            "Sim. Podemos atualizar os termos para refletir melhorias e obrigações aplicáveis. Versões atualizadas devem ser consultadas nesta página.",
        },
        {
          question: "Como tratar dúvidas sobre pedidos?",
          answer:
            "Para dúvidas sobre compra, entrega ou pós-venda, use a Central de ajuda. Lá você encontra links diretos para políticas relevantes.",
        },
      ]}
      bottomCtaTitle="Veja também"
      bottomCtaDescription="Para entender como seus dados são usados, consulte a Política de privacidade."
      bottomPrimaryCta={{ label: "Política de privacidade", href: "/privacidade" }}
      bottomSecondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
    />
  )
}
