import Image from "next/image";
import { company, photos, services, principles, processSteps, processPhases } from "@/data/company";
import { formatPrice } from "@/lib/format-price";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" className="section container about-section">
      <Reveal>
        <div className="section-label"><span>01 / ПОД ПОВЕРХНОСТЬЮ</span><span>НЕВИДИМОЕ ИМЕЕТ ЗНАЧЕНИЕ</span></div>
        <h2 className="about-title">Коррозия начинается там,<br /><span className="muted">где её не видно.</span></h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-photo"><Image {...photos.underbody} alt={photos.underbody.alt} sizes="(max-width: 767px) 100vw, 50vw" /></Reveal>
        <Reveal className="about-copy">
          <span className="small-label">ВЛАГА. РЕАГЕНТЫ. ВРЕМЯ.</span>
          <h3>Кузов может выглядеть<br />идеально. А что под ним?</h3>
          <p>Вода и дорожная соль задерживаются в стыках, на днище и внутри колёсных арок. Со временем даже небольшое повреждение покрытия может стать очагом коррозии.</p>
          <p>Антикоррозийная обработка создаёт дополнительный защитный барьер. Но начинается она не с нанесения состава, а с внимания к состоянию металла.</p>
          <a className="text-link" href="#process">Как проходит обработка</a>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="section section-surface"><div className="container">
      <Reveal>
        <div className="section-label"><span>02 / УСЛУГИ</span></div>
        <div className="section-heading"><h2>Защита.<br /><span className="muted">И внимание к деталям.</span></h2><p>От антикоррозийной обработки до полировки. Заботимся о том, что под кузовом, и о том, что на виду.</p></div>
      </Reveal>
      <div className="services-grid">
        {services.slice(0, 2).map(service => (
          <Reveal key={service.id}><article className="service">
            {service.photo && <a href={company.avito} target="_blank" rel="noopener noreferrer" className="service-image" aria-label={`Обсудить услугу на Avito: ${service.title}`}>
              <Image {...service.photo} alt={service.photo.alt} sizes="(max-width: 767px) 100vw, 50vw" />
            </a>}
            <div className="service-heading"><span className="service-number">{service.number}</span><h3>{service.title}</h3></div>
            <p>{service.description}</p>
            <span className="service-price">{formatPrice(service.price)}</span>
          </article></Reveal>
        ))}
      </div>
      <div className="additional-services">
        {services.slice(2).map(service => (
          <Reveal key={service.id} className={service.id === "soundproofing" ? "service-wide" : ""}><article data-service={service.id}>
            {service.photo && <a className="service-image additional-service-image" href={company.avito} target="_blank" rel="noopener noreferrer" aria-label={`Обсудить услугу на Avito: ${service.title}`}>
              <Image {...service.photo} alt={service.photo.alt} sizes="(max-width: 767px) 100vw, 33vw" />
            </a>}
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span>{formatPrice(service.price)}</span>
          </article></Reveal>
        ))}
      </div>
    </div></section>
  );
}

export function Principles() {
  return (
    <section className="section container">
      <Reveal><div className="section-label"><span>03 / ПОДХОД К РАБОТЕ</span></div><div className="section-heading"><h2>Не скрыть проблему.<br /><span className="muted">Защитить металл.</span></h2><p>Последовательная подготовка, защита кузова и внимание к каждому обрабатываемому участку.</p></div></Reveal>
      <div className="principles">{principles.map((item, i) => <Reveal key={item.title}><article><span className="small-label">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section section-surface"><div className="container">
      <Reveal><div className="section-label"><span>04 / ПРОЦЕСС</span></div><h2>Хороший результат —<br /><span className="muted">это последовательность.</span></h2></Reveal>
      <Reveal className="process-intro">
        <div className="process-photo"><Image {...photos.preparation} alt={photos.preparation.alt} sizes="(max-width: 767px) 100vw, 30vw" /></div>
        <div><p className="small-label">ПОДГОТОВКА. ЗАЩИТА. ЗАВЕРШЕНИЕ.</p><p>Все этапы — в понятном порядке.<br />Сначала готовим автомобиль, затем наносим составы и завершаем обработку.</p></div>
      </Reveal>
      <div className="process-phases">{processPhases.map(phase => (
        <Reveal key={phase.title}>
          <article className="process-phase">
            <h3>{phase.title}</h3><p className="phase-description">{phase.description}</p>
            <ol className="process-list" start={phase.start + 1}>{processSteps.slice(phase.start, phase.end).map((step, i) => (
              <li key={step.title}><span>{String(phase.start + i + 1).padStart(2, "0")}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></li>
            ))}</ol>
          </article>
        </Reveal>
      ))}</div>
    </div></section>
  );
}

export function Pricing() {
  return (
    <section id="prices" className="section section-surface"><div className="container"><Reveal>
      <div className="section-label"><span>07 / УСЛУГИ И ЦЕНЫ</span></div>
      <div className="section-heading"><h2>Ваш автомобиль.<br /><span className="muted">Ваш объём работ.</span></h2><p>Выберите нужную услугу. Итоговую стоимость согласуем с учётом состояния автомобиля и объёма работ.</p></div>
      <div className="price-table">{services.map(service => <div className="price-row" key={service.id}><span className="service-number">{service.number}</span><h3>{service.title}</h3><span>{formatPrice(service.price)}</span></div>)}</div>
      <div className="price-bottom"><p>Расскажите о своём автомобиле по телефону<br />или напишите нам в Avito.</p><a className="button button-primary" href={company.avito} target="_blank" rel="noopener noreferrer">Уточнить стоимость</a></div>
    </Reveal></div></section>
  );
}
