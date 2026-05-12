import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/sobre", permanent: true },
      { source: "/faq", destination: "/perguntas-frequentes", permanent: true },
      { source: "/privacy", destination: "/privacidade", permanent: true },
      { source: "/returns", destination: "/trocas-e-devolucoes", permanent: true },
      { source: "/shipping", destination: "/entrega", permanent: true },
      { source: "/terms", destination: "/termos-de-uso", permanent: true },
      { source: "/contact", destination: "/contato", permanent: true },
      { source: "/products", destination: "/produtos", permanent: true },
      { source: "/products/:id", destination: "/produtos/:id", permanent: true },
      { source: "/cart", destination: "/carrinho", permanent: true },
      { source: "/checkout", destination: "/finalizar-compra", permanent: true },
      {
        source: "/checkout/success",
        destination: "/finalizar-compra/sucesso",
        permanent: true
      },
      { source: "/tracking", destination: "/rastreamento", permanent: true },
      { source: "/auth/signin", destination: "/conta/entrar", permanent: true },
      { source: "/auth/signup", destination: "/conta/cadastrar", permanent: true },
      {
        source: "/auth/forgot-password",
        destination: "/conta/recuperar-senha",
        permanent: true
      },
      { source: "/orders", destination: "/pedidos", permanent: true },
      { source: "/orders/:id", destination: "/pedidos/:id", permanent: true },
      { source: "/profile", destination: "/perfil", permanent: true },
      { source: "/wishlist", destination: "/favoritos", permanent: true }
    ];
  }
};

export default nextConfig;
