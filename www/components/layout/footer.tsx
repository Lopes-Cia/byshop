import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="space-y-4">
              <Logo />
              <p className="text-muted-foreground mb-6 max-w-md">
                Descubra produtos premium com qualidade excepcional e design moderno. Sua
                satisfação é nossa prioridade.
              </p>
            </div>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Assine nossa newsletter
              </h3>
              <div className="flex space-x-2">
                <Input type="email" placeholder="Digite seu e-mail" className="flex-1" />
                <Button>Assinar</Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary text-gray-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary text-gray-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary text-gray-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Links rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/perguntas-frequentes"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/entrega"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Entrega
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacidade"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-de-uso"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/trocas-e-devolucoes"
                  className="hover:text-primary text-muted-foreground transition-colors">
                  Trocas e devoluções
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 border-t border-gray-200 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} ByShop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
