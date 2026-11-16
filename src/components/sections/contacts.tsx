import { company } from "@/data/company";
import { Reveal } from "@/components/ui/reveal";

export function Contacts() {
  return (
    <section id="contacts" className="section contact-section"><div className="container"><Reveal>
      <div className="section-label"><span>09 / КОНТАКТЫ</span></div>
      <div className="contact-grid">
        <div><h2>Защитите<br />автомобиль<br /><span className="muted">от коррозии.</span></h2><p>Позвоните или напишите нам.<br />Обсудим ваш автомобиль, стоимость<br />и удобное время визита.</p><p className="contact-address">{company.address}</p><a className="text-link" href={company.maps} target="_blank" rel="noopener noreferrer">Открыть на Яндекс Картах</a></div>
        <div className="contact-options">
          <a className="contact-main-phone" href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
          <p>Прямой разговор с сервисом.<br />Без форм и ожидания обратного звонка.</p>
          <a className="button button-primary" href={company.avito} target="_blank" rel="noopener noreferrer">Написать на Avito</a>
          <a className="button button-outline" href={company.vk} target="_blank" rel="noopener noreferrer">Написать в VK</a>
        </div>
      </div>
    </Reveal></div></section>
  );
}
