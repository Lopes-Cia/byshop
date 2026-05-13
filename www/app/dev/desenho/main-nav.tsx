"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function MainNav() {
  return (
    <>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-auto gap-2 px-0 py-[10px] text-base font-medium hover:bg-transparent hover:text-current focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2"
            >
              <LayoutGrid className="size-5 opacity-70" aria-hidden="true" />
              <span>Categorias</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader className="border-b">
              <SheetTitle>Categorias</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col">
              <Link className="px-4 py-3 text-base font-medium hover:bg-black/5" href="/produtos?sale=1">
                Ofertas
              </Link>
              <Link className="px-4 py-3 text-base font-medium hover:bg-black/5" href="/produtos?sort=newest">
                Novidades
              </Link>
              <Link className="px-4 py-3 text-base font-medium hover:bg-black/5" href="/sobre">
                Sobre nós
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="max-lg:hidden">
        <NavigationMenu viewport={false} className="min-w-0 justify-start">
          <NavigationMenuList className="min-w-0 justify-start gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="flex-row items-center gap-2 p-0 text-base font-medium hover:bg-transparent hover:text-current focus:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-current"
              >
                <a
                  className="inline-flex items-center gap-2 py-[10px] text-base font-medium whitespace-nowrap"
                  href="#"
                >
                  <span
                    className="inline-flex h-[22px] w-[22px] items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg className="size-5 text-current" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
                        fill="currentColor"
                        opacity="0.85"
                      />
                    </svg>
                  </span>
                  <span>Categorias</span>
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="flex-row items-center p-0 text-base font-medium hover:bg-transparent hover:text-current focus:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-current"
              >
                <Link
                  className="py-[10px] text-base font-medium whitespace-nowrap hover:underline hover:underline-offset-4"
                  href="/produtos?sale=1"
                >
                  Ofertas
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="flex-row items-center p-0 text-base font-medium hover:bg-transparent hover:text-current focus:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-current"
              >
                <Link
                  className="py-[10px] text-base font-medium whitespace-nowrap hover:underline hover:underline-offset-4"
                  href="/produtos?sort=newest"
                >
                  Novidades
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="flex-row items-center p-0 text-base font-medium hover:bg-transparent hover:text-current focus:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-current"
              >
                <Link
                  className="py-[10px] text-base font-medium whitespace-nowrap hover:underline hover:underline-offset-4"
                  href="/sobre"
                >
                  Sobre nós
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
