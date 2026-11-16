import { company, navigation } from "@/data/company";

export function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-nav"><a className="footer-wordmark" href="#top">{company.name}.</a><nav aria-label="Навигация в подвале">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><a href="#top">Наверх</a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} · {company.name}</span><span>Антикор и детейлинг · Белгород</span></div>
  </div></footer>;
}
