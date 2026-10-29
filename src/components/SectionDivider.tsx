import React, { useEffect, useRef } from 'react';

interface SectionDividerProps {
  index: number;
  title: string;
  description: string;
  count?: number;
}

/** Full-width ink band with an oversized numeral, from the "Section 01" deck slide. */
export const SectionDivider: React.FC<SectionDividerProps> = ({ index, title, description, count }) => {
  const numRef = useRef<HTMLDivElement>(null);
  const label = String(index).padStart(2, '0');

  useEffect(() => {
    const el = numRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      el.style.transform = `translate(${p * 20}px, -50%)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative bg-ink overflow-hidden rounded-card my-10 sm:my-14">
      <div aria-hidden className="absolute inset-0 dot-grid opacity-50" />
      <div aria-hidden className="absolute left-0 top-0 h-full w-1.5 bg-lime" />
      <div
        ref={numRef}
        aria-hidden
        className="absolute -right-4 sm:right-6 top-1/2 -translate-y-1/2 num text-[160px] sm:text-[240px] leading-none text-ink-2 select-none will-change-transform"
      >
        {label}
      </div>
      <div className="relative px-6 sm:px-10 py-10 sm:py-14 max-w-2xl">
        <div className="kicker !text-lime">Section {label}{count !== undefined ? ` · ${count} solutions` : ''}</div>
        <h2 className="mt-3 text-[26px] sm:text-[32px] font-bold leading-tight !text-white">{title}</h2>
        <p className="mt-3 text-mist">{description}</p>
      </div>
    </div>
  );
};
