import { formatBRL, LOJA } from "./menu-data"
import {
  resumoAdicionais,
  totalLinha,
  type CartLine,
} from "./product-types"

interface ResumoPedido {
  lines: CartLine[]
  subtotal: number
  entrega: number
  total: number
}

/**
 * Monta a mensagem que será enviada para o WhatsApp da loja.
 * A ordem dos dados acompanha o carrinho: item, variação, adicionais
 * (com a indicação de grátis), observação e total da linha.
 */
export function montarMensagemPedido({
  lines,
  subtotal,
  entrega,
  total,
}: ResumoPedido): string {
  const blocos = lines.map((line) => {
    const resumo = resumoAdicionais(line.adicionais, line.qtAdicionalGratis)
    const adicionais = resumo.linhas.map((adicional) => {
      const gratis =
        adicional.unidadesGratis > 0
          ? ` (${adicional.unidadesGratis} grátis)`
          : ""
      return `   + ${adicional.qty}x ${adicional.descricao}${gratis}`
    })

    const bloco = [`${line.qty}x ${line.produtoNome} — ${line.variacaoNome}`]

    if (adicionais.length > 0) {
      bloco.push(`   Adicionais${line.qty > 1 ? " (por unidade)" : ""}:`)
      bloco.push(...adicionais)
    }

    if (line.observacao) bloco.push(`   Obs.: ${line.observacao}`)
    bloco.push(`   ${formatBRL(totalLinha(line))}`)

    return bloco.join("\n")
  })

  const economia = lines.reduce((soma, line) => {
    const resumo = resumoAdicionais(line.adicionais, line.qtAdicionalGratis)
    return soma + resumo.valorGratis * line.qty
  }, 0)

  return [
    `Olá, ${LOJA.nome}! Quero fazer um pedido:`,
    "",
    blocos.join("\n\n"),
    "",
    `Subtotal: ${formatBRL(subtotal)}`,
    `Entrega: ${entrega === 0 ? "Grátis" : formatBRL(entrega)}`,
    ...(economia > 0
      ? [`Adicionais grátis: ${formatBRL(economia)} de economia`]
      : []),
    `Total: ${formatBRL(total)}`,
  ].join("\n")
}
