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
  alert:        'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  cake:         'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C9 2 12 7 12 7z',
  chevronRight: 'M9 18l6-6-6-6',
  check:        'M20 6L9 17l-5-5',
  target:       'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6a6 6 0 100 12 6 6 0 000-12zM12 11a1 1 0 100 2 1 1 0 000-2z',
  download:     'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  arrowUp:      'M12 19V5M5 12l7-7 7 7',
  arrowDown:    'M12 5v14M19 12l-7 7-7-7',
  refresh:      'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15',
  edit:         'M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z',
  trash:        'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6',
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
  const monthly = [
    { month: 'Fev', receita: 9200 },
    { month: 'Mar', receita: 10800 },
    { month: 'Abr', receita: 12200 },
    { month: 'Mai', receita: 11400 },
    { month: 'Jun', receita: 13100 },
    { month: 'Jul', receita: 12840 },
  ];
  const maxReceita = Math.max(...monthly.map(m => m.receita));
  const alerts = [
    { icon: 'alert',    color: '#EF4444', label: 'Faltou',      name: 'Pedro Alves',    date: '15/07/26' },
    { icon: 'cake',     color: '#8B5CF6', label: 'Aniversário', name: 'Larissa Barros', date: 'Hoje' },
    { icon: 'calendar', color: '#F59E0B', label: 'Sem retorno', name: 'Felipe Costa',   date: '30/04/26' },
  ];
  const rows = [
    { name: 'Pedro Alves',    proc: 'Consulta',     date: '20/05/2026 09:00', status: 'confirmado' },
    { name: 'Larissa Barros', proc: 'Retorno',      date: '20/05/2026 10:30', status: 'agendado'   },
    { name: 'Felipe Costa',   proc: 'Avaliação',    date: '20/05/2026 11:00', status: 'confirmado' },
  ];
  const categories = [
    { label: 'Consultas',    value: 'R$ 5.240', pct: 100, color: '#4DD9C0' },
    { label: 'Procedimentos',value: 'R$ 4.180', pct: 80,  color: '#0EA5E9' },
    { label: 'Retornos',     value: 'R$ 2.120', pct: 40,  color: '#8B5CF6' },
    { label: 'Venda produto',value: 'R$ 1.300', pct: 25,  color: '#F59E0B' },
  ];
  const insights = [
    { icon: 'target', color: '#10B981', text: 'Meta do mês batida — você já alcançou 93% do objetivo de faturamento.' },
    { icon: 'finance', color: '#0EA5E9', text: 'Receita 12% acima do mês anterior — melhor performance dos últimos 3 meses.' },
  ];
  const goalPct = 93;
  const RING_R = 40;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOffset = RING_C * (1 - goalPct / 100);

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

        <div className={styles.alertWidget}>
          <div className={styles.alertHeader}>
            <span className={styles.alertHeaderIcon}><NavIcon name="alert" /></span>
            <h2 className={styles.alertTitle}>Ações necessárias</h2>
            <span className={styles.alertCount}>{alerts.length}</span>
            <span className={styles.alertCollapseBtn}><NavIcon name="chevronRight" /></span>
          </div>
          <div className={styles.alertList}>
            {alerts.map(a => (
              <div key={a.name} className={styles.alertItem}>
                <span className={styles.alertBadge} style={{ background: `${a.color}1a`, color: a.color }}>
                  <NavIcon name={a.icon} /> {a.label}
                </span>
                <div className={styles.alertInfo}>
                  <span className={styles.alertName}>{a.name}</span>
                  <span className={styles.alertDate}>{a.date}</span>
                </div>
                <div className={styles.alertActions}>
                  <span className={styles.alertBtnWa}>WhatsApp</span>
                  <span className={styles.alertBtnIgnore}>Ignorar</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bento}>
          <article className={styles.heroCard}>
            <div className={styles.cardHead}><span className={styles.eyebrow}>Financeiro do mês</span></div>
            <div className={styles.heroRow}>
              <span className={styles.heroValue}>R$ 12.840,00</span>
              <span className={`${styles.delta} ${styles.deltaUp}`}>▲ 12%<span className={styles.deltaRef}>vs. mês anterior</span></span>
            </div>
            <div className={styles.spark}>
              {monthly.map((m, i) => (
                <span
                  key={m.month}
                  className={i === monthly.length - 1 ? styles.sparkOn : ''}
                  style={{ height: `${Math.max(6, Math.round((m.receita / maxReceita) * 100))}%` }}
                />
              ))}
            </div>
            <div className={styles.sparkAxis}>{monthly.map(m => <span key={m.month}>{m.month}</span>)}</div>
            <div className={styles.subGrid}>
              <div>
                <div className={styles.subMetric}>R$ 4.320,00</div>
                <div className={styles.subLabel}>Despesas</div>
              </div>
              <div>
                <div className={`${styles.subMetric} ${styles.subAccent}`}>R$ 8.520,00</div>
                <div className={styles.subLabel}>Lucro líquido</div>
              </div>
              <div>
                <div className={styles.subMetric}>R$ 285,00</div>
                <div className={styles.subLabel}>Ticket médio</div>
              </div>
            </div>
          </article>

          <div className={styles.metaCard}>
            <div className={styles.cardHead}>
              <span className={styles.eyebrow}>Meta do mês</span>
              <span className={styles.metaEdit}>Editar <NavIcon name="chevronRight" /></span>
            </div>
            <div className={styles.ring}>
              <svg width="96" height="96" viewBox="0 0 96 96">
                <circle className={styles.ringTrack} cx="48" cy="48" r={RING_R} fill="none" strokeWidth="9" />
                <circle
                  className={styles.ringFill}
                  cx="48" cy="48" r={RING_R} fill="none" strokeWidth="9"
                  strokeDasharray={RING_C} strokeDashoffset={ringOffset} strokeLinecap="round"
                  transform="rotate(-90 48 48)" stroke="url(#previewGoalGrad)"
                />
                <defs>
                  <linearGradient id="previewGoalGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4DD9C0" /><stop offset="1" stopColor="#0B9B85" />
                  </linearGradient>
                </defs>
              </svg>
              <div className={styles.ringPct}><b>{goalPct}%</b><small>da meta</small></div>
            </div>
            <div className={styles.metaFig}>R$ 12.840,00 <span className={styles.metaOf}>de R$ 13.800,00</span></div>
            <div className={styles.metaPace}>
              <span className={styles.pacePill} style={{ background: '#10B981' }} />
              No ritmo — faltam R$ 960,00 em 8 dia(s)
            </div>
          </div>
        </div>

        <div className={styles.opsStrip}>
          <div className={styles.opsCell}>
            <span className={styles.cellVal}>147</span>
            <span className={styles.cellLabel}>Pacientes ativos</span>
          </div>
          <div className={styles.opsCell}>
            <span className={styles.cellVal}>12</span>
            <span className={styles.cellLabel}>Consultas hoje</span>
          </div>
          <div className={styles.opsCell}>
            <span className={styles.cellVal}>18</span>
            <span className={styles.cellLabel}>Novos este mês</span>
          </div>
          <div className={styles.opsCell}>
            <span className={styles.cellSplit}><b>34</b><span className={styles.cellSep}>/</span><b className={styles.cellWarn}>8</b></span>
            <span className={styles.cellLabel}>Concluídos / em aberto</span>
          </div>
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

        <div className={styles.chartsGrid}>
          <div className={styles.section}>
            <div className={styles.sectionHead}><span className={styles.sectionTitle}>Receitas vs Despesas — 6 meses</span></div>
            <div className={styles.chartPad}><LineChart /></div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionHead}><span className={styles.sectionTitle}>Receita por categoria</span></div>
            <div className={styles.chartPad}>
              <div className={styles.catList}>
                {categories.map(c => (
                  <div key={c.label} className={styles.catRow}>
                    <span className={styles.catLabel}>{c.label}</span>
                    <div className={styles.catBarTrack}><div className={styles.catBarFill} style={{ width: `${c.pct}%`, background: c.color }} /></div>
                    <span className={styles.catValue}>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.insightsCard}>
          <h2 className={styles.insightsTitle}>Conclusões &amp; Dicas</h2>
          <div className={styles.insightsList}>
            {insights.map((ins, i) => (
              <div key={i} className={styles.insightItem}>
                <span className={styles.insightIcon} style={{ background: `${ins.color}1a`, color: ins.color }}>
                  <NavIcon name={ins.icon} />
                </span>
                <p className={styles.insightText}>{ins.text}</p>
              </div>
            ))}
          </div>
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
          <button className={`${styles.agSegBtn} ${styles.agSegActive}`}>Mês</button>
          <button className={styles.agSegBtn}>Semana</button>
          <button className={styles.agSegBtn}>Dia</button>
        </div>
        <div className={styles.agRight}>
          <div className={styles.profFilters}>
            {[['DB', '#4DD9C0'], ['DE', '#0B9B85'], ['DS', '#127C9A']].map(([initials, color]) => (
              <span key={initials} className={styles.profAvatar} style={{ background: color }}>{initials}</span>
            ))}
          </div>
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
/* ── Tooth anatomy (mirrored from TabOdontograma) ── */
const ODONTO_UPPER = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const ODONTO_LOWER = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
type DTT = 'ci'|'li'|'ca'|'pm1'|'pm2'|'mo1'|'mo2'|'wi'
interface DTA { crown:string; root:string; incisal?:string; grooves?:string; shadow?:string }
function dtt(num:number): DTT {
  const p = num%10; if(p===1) return 'ci'; if(p===2) return 'li'; if(p===3) return 'ca';
  if(p===4) return 'pm1'; if(p===5) return 'pm2'; if(p===6) return 'mo1'; if(p===7) return 'mo2'; return 'wi';
}
const DUA: Record<DTT, DTA> = {
  ci:  { crown:'M 8,7 C 7,3 11,1 28,1 C 45,1 49,3 48,7 C 48,20 46,38 44,46 C 42,51 36,54 28,54 C 20,54 14,51 12,46 C 10,38 8,20 8,7 Z', shadow:'M 12,9 C 11,5 14,4 28,4 C 42,4 45,5 44,9 C 44,20 42,38 40,45 C 38,49 33,52 28,52 C 23,52 18,49 16,45 C 12,38 12,20 12,9 Z', root:'M 15,54 C 12,65 14,76 28,86 C 42,76 44,65 41,54 Z', incisal:'M 8,7 C 7,3 11,1 28,1 C 45,1 49,3 48,7 L 46,24 C 38,18 18,18 10,24 Z', grooves:'M 20,14 C 22,10 26,8 28,8 C 30,8 34,10 36,14' },
  li:  { crown:'M 12,8 C 11,3 14,1 28,1 C 42,1 45,3 44,8 C 44,20 42,36 40,45 C 38,50 33,53 28,53 C 23,53 18,50 16,45 C 14,36 12,20 12,8 Z', shadow:'M 15,10 C 14,6 17,4 28,4 C 39,4 42,6 41,10 C 41,20 39,36 37,44 C 35,48 31,51 28,51 C 25,51 21,48 19,44 C 17,36 15,20 15,10 Z', root:'M 16,53 C 14,64 15,75 28,84 C 41,75 42,64 40,53 Z', incisal:'M 12,8 C 11,3 14,1 28,1 C 42,1 45,3 44,8 L 42,22 C 36,17 20,17 14,22 Z' },
  ca:  { crown:'M 10,16 C 9,7 14,1 28,1 C 42,1 47,7 46,16 C 46,26 44,40 42,48 C 40,53 35,56 28,56 C 21,56 16,53 14,48 C 12,40 10,26 10,16 Z', shadow:'M 14,17 C 13,9 17,4 28,4 C 39,4 43,9 42,17 C 42,26 40,39 38,47 C 36,51 32,54 28,54 C 24,54 20,51 18,47 C 16,39 14,26 14,17 Z', root:'M 14,56 C 11,67 13,79 28,90 C 43,79 45,67 42,56 Z', incisal:'M 10,16 C 9,7 14,1 28,1 C 42,1 47,7 46,16 L 44,26 C 38,19 18,19 12,26 Z', grooves:'M 28,4 L 28,48' },
  pm1: { crown:'M 10,8 L 17,1 L 28,5 L 39,1 L 46,8 L 45,38 C 44,46 37,50 28,50 C 19,50 12,46 11,38 Z', shadow:'M 14,10 L 19,4 L 28,8 L 37,4 L 42,10 L 41,37 C 40,44 34,47 28,47 C 22,47 16,44 15,37 Z', root:'M 12,50 C 9,57 8,66 13,74 Q 18,80 21,74 Q 23,66 28,63 Q 33,66 35,74 Q 38,80 43,74 C 48,66 47,57 44,50 Z', grooves:'M 28,8 L 28,44' },
  pm2: { crown:'M 11,8 L 17,1 L 28,5 L 39,1 L 45,8 L 44,38 C 43,46 37,50 28,50 C 19,50 13,46 12,38 Z', shadow:'M 15,10 L 19,4 L 28,8 L 37,4 L 41,10 L 40,37 C 39,44 34,47 28,47 C 22,47 17,44 16,37 Z', root:'M 14,50 C 11,61 12,73 28,83 C 44,73 45,61 42,50 Z', grooves:'M 28,8 L 28,44' },
  mo1: { crown:'M 4,9 L 13,1 L 21,5 L 28,3 L 35,5 L 43,1 L 52,9 L 51,37 C 50,46 40,50 28,50 C 16,50 6,46 5,37 Z', shadow:'M 8,11 L 15,4 L 22,8 L 28,6 L 34,8 L 41,4 L 48,11 L 47,36 C 46,44 38,47 28,47 C 18,47 10,44 9,36 Z', root:'M 6,50 C 4,58 3,68 8,76 Q 13,82 17,75 Q 21,67 26,65 Q 28,67 30,65 Q 35,67 39,75 Q 43,82 48,76 C 53,68 52,58 50,50 Z', grooves:'M 28,5 L 28,44 M 17,10 Q 20,7 23,10 M 33,10 Q 36,7 39,10' },
  mo2: { crown:'M 6,9 L 14,1 L 22,5 L 28,3 L 34,5 L 42,1 L 50,9 L 49,37 C 48,45 39,50 28,50 C 17,50 8,45 7,37 Z', shadow:'M 10,11 L 16,4 L 23,8 L 28,6 L 33,8 L 40,4 L 46,11 L 45,36 C 44,43 37,47 28,47 C 19,47 12,43 11,36 Z', root:'M 8,50 C 6,58 5,67 10,75 Q 15,81 19,74 Q 22,66 28,64 Q 34,66 37,74 Q 41,81 46,75 C 51,67 50,58 48,50 Z', grooves:'M 28,5 L 28,44' },
  wi:  { crown:'M 11,10 C 11,3 16,0 28,0 C 40,0 45,3 45,10 L 44,34 C 43,44 37,48 28,48 C 19,48 13,44 12,34 Z', shadow:'M 15,12 C 15,6 19,3 28,3 C 37,3 41,6 41,12 L 40,33 C 39,42 34,45 28,45 C 22,45 17,42 16,33 Z', root:'M 13,48 C 10,59 12,71 28,82 C 44,71 46,59 43,48 Z' },
}
const DLA: Record<DTT, DTA> = {
  ci:  { crown:'M 13,7 C 12,3 15,1 28,1 C 41,1 44,3 43,7 C 43,20 41,35 39,43 C 37,49 33,52 28,52 C 23,52 19,49 17,43 C 15,35 13,20 13,7 Z', shadow:'M 16,9 C 15,5 18,3 28,3 C 38,3 41,5 40,9 C 40,20 38,34 36,42 C 34,47 31,50 28,50 C 25,50 22,47 20,42 C 18,34 16,20 16,9 Z', root:'M 18,52 C 15,63 17,74 28,83 C 39,74 41,63 38,52 Z', incisal:'M 13,7 C 12,3 15,1 28,1 C 41,1 44,3 43,7 L 41,22 C 35,17 21,17 15,22 Z' },
  li:  { crown:'M 12,8 C 11,3 14,1 28,1 C 42,1 45,3 44,8 C 44,20 42,35 40,43 C 38,49 34,52 28,52 C 22,52 18,49 16,43 C 14,35 12,20 12,8 Z', shadow:'M 15,10 C 14,6 17,4 28,4 C 39,4 42,6 41,10 C 41,20 39,34 37,42 C 35,47 32,50 28,50 C 24,50 21,47 19,42 C 17,34 15,20 15,10 Z', root:'M 17,52 C 14,63 15,74 28,83 C 41,74 42,63 39,52 Z', incisal:'M 12,8 C 11,3 14,1 28,1 C 42,1 45,3 44,8 L 42,22 C 36,17 20,17 14,22 Z' },
  ca:  { crown:'M 11,14 C 10,6 14,1 28,1 C 42,1 46,6 45,14 C 45,25 43,38 41,47 C 39,52 34,55 28,55 C 22,55 17,52 15,47 C 13,38 11,25 11,14 Z', shadow:'M 15,15 C 14,8 17,4 28,4 C 39,4 42,8 41,15 C 41,25 39,37 37,45 C 35,50 32,53 28,53 C 24,53 21,50 19,45 C 17,37 15,25 15,15 Z', root:'M 15,55 C 12,66 13,78 28,88 C 43,78 44,66 41,55 Z', incisal:'M 11,14 C 10,6 14,1 28,1 C 42,1 46,6 45,14 L 43,24 C 37,18 19,18 13,24 Z' },
  pm1: { crown:'M 11,9 L 18,1 L 28,5 L 38,1 L 45,9 L 44,37 C 43,45 37,49 28,49 C 19,49 13,45 12,37 Z', shadow:'M 15,11 L 20,4 L 28,8 L 36,4 L 41,11 L 40,36 C 39,43 34,46 28,46 C 22,46 17,43 16,36 Z', root:'M 14,49 C 11,60 12,72 28,81 C 44,72 45,60 42,49 Z' },
  pm2: { crown:'M 11,9 L 17,1 L 28,5 L 39,1 L 45,9 L 44,37 C 43,45 37,49 28,49 C 19,49 13,45 12,37 Z', shadow:'M 15,11 L 19,4 L 28,8 L 37,4 L 41,11 L 40,36 C 39,43 34,46 28,46 C 22,46 17,43 16,36 Z', root:'M 14,49 C 11,60 12,72 28,81 C 44,72 45,60 42,49 Z', grooves:'M 28,8 L 28,43' },
  mo1: { crown:'M 5,9 L 13,1 L 21,5 L 28,2 L 35,5 L 43,1 L 51,9 L 50,36 C 49,45 40,49 28,49 C 16,49 7,45 6,36 Z', shadow:'M 9,11 L 15,4 L 22,8 L 28,5 L 34,8 L 41,4 L 47,11 L 46,35 C 45,43 38,46 28,46 C 18,46 11,43 10,35 Z', root:'M 7,49 C 5,57 4,67 9,75 Q 14,81 18,74 Q 22,66 28,64 Q 34,66 38,74 Q 42,81 47,75 C 52,67 51,57 49,49 Z', grooves:'M 15,8 L 15,40 M 28,3 L 28,42 M 41,8 L 41,40' },
  mo2: { crown:'M 7,9 L 14,1 L 22,5 L 28,3 L 34,5 L 42,1 L 49,9 L 48,36 C 47,44 39,49 28,49 C 17,49 9,44 8,36 Z', shadow:'M 11,11 L 16,4 L 23,8 L 28,6 L 33,8 L 40,4 L 45,11 L 44,35 C 43,43 37,46 28,46 C 19,46 13,43 12,35 Z', root:'M 9,49 C 7,57 6,67 11,74 Q 15,80 19,73 Q 23,65 28,63 Q 33,65 37,73 Q 41,80 45,74 C 50,67 49,57 47,49 Z', grooves:'M 28,5 L 28,43' },
  wi:  { crown:'M 10,10 C 10,3 15,0 28,0 C 41,0 46,3 46,10 L 45,33 C 44,43 38,47 28,47 C 18,47 12,43 11,33 Z', shadow:'M 14,12 C 14,6 18,3 28,3 C 38,3 42,6 42,12 L 41,32 C 40,41 35,44 28,44 C 21,44 16,41 15,32 Z', root:'M 12,47 C 9,58 11,70 28,81 C 45,70 47,58 44,47 Z' },
}
function dStatusColor(k:string) { return TOOTH_STATUS.find(s=>s.key===k)?.color ?? '#10b981' }

function DemoToothSVG({ num, status }: { num: number; status: string }) {
  const upper = num >= 11 && num <= 28
  const { crown, shadow, root, incisal, grooves } = (upper ? DUA : DLA)[dtt(num)]
  const absent = status === 'ausente'
  const g = `d${num}`
  return (
    <div className={styles.toothBtn}>
      <svg viewBox="0 0 56 96" className={styles.toothSvg} style={{ transform: upper ? 'scaleY(-1)' : 'none' }}>
        <defs>
          <radialGradient id={`dt${g}`} cx="42%" cy="38%" r="62%" fx="42%" fy="30%">
            <stop offset="0%" stopColor="#D4935A"/><stop offset="28%" stopColor="#C07A38"/><stop offset="60%" stopColor="#A05E20"/><stop offset="100%" stopColor="#7A4010"/>
          </radialGradient>
          <linearGradient id={`en${g}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C7E66" stopOpacity="0.96"/><stop offset="10%" stopColor="#C4B898" stopOpacity="0.91"/><stop offset="35%" stopColor="#F5F0E6" stopOpacity="0.86"/><stop offset="60%" stopColor="#EDE4CC" stopOpacity="0.89"/><stop offset="88%" stopColor="#C0B090" stopOpacity="0.93"/><stop offset="100%" stopColor="#8C7E66" stopOpacity="0.96"/>
          </linearGradient>
          <linearGradient id={`ro${g}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5A3818"/><stop offset="22%" stopColor="#8A5A28"/><stop offset="50%" stopColor="#A06830"/><stop offset="78%" stopColor="#7A4C20"/><stop offset="100%" stopColor="#5A3818"/>
          </linearGradient>
          <linearGradient id={`ic${g}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6898B8" stopOpacity="0.60"/><stop offset="35%" stopColor="#88B0CC" stopOpacity="0.22"/><stop offset="75%" stopColor="#AACCE0" stopOpacity="0.05"/><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id={`cv${g}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#9A6020" stopOpacity="0.40"/><stop offset="22%" stopColor="#B87838" stopOpacity="0.15"/><stop offset="55%" stopColor="#D09050" stopOpacity="0.03"/><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id={`ms${g}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(30,18,8,0.22)"/><stop offset="16%" stopColor="rgba(30,18,8,0)"/><stop offset="84%" stopColor="rgba(30,18,8,0)"/><stop offset="100%" stopColor="rgba(30,18,8,0.18)"/>
          </linearGradient>
          <linearGradient id={`ls${g}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(20,12,4,0.14)"/><stop offset="30%" stopColor="rgba(20,12,4,0)"/><stop offset="100%" stopColor="rgba(20,12,4,0)"/>
          </linearGradient>
          <radialGradient id={`sp${g}`} cx="43%" cy="23%" r="26%" fx="43%" fy="16%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/><stop offset="28%" stopColor="rgba(255,255,255,0.60)"/><stop offset="65%" stopColor="rgba(255,255,255,0.15)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
          {!absent && status !== 'higido' && (
            <radialGradient id={`st${g}`} cx="50%" cy="45%" r="58%">
              <stop offset="0%" stopColor={dStatusColor(status)} stopOpacity="0.55"/>
              <stop offset="60%" stopColor={dStatusColor(status)} stopOpacity="0.32"/>
              <stop offset="100%" stopColor={dStatusColor(status)} stopOpacity="0.18"/>
            </radialGradient>
          )}
        </defs>
        {absent ? (
          <path d={root} fill="#C0BAA8" stroke="#988C7C" strokeWidth="0.7" strokeDasharray="3,2"/>
        ) : (
          <path d={root} fill={`url(#ro${g})`} stroke="#4E2E0C" strokeWidth="0.9"/>
        )}
        {absent ? (
          <>
            <path d={crown} fill="#DDDBD2" stroke="#B8B0A8" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7"/>
            <line x1="15" y1="8" x2="41" y2="44" stroke="#A8A098" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <line x1="41" y1="8" x2="15" y2="44" stroke="#A8A098" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          </>
        ) : (
          <>
            {shadow ? <path d={shadow} fill={`url(#dt${g})`}/> : <path d={crown} fill={`url(#dt${g})`} opacity="0.92"/>}
            <path d={crown} fill={`url(#en${g})`} stroke="#A09070" strokeWidth="1.2" strokeLinejoin="round"/>
            {incisal && <path d={incisal} fill={`url(#ic${g})`}/>}
            <path d={crown} fill={`url(#cv${g})`}/>
            <path d={crown} fill={`url(#ms${g})`}/>
            <path d={crown} fill={`url(#ls${g})`}/>
            {status !== 'higido' && <path d={crown} fill={`url(#st${g})`}/>}
            {grooves && <path d={grooves} fill="none" stroke="#6A5840" strokeWidth="0.9" strokeLinecap="round" opacity="0.50"/>}
            <path d={crown} fill={`url(#sp${g})`}/>
          </>
        )}
      </svg>
      <span className={styles.toothNumber}>{num}</span>
    </div>
  )
}

function OdontogramaMock() {
  const states: Record<number, string> = { 36: 'cariado', 46: 'cariado', 17: 'ausente', 27: 'implante', 11: 'restaurado', 22: 'coroa', 14: 'tratamento', 38: 'selante', 26: 'fraturado' };
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
      <div className={styles.odontoArcade}>
        <div className={styles.odontoArchLabel}>Superior</div>
        <div className={styles.odontoTeethRow}>
          {ODONTO_UPPER.map(n => <DemoToothSVG key={n} num={n} status={states[n] ?? 'higido'} />)}
        </div>
        <div className={styles.odontoMidline}/>
        <div className={styles.odontoTeethRow}>
          {ODONTO_LOWER.map(n => <DemoToothSVG key={n} num={n} status={states[n] ?? 'higido'} />)}
        </div>
        <div className={styles.odontoArchLabel}>Inferior</div>
      </div>
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

/* ── Evolução — linha do tempo de atendimentos ── */
function TimelineMock({ firstName }: { firstName: string }) {
  const items = [
    { date: '15/05/2026 09:40', author: 'Dra. Camila Rocha', text: `${firstName} retornou para avaliação de rotina. Sem queixas relevantes — orientações de manutenção reforçadas.` },
    { date: '02/05/2026 14:15', author: 'Dra. Camila Rocha', text: 'Procedimento realizado conforme plano de tratamento. Paciente tolerou bem, sem intercorrências.' },
    { date: '18/04/2026 10:00', author: 'Recepção · WhatsApp', text: 'Confirmação automática enviada e recebida — consulta remarcada a pedido do paciente.' },
    { date: '05/04/2026 16:30', author: 'Dra. Camila Rocha', text: 'Primeira consulta. Anamnese completa e exame clínico realizados. Plano de tratamento iniciado.' },
  ];
  return (
    <div className={styles.timeline}>
      {items.map((it, i) => (
        <div key={i} className={styles.timelineItem}>
          <div className={styles.timelineRail}>
            <span className={styles.timelineDot} />
            {i < items.length - 1 && <span className={styles.timelineLine} />}
          </div>
          <div className={styles.timelineBody}>
            <div className={styles.timelineTop}>
              <span className={styles.timelineDate}>{it.date}</span>
              <span className={styles.timelineAuthor}>{it.author}</span>
            </div>
            <p className={styles.timelineText}>{it.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Documentos — receitas, atestados, exames ── */
function DocumentosMock() {
  const docs = [
    { name: 'Atestado médico.pdf', meta: '15/05/2026 · 128 KB', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M9 13h6 M9 17h6' },
    { name: 'Receituário — controle contínuo.pdf', meta: '15/05/2026 · 96 KB', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M9 13h6 M9 17h6' },
    { name: 'Termo de consentimento.pdf', meta: '05/04/2026 · 210 KB', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M9 13h6 M9 17h6' },
    { name: 'Exame complementar.jpg', meta: '02/05/2026 · 1.4 MB', icon: 'M3 3h18v18H3z M8.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z M21 15l-5-5L5 21' },
  ];
  return (
    <div className={styles.docList}>
      {docs.map((d, i) => (
        <div key={i} className={styles.docItem}>
          <div className={styles.docIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {d.icon.split(' M').map((seg, j) => <path key={j} d={j === 0 ? seg : `M${seg}`} />)}
            </svg>
          </div>
          <div className={styles.docBody}>
            <div className={styles.docName}>{d.name}</div>
            <div className={styles.docMeta}>{d.meta}</div>
          </div>
          <div className={styles.docDownload}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Chat IA — histórico de conversa via WhatsApp ── */
function ChatMock({ firstName }: { firstName: string }) {
  const msgs = [
    { out: true,  text: `Olá, ${firstName}! 👋 Aqui é a assistente virtual da Clínica Saúde+. Tudo bem?`, time: '09:12' },
    { out: false, text: 'Oi! Tudo sim, queria remarcar minha consulta de amanhã', time: '09:14' },
    { out: true,  text: 'Claro! Encontrei seu agendamento de 21/05 às 09:00. Para qual data você prefere remarcar?', time: '09:14' },
    { out: false, text: 'Pode ser sexta, dia 23, de manhã?', time: '09:15' },
    { out: true,  text: 'Perfeito ✅ Reagendei para 23/05 às 09:30. Você vai receber um lembrete 24h antes. Precisa de mais alguma coisa?', time: '09:15' },
    { out: false, text: 'Não, obrigado!', time: '09:16' },
    { out: true,  text: 'Disponha! Qualquer coisa é só chamar 💙', time: '09:16' },
  ];
  const initials = firstName.slice(0, 2).toUpperCase();
  return (
    <div className={styles.chatWrap}>
      <div className={styles.chatHeader}>
        <div className={styles.chatAvatar}>{initials}</div>
        <div className={styles.chatHeaderInfo}>
          <span className={styles.chatHeaderName}>{firstName} · WhatsApp</span>
          <span className={styles.chatHeaderStatus}>IA conectada</span>
        </div>
      </div>
      <div className={styles.chatBody}>
        {msgs.map((m, i) => (
          <div key={i} className={`${styles.chatRow} ${m.out ? styles.chatRowOut : styles.chatRowIn}`}>
            <div className={styles.chatBubble}>{m.text}</div>
            <span className={styles.chatTime}>{m.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProntuarioMock({ spec }: { spec: SpecId }) {
  const data = specData[spec];
  const initials = data.patient.replace(/\(.*\)/, '').trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const firstName = data.patient.replace(/\(.*\)/, '').trim().split(' ')[0];
  const tabList = [
    { key: 'ficha', label: 'Ficha Clínica' },
    ...(spec === 'odonto' ? [{ key: 'odontograma', label: 'Odontograma' }] : []),
    ...(spec === 'estetica' ? [{ key: 'faceograma', label: 'Faceograma' }] : []),
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
        {activeTab === 'timeline' && <TimelineMock firstName={firstName} />}
        {activeTab === 'documentos' && <DocumentosMock />}
        {activeTab === 'chat' && <ChatMock firstName={firstName} />}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. FINANCEIRO
   ════════════════════════════════════════════════════════════════ */
function FinanceiroMock() {
  const cards = [
    { value: 'R$ 12.840,00', label: 'Receitas',   bar: 'linear-gradient(to right, #4DD9C0, #0B9B85)', pct: 100 },
    { value: 'R$ 4.320,00',  label: 'Despesas',   bar: 'linear-gradient(to right, #FCA5A5, #EF4444)', pct: 34 },
    { value: 'R$ 8.520,00',  label: 'Saldo',      bar: 'linear-gradient(to right, #4DD9C0, #0B9B85)', pct: 66, valueColor: '#059669' },
    { value: '48',           label: 'Lançamentos',bar: 'linear-gradient(to right, #60A5FA, #2563EB)', pct: 80 },
  ];
  const rows = [
    { tipo: 'receita', data: '20/05/2026 14:30', pac: 'Pedro Alves',    cat: 'Consulta',     desc: 'Consulta inicial',  met: 'PIX',    val: 'R$ 350,00' },
    { tipo: 'despesa', data: '19/05/2026 09:10', pac: '—',              cat: 'Material',     desc: 'Compra de insumos', met: 'Boleto', val: 'R$ 180,00' },
    { tipo: 'receita', data: '18/05/2026 16:00', pac: 'Larissa Barros', cat: 'Procedimento', desc: 'Limpeza',           met: 'Cartão', val: 'R$ 220,00' },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>Financeiro</h1>
          <p className={styles.pageSub}>48 lançamentos — todos os períodos</p>
        </div>
        <div className={styles.headActions}>
          <button className={styles.ghostBtn}><NavIcon name="download" /> Exportar</button>
          <button className={styles.despesaBtn}>− Despesa</button>
          <button className={styles.receitaBtn}>+ Receita</button>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.finCards}>
          {cards.map((c, i) => (
            <div key={i} className={styles.finCard}>
              <div className={styles.finCardBody}>
                <span className={styles.finCardValue} style={c.valueColor ? { color: c.valueColor } : undefined}>{c.value}</span>
                <span className={styles.finCardLabel}>{c.label}</span>
                <div className={styles.finBarTrack}><div className={styles.finBarFill} style={{ width: `${c.pct}%`, background: c.bar }} /></div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.finFilters}>
            <div className={styles.pillTabs}>
              <button className={`${styles.pillTab} ${styles.pillTabActive}`}>Todos</button>
              <button className={styles.pillTab}>Receitas</button>
              <button className={styles.pillTab}>Despesas</button>
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
                  <td><span className={r.tipo === 'receita' ? styles.tagReceita : styles.tagDespesa}><NavIcon name={r.tipo === 'receita' ? 'arrowUp' : 'arrowDown'} /> {r.tipo === 'receita' ? 'Receita' : 'Despesa'}</span></td>
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
    { month: 'Fev', receita: 'R$ 10.800', despesa: 'R$ 4.600', lucro: 'R$ 6.200',  margem: 57 },
    { month: 'Mar', receita: 'R$ 12.200', despesa: 'R$ 5.200', lucro: 'R$ 7.000',  margem: 57 },
    { month: 'Abr', receita: 'R$ 13.100', despesa: 'R$ 4.300', lucro: 'R$ 8.800',  margem: 67 },
    { month: 'Mai', receita: 'R$ 12.840', despesa: 'R$ 4.320', lucro: 'R$ 8.520',  margem: 66 },
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
          <button className={styles.ghostBtn}><NavIcon name="download" /> Exportar planilha</button>
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
        <button className={styles.ghostBtn}><NavIcon name="refresh" /> Atualizar</button>
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
                      <span className={styles.rowIconBtn}><NavIcon name="edit" /></span>
                      <span className={styles.rowIconBtn}><NavIcon name="trash" /></span>
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

        <div className={styles.browserFrame}>
          <div className={styles.browserBar}>
            <div className={styles.browserDots}>
              <span className={styles.browserDot} />
              <span className={styles.browserDot} />
              <span className={styles.browserDot} />
            </div>
            <div className={styles.browserUrlWrap}>
              <div className={styles.browserUrl}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
                </svg>
                app.myclinica.com.br/{active}
              </div>
            </div>
            <div className={styles.browserActions}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6M1 20v-6h6" /><path d="M20.49 9A9 9 0 105.64 18.36L1 20M23 4l-4.64 4.64" />
              </svg>
            </div>
          </div>
          <div className={styles.shell}>
            <Sidebar active={sidebarActive[active]} />
            <div className={styles.content}>{screen}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
