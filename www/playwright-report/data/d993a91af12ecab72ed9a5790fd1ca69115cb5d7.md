# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchase-journey.spec.ts >> signin respects next param
- Location: tests\e2e\purchase-journey.spec.ts:48:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'My Account' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'My Account' })

```

```yaml
- navigation:
  - link "logo EcommerceKit":
    - /url: /
    - img "logo"
    - text: EcommerceKit
  - navigation "Main":
    - list:
      - listitem:
        - button "Shop"
      - listitem:
        - button "Categories"
      - listitem:
        - button "Quick Links"
  - textbox "Search products..."
  - link:
    - /url: /wishlist
  - link:
    - /url: /cart
  - button
- heading "Olá, Demo" [level=1]
- paragraph: Gerencie informações básicas do seu perfil.
- text: Nome Demo User Email demo@ecommerce.local
- link "Precisa de ajuda?":
  - /url: /contact
- button "Sair"
- contentinfo:
  - link "logo EcommerceKit":
    - /url: /
    - img "logo"
    - text: EcommerceKit
  - paragraph: Discover premium products with exceptional quality and modern design. Your satisfaction is our priority.
  - heading "Subscribe to our newsletter" [level=3]
  - textbox "Enter your email"
  - button "Subscribe"
  - link:
    - /url: https://www.facebook.com
  - link:
    - /url: https://www.twitter.com
  - link:
    - /url: https://www.instagram.com
  - heading "Quick Links" [level=3]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Contact":
        - /url: /contact
    - listitem:
      - link "FAQ":
        - /url: /faq
    - listitem:
      - link "Shipping Info":
        - /url: /shipping
  - heading "Legal" [level=3]
  - list:
    - listitem:
      - link "Privacy Policy":
        - /url: /privacy
    - listitem:
      - link "Terms of Service":
        - /url: /terms
    - listitem:
      - link "Returns":
        - /url: /returns
  - paragraph: © 2026 EcommerceKit. All rights reserved.
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("purchase journey (guest) creates an order and tracking works", async ({ page }) => {
  4  |   await page.goto("/");
  5  |   await page.waitForLoadState("networkidle");
  6  | 
  7  |   await page.goto("/products/1");
  8  |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  9  |   await page.getByRole("button", { name: "Add to Cart" }).click();
  10 | 
  11 |   await page.goto("/cart");
  12 |   await expect(page.getByRole("heading", { name: "Shopping Cart" })).toBeVisible();
  13 | 
  14 |   await page.getByPlaceholder("SAVE10, SAVE20, FREESHIP").fill("SAVE10");
  15 |   await page.getByRole("button", { name: "Apply" }).first().click();
  16 |   await expect(page.getByText("Applied code:")).toBeVisible();
  17 | 
  18 |   await page.getByRole("button", { name: "Proceed to Checkout" }).click();
  19 |   await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
  20 | 
  21 |   await page.getByPlaceholder("Email address").fill("buyer@example.com");
  22 |   await page.getByPlaceholder("First name").fill("Buyer");
  23 |   await page.getByPlaceholder("Last name").fill("Test");
  24 |   await page.getByPlaceholder("Address").fill("123 Main St");
  25 |   await page.getByPlaceholder("City").fill("Testville");
  26 |   await page.getByPlaceholder("State").fill("TS");
  27 |   await page.getByPlaceholder("ZIP code").fill("12345");
  28 |   await page.getByPlaceholder("Card number").fill("4111111111111111");
  29 |   await page.getByPlaceholder("MM/YY").fill("12/34");
  30 |   await page.getByPlaceholder("CVV").fill("123");
  31 | 
  32 |   await page.getByRole("button", { name: "Place Order" }).click();
  33 |   await page.waitForURL(/\/checkout\/success\?orderId=/);
  34 | 
  35 |   const url = new URL(page.url());
  36 |   const orderId = url.searchParams.get("orderId");
  37 |   expect(orderId).toBeTruthy();
  38 | 
  39 |   await page.getByRole("button", { name: "View order" }).click();
  40 |   await page.waitForURL(new RegExp(`/orders/${encodeURIComponent(orderId!)}`));
  41 |   await expect(page.getByText(orderId!)).toBeVisible();
  42 | 
  43 |   await page.goto(`/tracking?orderId=${encodeURIComponent(orderId!)}`);
  44 |   await expect(page.getByRole("heading", { name: "Track your order" })).toBeVisible();
  45 |   await expect(page.getByText(orderId!)).toBeVisible();
  46 | });
  47 | 
  48 | test("signin respects next param", async ({ page }) => {
  49 |   await page.goto("/auth/signin?next=/profile");
  50 |   await expect(page.getByText("demo@ecommerce.local")).toBeVisible();
  51 |   await page.getByRole("button", { name: "Sign in", exact: true }).click();
  52 |   await page.waitForURL("**/profile");
> 53 |   await expect(page.getByRole("heading", { name: "My Account" })).toBeVisible();
     |                                                                   ^ Error: expect(locator).toBeVisible() failed
  54 | });
  55 | 
```