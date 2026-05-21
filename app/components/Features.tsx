import styles from './Features.module.css';

interface Feature {
  icon: string;
  title: string;
  desc: string;
  span?: 1 | 2 | 3;
  hero?: boolean;
}

const features: Feature[] = [
  {
    icon: '📋',
    title: 'Prontuário Eletrônico',
    desc: 'Ficha completa do paciente com anamnese, exame clínico, plano de tratamento e contrato digital.',
    span: 2,
    hero: true,
  },
  {
    icon: '📅',
    title: 'Agenda Inteligente',
    desc: 'Agendamentos com integração ao Google Calendar e lembretes automáticos.',
  },
  {
    icon: '💬',
    title: 'CRM via WhatsApp',
    desc: 'Histórico de conversas vinculado ao prontuário.',
  },
  {
    icon: '💰',
    title: 'Financeiro',
    desc: 'Lançamentos, receitas e despesas com relatórios simples.',
  },
  {
    icon: '🤖',
    title: 'IA no Atendimento',
    desc: 'Agente de IA integrado ao WhatsApp para triagem, pré-atendimento e agendamento via chat.',
    span: 2,
  },
  {
    icon: '👥',
    title: 'Gestão de Equipe',
    desc: 'Cadastro de profissionais com perfis e permissões.',
  },
  {
    icon: '📦',
    title: 'Estoque',
    desc: 'Controle com alertas de mínimo, entradas e saídas.',
  },
  {
    icon: '🔒',
    title: 'Multi-clínica Seguro',
    desc: 'Dados isolados por clínica. Superadmin gerencia todas as unidades.',
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>/ Funcionalidades</span>
          <h2 className={styles.title}>
            Tudo que sua clínica precisa,{' '}
            <span className={styles.italic}>integrado</span>.
          </h2>
          <p className={styles.subtitle}>
            Uma plataforma pensada do zero para o fluxo real de clínicas e consultórios.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <div
              key={f.title}
              className={`${styles.card} ${f.hero ? styles.cardHero : ''} ${f.span === 2 ? styles.span2 : ''}`}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{f.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
