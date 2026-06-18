'use client';
import { useEffect, useRef } from 'react';
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

export default function PromoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Mede a altura real do banner (varia com a safe-area do iOS) e
  // expõe em --banner-h para o Navbar/Hero se posicionarem abaixo.
  // Remede no resize/rotação, quando a safe-area muda.
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
      {/* Texto acessível para screen readers — o marquee fica aria-hidden */}
      <p className={styles.srOnly}>
        Promoção Copa do Mundo: 50% na primeira mensalidade com código COPA50.
        Indique um amigo e ganhe 1 mês grátis a cada indicação que assinar.
      </p>

      <div className={styles.marqueeWrap}>
        <Track />
        <Track />
      </div>
    </div>
  );
}
