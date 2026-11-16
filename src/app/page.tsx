import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About, Services, Principles, Process, Pricing } from "@/components/sections/service-sections";
import { Gallery, BeforeAfter, Reviews } from "@/components/sections/gallery";
import { Contacts } from "@/components/sections/contacts";
import { company, services } from "@/data/company";
import { site } from "@/config/site";

export const metadata: Metadata = site.url ? { alternates: { canonical: site.url } } : {};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: company.name,
    description: site.description,
    telephone: company.phone,
    ...(site.url ? { url: site.url } : {}),
    address: { "@type": "PostalAddress", streetAddress: "ул. Мичурина, 79Б", addressLocality: company.city, addressCountry: "RU" },
    areaServed: { "@type": "City", name: company.city },
    hasMap: company.maps,
    sameAs: [company.vk, company.avito],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги и цены",
      itemListElement: services.map(service => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title },
        ...(service.price !== null ? { priceSpecification: { "@type": "PriceSpecification", minPrice: service.price, priceCurrency: "RUB" } } : {}),
      })),
    },
  };

  return <div id="top"><Header /><main id="main"><Hero /><About /><Services /><Principles /><Process /><Gallery /><BeforeAfter /><Pricing /><Reviews /><Contacts /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></div>;
}
