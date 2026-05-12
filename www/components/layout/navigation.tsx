"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Áudio",
    href: "/produtos?category=audio",
    description: "Fones, caixas de som e acessórios premium de áudio."
  },
  {
    title: "Vestíveis",
    href: "/produtos?category=wearables",
    description: "Relógios inteligentes e monitores de atividade."
  },
  {
    title: "Acessórios",
    href: "/produtos?category=accessories",
    description: "Bolsas, carregadores, hubs e itens essenciais do dia a dia."
  }
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="mb-1 text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Navigation() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Loja</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full flex-col justify-end rounded-md bg-[url('https://bundui-images.netlify.app/products/01.jpeg')] bg-cover p-0! no-underline outline-hidden select-none focus:shadow-md"
                    href="/produtos?sort=newest">
                    <div className="bg-foreground/30 space-y-2 p-4 text-white backdrop-blur-md">
                      <div className="font-medium">Novidades</div>
                      <p className="text-sm leading-tight">
                        Descubra os estilos da nossa coleção mais recente.
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/produtos?sort=newest" title="Coleção de Verão">
                Itens leves e essenciais perfeitos para os dias mais quentes.
              </ListItem>
              <ListItem href="/produtos?category=accessories" title="Acessórios">
                Complete seu visual com bolsas, joias e muito mais.
              </ListItem>
              <ListItem href="/produtos?sale=1" title="Promoções">
                Aproveite os descontos antes que acabem.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:grid-cols-2 lg:w-[550px]">
              {categories.map((category) => (
                <ListItem key={category.title} title={category.title} href={category.href}>
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Links rápidos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/produtos">
                    <div className="font-medium">Todos os produtos</div>
                    <div className="text-muted-foreground">Veja o catálogo completo de produtos.</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/perguntas-frequentes">
                    <div className="font-medium">Perguntas frequentes</div>
                    <div className="text-muted-foreground">Respostas para dúvidas comuns.</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/blog">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">Inspire-se com nossos posts mais recentes.</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
