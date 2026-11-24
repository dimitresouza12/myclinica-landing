'use client';
import { useState, type ReactNode } from 'react';
import styles from './Specialties.module.css';
import RevealSection from './RevealSection';

type SpecialtyId = 'odonto' | 'medico' | 'estetica' | 'vet' | 'fisio' | 'psico' | 'nutri' | 'fono' | 'to';

interface Specialty {
  id: SpecialtyId;
  icon: ReactNode;
  label: string;
  tagline: string;
  anamnese: string[];
  exame: string[];
  extra?: string;
  /** Recursos que só aquela especialidade tem no sistema (abas próprias do prontuário). */
  recursos: { titulo: string; desc: string }[];
}

const ICON_odonto = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 3c-2 0-3.5.9-4.6.9C5.6 3.9 4 5 4 7.4c0 1.7.4 2.7.9 4 .3.9.6 2 .7 3.4.2 2.7.6 6.2 3 6.2 1.9 0 2.2-1.8 2.5-3.6.2-1.1.3-2.2 1-2.2s.8 1.1 1 2.2c.3 1.8.6 3.6 2.5 3.6 2.4 0 2.8-3.5 3-6.2.1-1.4.4-2.5.7-3.4.5-1.3.9-2.3.9-4 0-2.4-1.6-3.5-3.4-3.5C15.5 3.9 14 3 12 3z"/></svg>
);
const ICON_medico = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="10" y="3" width="4" height="18" rx="1.4"/><rect x="3" y="10" width="18" height="4" rx="1.4"/></svg>
);
const ICON_estetica = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l1.9 6.6L20.5 10l-6.6 1.9L12 18.5l-1.9-6.6L3.5 10l6.6-1.9L12 2z"/></svg>
);
const ICON_vet = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><circle cx="6.8" cy="9.3" r="2.1"/><circle cx="12" cy="6.6" r="2.1"/><circle cx="17.2" cy="9.3" r="2.1"/><path d="M12 12c-3.1 0-5.6 2.3-5.6 5 0 1.7 1.3 2.7 3 2.7.9 0 1.7-.3 2.6-.3s1.7.3 2.6.3c1.7 0 3-1 3-2.7 0-2.7-2.5-5-5.6-5z"/></svg>
);
const ICON_fisio = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="1" y="9.5" width="3" height="5" rx="1.2"/><rect x="20" y="9.5" width="3" height="5" rx="1.2"/><rect x="4.3" y="7.5" width="2.6" height="9" rx="1.2"/><rect x="17.1" y="7.5" width="2.6" height="9" rx="1.2"/><rect x="6.7" y="11" width="10.6" height="2" rx="1"/></svg>
);
const ICON_psico = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4 4.5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9.6L6 22v-4.5H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/></svg>
);
const ICON_nutri = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="11.2" y="2" width="1.6" height="3.6" rx="0.8"/><path d="M13 4c1.6-1.1 3.3-.7 4 .6-1.5.9-3 .6-4-.6z"/><circle cx="12" cy="14.5" r="7.2"/></svg>
);
const ICON_fono = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="2" y="10" width="2" height="4" rx="1"/><rect x="6" y="7" width="2" height="10" rx="1"/><rect x="10" y="4" width="2" height="16" rx="1"/><rect x="14" y="8" width="2" height="8" rx="1"/><rect x="18" y="11" width="2" height="2.5" rx="1"/></svg>
);
const ICON_to = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 2a2 2 0 00-2 2v6.5a1.5 1.5 0 01-3 0V9a1 1 0 00-2 0v1.5a3.5 3.5 0 003.5 3.5H8v6a2 2 0 002 2h4a2 2 0 002-2v-6h1.5a3.5 3.5 0 003.5-3.5V9a1 1 0 00-2 0v1.5a1.5 1.5 0 01-3 0V4a2 2 0 00-2-2H8z"/></svg>
);

