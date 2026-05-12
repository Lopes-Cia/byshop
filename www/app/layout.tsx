import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern E-commerce Store",
  description: "A modern and responsive e-commerce website",
  generator: "v0.dev"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
