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
    title: "Audio",
    href: "/products?category=audio",
    description: "Headphones, speakers, and premium sound gear."
  },
  {
    title: "Wearables",
    href: "/products?category=wearables",
    description: "Smart watches and fitness trackers."
  },
  {
    title: "Accessories",
    href: "/products?category=accessories",
    description: "Bags, chargers, hubs, and everyday essentials."
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
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full flex-col justify-end rounded-md bg-[url('https://bundui-images.netlify.app/products/01.jpeg')] bg-cover p-0! no-underline outline-hidden select-none focus:shadow-md"
                    href="/products?sort=newest">
                    <div className="bg-foreground/30 space-y-2 p-4 text-white backdrop-blur-md">
                      <div className="font-medium">New Arrivals</div>
                      <p className="text-sm leading-tight">
                        Discover the styles in our latest collection.
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/products?sort=newest" title="Summer Collection">
                Lightweight essentials perfect for the warm season.
              </ListItem>
              <ListItem href="/products?category=accessories" title="Accessories">
                Complete your look with our stylish bags, jewelry, and more.
              </ListItem>
              <ListItem href="/products?sale=1" title="Sale">
                Shop discounted items before they&#39;re gone.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Quick Links</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/products">
                    <div className="font-medium">All Products</div>
                    <div className="text-muted-foreground">Browse our full product catalog.</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/faq">
                    <div className="font-medium">FAQs</div>
                    <div className="text-muted-foreground">Answers to common questions.</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/blog">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">Get inspired by our latest posts.</div>
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
