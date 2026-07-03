'use client';
import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  tag?: 'section' | 'div' | 'article';
  delay?: number;
  variant?: 'up' | 'scale';
  id?: string;
  style?: React.CSSProperties;
}

export default function RevealSection({ children, className = '', tag: Tag = 'div', delay = 0, variant = 'up', id, style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = variant === 'scale' ? 'reveal-scale' : 'reveal';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement & HTMLElement>}
      className={`${cls} ${className}`}
      style={{ ...(delay ? { '--i': delay } as React.CSSProperties : undefined), ...style }}
      id={id}
    >
      {children}
    </Tag>
  );
}
