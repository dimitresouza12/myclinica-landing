import styles from './Hero.module.css';

const SAAS_QUIZ = 'https://myclinica.online/login?quiz=true';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.orb} aria-hidden />
      <div className={styles.container}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Novo — IA no atendimento via WhatsApp
        </div>

        <h1 className={styles.title}>
          Sua clínica gerenciada com{' '}
          <span className={styles.italic}>inteligência</span>
        </h1>

        <p className={styles.subtitle}>
          Prontuário eletrônico, agenda, financeiro e CRM via WhatsApp — uma plataforma que se adapta a 7 especialidades clínicas.
        </p>

        <div className={styles.ctas}>
          <a href={SAAS_QUIZ} className={styles.primary}>
            Testar 7 dias grátis
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#preview" className={styles.secondary}>Ver demonstração</a>
        </div>

        <p className={styles.guarantee}>
          7 dias grátis · Sem cartão de crédito · Cancele quando quiser
        </p>

        <div className={styles.stats}>
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
