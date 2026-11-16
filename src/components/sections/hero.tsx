import Image from "next/image";
import { company, photos, services } from "@/data/company";
import { formatPrice } from "@/lib/format-price";

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-image"><Image src={photos.anticor.src} alt={photos.anticor.alt} fill priority sizes="(max-width: 767px) 100vw, 80vw" /></div>
    <div className="hero-shade" />
    <div className="container hero-content">
      <p className="eyebrow hero-eyebrow"><span className="accent-line" /> ПРОФЕССИОНАЛЬНЫЙ АНТИКОР</p>
      <h1 id="hero-title">Антикоррозийная<br />обработка авто<br /><span className="hero-location">в Белгороде.</span></h1>
      <p className="hero-description">Надёжная защита днища и колёсных арок<br className="desktop-break" /> от коррозии. Сохраните то, что важно.</p>
      <div className="hero-actions"><a className="button button-primary" href={company.avito} target="_blank" rel="noopener noreferrer">Написать на Avito</a><a className="button button-outline" href="#works">Смотреть работы</a></div>
      <p className="hero-price">Антикоррозийная обработка <span>{formatPrice(services[0].price)}</span></p>
    </div>
    <div className="container hero-bottom"><span>ЗАЩИТА НАЧИНАЕТСЯ С ДЕТАЛЕЙ</span><a href="#about">Листайте ниже</a></div>
  </section>;
}
