import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  use: { baseURL: "http://localhost:3100", launchOptions: { executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium", args: ["--no-sandbox"] }, trace: "retain-on-failure" },
  webServer: { command: "npm run start", url: "http://localhost:3100", reuseExistingServer: false, timeout: 120000 },
});
