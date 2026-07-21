import styles from './Plans.module.css';
import RevealSection from './RevealSection';

const WHATSAPP = 'https://wa.me/5588920020570';
const BASE_URL = 'https://myclinica.online/login';

const IconGift = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const IconWhatsApp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const plans = [
  {
    name: 'Essencial',
    slug: 'essencial',
    price: 'R$ 99/mês',
    description: 'Para profissionais autônomos que estão começando a organizar sua clínica.',
    highlight: false,
    badge: null,
    features: [
      'Prontuário eletrônico completo',
      'Agenda com lembretes',
      'Financeiro básico',
      'Cadastro de até 100 pacientes',
      '1 usuário (profissional)',
      'Suporte humanizado por WhatsApp',
    ],
    missing: [
      'Relatórios avançados',
      'Gestão de equipe',
      'Atendente virtual com IA',
      'CRM integrado via WhatsApp',
      'Agendamento automático pelo WhatsApp',
      'Respostas automáticas 24/7',
      'Multi-clínica',
    ],
  },
  {
    name: 'Avançado',
    slug: 'avancado',
    price: 'R$ 119,90/mês',
    description: 'Ideal para consultórios em crescimento com equipe e pacientes ilimitados.',
    highlight: false,
    badge: null,
    features: [
      'Prontuário eletrônico completo',
      'Agenda com lembretes',
      'Financeiro completo',
      'Pacientes ilimitados',
      'Até 3 usuários (profissional + recepcionistas)',
      'Gestão de equipe',
      'Relatórios avançados',
      'Suporte humanizado por WhatsApp',
    ],
    missing: [
      'Atendente virtual com IA',
      'CRM integrado via WhatsApp',
      'Agendamento automático pelo WhatsApp',
      'Respostas automáticas 24/7',
      'Multi-clínica',
    ],
  },
  {
    name: 'Completo',
    slug: 'completo',
    price: 'R$ 129,90/mês',
    description: 'Gestão completa com relatórios avançados e suporte prioritário.',
    highlight: true,
    badge: 'Mais popular',
    features: [
      'Prontuário eletrônico completo',
      'Agenda com lembretes',
      'Financeiro completo',
      'Pacientes ilimitados',
      'Usuários ilimitados (profissionais, recepcionistas, gerentes)',
      'Gestão de equipe',
      'Relatórios avançados',
      'Multi-clínica',
      'Suporte humanizado por WhatsApp',
    ],
    missing: [
      'Atendente virtual com IA',
      'CRM integrado via WhatsApp',
      'Agendamento automático pelo WhatsApp',
      'Respostas automáticas 24/7',
    ],
  },
  {
    name: 'Completo+',
    slug: null,
    price: 'A partir de R$ 199/mês',
    description: 'Para clínicas que querem automatizar o atendimento e crescer com IA.',
    highlight: false,
    badge: 'Com IA',
    features: [
      'Tudo do plano Completo',
      'Atendente virtual com IA',
      'CRM integrado via WhatsApp',
      'Agendamento automático pelo WhatsApp',
      'Respostas automáticas 24/7',
      'Encaminhamento inteligente de pacientes',
      'Gerente de conta dedicado',
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
          <IconGift /> <strong>7 dias grátis</strong> em qualquer plano — sem cartão de crédito
        </div>

        <div className={styles.copaBanner}>
          <span className={styles.copaIcon}>🏆</span>
          <span>
            <strong>Promoção Copa do Mundo:</strong> assine durante a copa e pague{' '}
            <strong>50% na primeira mensalidade</strong>. Use o código{' '}
            <span className={styles.copaCode}>COPA50</span> ao contratar.
          </span>
          <span className={styles.copaSep}>·</span>
          <span>
            <strong>Indique um amigo</strong> e ganhe <strong>1 mês grátis</strong> a cada indicação que assinar.
          </span>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <RevealSection
              key={plan.name}
              className={`${styles.card} ${plan.highlight ? styles.highlighted : ''}`}
              delay={i}
              variant="scale"
            >
              {plan.badge && (
                <div className={styles.popularBadge}>{plan.badge}</div>
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

              {plan.slug === null && (
                <div className={styles.contactNote}>
                  <IconWhatsApp />
                  <span>
                    O plano Completo+ é personalizado para cada clínica.{' '}
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.contactNoteLink}>
                      Fale com a gente no WhatsApp
                    </a>{' '}
                    e monte o seu <strong>Atendente Virtual</strong> e <strong>CRM</strong> sob medida.
                  </span>
                </div>
              )}
              {plan.slug === null ? (
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                  Faça seu orçamento →
                </a>
              ) : (
                <>
                  <a href={`${BASE_URL}?plan=${plan.slug}`} className={plan.highlight ? styles.primaryBtn : styles.secondaryBtn}>
                    Testar grátis por 7 dias →
                  </a>
                  <p className={styles.btnSubtext}>sem cartão de crédito · cancele quando quiser</p>
                </>
              )}
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
