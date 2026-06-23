'use client';
import { useState } from 'react';
import styles from './Preview.module.css';

/* ════════════════════════════════════════════════════════════════
   Demonstração — réplica fiel do sistema MyClínica (tema Clinic White)
   Sidebar branca · acento teal #4DD9C0 · texto #0D2421
   ════════════════════════════════════════════════════════════════ */

const tabs = [
  { id: 'dashboard',  label: 'Dashboard' },
  { id: 'agenda',     label: 'Agenda' },
  { id: 'prontuario', label: 'Prontuário' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'relatorios', label: 'Relatórios' },
  { id: 'crm',        label: 'CRM' },
  { id: 'estoque',    label: 'Estoque' },
];

/* ── Ícones da sidebar (espelham src/components/ui/Icon.tsx) ── */
const ICON_PATHS: Record<string, string> = {
  dashboard:    'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  patients:     'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 110 8 4 4 0 010-8z',
  calendar:     'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
  finance:      'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  procedures:   'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4',
  reports:      'M18 20V10M12 20V4M6 20v-6',
  stock:        'M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M10 12h4',
  team:         'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M20 4a4 4 0 010 7.75',
  crm:          'M22 12h-4l-3 9L9 3l-3 9H2',
  campaigns:    'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
  settings:     'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v8M8 12h8',
};
function NavIcon({ name }: { name: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATHS[name].split('M').filter(Boolean).map((seg, i) => <path key={i} d={`M${seg}`} />)}
    </svg>
  );
}

const navItems = [
  { key: 'dashboard',     label: 'Dashboard',     icon: 'dashboard'  },
  { key: 'pacientes',     label: 'Pacientes',     icon: 'patients'   },
  { key: 'agenda',        label: 'Agenda',        icon: 'calendar'   },
  { key: 'financeiro',    label: 'Financeiro',    icon: 'finance'    },
  { key: 'procedimentos', label: 'Procedimentos', icon: 'procedures' },
  { key: 'relatorios',    label: 'Relatórios',    icon: 'reports'    },
  { key: 'estoque',       label: 'Estoque',       icon: 'stock'      },
  { key: 'equipe',        label: 'Equipe',        icon: 'team'       },
  { key: 'crm',           label: 'CRM',           icon: 'crm'        },
  { key: 'campanhas',     label: 'Campanhas',     icon: 'campaigns'  },
  { key: 'configuracoes', label: 'Configurações', icon: 'settings'   },
];

// Qual item da sidebar fica ativo para cada aba da demo
const sidebarActive: Record<string, string> = {
  dashboard:  'dashboard',
  agenda:     'agenda',
  prontuario: 'pacientes',
  financeiro: 'financeiro',
  relatorios: 'relatorios',
  crm:        'crm',
  estoque:    'estoque',
};

