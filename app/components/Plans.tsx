import styles from './Plans.module.css';

const WHATSAPP = 'https://wa.me/5588988557247';
const SAAS_REGISTER = 'https://myclinica.online/login?mode=register';

const plans = [
  {
    name: 'Básico',
    price: 'R$ 129/mês',
    description: 'Ideal para consultórios pequenos e profissionais autônomos.',
    highlight: false,
    features: [
      'Prontuário eletrônico completo',
      'Agenda com lembretes',
      'Financeiro básico',
      'Cadastro de pacientes',
      'Gestão de equipe',
      'Suporte por email',
    ],
    missing: [
      'CRM via WhatsApp',
      'Triagem automática com IA',
      'Agendamento pelo WhatsApp via IA',
      'Respostas automáticas 24/7',
      'Encaminhamento inteligente de pacientes',
      'Multi-clínica',
      'Relatórios avançados',
    ],
  },
  {
    name: 'Plus',
    price: 'A partir de R$ 249/mês',
    description: 'Para clínicas que querem automatizar e crescer com inteligência.',
    highlight: true,
    features: [
      'Prontuário eletrônico completo',
      'Agenda com lembretes',
      'Financeiro completo',
      'Cadastro de pacientes',
      'Gestão de equipe',
      'Suporte prioritário',
      'CRM via WhatsApp',
      'Triagem automática com IA',
      'Agendamento pelo WhatsApp via IA',
      'Respostas automáticas 24/7',
      'Encaminhamento inteligente de pacientes',
      'Multi-clínica',
      'Relatórios avançados',
    ],
    missing: [],
  },
];

export default function Plans() {
  return (
    <section className={styles.section} id="plans">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Planos</span>
          <h2 className={styles.title}>Escolha o plano ideal</h2>
          <p className={styles.subtitle}>
            Entre em contato e descubra qual plano se encaixa melhor no seu perfil.
          </p>
        </div>

        <div className={styles.trialBanner}>
          🎁 <strong>7 dias grátis</strong> em qualquer plano — sem cartão de crédito
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <div key={plan.name} className={`${styles.card} ${plan.highlight ? styles.highlighted : ''}`}>
              {plan.highlight && (
                <div className={styles.popularBadge}>Mais completo</div>
              )}
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.planPrice}>{plan.price}</div>
              <p className={styles.planDesc}>{plan.description}</p>

              <ul className={styles.featureList}>
                {plan.features.map(f => (
                  <li key={f} className={styles.featureItem}>
                    <span className={styles.check}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.missing.map(f => (
                  <li key={f} className={`${styles.featureItem} ${styles.missing}`}>
                    <span className={styles.x}>✕</span>
                    {f}
                  </li>
                ))}
              </ul>

              {plan.highlight && (
                <div className={styles.contactNote}>
                  💬 Ao escolher o plano Plus, <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.contactNoteLink}>entre em contato com a gente</a> para personalizar seu <strong>Atendimento</strong> e <strong>CRM</strong> via WhatsApp.
                </div>
              )}
              {plan.highlight ? (
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  Faça seu orçamento →
                </a>
              ) : (
                <a href={SAAS_REGISTER} className={styles.secondaryBtn}>
                  Testar grátis por 7 dias →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
