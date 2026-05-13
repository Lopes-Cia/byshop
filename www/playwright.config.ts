import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3031",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  webServer: {
    command: "npm run dev -- -p 3031",
    url: "http://localhost:3031",
    // IA-first: quando validamos por variante (NEXT_PUBLIC_HEADER_VARIANT),
    // precisamos garantir que o servidor respeite o env atual e não reutilize
    // um processo anterior com build diferente.
    reuseExistingServer: !process.env.NEXT_PUBLIC_HEADER_VARIANT,
    timeout: 120_000
  }
});