function Sidebar({ active }: { active: string }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <span className={styles.logoText}>My<strong>Clinica</strong></span>
        <span className={styles.clinicName}>Clínica Saúde+</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map(item => (
          <div key={item.key} className={`${styles.navItem} ${item.key === active ? styles.navActive : ''}`}>
            <span className={styles.navIcon}><NavIcon name={item.icon} /></span>
            <span className={styles.navLabel}>{item.label}</span>
          </div>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        <div className={styles.avatar}>AD</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Administrador</span>
          <span className={styles.userRole}>admin</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   1. DASHBOARD
   ════════════════════════════════════════════════════════════════ */
function DashboardMock() {
  const cards = [
    { label: 'Pacientes ativos',     value: '147',       accent: '#0D9488' },
    { label: 'Consultas hoje',       value: '12',        accent: '#0EA5E9' },
    { label: 'Novos este mês',       value: '18',        accent: '#8B5CF6' },
    { label: 'Agendamentos abertos', value: '8',         accent: '#F59E0B' },
    { label: 'Receita do mês',       value: 'R$ 12.840', accent: '#10B981' },
    { label: 'Despesa do mês',       value: 'R$ 4.320',  accent: '#EF4444' },
  ];
  const rows = [
    { name: 'Pedro Alves',    proc: 'Consulta',     date: '20/05/2026 09:00', status: 'confirmado' },
    { name: 'Larissa Barros', proc: 'Retorno',      date: '20/05/2026 10:30', status: 'agendado'   },
    { name: 'Felipe Costa',   proc: 'Avaliação',    date: '20/05/2026 11:00', status: 'confirmado' },
    { name: 'Mariana Dias',   proc: 'Procedimento', date: '20/05/2026 14:00', status: 'agendado'   },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Boa tarde, Administrador</h1>
          <p className={styles.pageSub}>Terça-feira, 20 de maio de 2026</p>
        </div>
        <button className={styles.iconBtn} title="Ocultar valores">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.dashCards}>
          {cards.map(c => (
            <div key={c.label} className={styles.dashCard} style={{ borderTopColor: c.accent }}>
              <span className={styles.dashCardValue}>{c.value}</span>
              <span className={styles.dashCardLabel}>{c.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Próximos agendamentos</span></div>
          <table className={styles.table}>
            <thead><tr><th>Paciente</th><th>Procedimento</th><th>Data</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name}>
                  <td className={styles.bold}>{r.name}</td>
                  <td>{r.proc}</td>
                  <td>{r.date}</td>
                  <td><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Receitas vs Despesas — últimos 6 meses</span></div>
          <div style={{ padding: '14px 16px' }}><LineChart /></div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { c: string; b: string; label: string }> = {
    confirmado: { c: '#065F46', b: '#D1FAE5', label: 'confirmado' },
    agendado:   { c: '#1E40AF', b: '#DBEAFE', label: 'agendado'   },
    concluido:  { c: '#0B9B85', b: '#E5F9F5', label: 'concluído'  },
    cancelado:  { c: '#B91C1C', b: '#FEE2E2', label: 'cancelado'  },
  };
  const s = map[status] ?? map.agendado;
  return <span className={styles.statusBadge} style={{ color: s.c, background: s.b }}>{s.label}</span>;
}

/* ════════════════════════════════════════════════════════════════
   2. AGENDA
   ════════════════════════════════════════════════════════════════ */
function AgendaMock() {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dates = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
  ];
  const events: Record<number, { t: string; c: string }[]> = {
    6:  [{ t: '09:00 Pedro A.', c: '#4DD9C0' }, { t: '14:00 Larissa B.', c: '#8B5CF6' }],
    7:  [{ t: '10:30 Felipe C.', c: '#0EA5E9' }],
    8:  [{ t: '09:00 Mariana D.', c: '#4DD9C0' }, { t: '11:00 Renato E.', c: '#F59E0B' }],
    13: [{ t: '14:00 Sônia F.', c: '#8B5CF6' }],
    14: [{ t: '09:30 Bruno G.', c: '#4DD9C0' }, { t: '16:00 Carla H.', c: '#0EA5E9' }],
    20: [{ t: '09:00 Pedro A.', c: '#4DD9C0' }, { t: '11:00 Larissa B.', c: '#8B5CF6' }, { t: '14:30 Felipe C.', c: '#0EA5E9' }],
    21: [{ t: '10:00 Mariana D.', c: '#F59E0B' }],
  };
  return (
    <div className={styles.screenBody}>
      <div className={styles.agTopbar}>
        <div className={styles.agLeft}>
          <button className={styles.agNavBtn}>‹</button>
          <button className={styles.agNavBtn}>›</button>
          <button className={styles.agToday}>Hoje</button>
          <div className={styles.agDate}>
            <strong>Maio 2026</strong>
            <span>Terça-feira</span>
          </div>
        </div>
        <div className={styles.agSeg}>
          <button className={`${styles.agSegBtn} ${styles.agSegActive}`}>Calendário</button>
          <button className={styles.agSegBtn}>Dia geral</button>
          <button className={styles.agSegBtn}>Lista</button>
        </div>
        <div className={styles.agRight}>
          <div className={styles.gcal}><span className={styles.gcalDot} />Google Calendar</div>
          <button className={styles.primaryBtn}>+ Novo Agendamento</button>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.calendarWrap}>
          <div className={styles.calendarHead}>
            {days.map(d => <div key={d} className={styles.calDayLabel}>{d}</div>)}
          </div>
          {dates.map((week, wi) => (
            <div key={wi} className={styles.calRow}>
              {week.map((day, di) => (
                <div key={di} className={`${styles.calCell} ${day === 20 ? styles.calToday : ''} ${!day ? styles.calEmpty : ''}`}>
                  {day && <div className={styles.calDate}>{day}</div>}
                  {day && events[day]?.map((ev, ei) => (
                    <div key={ei} className={styles.calEvent} style={{ borderLeftColor: ev.c, color: ev.c, background: ev.c + '18' }}>{ev.t}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className={styles.calHint}>Clique num evento para ver detalhes • Clique numa data para criar agendamento</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   3. PRONTUÁRIO (Ficha · Odontograma · Faceograma · …)
   ════════════════════════════════════════════════════════════════ */
type SpecId = 'odonto' | 'medico' | 'estetica' | 'vet' | 'fisio' | 'psico' | 'nutri';

const specOptions: { id: SpecId; emoji: string; label: string }[] = [
  { id: 'odonto',  emoji: '🦷', label: 'Odontologia' },
  { id: 'medico',  emoji: '🩺', label: 'Medicina' },
  { id: 'estetica',emoji: '✨', label: 'Estética' },
  { id: 'vet',     emoji: '🐾', label: 'Veterinária' },
  { id: 'fisio',   emoji: '🤸', label: 'Fisioterapia' },
  { id: 'psico',   emoji: '🧠', label: 'Psicologia' },
  { id: 'nutri',   emoji: '🥗', label: 'Nutrição' },
];

const specData: Record<SpecId, { patient: string; sub: string; anamnese: string[]; exame: string[] }> = {
  odonto: {
    patient: 'Pedro Alves', sub: 'Odontologia · última consulta 15/05/2026',
    anamnese: ['Queixa principal / Motivo da consulta', 'Estado geral de saúde', 'Medicamentos em uso', 'Alergias (medicamentos, látex, anestésicos)', 'Pressão arterial / Cardiopatias', 'Sangramento gengival / Dor dentária', 'Bruxismo / Ranger de dentes', 'Hábitos bucais'],
    exame: ['Higiene bucal (placa, tártaro)', 'Mucosa oral (cor, lesões)', 'Oclusão / ATM', 'Mobilidade dentária', 'Profundidade de sondagem', 'Dor à percussão / Sensibilidade', 'Hipótese diagnóstica', 'Observações gerais'],
  },
  medico: {
    patient: 'Larissa Barros', sub: 'Medicina · última consulta 14/05/2026',
    anamnese: ['Queixa principal / Motivo da consulta', 'História da doença atual', 'Comorbidades (Diabetes, HAS, etc.)', 'Medicamentos em uso', 'Alergias', 'Hábitos de vida (Fumo / Álcool)', 'Qualidade do sono', 'Sintomas associados'],
    exame: ['Pressão Arterial (mmHg)', 'Frequência Cardíaca (bpm)', 'Temperatura (°C)', 'Saturação O₂ (%)', 'Peso / Altura / IMC', 'Ausculta Cardíaca / Pulmonar', 'Hipótese diagnóstica (CID)', 'Conduta / Exames'],
  },
  estetica: {
    patient: 'Mariana Dias', sub: 'Estética · última consulta 13/05/2026',
    anamnese: ['Queixa principal / Região de interesse', 'Expectativas com o tratamento', 'Uso de cosméticos / Ácidos / Retinol', 'Uso de isotretinoína (últimos 6 meses?)', 'Uso de anticoagulantes / AAS', 'Alergias (cosméticos, anestésicos)', 'Gestante / Lactante?', 'Doenças de pele'],
    exame: ['Tipo de pele (Normal, Seca, Oleosa, Mista)', 'Fototipo (Fitzpatrick I–VI)', 'Manchas / Melasma', 'Grau de flacidez / Celulite', 'Lesões visíveis (acne, cicatrizes)', 'Procedimento proposto', 'Contraindicações identificadas', 'Observações gerais'],
  },
  vet: {
    patient: 'Rex (tutor: Bruno G.)', sub: 'Veterinária · última consulta 12/05/2026',
    anamnese: ['Motivo da consulta / Queixa principal', 'Alimentação / Dieta', 'Ambiente (interno / externo)', 'Vacinação e vermifugação em dia?', 'Histórico de doenças / Cirurgias', 'Medicamentos em uso', 'Contato com outros animais', 'Alergias conhecidas'],
    exame: ['Temperatura retal (°C)', 'Mucosas (cor, TPC)', 'Frequência Cardíaca (bpm)', 'Peso (kg) / Escore corporal', 'Linfonodos', 'Ausculta cardíaca / Pulmonar', 'Palpação abdominal', 'Hipótese diagnóstica'],
  },
  fisio: {
    patient: 'Felipe Costa', sub: 'Fisioterapia · última consulta 11/05/2026',
    anamnese: ['Queixa principal', 'Diagnóstico médico / Encaminhamento', 'Região acometida', 'Início e causa (trauma, postura)', 'Intensidade da dor (0–10)', 'Cirurgias ou fraturas anteriores', 'Exames de imagem (RX, RM, USG)', 'Sessões previstas / Frequência'],
    exame: ['Avaliação postural', 'ADM — Amplitude de Movimento (graus)', 'Força muscular (escala 0–5)', 'Testes especiais (Lasègue, Phalen)', 'Dor à palpação / Pontos-gatilho', 'Edema / Inflamação', 'Avaliação de marcha', 'Diagnóstico fisioterapêutico'],
  },
  psico: {
    patient: 'Sônia Ferreira', sub: 'Psicologia · última consulta 10/05/2026',
    anamnese: ['Queixa principal / Motivo da busca', 'Histórico pessoal relevante', 'Tratamentos anteriores', 'Medicamentos em uso', 'Uso de substâncias', 'Qualidade do sono', 'Situação profissional / escolar', 'Triagem de risco (ideação suicida)'],
    exame: ['Apresentação geral (aparência, postura)', 'Humor e afeto', 'Curso e conteúdo do pensamento', 'Percepção (alucinações, ilusões)', 'Memória, atenção e concentração', 'Crítica e julgamento (insight)', 'Escala PHQ-9 / GAD-7', 'Hipótese diagnóstica (CID-10 / DSM-5)'],
  },
  nutri: {
    patient: 'Carla Henrique', sub: 'Nutrição · última consulta 09/05/2026',
    anamnese: ['Objetivo principal / Queixa', 'Histórico clínico (Diabetes, HAS)', 'Alergias ou intolerâncias alimentares', 'Hábitos alimentares (refeições/dia)', 'Recordatório alimentar 24h', 'Ingestão hídrica diária', 'Prática de atividade física', 'Funcionamento intestinal'],
    exame: ['Peso atual (kg)', 'Altura (cm) / IMC (kg/m²)', 'Circunferência abdominal (cm)', 'Percentual de gordura corporal (%)', 'Massa magra (kg)', 'Exames laboratoriais (glicose, TSH)', 'Meta calórica / VET prescrito', 'Plano alimentar'],
  },
};

function FichaMock({ spec }: { spec: SpecId }) {
  const data = specData[spec];
  const ident: [string, string][] = [
    ['CPF', '•••.•••.•••-••'],
    ['RG', '••.•••.•••-•'],
    ['Data de Nascimento', '12/03/1985'],
    ['Gênero', 'Feminino'],
    ['Ocupação', 'Autônoma'],
    ['Endereço', 'Rua das Flores, 123'],
    ['Como nos conheceu', 'Indicação'],
    ['Contato de Emergência', '(88) 9••••-••••'],
  ];
  return (
    <div className={styles.ficha}>
      <section className={styles.fichaSec}>
        <h3 className={styles.fichaSecTitle}>Identificação</h3>
        <div className={styles.fichaGrid}>
          {ident.map(([l, v]) => (
            <div key={l} className={styles.fichaField}>
              <label>{l}</label>
              <div className={styles.fichaInput}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.fichaSec}>
        <h3 className={styles.fichaSecTitle}>Anamnese</h3>
        <div className={styles.fichaGrid}>
          {data.anamnese.map((l, i) => (
            <div key={i} className={styles.fichaField}>
              <label>{l}</label>
              <div className={styles.fichaTextarea} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.fichaSec}>
        <h3 className={styles.fichaSecTitle}>Exame Clínico</h3>
        <div className={styles.fichaGrid}>
          {data.exame.map((l, i) => (
            <div key={i} className={styles.fichaField}>
              <label>{l}</label>
              <div className={styles.fichaTextarea} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.fichaSec}>
        <h3 className={styles.fichaSecTitle}>Plano de Tratamento</h3>
        <div className={styles.fichaBigArea} />
      </section>

      <div className={styles.fichaSaveRow}>
        <button className={styles.ghostBtn}>Imprimir Prontuário</button>
        <button className={styles.primaryBtn}>Salvar Ficha</button>
      </div>
    </div>
  );
}

/* ── Odontograma (9 status reais) ── */
const TOOTH_STATUS = [
  { key: 'higido',     label: 'Hígido',       color: '#10b981', bg: '#d1fae5' },
  { key: 'cariado',    label: 'Cariado',      color: '#ef4444', bg: '#fee2e2' },
  { key: 'restaurado', label: 'Restaurado',   color: '#3b82f6', bg: '#dbeafe' },
  { key: 'ausente',    label: 'Ausente',      color: '#6b7280', bg: '#f3f4f6' },
  { key: 'implante',   label: 'Implante',     color: '#f59e0b', bg: '#fef3c7' },
  { key: 'coroa',      label: 'Coroa',        color: '#14b8a6', bg: '#ccfbf1' },
  { key: 'tratamento', label: 'Em Tratamento',color: '#ec4899', bg: '#fce7f3' },
  { key: 'fraturado',  label: 'Fraturado',    color: '#ea580c', bg: '#ffedd5' },
  { key: 'selante',    label: 'Selante',      color: '#7c3aed', bg: '#ede9fe' },
];
function OdontogramaMock() {
  const upper = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
  const lower = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
  const states: Record<number, string> = { 36: 'cariado', 46: 'cariado', 17: 'ausente', 27: 'implante', 11: 'restaurado', 22: 'coroa', 14: 'tratamento', 38: 'selante', 26: 'fraturado' };
  const st = (n: number) => TOOTH_STATUS.find(s => s.key === (states[n] ?? 'higido'))!;
  return (
    <div className={styles.odonto}>
      <div className={styles.odontoLegend}>
        {TOOTH_STATUS.map(s => (
          <span key={s.key} className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: s.bg, borderColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
      <div className={styles.odontoArchLabel}>Arcada Superior</div>
      <div className={styles.odontoRow}>
        {upper.map(n => { const s = st(n); return <div key={n} className={styles.tooth} style={{ background: s.bg, borderColor: s.color, color: s.color }}>{n}</div>; })}
      </div>
      <div className={styles.odontoRow}>
        {lower.map(n => { const s = st(n); return <div key={n} className={styles.tooth} style={{ background: s.bg, borderColor: s.color, color: s.color }}>{n}</div>; })}
      </div>
      <div className={styles.odontoArchLabel}>Arcada Inferior</div>
      <div className={styles.fichaSaveRow}>
        <button className={styles.primaryBtn}>Salvar Odontograma</button>
      </div>
    </div>
  );
}

/* ── Faceograma — réplica fiel do componente TabFaceograma ── */
const fgTools = [
  { key: 'toxina',         label: 'Toxina botulínica', abbr: 'Tx', color: '#3B82F6', bg: '#DBEAFE' },
  { key: 'preenchimento',  label: 'Preenchimento',     abbr: 'Pr', color: '#8B5CF6', bg: '#EDE9FE' },
  { key: 'bioestimulador', label: 'Bioestimulador',    abbr: 'Bi', color: '#F59E0B', bg: '#FEF3C7' },
  { key: 'fio',            label: 'Fio tensor',        abbr: 'Fi', color: '#EC4899', bg: '#FCE7F3' },
  { key: 'ultrassom',      label: 'Ultrassom/Micro',   abbr: 'Us', color: '#10B981', bg: '#D1FAE5' },
];
const fgTool = (k: string) => fgTools.find(t => t.key === k)!;
const FG_VW = 300;
const FG_VH = Math.round(300 * (1068 / 1290)); // ≈ 248

function FaceogramaMock() {
  const points = [
    { id: 'a', x: 115, y: 62,  type: 'toxina',         qty: '20U',   note: 'Frontal' },
    { id: 'b', x: 185, y: 62,  type: 'toxina',         qty: '20U',   note: 'Frontal' },
    { id: 'c', x: 150, y: 88,  type: 'toxina',         qty: '12U',   note: 'Glabela' },
    { id: 'd', x: 86,  y: 106, type: 'toxina',         qty: '8U',    note: 'Pés de galinha' },
    { id: 'e', x: 214, y: 106, type: 'toxina',         qty: '8U',    note: 'Pés de galinha' },
    { id: 'f', x: 110, y: 158, type: 'preenchimento',  qty: '0,5ml', note: 'Sulco nasogeniano esq.' },
    { id: 'g', x: 190, y: 158, type: 'preenchimento',  qty: '0,5ml', note: 'Sulco nasogeniano dir.' },
    { id: 'h', x: 95,  y: 142, type: 'bioestimulador', qty: '1A',    note: 'Malar esquerdo' },
    { id: 'i', x: 205, y: 142, type: 'bioestimulador', qty: '1A',    note: 'Malar direito' },
  ];
  const selId = 'f';
  const sel = points.find(p => p.id === selId)!;
  const selTool = fgTool(sel.type);

  return (
    <div className={styles.fgWrap}>
      <div className={styles.fgSessionBar}>
        <div className={styles.fgSessionTabs}>
          <div className={styles.fgSessionTab}>29 abr. 26</div>
          <div className={`${styles.fgSessionTab} ${styles.fgSessionTabActive}`}>20 mai. 26<span className={styles.fgSessionDel}>×</span></div>
        </div>
        <button className={styles.fgBtnNewSession}>+ Sessão</button>
      </div>

      <div className={styles.fgLayout}>
        <div className={styles.fgFaceCol}>
          <div className={styles.fgToolbar}>
            <span className={styles.fgToolbarLabel}>Marcar:</span>
            {fgTools.map(t => (
              <span key={t.key} className={`${styles.fgToolBtn} ${t.key === 'toxina' ? styles.fgToolBtnActive : ''}`}
                style={t.key === 'toxina' ? { background: t.bg, color: t.color, borderColor: t.color } : undefined}>
                <span className={styles.fgToolDot} style={{ background: t.color }} />{t.label}
              </span>
            ))}
          </div>
          <div className={styles.fgFaceWrap}>
            <svg viewBox={`0 0 ${FG_VW} ${FG_VH}`} className={styles.fgFaceSvg}>
              <image href="/rosto.webp" x="0" y="0" width={FG_VW} height={FG_VH} preserveAspectRatio="xMidYMid meet" />
              {points.map(p => {
                const isSel = p.id === selId; const t = fgTool(p.type);
                return (
                  <g key={p.id}>
                    {isSel && <circle cx={p.x} cy={p.y} r={20} fill="none" stroke={t.color} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />}
                    <circle cx={p.x + 0.5} cy={p.y + 0.8} r={isSel ? 13.5 : 10.5} fill="rgba(0,0,0,0.35)" opacity="0.6" />
                    <circle cx={p.x} cy={p.y} r={isSel ? 13 : 10} fill={t.bg} fillOpacity="0.93" stroke={t.color} strokeWidth={isSel ? 2.4 : 1.8} />
                    <text x={p.x} y={p.y + 3.5} textAnchor="middle" fill={t.color} fontSize="8.5" fontWeight="700">{t.abbr}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className={styles.fgFaceHint}>Clique no rosto para marcar · Clique num ponto para editar</p>
        </div>

        <div className={styles.fgSidePanel}>
          <div className={styles.fgSideSec}>
            <span className={styles.fgSideLabel}>Data da sessão</span>
            <input type="date" className={styles.fgDateInput} defaultValue="2026-05-20" readOnly />
            <span className={styles.fgSideLabel} style={{ marginTop: '0.75rem' }}>Observações</span>
            <textarea className={styles.fgNotesArea} rows={3} readOnly defaultValue="Paciente sem contraindicações. Lote toxina BC2241, diluição 2,5ml. Retorno em 21 dias." />
          </div>

          <div className={styles.fgAnnPanel} style={{ '--fg-ann': selTool.color } as React.CSSProperties}>
            <div className={styles.fgAnnHeader}>
              <span className={styles.fgAnnDot} style={{ background: selTool.color }} />
              <span className={styles.fgAnnTitle}>{selTool.label}</span>
              <span className={styles.fgAnnDel}>✕</span>
            </div>
            <div className={styles.fgAnnFields}>
              <div className={styles.fgAnnField}>
                <span className={styles.fgAnnFieldLabel}>Tipo de tratamento</span>
                <div className={styles.fgTypeGrid}>
                  {fgTools.map(t => (
                    <span key={t.key} className={styles.fgTypeBtn}
                      style={t.key === sel.type ? { background: t.bg, color: t.color, borderColor: t.color } : undefined}>
                      <span style={{ background: t.color, width: 7, height: 7, borderRadius: '50%', display: 'inline-block' }} />{t.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.fgAnnField}>
                <span className={styles.fgAnnFieldLabel}>Dose / Volume</span>
                <input type="text" className={styles.fgAnnInput} defaultValue={sel.qty} readOnly />
              </div>
              <div className={styles.fgAnnField}>
                <span className={styles.fgAnnFieldLabel}>Nota</span>
                <textarea className={styles.fgAnnNote} rows={2} readOnly defaultValue={sel.note} />
              </div>
            </div>
          </div>

          <div className={styles.fgSideSec}>
            <span className={styles.fgSideLabel}>Pontos marcados ({points.length})</span>
            <div className={styles.fgAnnList}>
              {points.map(p => {
                const t = fgTool(p.type); const isSel = p.id === selId;
                return (
                  <div key={p.id} className={`${styles.fgAnnItem} ${isSel ? styles.fgAnnItemActive : ''}`}
                    style={isSel ? { '--fg-ann': t.color } as React.CSSProperties : undefined}>
                    <span className={styles.fgAnnItemDot} style={{ background: t.color }} />
                    <div className={styles.fgAnnItemBody}>
                      <span className={styles.fgAnnItemName}>{t.label}</span>
                      <span className={styles.fgAnnItemQty}>{p.qty}</span>
                      <span className={styles.fgAnnItemNote}>{p.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fgSaveRow}><button className={styles.primaryBtn}>Salvar Faceograma</button></div>
    </div>
  );
}

function ProntuarioMock({ spec }: { spec: SpecId }) {
  const data = specData[spec];
  const initials = data.patient.replace(/\(.*\)/, '').trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const tabList = [
    { key: 'ficha', label: 'Ficha Clínica' },
    ...(spec === 'odonto' ? [{ key: 'odontograma', label: 'Odontograma' }] : []),
    { key: 'faceograma', label: 'Faceograma' },
    { key: 'timeline', label: 'Evolução' },
    { key: 'documentos', label: 'Documentos' },
    { key: 'chat', label: 'Chat IA' },
  ];
  const [tab, setTab] = useState('ficha');
  // Garante aba válida ao trocar de especialidade
  const validKeys = tabList.map(t => t.key);
  const activeTab = validKeys.includes(tab) ? tab : 'ficha';

  return (
    <div className={styles.screenBody}>
      <div className={styles.pmHeader}>
        <div className={styles.pmHeaderLeft}>
          <div className={styles.pmAvatar}>{initials}</div>
          <div>
            <h2 className={styles.pmTitle}>Prontuário</h2>
            <p className={styles.pmName}>{data.patient}</p>
          </div>
        </div>
        <button className={styles.ghostBtn}>Imprimir</button>
      </div>
      <div className={styles.pmTabs}>
        {tabList.map(t => (
          <button key={t.key} className={`${styles.pmTab} ${activeTab === t.key ? styles.pmTabActive : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>
      <div className={styles.mainScroll}>
        {activeTab === 'ficha' && <FichaMock spec={spec} />}
        {activeTab === 'odontograma' && <OdontogramaMock />}
        {activeTab === 'faceograma' && <FaceogramaMock />}
        {(activeTab === 'timeline' || activeTab === 'documentos' || activeTab === 'chat') && (
          <div className={styles.emptyTab}>
            {activeTab === 'timeline' ? 'Linha do tempo de evoluções clínicas do paciente.' :
             activeTab === 'documentos' ? 'Receitas, atestados e declarações em PDF.' :
             'Histórico de conversas do WhatsApp com a IA.'}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. FINANCEIRO
   ════════════════════════════════════════════════════════════════ */
function FinanceiroMock() {
  const cards = [
    { value: 'R$ 12.840', label: 'Receitas mensal',  iconBg: '#E8FBF7', iconColor: '#0B9B85', bar: 'linear-gradient(to right, #4DD9C0, #0B9B85)', pct: 100, icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
    { value: 'R$ 4.320',  label: 'Despesas mensal',  iconBg: '#FEF2F2', iconColor: '#DC2626', bar: 'linear-gradient(to right, #FCA5A5, #EF4444)', pct: 34, icon: 'M3 3h18M3 9h18M3 15h18M3 21h18' },
    { value: 'R$ 8.520',  label: 'Saldo mensal',     iconBg: '#E8FBF7', iconColor: '#0B9B85', bar: 'linear-gradient(to right, #4DD9C0, #0B9B85)', pct: 66, valueColor: '#059669', icon: 'M12 22V2M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
    { value: '48',        label: 'Lançamentos',      iconBg: '#EFF6FF', iconColor: '#2563EB', bar: 'linear-gradient(to right, #60A5FA, #2563EB)', pct: 80, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  ];
  const rows = [
    { tipo: 'receita', data: '20/05/2026 14:30', pac: 'Pedro Alves',    cat: 'Consulta',     desc: 'Consulta inicial',  met: 'PIX',    val: 'R$ 350,00' },
    { tipo: 'despesa', data: '19/05/2026 09:10', pac: '—',              cat: 'Material',     desc: 'Compra de insumos', met: 'Boleto', val: 'R$ 180,00' },
    { tipo: 'receita', data: '18/05/2026 16:00', pac: 'Larissa Barros', cat: 'Procedimento', desc: 'Limpeza',           met: 'Cartão', val: 'R$ 220,00' },
    { tipo: 'despesa', data: '17/05/2026 08:00', pac: '—',              cat: 'Salário',      desc: 'Pagamento equipe',  met: 'TED',    val: 'R$ 1.800,00' },
    { tipo: 'receita', data: '16/05/2026 11:20', pac: 'Felipe Costa',   cat: 'Consulta',     desc: 'Retorno',           met: 'PIX',    val: 'R$ 180,00' },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Financeiro</h1>
          <p className={styles.pageSub}>48 lançamentos — todos os períodos</p>
        </div>
        <div className={styles.headActions}>
          <button className={styles.ghostBtn}>⬇ Exportar</button>
          <button className={styles.despesaBtn}>− Despesa</button>
          <button className={styles.receitaBtn}>+ Receita</button>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.finCards}>
          {cards.map((c, i) => (
            <div key={i} className={styles.finCard}>
              <div className={styles.finCardIcon} style={{ background: c.iconBg, color: c.iconColor }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }} strokeLinecap="round">
                  {c.icon.split('M').filter(Boolean).map((seg, j) => <path key={j} d={`M${seg}`} />)}
                </svg>
              </div>
              <div className={styles.finCardBody}>
                <span className={styles.finCardValue} style={c.valueColor ? { color: c.valueColor } : undefined}>{c.value}</span>
                <span className={styles.finCardLabel}>{c.label}</span>
                <div className={styles.finBarTrack}><div className={styles.finBarFill} style={{ width: `${c.pct}%`, background: c.bar }} /></div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Fluxo de caixa — últimos 6 meses</span></div>
          <div style={{ padding: '14px 16px' }}><LineChart /></div>
        </div>

        <div className={styles.section}>
          <div className={styles.finFilters}>
            <div className={styles.pillTabs}>
              <button className={`${styles.pillTab} ${styles.pillTabActive}`}>Todos</button>
              <button className={styles.pillTab}>📈 Receitas</button>
              <button className={styles.pillTab}>📉 Despesas</button>
            </div>
            <div className={styles.pillTabs}>
              <button className={styles.pillTab}>Diário</button>
              <button className={styles.pillTab}>Semanal</button>
              <button className={styles.pillTab}>Mensal</button>
              <button className={`${styles.pillTab} ${styles.pillTabActive}`}>Geral</button>
            </div>
          </div>
          <table className={styles.table}>
            <thead><tr><th>Tipo</th><th>Data</th><th>Paciente</th><th>Categoria</th><th>Descrição</th><th>Método</th><th>Valor</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td><span className={r.tipo === 'receita' ? styles.tagReceita : styles.tagDespesa}>{r.tipo === 'receita' ? '↑ Receita' : '↓ Despesa'}</span></td>
                  <td>{r.data}</td>
                  <td className={styles.bold}>{r.pac}</td>
                  <td>{r.cat}</td>
                  <td>{r.desc}</td>
                  <td>{r.met}</td>
                  <td className={r.tipo === 'receita' ? styles.valuePos : styles.valueNeg}>{r.tipo === 'despesa' ? '−' : '+'}{r.val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   5. RELATÓRIOS
   ════════════════════════════════════════════════════════════════ */
function RelatoriosMock() {
  const kpis = [
    { label: 'Receita total', value: 'R$ 76.200', cls: styles.kpiGreen },
    { label: 'Despesa total', value: 'R$ 28.940', cls: styles.kpiRed },
    { label: 'Lucro líquido', value: 'R$ 47.260', cls: styles.kpiGreen },
    { label: 'Ticket médio',  value: 'R$ 103',    cls: styles.kpiBlue },
  ];
  const months = [
    { month: 'Dez', receita: 'R$ 9.200',  despesa: 'R$ 4.100', lucro: 'R$ 5.100',  margem: 55 },
    { month: 'Jan', receita: 'R$ 11.400', despesa: 'R$ 3.800', lucro: 'R$ 7.600',  margem: 67 },
    { month: 'Fev', receita: 'R$ 10.800', despesa: 'R$ 4.600', lucro: 'R$ 6.200',  margem: 57 },
    { month: 'Mar', receita: 'R$ 12.200', despesa: 'R$ 5.200', lucro: 'R$ 7.000',  margem: 57 },
    { month: 'Abr', receita: 'R$ 13.100', despesa: 'R$ 4.300', lucro: 'R$ 8.800',  margem: 67 },
    { month: 'Mai', receita: 'R$ 12.840', despesa: 'R$ 4.320', lucro: 'R$ 8.520',  margem: 66 },
  ];
  const procs = [
    { name: 'Consulta',     count: 41, fat: 'R$ 14.350', ticket: 'R$ 350' },
    { name: 'Procedimento', count: 22, fat: 'R$ 9.680',  ticket: 'R$ 440' },
    { name: 'Avaliação',    count: 31, fat: 'R$ 6.200',  ticket: 'R$ 200' },
    { name: 'Limpeza',      count: 18, fat: 'R$ 3.240',  ticket: 'R$ 180' },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Relatórios</h1>
          <p className={styles.pageSub}>Análise completa de desempenho da clínica</p>
        </div>
        <div className={styles.headActions}>
          <div className={styles.selectFake}>Últimos 6 meses ▾</div>
          <button className={styles.ghostBtn}>↓ Exportar planilha</button>
        </div>
      </div>
      <div className={styles.relTabs}>
        <button className={`${styles.relTab} ${styles.relTabActive}`}>Financeiro</button>
        <button className={styles.relTab}>Clínico</button>
        <button className={styles.relTab}>Pacientes</button>
        <button className={styles.relTab}>Equipe</button>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.relKpis}>
          {kpis.map(k => (
            <div key={k.label} className={styles.relKpi}>
              <div className={styles.relKpiLabel}>{k.label}</div>
              <div className={`${styles.relKpiValue} ${k.cls}`}>{k.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Receita vs Despesa por mês</span></div>
          <div style={{ padding: '14px 16px' }}><LineChart /></div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Lucro líquido mensal</span></div>
          <table className={styles.table}>
            <thead><tr><th>Mês</th><th>Receita</th><th>Despesa</th><th>Lucro</th><th>Margem</th></tr></thead>
            <tbody>
              {months.map(m => (
                <tr key={m.month}>
                  <td className={styles.bold}>{m.month}</td>
                  <td className={styles.kpiGreen}>{m.receita}</td>
                  <td className={styles.kpiRed}>{m.despesa}</td>
                  <td className={styles.kpiGreen}>{m.lucro}</td>
                  <td><span className={styles.tagGreen}>{m.margem}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Faturamento por procedimento</span></div>
          <table className={styles.table}>
            <thead><tr><th>Procedimento</th><th>Atendimentos</th><th>Faturamento</th><th>Ticket médio</th></tr></thead>
            <tbody>
              {procs.map(p => (
                <tr key={p.name}>
                  <td className={styles.bold}>{p.name}</td>
                  <td>{p.count}</td>
                  <td className={styles.kpiGreen}>{p.fat}</td>
                  <td>{p.ticket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   6. CRM
   ════════════════════════════════════════════════════════════════ */
function CrmMock() {
  const stats = [
    { value: '24', label: 'Total de leads',     color: '#0D2421' },
    { value: '8',  label: 'Agendados',          color: '#0EA5E9' },
    { value: '11', label: 'Concluídos',         color: '#10B981' },
    { value: '5',  label: 'Sem identificação',  color: '#F59E0B' },
  ];
  const cols = [
    { label: 'Novo Lead', color: '#6B7280', cards: [
      { name: 'Beatriz Moura', phone: '(88) 9••••-1234', proc: 'Consulta',  date: '15/05 14:20' },
      { name: 'Roberto Silva', phone: '(88) 9••••-5678', proc: 'Avaliação', date: '16/05 09:05' },
      { name: 'Carla Dias',    phone: '(85) 9••••-9012', proc: 'Retorno',   date: '17/05 18:40' },
    ]},
    { label: 'Agendado', color: '#0EA5E9', cards: [
      { name: 'Lucas Pinto',     phone: '(88) 9••••-3456', proc: 'Procedimento', date: '20/05 10:00', patient: true },
      { name: 'Fernanda Rocha',  phone: '(85) 9••••-7890', proc: 'Consulta',     date: '21/05 15:30' },
    ]},
    { label: 'Concluído', color: '#10B981', cards: [
      { name: 'Tiago Klein', phone: '(88) 9••••-2345', proc: 'Limpeza',  date: '12/05 11:00', patient: true },
      { name: 'Paula Nunes', phone: '(85) 9••••-6789', proc: 'Consulta', date: '14/05 16:15', patient: true },
    ]},
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>CRM — Leads WhatsApp</h1>
          <p className={styles.pageSub}>Contatos captados pelo bot de IA</p>
        </div>
        <button className={styles.ghostBtn}>↻ Atualizar</button>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.crmStats}>
          {stats.map(s => (
            <div key={s.label} className={styles.crmStat}>
              <span className={styles.crmStatVal} style={{ color: s.color }}>{s.value}</span>
              <span className={styles.crmStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.kanban}>
          {cols.map(col => (
            <div key={col.label} className={styles.kanbanCol}>
              <div className={styles.kanbanHead}>
                <span className={styles.kanbanDot} style={{ background: col.color }} />
                <span className={styles.kanbanLabel}>{col.label}</span>
                <span className={styles.kanbanCount}>{col.cards.length}</span>
              </div>
              {col.cards.map(c => (
                <div key={c.name} className={styles.kanbanCard}>
                  <div className={styles.kanbanCardTop}>
                    <div className={styles.kanbanAvatar}>{c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className={styles.kanbanName}>{c.name}</div>
                      <div className={styles.kanbanPhone}>{c.phone}</div>
                    </div>
                    {'patient' in c && c.patient && <span className={styles.badgePatient}>Paciente</span>}
                  </div>
                  <span className={styles.badgeProc}>{c.proc}</span>
                  <span className={styles.kanbanDate}>{c.date}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   7. ESTOQUE
   ════════════════════════════════════════════════════════════════ */
function EstoqueMock() {
  const items = [
    { name: 'Luva de procedimento', cat: 'Descartável', qty: 3,  min: 10, unit: 'caixa', price: 'R$ 28,00', sup: 'MedSupply',  low: true },
    { name: 'Máscara cirúrgica',    cat: 'Descartável', qty: 45, min: 20, unit: 'caixa', price: 'R$ 12,00', sup: 'MedSupply',  low: false },
    { name: 'Seringa 5ml',          cat: 'Material',    qty: 8,  min: 15, unit: 'unid.', price: 'R$ 0,80',  sup: 'BioFarma',   low: true },
    { name: 'Clorexidina 1L',       cat: 'Medicamento', qty: 6,  min: 3,  unit: 'litro', price: 'R$ 42,00', sup: 'FarmaDist',  low: false },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Estoque de Produtos</h1>
          <p className={styles.pageSub}>28 produtos</p>
        </div>
        <button className={styles.primaryBtn}>+ Novo Produto</button>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.crmStats}>
          <div className={styles.crmStat}><span className={styles.crmStatVal}>28</span><span className={styles.crmStatLabel}>Total de produtos</span></div>
          <div className={styles.crmStat}><span className={styles.crmStatVal} style={{ color: '#F59E0B' }}>4</span><span className={styles.crmStatLabel}>Estoque baixo</span></div>
          <div className={styles.crmStat}><span className={styles.crmStatVal} style={{ color: '#059669' }}>R$ 3.240</span><span className={styles.crmStatLabel}>Valor em estoque</span></div>
        </div>

        <div className={styles.estToolbar}>
          <div className={styles.pillTabs}>
            <button className={`${styles.pillTab} ${styles.pillTabActive}`}>Produtos</button>
            <button className={styles.pillTab}>Movimentações</button>
          </div>
          <div className={styles.estFilters}>
            <div className={styles.searchFake}>Buscar produto ou fornecedor...</div>
            <div className={styles.selectFake}>Todas as categorias ▾</div>
            <label className={styles.checkFake}><input type="checkbox" readOnly /> Estoque baixo</label>
          </div>
        </div>

        <div className={styles.section}>
          <table className={styles.table}>
            <thead><tr><th>Nome</th><th>Categoria</th><th>Qtd Atual</th><th>Qtd Mín.</th><th>Unidade</th><th>Preço Custo</th><th>Fornecedor</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map(it => (
                <tr key={it.name}>
                  <td className={styles.bold}>{it.name}{it.low && <span className={styles.lowBadge}>Baixo</span>}</td>
                  <td>{it.cat}</td>
                  <td className={styles.bold} style={{ color: it.low ? '#F59E0B' : undefined }}>{it.qty}</td>
                  <td>{it.min}</td>
                  <td>{it.unit}</td>
                  <td>{it.price}</td>
                  <td>{it.sup}</td>
                  <td>
                    <div className={styles.rowActions}>
                      <span className={styles.entradaBtn}>+ Entrada</span>
                      <span className={styles.saidaBtn}>− Saída</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Gráfico de linha (Receitas vs Despesas) ── */
function LineChart() {
  const months = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  const receitas = [9200, 11400, 10800, 12200, 13100, 12840];
  const despesas = [4100, 3800, 4600, 5200, 4300, 4320];
  const max = 15000;
  const W = 340, H = 90;
  const pad = { top: 8, right: 12, bottom: 4, left: 8 };
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom;
  const grid = [0, 3750, 7500, 11250, 15000];
  const labels = ['R$ 0', 'R$ 3,7k', 'R$ 7,5k', 'R$ 11k', 'R$ 15k'];
  const toX = (i: number) => pad.left + (i / (months.length - 1)) * cw;
  const toY = (v: number) => pad.top + ch - (v / max) * ch;
  const line = (vals: number[]) => vals.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  return (
    <div className={styles.lineChart}>
      <div className={styles.lcLegend}>
        <span className={styles.lcLegendItem}><span className={styles.lcDot} style={{ background: '#4DD9C0' }} />Receitas</span>
        <span className={styles.lcLegendItem}><span className={styles.lcDot} style={{ background: '#EF4444' }} />Despesas</span>
      </div>
      <div className={styles.lcBody}>
        <div className={styles.lcYAxis}>{labels.slice().reverse().map(l => <span key={l} className={styles.lcYLabel}>{l}</span>)}</div>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.lcSvg} preserveAspectRatio="none">
          {grid.map((v, i) => <line key={i} x1={pad.left} y1={toY(v)} x2={W - pad.right} y2={toY(v)} stroke="#E5F5F2" strokeWidth="0.5" />)}
          <polyline points={line(receitas)} fill="none" stroke="#4DD9C0" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
          <polyline points={line(despesas)} fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
          {receitas.map((v, i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="2.5" fill="#4DD9C0" />)}
          {despesas.map((v, i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="2.5" fill="#EF4444" />)}
        </svg>
      </div>
      <div className={styles.lcXAxis}>{months.map(m => <span key={m} className={styles.lcXLabel}>{m}</span>)}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ROOT
   ════════════════════════════════════════════════════════════════ */
export default function Preview() {
  const [active, setActive] = useState('dashboard');
  const [activeSpec, setActiveSpec] = useState<SpecId>('odonto');

  const screen = (() => {
    switch (active) {
      case 'dashboard':  return <DashboardMock />;
      case 'agenda':     return <AgendaMock />;
      case 'prontuario': return <ProntuarioMock spec={activeSpec} />;
      case 'financeiro': return <FinanceiroMock />;
      case 'relatorios': return <RelatoriosMock />;
      case 'crm':        return <CrmMock />;
      case 'estoque':    return <EstoqueMock />;
      default:           return null;
    }
  })();

  return (
    <section className={styles.demoSection} id="demonstracao">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>/ Demonstração</span>
          <h2 className={styles.title}>Veja o sistema em ação</h2>
          <p className={styles.subtitle}>Interface limpa e intuitiva, pensada para o dia a dia da sua clínica.</p>
        </div>

        <div className={styles.tabsRow}>
          {tabs.map(tab => (
            <button key={tab.id} className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`} onClick={() => setActive(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {active === 'prontuario' && (
          <div className={styles.specSelectorRow}>
            <span className={styles.specSelectorLabel}>Especialidade:</span>
            {specOptions.map(s => (
              <button key={s.id} className={`${styles.specBtn} ${activeSpec === s.id ? styles.specBtnActive : ''}`} onClick={() => setActiveSpec(s.id)}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.shell}>
          <Sidebar active={sidebarActive[active]} />
          <div className={styles.content}>{screen}</div>
        </div>
      </div>
    </section>
  );
}
