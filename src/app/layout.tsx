import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/config/site";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: site.title, template: "%s | Автоэксперт Белгород" },
  description: site.description,
  applicationName: "Автоэксперт",
  openGraph: { title: site.title, description: site.description, locale: "ru_RU", type: "website", ...(site.url ? { url: site.url, images: [{ url: "/images/optimized/anticor.webp", width: 1215, height: 892, alt: "Антикоррозийная обработка в Автоэксперт" }] } : {}) },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B0C0E" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><a className="skip-link" href="#main">Перейти к содержимому</a>{children}</body></html>;
}
