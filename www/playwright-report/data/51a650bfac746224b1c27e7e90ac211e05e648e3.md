# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchase-journey.spec.ts >> purchase journey (guest) creates an order and tracking works
- Location: tests\e2e\purchase-journey.spec.ts:3:5

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Add to Cart' }) resolved to 2 elements:
    1) <button data-slot="button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hov…>Add to Cart</button> aka getByRole('button', { name: 'Add to Cart' }).first()
    2) <button data-slot="button" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs …>Add to Cart</button> aka getByRole('button', { name: 'Add to Cart' }).nth(1)

Call log:
  - waiting for getByRole('button', { name: 'Add to Cart' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e4]:
      - link "logo EcommerceKit" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "logo" [ref=e6]
        - generic [ref=e7]: EcommerceKit
      - navigation "Main" [ref=e9]:
        - list [ref=e11]:
          - listitem [ref=e12]:
            - button "Shop" [ref=e13]:
              - text: Shop
              - img [ref=e14]
          - listitem [ref=e16]:
            - button "Categories" [ref=e17]:
              - text: Categories
              - img [ref=e18]
          - listitem [ref=e20]:
            - button "Quick Links" [ref=e21]:
              - text: Quick Links
              - img [ref=e22]
      - generic [ref=e25]:
        - img [ref=e26]
        - textbox "Search products..." [ref=e29]
      - generic [ref=e30]:
        - link [ref=e31] [cursor=pointer]:
          - /url: /wishlist
          - img [ref=e32]
        - link [ref=e34] [cursor=pointer]:
          - /url: /cart
          - img [ref=e35]
        - link "Sign In" [ref=e39] [cursor=pointer]:
          - /url: /auth/signin?next=%2Fproducts%2F1
          - button "Sign In" [ref=e40]
  - generic [ref=e41]:
    - generic [ref=e42]:
      - generic [ref=e43]:
        - img "Premium Wireless Headphones" [ref=e45]
        - generic [ref=e46]:
          - button "Premium Wireless Headphones 1" [ref=e47]:
            - img "Premium Wireless Headphones 1" [ref=e48]
          - button "Premium Wireless Headphones 2" [ref=e49]:
            - img "Premium Wireless Headphones 2" [ref=e50]
          - button "Premium Wireless Headphones 3" [ref=e51]:
            - img "Premium Wireless Headphones 3" [ref=e52]
          - button "Premium Wireless Headphones 4" [ref=e53]:
            - img "Premium Wireless Headphones 4" [ref=e54]
      - generic [ref=e55]:
        - generic [ref=e56]:
          - heading "Premium Wireless Headphones" [level=1] [ref=e57]
          - generic [ref=e58]:
            - generic [ref=e59]:
              - img [ref=e60]
              - img [ref=e62]
              - img [ref=e64]
              - img [ref=e66]
              - img [ref=e68]
            - generic [ref=e70]: (124 reviews)
          - generic [ref=e71]:
            - generic [ref=e72]: $299.99
            - generic [ref=e73]: $399.99
        - paragraph [ref=e74]: Experience exceptional sound quality with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.
        - generic [ref=e75]:
          - heading "Color" [level=3] [ref=e76]
          - generic [ref=e77]:
            - button "Black" [ref=e78]
            - button "White" [ref=e79]
            - button "Silver" [ref=e80]
            - button "Rose Gold" [ref=e81]
        - generic [ref=e82]:
          - heading "Quantity" [level=3] [ref=e83]
          - generic [ref=e84]:
            - button [ref=e85]:
              - img [ref=e86]
            - generic [ref=e87]: "1"
            - button [ref=e88]:
              - img [ref=e89]
        - generic [ref=e90]:
          - button "Add to Cart" [ref=e91] [cursor=pointer]
          - button "Adicionar à wishlist" [ref=e92] [cursor=pointer]:
            - img
            - text: Adicionar à Wishlist
        - generic [ref=e93]:
          - generic [ref=e94]:
            - img [ref=e95]
            - generic [ref=e100]:
              - paragraph [ref=e101]: Free Shipping
              - paragraph [ref=e102]: On orders over $100
          - generic [ref=e103]:
            - img [ref=e104]
            - generic [ref=e107]:
              - paragraph [ref=e108]: 30-Day Returns
              - paragraph [ref=e109]: Free returns within 30 days
        - generic [ref=e110]:
          - heading "Key Features" [level=3] [ref=e111]
          - list [ref=e112]:
            - listitem [ref=e113]:
              - generic [ref=e115]: Active Noise Cancellation
            - listitem [ref=e116]:
              - generic [ref=e118]: 30-hour battery life
            - listitem [ref=e119]:
              - generic [ref=e121]: Premium leather ear cups
            - listitem [ref=e122]:
              - generic [ref=e124]: Wireless charging case
            - listitem [ref=e125]:
              - generic [ref=e127]: Hi-Res Audio certified
    - generic [ref=e128]:
      - heading "Related Products" [level=2] [ref=e129]
      - generic [ref=e131]:
        - generic [ref=e132]:
          - generic [ref=e133]: Popular
          - button "Adicionar à wishlist" [ref=e134]:
            - img [ref=e135]
          - link "Bluetooth Speaker" [ref=e137] [cursor=pointer]:
            - /url: /products/5
            - img "Bluetooth Speaker" [ref=e138]
        - generic [ref=e139]:
          - link "Bluetooth Speaker" [ref=e140] [cursor=pointer]:
            - /url: /products/5
            - heading "Bluetooth Speaker" [level=3] [ref=e141]
          - generic [ref=e142]:
            - generic [ref=e143]:
              - img [ref=e144]
              - img [ref=e146]
              - img [ref=e148]
              - img [ref=e150]
              - img [ref=e152]
            - generic [ref=e154]: (203)
          - generic [ref=e157]: $129.99
          - button "Add to Cart" [ref=e158] [cursor=pointer]
  - contentinfo [ref=e159]:
    - generic [ref=e160]:
      - generic [ref=e161]:
        - generic [ref=e162]:
          - generic [ref=e163]:
            - link "logo EcommerceKit" [ref=e164] [cursor=pointer]:
              - /url: /
              - img "logo" [ref=e165]
              - generic [ref=e166]: EcommerceKit
            - paragraph [ref=e167]: Discover premium products with exceptional quality and modern design. Your satisfaction is our priority.
          - generic [ref=e168]:
            - heading "Subscribe to our newsletter" [level=3] [ref=e169]
            - generic [ref=e170]:
              - textbox "Enter your email" [ref=e171]
              - button "Subscribe" [ref=e172] [cursor=pointer]
          - generic [ref=e173]:
            - link [ref=e174] [cursor=pointer]:
              - /url: https://www.facebook.com
              - img [ref=e175]
            - link [ref=e177] [cursor=pointer]:
              - /url: https://www.twitter.com
              - img [ref=e178]
            - link [ref=e180] [cursor=pointer]:
              - /url: https://www.instagram.com
              - img [ref=e181]
        - generic [ref=e184]:
          - heading "Quick Links" [level=3] [ref=e185]
          - list [ref=e186]:
            - listitem [ref=e187]:
              - link "About Us" [ref=e188] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e189]:
              - link "Contact" [ref=e190] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e191]:
              - link "FAQ" [ref=e192] [cursor=pointer]:
                - /url: /faq
            - listitem [ref=e193]:
              - link "Shipping Info" [ref=e194] [cursor=pointer]:
                - /url: /shipping
        - generic [ref=e195]:
          - heading "Legal" [level=3] [ref=e196]
          - list [ref=e197]:
            - listitem [ref=e198]:
              - link "Privacy Policy" [ref=e199] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e200]:
              - link "Terms of Service" [ref=e201] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e202]:
              - link "Returns" [ref=e203] [cursor=pointer]:
                - /url: /returns
      - paragraph [ref=e205]: © 2026 EcommerceKit. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e211] [cursor=pointer]:
    - img [ref=e212]
  - alert [ref=e215]
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
> 9  |   await page.getByRole("button", { name: "Add to Cart" }).click();
     |                                                           ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Add to Cart' }) resolved to 2 elements:
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
  53 |   await expect(page.getByRole("heading", { name: "My Account" })).toBeVisible();
  54 | });
  55 | 
```