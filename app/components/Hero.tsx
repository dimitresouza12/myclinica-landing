'use client';

import styles from './Hero.module.css';
import RotatingText from './RotatingText';
import { trackTrialLead } from '../lib/pixel';
import { useAgora } from '../lib/useAgora';
import { partesRestanteFase } from '../lib/campanha';
import { PRECO_GANCHO } from './Plans';

const SAAS_QUIZ = 'https://myclinica.online/login?quiz=true';

const HEADLINE_PHRASES = [
  'inteligência',
  'prontuário digital',
  'agenda automática',
  'CRM no WhatsApp',
];


export default function Hero() {
  const agora = useAgora();
  const partes = partesRestanteFase(agora);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.orb} aria-hidden />

      {/* Cards flutuantes. Fora da campanha: dados do sistema. Na campanha
          (html[data-campanha]) os cards da Black assumem os mesmos cantos,
          alternados por CSS (sem flash, sem depender da hidratacao). */}
      <div className={`${styles.floatCard} ${styles.fcSys}`} data-pos="tl" aria-hidden>
        <div className={styles.fcHead}>
          <strong>14</strong>
          <span>consultas hoje</span>
        </div>
        <div className={styles.fcBar}><span style={{ width: '86%' }} /></div>
        <div className={styles.fcFoot}>
          <em className={styles.fcGood}>✓ 12 confirmadas</em>
          <em className={styles.fcWarn}>2 pendentes</em>
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.fcSys}`} data-pos="bl" aria-hidden>
        <div className={styles.fcTopRow}>
          <strong>R$ 42.800</strong>
        </div>
        <span className={styles.fcLabel}>faturado este mês</span>
        <div className={styles.fcChart}>
          {[40, 55, 48, 70, 62, 92].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      {/* Cards da Black Friday (so aparecem com a campanha ativa) */}
      <div className={`${styles.floatCard} ${styles.fcBf} ${styles.fcBfMain}`} data-pos="tl" aria-hidden>
        <span className={styles.bfKicker}><i className={styles.bfDot} />Black Friday</span>
        <span className={styles.bfSmall}>a partir de</span>
        <div className={styles.bfPrice}>
          <strong>{PRECO_GANCHO}</strong>
          <span>/mês</span>
        </div>
        <span className={styles.bfNote}>Essencial, 12 meses à vista</span>
      </div>

      <div className={`${styles.floatCard} ${styles.fcBf} ${styles.fcBfMain}`} data-pos="tr" aria-hidden>
        <span className={styles.bfKicker}><i className={styles.bfDot} />1ª mensalidade</span>
        <strong className={styles.bfCount}>50% off</strong>
        <span className={styles.bfNote}>cobrança só em 15/01</span>
      </div>

      <div className={`${styles.floatCard} ${styles.fcBf}`} data-pos="bl" aria-hidden>
        <div className={styles.bfTitleRow}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8v13M3 12h18M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
          </svg>
          <strong>14 dias grátis</strong>
        </div>
        <span className={styles.bfNote}>Sem cartão de crédito</span>
      </div>

      <div className={styles.container}>

        {/* Destaque da campanha: so aparece com a Black Friday ativa */}
        <div className={`${styles.bfHeadline} ${styles.heroBadge}`}>
          <span className={styles.bfHeadlineMain} aria-label="Black Friday">
            {Array.from('BLACK FRIDAY').map((c, i) =>
              c === ' ' ? (
                <span key={i} className={styles.bfGap} aria-hidden />
              ) : (
                <span key={i} className={styles.bfLetra} style={{ '--i': i } as React.CSSProperties} aria-hidden>{c}</span>
              ),
            )}
            <i className={`${styles.bfSpark} ${styles.bfSpark1}`} aria-hidden />
            <i className={`${styles.bfSpark} ${styles.bfSpark2}`} aria-hidden />
            <i className={`${styles.bfSpark} ${styles.bfSpark3}`} aria-hidden />
          </span>
          <span className={styles.bfHeadlineSub}>MyClinica · ofertas até 30/11</span>
          <div className={styles.bfClock} role="timer" aria-label="Tempo restante da Black Friday">
            <span className={styles.bfClockLabel}>Ofertas terminam em</span>
            <div className={styles.bfClockDigits}>
              {(partes ?? [{ v: '--', l: 'dias' }, { v: '--', l: 'horas' }, { v: '--', l: 'min' }, { v: '--', l: 'seg' }]).map(p => (
                <div key={p.l} className={styles.bfClockCell}>
                  <strong>{p.v}</strong>
                  <span>{p.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.badge} ${styles.heroBadge} ${styles.badgeNormal}`}>
          <span className={styles.dot} />
          14 dias grátis, sem cartão
        </div>

        <h1 className={`${styles.title} ${styles.heroTitle}`}>
          Sua clínica gerenciada com{' '}
          <RotatingText phrases={HEADLINE_PHRASES} className={styles.rotBloco} />
        </h1>

        {/* Selo de preço (tablet e celular, onde os cards laterais não cabem) */}
        <div className={`${styles.bfRow} ${styles.heroSub}`}>
          <span className={`${styles.bfPill} ${styles.bfPillMain}`}>
            Black Friday: a partir de <strong>{PRECO_GANCHO}/mês</strong>
          </span>
        </div>

        <p className={`${styles.subtitle} ${styles.heroSub}`}>
          Prontuário, agenda, financeiro e WhatsApp em um só lugar.
        </p>

        <div className={`${styles.bfCallout} ${styles.heroSub}`}>
          <strong>50% off na primeira mensalidade</strong>
          <span>Até 30/11 · primeira cobrança só em 15/01</span>
        </div>

        <div className={`${styles.ctas} ${styles.heroCtaRow}`}>
          <a href={SAAS_QUIZ} className={styles.primary} onClick={() => trackTrialLead('hero_testar_gratis')}>
            Testar 14 dias grátis
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#plans" className={styles.bfOfertas}>
            Ver ofertas da Black Friday
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 2v11M3 8.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <p className={`${styles.guarantee} ${styles.heroGuarantee}`}>
          Sem cartão · Sem fidelidade
        </p>



      </div>
    </section>
  );
}
