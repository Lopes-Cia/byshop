import { test, expect } from "@playwright/test";

test("purchase journey (guest) creates an order and tracking works", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.goto("/produtos/1");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).first().click();

  await page.goto("/carrinho");
  await expect(page.getByRole("heading", { name: "Carrinho" })).toBeVisible();

  await page.getByPlaceholder("Ex.: SAVE10, SAVE20, FREESHIP").fill("SAVE10");
  await page.getByRole("button", { name: "Aplicar" }).first().click();
  await expect(page.getByText("SAVE10")).toBeVisible();

  await page.getByRole("button", { name: "Finalizar compra" }).click();
  await expect(page.getByRole("heading", { name: "Finalizar compra" })).toBeVisible();

  await page.getByPlaceholder("E-mail", { exact: true }).fill("buyer@example.com");
  await page.getByPlaceholder("Nome", { exact: true }).fill("Buyer");
  await page.getByPlaceholder("Sobrenome", { exact: true }).fill("Test");
  await page.getByPlaceholder("Endereço", { exact: true }).fill("123 Main St");
  await page.getByPlaceholder("Cidade", { exact: true }).fill("Testville");
  await page.getByPlaceholder("Estado", { exact: true }).fill("TS");
  await page.getByPlaceholder("CEP", { exact: true }).fill("12345");
  await page.getByPlaceholder("Número do cartão", { exact: true }).fill("4111111111111111");
  await page.getByPlaceholder("MM/AA", { exact: true }).fill("12/34");
  await page.getByPlaceholder("CVV", { exact: true }).fill("123");

  await page.getByRole("button", { name: "Fazer pedido" }).click();
  await page.waitForURL(/\/finalizar-compra\/sucesso\?orderId=/);

  const url = new URL(page.url());
  const orderId = url.searchParams.get("orderId");
  expect(orderId).toBeTruthy();

  await page.getByRole("link", { name: "Ver detalhes do pedido" }).click();
  await page.waitForURL(new RegExp(`/pedidos/${encodeURIComponent(orderId!)}`));
  await expect(page.getByText(orderId!)).toBeVisible();

  await page.goto(`/rastreamento?orderId=${encodeURIComponent(orderId!)}`);
  await expect(page.getByRole("heading", { name: "Rastreamento do pedido" })).toBeVisible();
  await expect(page.getByText(orderId!)).toBeVisible();
});

test("signin respects next param", async ({ page }) => {
  await page.goto("/conta/entrar?next=/perfil");
  await expect(page.getByText("demo@ecommerce.local")).toBeVisible();
  await page.locator("form").getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL("**/perfil");
  await expect(page.getByRole("heading", { name: /Olá, / })).toBeVisible();
});
