import { test, expect } from "@playwright/test";

// IA-first: este arquivo valida o Header em dois cenários:
// - Desktop (elementos base visíveis)
// - Mobile (menu colapsável abre e expõe busca + links)
//
// Importante: este teste é executado duas vezes com builds diferentes:
// - V1: sem NEXT_PUBLIC_HEADER_VARIANT (fallback)
// - V2: com NEXT_PUBLIC_HEADER_VARIANT=v2
//
// O teste se adapta pelo valor de process.env.NEXT_PUBLIC_HEADER_VARIANT no runner.

function getVariant(): "v1" | "v2" {
  return process.env.NEXT_PUBLIC_HEADER_VARIANT === "v2" ? "v2" : "v1";
}

test.describe("header smoke (V1/V2)", () => {
  test("desktop: renderiza logo + busca + links principais", async ({ page }) => {
    const variant = getVariant();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("banner").getByRole("link", { name: /ByShop/i })).toBeVisible();

    if (variant === "v2") {
      await expect(page.getByRole("banner").getByRole("link", { name: "Contato" })).toBeVisible();
      await expect(page.locator('input[aria-label="Buscar produtos"]:visible')).toBeVisible();
    } else {
      await expect(page.locator('input[placeholder="Buscar produtos..."]:visible')).toBeVisible();
    }

    await expect(page.locator('a[href="/favoritos"]:visible')).toBeVisible();
    await expect(page.locator('a[href="/carrinho"]:visible')).toBeVisible();
  });

  test("mobile: abre menu e mostra links + busca", async ({ page }) => {
    const variant = getVariant();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("banner").getByRole("link", { name: /ByShop/i })).toBeVisible();

    if (variant === "v2") {
      await page.getByRole("button", { name: /Abrir menu|Fechar menu/i }).click();
      await expect(page.locator('input[aria-label="Buscar produtos"]:visible')).toBeVisible();
    } else {
      // IA-first: no V1 o toggle do menu não tem aria-label; ancoramos no className tailwind "md:hidden".
      await page.locator('header button[class*="md:hidden"]').first().click();
      await expect(page.locator('input[placeholder="Buscar produtos..."]:visible')).toBeVisible();
    }

    await expect(page.getByRole("link", { name: "Início" })).toBeVisible();
  });
});
