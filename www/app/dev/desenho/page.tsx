import { notFound } from "next/navigation";
import { Facebook, Heart, Instagram, Mail, Phone, Search, ShoppingCart, User } from "lucide-react";
import MainNav from "./main-nav";

export default function DevDesenhoPage() {
  /* IA: Rotas /dev não devem ficar acessíveis em produção. */
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="bg-white">
      {/* IA: Este sandbox deve ficar limpo: oculta o chrome global (Header/Footer) para mostrar apenas o header do modelo. */}
      <style>{`
        body > header:first-of-type { display: none !important; }
        body > footer:last-of-type { display: none !important; }
      `}</style>

      <header className="border-b border-[rgba(17,24,39,0.12)] bg-white" aria-label="Cabeçalho (modelo)">
        <div className="bg-[#f3f4f6] text-xs text-[rgba(17,24,39,0.65)]">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="flex h-[34px] items-center justify-between gap-[18px]">
              <div className="flex items-center gap-[18px] whitespace-nowrap" aria-label="Contato">
                <a
                  className="inline-flex items-center gap-2 py-[7px] transition-colors hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
                  href="tel:+5511999999999"
                  aria-label="Telefone"
                >
                  <Phone className="size-4 opacity-70" aria-hidden="true" />
                  <span className="hidden sm:inline">(11) 99999-9999</span>
                </a>
                <a
                  className="inline-flex min-w-0 items-center gap-2 py-[7px] transition-colors hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
                  href="mailto:contato@byshop.com"
                  aria-label="Email"
                >
                  <Mail className="size-4 opacity-70" aria-hidden="true" />
                  <span className="hidden min-w-0 max-w-[220px] truncate sm:inline">
                    contato@byshop.com
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-2" aria-label="Redes sociais">
                <a
                  className="inline-flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-black/5 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
                  href="#"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="size-4 opacity-70" aria-hidden="true" />
                </a>
                <a
                  className="inline-flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-black/5 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
                  href="#"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="size-4 opacity-70" aria-hidden="true" />
                </a>
                <a
                  className="inline-flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-black/5 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
                  href="#"
                  aria-label="TikTok"
                  title="TikTok"
                >
                  <svg
                    className="size-4 opacity-70"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M13 3v10.2a3.8 3.8 0 1 1-2.4-3.5V7.2c-3.7.3-6.6 3.4-6.6 7.3A7.5 7.5 0 1 0 13 7.6c1.6 1.4 3.6 2.2 5.8 2.2V7.4c-2.4 0-4.5-1.9-4.8-4.4H13Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  className="inline-flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-black/5 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
                  href="#"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg
                    className="size-4 opacity-70"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 16.4c-1.4 0-2.8-.4-4.1-1.2l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4Zm4.1-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.2-1.2-1.4-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.2.3-.4.1-.2.1-.3 0-.5-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1.1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.1 1.6.1.5-.1 1.3-.5 1.5-1 .2-.5.2-1 0-1.1-.1-.2-.2-.2-.4-.3Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="flex h-[64px] items-center justify-between gap-5">
              <div className="flex min-w-0 items-center gap-5">
                <a className="inline-flex items-center py-[10px]" href="/" aria-label="ByShop">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    width={160}
                    height={48}
                    className="h-[40px] w-auto"
                  />
                </a>

                <nav className="min-w-0" aria-label="Navegação principal">
                  <MainNav />
                </nav>
              </div>

              <div className="flex items-center gap-2 sm:gap-3" aria-label="Ações">
                <button
                  className="inline-flex h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-md bg-transparent px-3 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2"
                  type="button"
                  aria-label="Search"
                >
                  <Search className="size-5 opacity-80" aria-hidden="true" />
                  <span className="hidden text-base font-medium lg:inline">Busca</span>
                </button>

                <button
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2"
                  type="button"
                  aria-label="Account"
                >
                  <User className="size-5 opacity-80" aria-hidden="true" />
                </button>

                <button
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 max-sm:hidden"
                  type="button"
                  aria-label="Favorites"
                >
                  <Heart className="size-5 opacity-80" aria-hidden="true" />
                </button>

                <button
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2"
                  type="button"
                  aria-label="Cart"
                >
                  <ShoppingCart className="size-5 opacity-80" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
