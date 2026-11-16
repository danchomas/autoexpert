"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Never hide content already in view, or content when JS is unavailable.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.dataset.reveal = "visible"; observer.disconnect(); }
    }, { threshold: 0.06 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
