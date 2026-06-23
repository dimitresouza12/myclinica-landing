'use client';
import { useEffect, useState } from 'react';
import styles from './StickyCta.module.css';

const SAAS_QUIZ = 'https://myclinica.online/login?quiz=true';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('hero');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ''}`} aria-hidden={!visible}>
      <span className={styles.text}>Gerencie sua clínica com inteligência.</span>
      <a href={SAAS_QUIZ} className={styles.btn} tabIndex={visible ? 0 : -1}>
        Testar 7 dias grátis
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </a>
      <span className={styles.note}>sem cartão de crédito</span>
    </div>
  );
}