const specialties: Specialty[] = [
  {
    id: 'odonto',
    icon: ICON_odonto,
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
    recursos: [
      { titulo: 'Odontograma interativo', desc: '32 dentes, com o status de cada dente marcado direto no desenho.' },
      { titulo: 'Periograma', desc: 'Registro periodontal por dente, com histórico entre as consultas.' },
      { titulo: 'Ortodontia', desc: 'Acompanhamento do tratamento ortodôntico dentro do prontuário.' },
      { titulo: 'Antes e depois', desc: 'Compare fotos do paciente lado a lado com um controle deslizante.' },
    ],
    extra: 'Odontograma com os 32 dentes + Plano de Tratamento + Contrato',
  },
  {
    id: 'medico',
    icon: ICON_medico,
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
    recursos: [
      { titulo: 'Exames e receitas', desc: 'Solicitação de exames e receitas na mesma aba, com o histórico do paciente.' },
      { titulo: 'Curvas de crescimento', desc: 'Gráfico de peso e altura para acompanhar a evolução, útil na pediatria.' },
      { titulo: 'Contrato de serviços médicos', desc: 'Contrato e documentos do paciente guardados no próprio prontuário.' },
    ],
    extra: 'Plano de Tratamento + Contrato de serviços médicos',
  },
  {
    id: 'estetica',
    icon: ICON_estetica,
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
    recursos: [
      { titulo: 'Faceograma', desc: 'Mapa do rosto para marcar pontos de aplicação e queixas.' },
      { titulo: 'Mapa de aplicações', desc: 'Registre produto, dose e ponto aplicado em cada sessão.' },
      { titulo: 'Corpograma', desc: 'Mapa do corpo para procedimentos corporais.' },
      { titulo: 'Antes e depois', desc: 'Fotos lado a lado, com controle deslizante para mostrar o resultado.' },
    ],
    extra: 'Plano de Tratamento + Contrato de serviços estéticos',
  },
  {
    id: 'vet',
    icon: ICON_vet,
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
    recursos: [
      { titulo: 'Saúde do pet', desc: 'Aba própria com espécie, raça, peso e histórico de cada animal.' },
      { titulo: 'Vários pets por tutor', desc: 'Troque de animal dentro do mesmo cadastro, sem duplicar o tutor.' },
    ],
    extra: 'Cadastro do pet (espécie, raça, peso, castrado) + Plano de Tratamento + Contrato',
  },
  {
    id: 'fisio',
    icon: ICON_fisio,
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
      'ADM: Amplitude de Movimento (graus)',
      'Força muscular (escala 0–5)',
      'Sensibilidade / Parestesia / Dormência',
      'Testes especiais (Lasègue, Phalen, Ortolani, etc.)',
      'Dor à palpação / Pontos-gatilho',
      'Edema / Inflamação / Temperatura local',
      'Avaliação de marcha / Equilíbrio',
      'Diagnóstico fisioterapêutico',
    ],
    recursos: [
      { titulo: 'Goniometria', desc: 'Medidas de amplitude de movimento com gráfico da evolução.' },
      { titulo: 'Programa de exercícios', desc: 'Monte o programa do paciente a partir de uma biblioteca.' },
      { titulo: 'Mapa corporal', desc: 'Marque a localização e a intensidade da dor (EVA) no corpo.' },
      { titulo: 'Plano por metas', desc: 'Metas do tratamento acompanhadas sessão a sessão.' },
    ],
    extra: 'Plano de Tratamento + Contrato de prestação de serviços de fisioterapia',
  },
  {
    id: 'psico',
    icon: ICON_psico,
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
    recursos: [
      { titulo: 'Plano terapêutico por metas', desc: 'Defina metas com o paciente e acompanhe o progresso.' },
      { titulo: 'Evolução por sessão', desc: 'Anotações de cada atendimento organizadas em linha do tempo.' },
    ],
    extra: 'Plano de Tratamento + Contrato de serviços de psicologia',
  },
  {
    id: 'nutri',
    icon: ICON_nutri,
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
    recursos: [
      { titulo: 'Aba de Nutrição', desc: 'Aba própria de nutrição, ao lado da ficha e da evolução do paciente.' },
      { titulo: 'Evolução do paciente', desc: 'Linha do tempo com o que foi trabalhado em cada consulta.' },
    ],
    extra: 'Plano de Tratamento + Contrato de serviços de nutrição',
  },
  {
    id: 'fono',
    icon: ICON_fono,
    label: 'Fonoaudiologia',
    tagline: 'Para fonoaudiólogos e clínicas de linguagem, voz e audição',
    anamnese: [
      'Queixa principal / Motivo da busca',
      'Marcos do desenvolvimento (sentou, andou, falou)',
      'Gestação e parto',
      'Amamentação e alimentação',
      'Histórico escolar',
      'Histórico auditivo e exames prévios',
      'Diagnósticos associados (TEA, TDAH, etc.)',
      'Medicamentos em uso',
      'Outras terapias em curso',
    ],
    exame: [
      'Linguagem receptiva e expressiva',
      'Fala e articulação',
      'Voz',
      'Fluência',
      'Motricidade orofacial (lábios, língua, palato)',
      'Deglutição',
      'Triagem auditiva (Teste da Orelhinha)',
      'Avaliação do frênulo lingual (Teste da Linguinha)',
      'Observações gerais',
    ],
    recursos: [
      { titulo: 'Audiograma', desc: 'Registro e gráfico da audiometria do paciente.' },
      { titulo: 'Voz e fluência', desc: 'Formulários próprios para avaliação de voz e de fluência.' },
      { titulo: 'Protocolo MOF', desc: 'Avaliação miofuncional orofacial pronta para preencher.' },
      { titulo: 'Plano por metas', desc: 'Metas terapêuticas com acompanhamento a cada sessão.' },
    ],
    extra: 'Plano de Tratamento + Contrato de serviços de fonoaudiologia',
  },
  {
    id: 'to',
    icon: ICON_to,
    label: 'Terapia Ocupacional',
    tagline: 'Para terapeutas ocupacionais e clínicas de reabilitação',
    anamnese: [
      'Queixa principal',
      'Rotina e atividades de vida diária (AVDs)',
      'Marcos do desenvolvimento',
      'Perfil sensorial',
      'Escola / Trabalho',
      'Nível de autonomia',
      'Diagnósticos',
      'Outras terapias em curso',
    ],
    exame: [
      'AVDs (higiene, alimentação, vestuário)',
      'Coordenação motora fina',
      'Coordenação motora grossa',
      'Perfil sensorial',
      'Cognição e atenção',
      'Participação social',
      'Uso de órtese ou adaptação',
      'Observações gerais',
    ],
    recursos: [
      { titulo: 'Plano terapêutico por metas', desc: 'Metas de cada paciente com acompanhamento por sessão.' },
      { titulo: 'Evolução por sessão', desc: 'Linha do tempo com o que foi trabalhado em cada atendimento.' },
    ],
    extra: 'Plano de Tratamento + Contrato de serviços de terapia ocupacional',
  },
];

