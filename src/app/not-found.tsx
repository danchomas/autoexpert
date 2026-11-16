import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="container legal-page"><p className="eyebrow">404 / НЕ НАЙДЕНО</p><h1>Здесь ничего нет.</h1><p>Но вся информация об обработке автомобиля есть на главной странице.</p><Link className="button button-primary" href="/">На главную</Link></main>;
}
