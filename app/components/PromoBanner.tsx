'use client';
import { useEffect, useRef } from 'react';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setBannerHeight = () => {
      const el = bannerRef.current;
      if (el) {
        document.documentElement.style.setProperty('--banner-h', `${el.offsetHeight}px`);
      }
    };
    setBannerHeight();
    window.addEventListener('resize', setBannerHeight);
    return () => window.removeEventListener('resize', setBannerHeight);
  }, []);

  return (
    <div ref={bannerRef} className={styles.banner} role="region" aria-label="Promoções ativas">
      <p className={styles.srOnly}>
        Promoção Copa do Mundo: 50% na primeira mensalidade com código COPA50.
        Indique um amigo e ganhe 1 mês grátis a cada indicação que assinar.
      </p>

      {/* Mobile: frase estática única, sem marquee */}
      <p className={styles.mobileMsg} aria-hidden="true">
        🏆 <strong>Copa 2026:</strong> 50% na 1ª mensalidade — código{' '}
        <span className={styles.code}>COPA50</span>
      </p>

      <div className={styles.marqueeWrap}>
        {/*
          .strip é position:absolute — fica fora do algoritmo flex do
          marqueeWrap. O WebKit não consegue comprimir sua largura; ela
          é determinada pelo conteúdo (dois sets de itens em linha).
          A animação usa translateX(-50%) = exatamente a largura de um set.
        */}
        <div className={styles.strip} aria-hidden="true">
          {/* Set 1 */}
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
          {/* Set 2 — duplicado para loop contínuo; hidden em reduced-motion */}
          <span className={`${styles.item} ${styles.dup}`}>
            🏆 <strong>Copa do Mundo:</strong> assine durante a copa e pague{' '}
            <strong>50% na 1ª mensalidade</strong> — código{' '}
            <span className={styles.code}>COPA50</span>
          </span>
          <span className={`${styles.dot} ${styles.dup}`}>·</span>
          <span className={`${styles.item} ${styles.dup}`}>
            🎁 <strong>Indique e ganhe:</strong> cada indicação que assinar te dá{' '}
            <strong>1 mês grátis</strong>
          </span>
          <span className={`${styles.dot} ${styles.dup}`}>·</span>
          <span className={`${styles.item} ${styles.dup}`}>
            🇧🇷 <strong>Promoção válida</strong> durante toda a Copa do Mundo 2026
          </span>
          <span className={`${styles.dot} ${styles.dup}`}>·</span>
        </div>
      </div>
    </div>
  );
}
