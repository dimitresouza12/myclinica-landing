'use client';
import { useState } from 'react';
import styles from './Specialties.module.css';

type SpecialtyId = 'odonto' | 'medico' | 'estetica' | 'vet' | 'fisio' | 'psico' | 'nutri';

interface Specialty {
  id: SpecialtyId;
  emoji: string;
  label: string;
  tagline: string;
  features: { title: string; desc: string }[];
}

const specialties: Specialty[] = [
  {
    id: 'odonto',
    emoji: '🦷',
    label: 'Odontologia',
    tagline: 'Para clínicas e consultórios odontológicos',
    features: [
      { title: 'Odontograma interativo',     desc: 'Mapa dos 32 dentes com status individualizado (saudável, tratado, restaurado, ausente).' },
      { title: 'Anamnese odontológica',      desc: 'Sangramento gengival, dor dentária, bruxismo, próteses, hábitos bucais e mais.' },
      { title: 'Plano de tratamento',        desc: 'Procedimentos previstos, sessões e acompanhamento da evolução por dente.' },
      { title: 'Contrato odontológico',      desc: 'Modelo de contrato digital com termos específicos da odontologia.' },
      { title: 'Histórico por dente',        desc: 'Cada procedimento fica registrado vinculado ao dente correspondente.' },
    ],
  },
  {
    id: 'medico',
    emoji: '🩺',
    label: 'Medicina',
    tagline: 'Para clínicas médicas, consultórios e ambulatórios',
    features: [
      { title: 'Prontuário médico completo', desc: 'Queixa principal, história da doença atual, comorbidades, histórico familiar e exame físico.' },
      { title: 'Prescrição e receitas',      desc: 'Receituário configurável com cabeçalho da clínica e dados do médico.' },
      { title: 'Pedidos de exames',          desc: 'Solicitação digital de exames laboratoriais e de imagem.' },
      { title: 'Cirurgias e internações',    desc: 'Registro do histórico cirúrgico e de internações anteriores.' },
      { title: 'Atestados médicos',          desc: 'Geração de atestados com tempo de afastamento e impressão.' },
    ],
  },
  {
    id: 'estetica',
    emoji: '✨',
    label: 'Estética',
    tagline: 'Para clínicas estéticas e centros de beleza',
    features: [
      { title: 'Ficha de avaliação estética',  desc: 'Tratamentos anteriores, uso de cosméticos, isotretinoína, exposição solar e gestação.' },
      { title: 'Fotos antes e depois',         desc: 'Galeria vinculada ao tratamento para acompanhar a evolução visual.' },
      { title: 'Pacotes de sessões',           desc: 'Controle de pacotes com saldo de sessões consumidas e restantes.' },
      { title: 'Triagem de contraindicações',  desc: 'Alergias a cosméticos, queloides, doenças de pele e uso de anticoagulantes.' },
      { title: 'Estoque de produtos',          desc: 'Cremes, ampolas e materiais com alerta de estoque mínimo.' },
    ],
  },
  {
    id: 'vet',
    emoji: '🐾',
    label: 'Veterinária',
    tagline: 'Para clínicas e hospitais veterinários',
    features: [
      { title: 'Cadastro de pets e tutores',  desc: 'Pet vinculado ao tutor com espécie, raça, peso, pelagem, idade e castração.' },
      { title: 'Carteira de vacinação',       desc: 'Histórico de vacinas e vermifugação, com lembretes para próximas doses.' },
      { title: 'Anamnese veterinária',        desc: 'Alimentação, ambiente, comportamento, contato com outros animais e histórico reprodutivo.' },
      { title: 'Prescrição por peso',         desc: 'Medicamentos com dose calculada por peso, frequência e duração.' },
      { title: 'Histórico de cirurgias',      desc: 'Registro de procedimentos cirúrgicos com pré e pós-operatório.' },
    ],
  },
  {
    id: 'fisio',
    emoji: '🤸',
    label: 'Fisioterapia',
    tagline: 'Para clínicas e consultórios de fisioterapia',
    features: [
      { title: 'Avaliação fisioterapêutica',   desc: 'Região acometida, intensidade da dor (0–10), tipo de dor, fatores que pioram/melhoram.' },
      { title: 'Plano de sessões',             desc: 'Número de sessões previstas, frequência e evolução por sessão.' },
      { title: 'Encaminhamento médico',        desc: 'Registro do diagnóstico médico e exames de imagem (RX, RM, USG).' },
      { title: 'Histórico de lesões',          desc: 'Cirurgias, fraturas e traumas anteriores que afetam o tratamento.' },
      { title: 'Acompanhamento de evolução',   desc: 'Notas de cada sessão com progresso, dificuldades e ajustes.' },
    ],
  },
  {
    id: 'psico',
    emoji: '🧠',
    label: 'Psicologia',
    tagline: 'Para psicólogos e clínicas de saúde mental',
    features: [
      { title: 'Anamnese psicológica',         desc: 'Histórico pessoal, dinâmica familiar, traumas, relacionamentos e objetivos com a terapia.' },
      { title: 'Triagem de risco',             desc: 'Avaliação de ideação suicida e autolesão para encaminhamento adequado.' },
      { title: 'Evolução por sessão',          desc: 'Registro detalhado de cada sessão com sigilo profissional garantido.' },
      { title: 'Tratamentos paralelos',        desc: 'Controle de medicamentos psiquiátricos e tratamentos anteriores.' },
      { title: 'Sono e substâncias',           desc: 'Acompanhamento de qualidade do sono e uso de álcool, tabaco ou outras substâncias.' },
    ],
  },
  {
    id: 'nutri',
    emoji: '🥗',
    label: 'Nutrição',
    tagline: 'Para nutricionistas e clínicas de nutrição',
    features: [
      { title: 'Avaliação nutricional',        desc: 'Objetivo, histórico clínico, alergias e intolerâncias alimentares.' },
      { title: 'Recordatório alimentar 24h',   desc: 'Registro do que o paciente comeu nas últimas 24h para análise nutricional.' },
      { title: 'Hábitos alimentares',          desc: 'Refeições por dia, horários, local, hidratação e restrições religiosas.' },
      { title: 'Histórico de peso',            desc: 'Variações recentes, peso máximo, mínimo e curva de evolução.' },
      { title: 'Atividade física e intestino', desc: 'Tipo de exercícios, frequência e funcionamento intestinal.' },
    ],
  },
];

export default function Specialties() {
  const [active, setActive] = useState<SpecialtyId>('odonto');
  const current = specialties.find(s => s.id === active)!;

  return (
    <section className={styles.section} id="specialties">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Especialidades</span>
          <h2 className={styles.title}>Personalizado para sua clínica</h2>
          <p className={styles.subtitle}>
            O sistema se adapta à sua especialidade — selecione abaixo e veja como fica configurado.
          </p>
        </div>

        <div className={styles.tabsRow}>
          {specialties.map(s => (
            <button
              key={s.id}
              className={`${styles.tab} ${active === s.id ? styles.tabActive : ''}`}
              onClick={() => setActive(s.id)}
            >
              <span className={styles.tabEmoji}>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelEmoji}>{current.emoji}</span>
            <div>
              <h3 className={styles.panelTitle}>{current.label}</h3>
              <p className={styles.panelTagline}>{current.tagline}</p>
            </div>
          </div>

          <div className={styles.featuresList}>
            {current.features.map(f => (
              <div key={f.title} className={styles.featureRow}>
                <span className={styles.check}>✓</span>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
