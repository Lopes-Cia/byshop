import { test, expect } from "@playwright/test";

test("purchase journey (guest) creates an order and tracking works", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.goto("/products/1");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Shopping Cart" })).toBeVisible();

  await page.getByPlaceholder("SAVE10, SAVE20, FREESHIP").fill("SAVE10");
  await page.getByRole("button", { name: "Apply" }).first().click();
  await expect(page.getByText("Applied code:")).toBeVisible();

  await page.getByRole("button", { name: "Proceed to Checkout" }).click();
  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();

  await page.getByPlaceholder("Email address").fill("buyer@example.com");
  await page.getByPlaceholder("First name").fill("Buyer");
  await page.getByPlaceholder("Last name").fill("Test");
  await page.getByPlaceholder("Address").fill("123 Main St");
  await page.getByPlaceholder("City").fill("Testville");
  await page.getByPlaceholder("State").fill("TS");
  await page.getByPlaceholder("ZIP code").fill("12345");
  await page.getByPlaceholder("Card number").fill("4111111111111111");
  await page.getByPlaceholder("MM/YY").fill("12/34");
  await page.getByPlaceholder("CVV").fill("123");

  await page.getByRole("button", { name: "Place Order" }).click();
  await page.waitForURL(/\/checkout\/success\?orderId=/);

  const url = new URL(page.url());
  const orderId = url.searchParams.get("orderId");
  expect(orderId).toBeTruthy();

  await page.getByRole("button", { name: "View order" }).click();
  await page.waitForURL(new RegExp(`/orders/${encodeURIComponent(orderId!)}`));
  await expect(page.getByText(orderId!)).toBeVisible();

  await page.goto(`/tracking?orderId=${encodeURIComponent(orderId!)}`);
  await expect(page.getByRole("heading", { name: "Track your order" })).toBeVisible();
  await expect(page.getByText(orderId!)).toBeVisible();
});

test("signin respects next param", async ({ page }) => {
  await page.goto("/auth/signin?next=/profile");
  await expect(page.getByText("demo@ecommerce.local")).toBeVisible();
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.waitForURL("**/profile");
  await expect(page.getByRole("heading", { name: "My Account" })).toBeVisible();
});
