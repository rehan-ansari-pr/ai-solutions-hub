import React, { useEffect, useRef } from 'react';
import { BrainCircuit, Workflow, Palette, Gauge, ShoppingBag, LucideIcon } from 'lucide-react';
import { PillarType } from '../types';

export const PILLAR_ICONS: Record<PillarType, LucideIcon> = {
  intelligence: BrainCircuit,
  orchestration: Workflow,
  creative: Palette,
  measurement: Gauge,
  commerce: ShoppingBag,
};

export const PILLAR_ORDER: PillarType[] = ['intelligence', 'orchestration', 'creative', 'measurement', 'commerce'];

/** Adds `is-in` once the element scrolls into view, with an optional stagger delay. */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.animationDelay = `${delayMs}ms`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);
  return ref;
}

export const Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }> = ({
  delay = 0,
  className = '',
  children,
}) => {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

/** Slide header: kicker, one-sentence headline, optional lede. */
export const SectionHead: React.FC<{ kicker: string; title: string; lede?: string; red?: boolean }> = ({
  kicker,
  title,
  lede,
  red,
}) => (
  <div className="mb-8 max-w-3xl">
    <div className={red ? 'kicker-red' : 'kicker'}>{kicker}</div>
    <h2 className="mt-2 text-[26px] sm:text-[32px] font-bold leading-tight tracking-[-0.01em]">{title}</h2>
    {lede && <p className="mt-3 text-slate">{lede}</p>}
  </div>
);

export const PivotRootsLogo: React.FC<{ className?: string; tone?: 'white' | 'ink' }> = ({ className = 'h-6', tone = 'white' }) => (
  <img
    src="/pivotroots_logo_white.png"
    alt="PivotRoots"
    className={`${className} w-auto object-contain ${tone === 'ink' ? 'brightness-0 opacity-90 dark:brightness-100 dark:opacity-100' : ''}`}
  />
);

/** "A Havas Company" endorsement, one of the three places Havas red appears. */
export const HavasEndorsement: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist ${className}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-havas-red" />
    A Havas Company
  </span>
);
