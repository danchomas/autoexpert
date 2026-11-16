import { company, gallery, comparisons, reviews } from "@/data/company";
import { PhotoViewer } from "@/components/ui/photo-viewer";
import { Reveal } from "@/components/ui/reveal";

export function Gallery() {
  return (
    <section id="works" className="section container gallery-section">
      <Reveal><div className="section-label"><span>05 / НАШИ РАБОТЫ</span></div><div className="section-heading"><h2>То, что обычно<br /><span className="muted">остаётся за кадром.</span></h2><p>Подготовка, нанесение состава и обработанные поверхности. Показываем работу в деталях.</p></div></Reveal>
      <PhotoViewer items={gallery} variant="gallery" />
    </section>
  );
}

export function BeforeAfter() {
  return (
    <section id="before-after" className="section container comparison-section">
      <Reveal><div className="section-label"><span>06 / ДО И ПОСЛЕ</span><span>РЕЗУЛЬТАТ В ДЕТАЛЯХ</span></div><div className="section-heading"><h2>Разницу<br /><span className="muted">видно сразу.</span></h2><p>Полировка фар и кузова. Сравните состояние поверхности до работы и полученный результат.</p></div></Reveal>
      <PhotoViewer items={comparisons} variant="comparison" />
    </section>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="section container reviews-section">
      <Reveal><div className="section-label"><span>08 / ОТЗЫВЫ</span></div><div className="section-heading"><h2>О работе.<br /><span className="muted">Словами клиентов.</span></h2><div className="review-platforms"><a className="text-link" href={company.avito} target="_blank" rel="noopener noreferrer">Отзывы на Avito</a><a className="text-link" href={company.reviewsUrl} target="_blank" rel="noopener noreferrer">Отзывы на Яндекс Картах</a></div></div></Reveal>
      <div className="reviews-grid">{reviews.map(review => (
        <Reveal key={review.id}>
          <article className="review-card" aria-labelledby={`review-${review.id}`}>
            <div className="review-header"><div><h3 id={`review-${review.id}`}>{review.author}</h3><p>{review.level}</p></div><span className="review-rating" aria-label={`Оценка ${review.rating} из 5`}>{review.rating}<span>/5</span></span></div>
            <div className="review-meta">{review.dateTime ? <time dateTime={review.dateTime}>{review.date}</time> : <span>{review.date}</span>}{review.pinned && <span>Закреплённый отзыв</span>}</div>
            {review.service && <p className="review-service">{review.service}</p>}
            {review.excerpt && <p className="review-excerpt">Фрагмент отзыва</p>}
            <blockquote>{review.text}</blockquote>
            <a className="review-source" href={review.sourceUrl} target="_blank" rel="noopener noreferrer">{review.source}</a>
          </article>
        </Reveal>
      ))}</div>
    </section>
  );
}
