import { company, services } from "@/data/company";
import { formatPrice } from "@/lib/format-price";

const domain = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const site = {
  url: domain || null,
  title: "Автоэксперт — антикор и детейлинг в Белгороде",
  description: `Антикоррозийная обработка в Белгороде ${formatPrice(services[0].price)}. Детейлинг, защитные покрытия, полировка и шумоизоляция авто. ${company.name}: ул. Мичурина, 79Б, ${company.phoneDisplay}.`,
};
