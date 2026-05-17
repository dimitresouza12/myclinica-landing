import styles from './Features.module.css';

const features = [
  {
    icon: '📋',
    title: 'Prontuário Eletrônico',
    desc: 'Ficha completa do paciente com anamnese, exame clínico, plano de tratamento e contrato digital.',
  },
  {
    icon: '🦷',
    title: 'Odontograma',
    desc: 'Mapa visual dos 32 dentes com status individualizado. Ideal para clínicas odontológicas.',
  },
  {
    icon: '📅',
    title: 'Agenda Inteligente',
    desc: 'CRUD de agendamentos com integração ao Google Calendar. Lembretes automáticos para pacientes.',
  },
  {
    icon: '💬',
    title: 'CRM via WhatsApp',
    desc: 'Histórico completo de conversas do WhatsApp vinculado ao prontuário de cada paciente.',
  },
  {
    icon: '💰',
    title: 'Financeiro',
    desc: 'Controle de lançamentos, receitas e despesas. Relatórios simples para sua clínica.',
  },
  {
    icon: '👥',
    title: 'Gestão de Equipe',
    desc: 'Cadastro de profissionais com perfis e permissões. Cada clínica com sua equipe isolada.',
  },
  {
    icon: '🤖',
    title: 'IA no Atendimento',
    desc: 'Agente de IA integrado ao WhatsApp para pré-atendimento, agendamento e perguntas frequentes.',
  },
  {
    icon: '📦',
    title: 'Estoque',
    desc: 'Controle de produtos e materiais com alertas de estoque mínimo, entradas e saídas registradas.',
  },
  {
    icon: '🔒',
    title: 'Multi-clínica Seguro',
    desc: 'Dados completamente isolados por clínica. Superadmin para gerenciar todas as unidades.',
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Funcionalidades</span>
          <h2 className={styles.title}>Tudo que sua clínica precisa</h2>
          <p className={styles.subtitle}>
            Uma plataforma integrada, pensada do zero para o fluxo real de clínicas e consultórios.
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
