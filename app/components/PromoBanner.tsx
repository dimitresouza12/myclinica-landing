'use client';
import { useState, useEffect } from 'react';
import styles from './PromoBanner.module.css';

function Track() {
  return (
    <div className={styles.track} aria-hidden>
      <span className={styles.item}>
        🏆 <strong>Copa do Mundo:</strong> assine durante a copa e pague{' '}
        <strong>50% na 1ª mensalidade</strong> — código{' '}
        <span className={styles.code}>COPA50</span>
      </span>
      <span className={styles.dot}>·</span>
      <span className={styles.item}>
        🎁 <strong>Indique e ganhe:</strong> cada indicação que assinar te dá{' '}
        <strong>1 mês grátis</strong>
      </span>
      <span className={styles.dot}>·</span>
      <span className={styles.item}>
        🇧🇷 <strong>Promoção válida</strong> durante toda a Copa do Mundo 2026
      </span>
      <span className={styles.dot}>·</span>
    </div>
  );
}

const BANNER_H = 44;

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const h = visible ? `${BANNER_H}px` : '0px';
    document.documentElement.style.setProperty('--banner-h', h);
    return () => { document.documentElement.style.setProperty('--banner-h', '0px'); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Promoções ativas">
      {/* Texto acessível para screen readers — o marquee fica aria-hidden */}
      <p className={styles.srOnly}>
        Promoção Copa do Mundo: 50% na primeira mensalidade com código COPA50.
        Indique um amigo e ganhe 1 mês grátis a cada indicação que assinar.
      </p>

      <div className={styles.marqueeWrap}>
        <div className={styles.marquee}>
          <Track />
          <Track />
        </div>
      </div>

      <button
        className={styles.closeBtn}
        onClick={() => setVisible(false)}
        aria-label="Fechar banner de promoção"
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
