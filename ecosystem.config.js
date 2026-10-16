// PM2 — configuração de produção para o app Next.js (pasta `www/`).
//
// Fluxo de deploy no VPS:
//   cd <repo>                       # raiz deste repositório
//   cd www && npm ci && npm run build && cd ..
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup         # inicia no boot
//
// Observações:
// - O build (`npm run build`) precisa ser feito ANTES do `pm2 start`.
// - `cwd` é resolvido a partir da pasta deste arquivo, então pode iniciar de qualquer lugar.
// - A porta é lida de `PORT` pelo `next start` (default 3000) — ajuste abaixo se usar proxy/nginx.

const path = require("path")

module.exports = {
  apps: [
    {
      name: "byshop",
      cwd: path.join(__dirname, "www"),
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      kill_timeout: 5000,
      merge_logs: true,
      time: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
}