export default function Specialties() {
  const [active, setActive] = useState<SpecialtyId>('odonto');
  const current = specialties.find(s => s.id === active)!;

  return (
    <section className={styles.section} id="specialties">
      <div className={styles.container}>
        <RevealSection className={styles.header} tag="div">
          <span className={styles.badge}>Especialidades</span>
          <h2 className={styles.title}>Prontuário personalizado para cada área</h2>
          <p className={styles.subtitle}>
            Cada especialidade tem seus próprios campos de anamnese e exame clínico, exatamente o que você precisa, sem sobrar.
          </p>
        </RevealSection>

        <div className={styles.tabsRow}>
          {specialties.map(s => (
            <button
              key={s.id}
              className={`${styles.tab} ${active === s.id ? styles.tabActive : ''}`}
              onClick={() => setActive(s.id)}
            >
              <span className={styles.tabIcon}>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon}>{current.icon}</span>
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

          <div className={styles.recursos}>
            <div className={styles.colLabel}>Só no MyClínica para {current.label}</div>
            <ul className={styles.recursosGrid}>
              {current.recursos.map(r => (
                <li key={r.titulo} className={styles.recurso}>
                  <strong>{r.titulo}</strong>
                  <span>{r.desc}</span>
                </li>
              ))}
            </ul>
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
