"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { company, navigation } from "@/data/company";

export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); desktop.removeEventListener("change", resize); };
  }, [open]);

  return <header className="header" ref={ref}>
    <div className="container header-inner">
      <Link className="brand" href="/" aria-label={`${company.name} — на главную`}><span>{company.name}<span className="brand-period">.</span></span><span className="brand-caption">АНТИКОР И ДЕТЕЙЛИНГ</span></Link>
      <nav className="desktop-nav" aria-label="Главная навигация">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <div className="header-contact"><a href={`tel:${company.phone}`}>{company.phoneDisplay}</a><span>{company.city}</span></div>
      <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? "Закрыть" : "Меню"}</button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Мобильная навигация" hidden={!open}>
      {navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <a href={`tel:${company.phone}`} className="mobile-contact" onClick={() => setOpen(false)}>{company.phoneDisplay}</a>
      <a href={company.avito} className="mobile-contact" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Написать на Avito</a>
    </nav>
  </header>;
}
