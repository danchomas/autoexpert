"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  label?: string;
  description?: string;
  order?: string;
};

export function PhotoViewer({ items, variant }: { items: Photo[]; variant: "gallery" | "comparison" }) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const active = items[selected];
  const close = () => { dialog.current?.close(); trigger.current?.focus(); };
  const change = (direction: number) => setSelected(current => (current + direction + items.length) % items.length);

  return <>
    <div className={`${variant}-grid`}>
      {items.map((item, i) => <Reveal key={item.src}>
        <button type="button" className={`photo-item ${variant}-item`} aria-label={`Открыть фото: ${item.title}`} onClick={event => { trigger.current = event.currentTarget; setSelected(i); dialog.current?.showModal(); }}>
          <span className={`photo-frame ${variant === "gallery" ? "gallery-photo" : ""}`}>
            <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 767px) 100vw, 50vw" />
          </span>
          <span className="photo-caption">
            <span>{item.label || item.title}</span>
            <span>Увеличить</span>
          </span>
        </button>
        {item.description && <p className="comparison-description">{item.description}</p>}
        {item.order && <p className="comparison-order">{item.order}</p>}
      </Reveal>)}
    </div>
    <dialog ref={dialog} className="lightbox" aria-labelledby={titleId} onCancel={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if (event.key === "ArrowRight") change(1); if (event.key === "ArrowLeft") change(-1); }}>
      <div className="lightbox-content">
        <div className="lightbox-top"><p id={titleId}>{active.title}</p><button type="button" onClick={close} autoFocus>Закрыть</button></div>
        <div className="lightbox-image"><Image src={active.src} alt={active.alt} fill sizes="90vw" /></div>
        <div className="lightbox-bottom"><button type="button" onClick={() => change(-1)}>Назад</button><span>{selected + 1} / {items.length}</span><button type="button" onClick={() => change(1)}>Далее</button></div>
      </div>
    </dialog>
  </>;
}
