'use client';
import { useState } from 'react';
import styles from './Specialties.module.css';

type SpecialtyId = 'odonto' | 'medico' | 'estetica' | 'vet' | 'fisio' | 'psico' | 'nutri';

interface Specialty {
  id: SpecialtyId;
  emoji: string;
  label: string;
  tagline: string;
  anamnese: string[];
  exame: string[];
  extra?: string;
}

const specialties: Specialty[] = [
  {
    id: 'odonto',
    emoji: '🦷',
    label: 'Odontologia',
    tagline: 'Para clínicas e consultórios odontológicos',
    anamnese: [
      'Queixa principal / Motivo da consulta',
      'Estado geral de saúde',
      'Em tratamento médico? Qual?',
      'Medicamentos em uso',
      'Alergias (medicamentos, látex, anestésicos)',
      'Pressão arterial / Cardiopatias',
      'Fumante / Álcool',
      'Sangramento gengival / Dor dentária',
      'Histórico odontológico (última consulta, prótese, implante)',
      'Bruxismo / Ranger de dentes',
      'Hábitos bucais (chupar dedo, morder objetos)',
    ],
    exame: [
      'Higiene bucal (placa, tártaro)',
      'Halitose',
      'Mucosa oral (cor, lesões, úlceras)',
      'Palato / Língua / Assoalho bucal',
      'Oclusão / Articulação temporomandibular (ATM)',
      'Mobilidade dentária',
      'Profundidade de sondagem / Sangramento à sondagem',
      'Dor à percussão / Sensibilidade ao frio/calor',
      'Hipótese diagnóstica / Plano radiográfico',
    ],
    extra: 'Odontograma com os 32 dentes + Plano de Tratamento + Contrato',
  },
  {
    id: 'medico',
    emoji: '🩺',
    label: 'Medicina',
    tagline: 'Para clínicas médicas, consultórios e ambulatórios',
    anamnese: [
      'Queixa principal / Motivo da consulta',
      'História da doença atual (início, evolução, intensidade)',
      'Comorbidades (Diabetes, HAS, Cardiopatia, etc.)',
      'Histórico familiar de doenças relevantes',
      'Cirurgias / Internações anteriores',
      'Medicamentos em uso',
      'Alergias (medicamentos, alimentos, outros)',
      'Hábitos de vida (Fumo / Álcool / Atividade física)',
      'Qualidade do sono',
      'Sintomas associados (febre, dor, náusea, etc.)',
    ],
    exame: [
      'Pressão Arterial (mmHg)',
      'Frequência Cardíaca (bpm)',
      'Frequência Respiratória (irpm)',
      'Temperatura (°C)',
      'Saturação O₂ (%)',
      'Glicemia capilar (mg/dL)',
      'Peso / Altura / IMC',
      'Ausculta Cardíaca / Pulmonar',
      'Exame físico específico (região de queixa)',
      'Hipótese diagnóstica (CID)',
      'Conduta / Solicitação de exames',
    ],
    extra: 'Plano de Tratamento + Contrato de serviços médicos',
  },
  {
    id: 'estetica',
    emoji: '✨',
    label: 'Estética',
    tagline: 'Para clínicas estéticas e centros de beleza',
    anamnese: [
      'Queixa principal / Região de interesse',
      'Expectativas com o tratamento',
      'Tratamentos estéticos anteriores',
      'Uso de cosméticos / Ácidos / Retinol',
      'Uso de isotretinoína (últimos 6 meses?)',
      'Uso de anticoagulantes / AAS',
      'Exposição solar (usa protetor solar?)',
      'Alergias (cosméticos, anestésicos, látex)',
      'Histórico de queloides / Cicatrização ruim',
      'Gestante / Lactante?',
      'Doenças de pele (rosácea, psoríase, dermatite)',
    ],
    exame: [
      'Tipo de pele (Normal, Seca, Oleosa, Mista)',
      'Fototipo (Fitzpatrick I–VI)',
      'Grau de hidratação',
      'Região de interesse / Área a tratar',
      'Manchas / Melasma / Hiperpigmentação',
      'Grau de flacidez / Celulite',
      'Lesões visíveis (acne, rosácea, cicatrizes)',
      'Procedimento proposto / Protocolo',
      'Contraindicações identificadas',
    ],
    extra: 'Plano de Tratamento + Contrato de serviços estéticos',
  },
  {
    id: 'vet',
    emoji: '🐾',
    label: 'Veterinária',
    tagline: 'Para clínicas e hospitais veterinários',
    anamnese: [
      'Motivo da consulta / Queixa principal',
      'Alimentação / Dieta (tipo, frequência, marca)',
      'Ambiente onde vive (interno / externo)',
      'Histórico de doenças / Cirurgias anteriores',
      'Vacinação e vermifugação em dia?',
      'Histórico reprodutivo (fêmeas: gestações, cio)',
      'Medicamentos em uso',
      'Alergias conhecidas',
      'Contato com outros animais',
    ],
    exame: [
      'Temperatura retal (°C)',
      'Mucosas (cor, TPC)',
      'Grau de desidratação',
      'Frequência Cardíaca (bpm)',
      'Frequência Respiratória (mpm)',
      'Linfonodos (tamanho, consistência)',
      'Peso (kg) / Escore corporal',
      'Ausculta cardíaca / Pulmonar',
      'Palpação abdominal',
      'Hipótese diagnóstica / Exames solicitados',
    ],
    extra: 'Cadastro do pet (espécie, raça, peso, castrado) + Plano de Tratamento + Contrato',
  },
  {
    id: 'fisio',
    emoji: '🤸',
    label: 'Fisioterapia',
    tagline: 'Para clínicas e consultórios de fisioterapia',
    anamnese: [
      'Queixa principal',
      'Diagnóstico médico / Encaminhamento',
      'Região acometida',
      'Início e causa (trauma, postura, esforço, cirurgia)',
      'Intensidade da dor (0–10) e tipo (queimação, pontada, etc.)',
      'Fatores que pioram / melhoram',
      'Cirurgias ou fraturas anteriores',
      'Comorbidades (Diabetes, HAS, Osteoporose, etc.)',
      'Medicamentos em uso',
      'Exames de imagem disponíveis (RX, RM, USG)',
      'Número de sessões previstas / Frequência',
    ],
    exame: [
      'Avaliação postural (anteriorização, escoliose, etc.)',
      'ADM — Amplitude de Movimento (graus)',
      'Força muscular (escala 0–5)',
      'Sensibilidade / Parestesia / Dormência',
      'Testes especiais (Lasègue, Phalen, Ortolani, etc.)',
      'Dor à palpação / Pontos-gatilho',
      'Edema / Inflamação / Temperatura local',
      'Avaliação de marcha / Equilíbrio',
      'Diagnóstico fisioterapêutico',
    ],
    extra: 'Plano de Tratamento + Contrato de prestação de serviços de fisioterapia',
  },
  {
    id: 'psico',
    emoji: '🧠',
    label: 'Psicologia',
    tagline: 'Para psicólogos e clínicas de saúde mental',
    anamnese: [
      'Queixa principal / Motivo da busca',
      'Histórico pessoal relevante (infância, traumas, perdas)',
      'Dinâmica familiar atual',
      'Tratamentos psicológicos ou psiquiátricos anteriores',
      'Medicamentos em uso (psiquiátricos ou outros)',
      'Uso de álcool, tabaco ou outras substâncias',
      'Qualidade do sono (insônia, hipersonia, pesadelos)',
      'Relacionamentos (familiar, social, afetivo)',
      'Situação profissional / escolar',
      'Objetivos com a terapia',
      'Triagem de risco (ideação suicida / autolesão)',
    ],
    exame: [
      'Apresentação geral (aparência, higiene, postura, contato visual)',
      'Humor e afeto (eutímico, deprimido, eufórico, ansioso)',
      'Curso e conteúdo do pensamento (acelerado, lento, ruminações)',
      'Percepção (alucinações auditivas/visuais, ilusões)',
      'Memória, atenção, concentração e orientação',
      'Crítica e julgamento (insight sobre a condição)',
      'Escala PHQ-9 / GAD-7 (pontuação se aplicada)',
      'Hipótese diagnóstica (CID-10 / DSM-5)',
      'Plano terapêutico / Abordagem utilizada',
    ],
    extra: 'Plano de Tratamento + Contrato de serviços de psicologia',
  },
  {
    id: 'nutri',
    emoji: '🥗',
    label: 'Nutrição',
    tagline: 'Para nutricionistas e clínicas de nutrição',
    anamnese: [
      'Objetivo principal / Queixa',
      'Histórico clínico (Diabetes, HAS, dislipidemia, tireóide)',
      'Cirurgias / Internações anteriores',
      'Medicamentos em uso',
      'Alergias ou intolerâncias alimentares',
      'Hábitos alimentares (refeições/dia, horários, local)',
      'Recordatório alimentar 24h (o que comeu ontem)',
      'Restrições alimentares (religiosas, preferências, aversões)',
      'Ingestão hídrica diária',
      'Prática de atividade física (tipo, frequência, duração)',
      'Funcionamento intestinal (frequência, consistência)',
      'Histórico de peso (máximo, mínimo, variações recentes)',
    ],
    exame: [
      'Peso atual (kg)',
      'Altura (cm)',
      'IMC (kg/m²)',
      'Circunferência abdominal (cm)',
      'Relação cintura/quadril',
      'Percentual de gordura corporal (%)',
      'Massa magra (kg)',
      'Pressão arterial',
      'Exames laboratoriais (glicose, HbA1c, colesterol, TG, TSH)',
      'Meta calórica / VET prescrito (kcal/dia)',
      'Plano alimentar / Orientações prescritas',
    ],
    extra: 'Plano de Tratamento + Contrato de serviços de nutrição',
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
          <h2 className={styles.title}>Prontuário personalizado para cada área</h2>
          <p className={styles.subtitle}>
            Cada especialidade tem seus próprios campos de anamnese e exame clínico — exatamente o que você precisa, sem sobrar.
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

          <div className={styles.columnsWrap}>
            <div className={styles.fieldCol}>
              <div className={styles.colLabel}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{display:'inline',marginRight:6,verticalAlign:'middle'}}>
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
              </svg>
              Anamnese
            </div>
              <ul className={styles.fieldList}>
                {current.anamnese.map(f => (
                  <li key={f} className={styles.fieldItem}>
                    <span className={styles.fieldDot} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.fieldCol}>
              <div className={styles.colLabel}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{display:'inline',marginRight:6,verticalAlign:'middle'}}>
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11"/><path d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"/><circle cx="12" cy="15" r="2"/>
              </svg>
              Exame Clínico
            </div>
              <ul className={styles.fieldList}>
                {current.exame.map(f => (
                  <li key={f} className={styles.fieldItem}>
                    <span className={styles.fieldDot} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {current.extra && (
            <div className={styles.extraRow}>
              <span className={styles.extraIcon}>✦</span>
              {current.extra}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
