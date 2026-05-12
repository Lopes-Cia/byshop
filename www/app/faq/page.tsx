import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "Como acompanho meu pedido?",
    a: "Você pode acompanhar o status no carrinho/checkout e, quando houver conta, na área de perfil. Para dúvidas, use a página de contato."
  },
  {
    q: "Qual é a política de devolução?",
    a: "Aceitamos devoluções dentro de um período definido na página de devoluções. Itens em promoção podem ter regras específicas."
  },
  {
    q: "Quais formas de envio estão disponíveis?",
    a: "As opções e prazos aparecem no checkout e na página de informações de envio."
  },
  {
    q: "Como funciona a privacidade dos meus dados?",
    a: "Os detalhes estão descritos na política de privacidade. Em caso de dúvidas, fale com a equipe."
  }
] as const;

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Perguntas frequentes</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Respostas rápidas para as dúvidas mais comuns.
        </p>
      </div>

      <div className="mt-10 rounded-xl border bg-white p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Button asChild variant="outline">
          <Link href="/shipping">Envio</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/returns">Devoluções</Link>
        </Button>
        <Button asChild>
          <Link href="/contact">Contato</Link>
        </Button>
      </div>
    </div>
  );
}

