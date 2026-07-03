import styles from './Journey.module.css';
import RevealSection from './RevealSection';

interface Step {
  n: string;
  color: string;
  soft: string;
  label: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    n: '01',
    color: '#DC2626',
    soft: 'rgba(220, 38, 38, 0.1)',
    label: 'Passo 01',
    title: 'Agenda no papel',
    desc: 'Onde a maioria começa — caderno, faltas e retrabalho. Mas deve evoluir rápido.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    n: '02',
    color: '#2563EB',
    soft: 'rgba(37, 99, 235, 0.1)',
    label: 'Passo 02',
    title: 'Agenda automatizada',
    desc: 'Confirmações, retornos e lembretes automáticos via WhatsApp. Adeus faltas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    n: '03',
    color: '#7C3AED',
    soft: 'rgba(124, 58, 237, 0.1)',
    label: 'Passo 03',
    title: 'Prontuário digital',
    desc: 'Anamnese, exame clínico, assinatura eletrônica e histórico completo do paciente.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 8h10M7 12h6" />
      </svg>
    ),
  },
  {
    n: '04',
    color: '#D97706',
    soft: 'rgba(217, 119, 6, 0.1)',
    label: 'Passo 04',
    title: 'Financeiro no controle',
    desc: 'Orçamentos, boletos, faturamento e fluxo de caixa — tudo integrado e automático.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    n: '05',
    color: '#059669',
    soft: 'rgba(5, 150, 105, 0.1)',
    label: 'Passo 05',
    title: 'Clínica escalando',
    desc: 'CRM, relatórios gerenciais e IA no WhatsApp. Sua clínica pronta para crescer.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
];

export default function Journey() {
  return (
    <section className={styles.section} id="jornada">
      <div className={styles.container}>
        <RevealSection className={styles.header} tag="div">
          <span className={styles.badge}>✦ Jornada</span>
          <h2 className={styles.title}>Evolua seu consultório</h2>
          <p className={styles.subtitle}>Da gestão no papel ao crescimento constante.</p>
        </RevealSection>

        <div className={styles.track}>
          <div className={styles.line} aria-hidden />
          {steps.map((s, i) => (
            <RevealSection
              key={s.n}
              className={styles.step}
              tag="div"
              delay={i}
            >
              <div
                className={styles.iconWrap}
                style={{ color: s.color, background: s.soft, borderColor: s.color }}
              >
                {s.icon}
              </div>
              <div className={styles.card} style={{ borderTopColor: s.color }}>
                <span className={styles.stepLabel} style={{ color: s.color }}>{s.label}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
