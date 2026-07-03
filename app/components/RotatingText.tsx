'use client';
import { useEffect, useState } from 'react';
import styles from './RotatingText.module.css';

interface Props {
  phrases: string[];
  interval?: number;
  className?: string;
}

export default function RotatingText({ phrases, interval = 2800, className = '' }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Respeita usuários que preferem menos movimento — fixa na 1ª frase
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(id);
  }, [phrases.length, interval]);

  return (
    <span className={`${styles.wrap} ${className}`}>
      {/* key força remount → re-dispara a animação de entrada a cada troca */}
      <span key={index} className={styles.text}>
        {phrases[index]}
      </span>
    </span>
  );
}
