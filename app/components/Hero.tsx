import styles from './Hero.module.css';
import RotatingText from './RotatingText';

const SAAS_QUIZ = 'https://myclinica.online/login?quiz=true';

const HEADLINE_PHRASES = [
  'inteligência',
  'prontuário digital',
  'agenda automática',
  'CRM no WhatsApp',
];

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.orb} aria-hidden />

      {/* Cards flutuantes — dados reais do sistema */}
      <div className={styles.floatCard} data-pos="tl" aria-hidden>
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

      <div className={styles.floatCard} data-pos="tr" aria-hidden>
        <div className={styles.fcTopRow}>
          <strong>73%</strong>
          <span className={styles.fcTag}>+18%</span>
        </div>
        <span className={styles.fcLabel}>orçamentos aprovados</span>
        <div className={styles.fcDots}>
          {Array.from({ length: 12 }).map((_, i) => (
            <i key={i} className={i < 9 ? styles.fcDotOn : ''} />
          ))}
        </div>
      </div>

      <div className={styles.floatCard} data-pos="bl" aria-hidden>
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

      <div className={styles.floatCard} data-pos="br" aria-hidden>
        <div className={styles.fcHead}>
          <strong>47</strong>
          <span>pacientes inativos</span>
        </div>
        <div className={styles.fcReactivate}>
          ↻ Reativar via WhatsApp
        </div>
      </div>

      <div className={styles.container}>

        <div className={`${styles.badge} ${styles.heroBadge}`}>
          <span className={styles.dot} />
          Novo — IA no atendimento via WhatsApp
        </div>

        <h1 className={`${styles.title} ${styles.heroTitle}`}>
          Sua clínica gerenciada com{' '}
          <RotatingText phrases={HEADLINE_PHRASES} />
        </h1>

        <p className={`${styles.subtitle} ${styles.heroSub}`}>
          Prontuário eletrônico, agenda, financeiro e CRM via WhatsApp — uma plataforma que se adapta a 7 especialidades clínicas.
        </p>

        <div className={`${styles.ctas} ${styles.heroCtaRow}`}>
          <a href={SAAS_QUIZ} className={styles.primary}>
            Testar 7 dias grátis
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#demonstracao" className={styles.secondary}>Ver demonstração</a>
        </div>

        <p className={`${styles.guarantee} ${styles.heroGuarantee}`}>
          7 dias grátis · Sem cartão de crédito · Cancele quando quiser
        </p>

        <div className={`${styles.stats} ${styles.heroStats}`}>
          <div className={styles.stat}>
            <strong>7</strong>
            <span>Especialidades suportadas</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>24/7</strong>
            <span>Suporte IA no WhatsApp</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>100%</strong>
            <span>Dados isolados por clínica</span>
          </div>
        </div>


      </div>
    </section>
  );
}
