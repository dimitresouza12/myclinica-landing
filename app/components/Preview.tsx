'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Preview.module.css';

const tabs = [
  { id: 'dashboard',  label: '📊 Dashboard' },
  { id: 'agenda',     label: '📅 Agenda' },
  { id: 'crm',        label: '💬 CRM' },
  { id: 'prontuario', label: '📋 Prontuário' },
  { id: 'financeiro', label: '💰 Financeiro' },
  { id: 'estoque',    label: '📦 Estoque' },
];

const navItems = [
  { label: 'Dashboard',      icon: '⊞' },
  { label: 'Pacientes',      icon: '👥' },
  { label: 'Agenda',         icon: '📅' },
  { label: 'Financeiro',     icon: '💰' },
  { label: 'Estoque',        icon: '📦' },
  { label: 'Equipe',         icon: '👤' },
  { label: 'CRM',            icon: '💬' },
  { label: 'Configurações',  icon: '⚙' },
];

const sidebarIndex: Record<string, number> = {
  dashboard:  0,
  pacientes:  1,
  agenda:     2,
  financeiro: 3,
  estoque:    4,
  equipe:     5,
  crm:        6,
  prontuario: 1,
};

function Sidebar({ activeIndex }: { activeIndex: number }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <div className={styles.brandTop}>
          <Image src="/favicon.svg" alt="MyClínica" width={26} height={26} style={{ borderRadius: 6 }} />
          <span className={styles.logoText}>My<strong>Clínica</strong></span>
        </div>
        <span className={styles.clinicName}>Clínica Saúde+</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item, i) => (
          <div key={item.label} className={`${styles.navItem} ${i === activeIndex ? styles.active : ''}`}>
            <span className={styles.navIcon}>{item.icon}</span>
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

function KpiCard({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIconWrap} style={{ background: accent + '22' }}>
        <span style={{ fontSize: '1rem' }}>{icon}</span>
      </div>
      <div>
        <div className={styles.cardValue}>{value}</div>
        <div className={styles.cardLabel}>{label}</div>
      </div>
    </div>
  );
}

function DashboardMock() {
  const rows = [
    { name: 'Pedro A.',   proc: 'Consulta',       date: '20/05  09:00', sc: '#065F46', sb: '#ECFDF5', status: 'Confirmado' },
    { name: 'Larissa B.', proc: 'Retorno',         date: '20/05  10:30', sc: '#1e3a8a', sb: '#EEF2FF', status: 'Agendado'   },
    { name: 'Felipe C.',  proc: 'Avaliação',       date: '20/05  11:00', sc: '#065F46', sb: '#ECFDF5', status: 'Confirmado' },
    { name: 'Mariana D.', proc: 'Procedimento',    date: '20/05  14:00', sc: '#92400E', sb: '#FFFBEB', status: 'Pendente'   },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Boa tarde, Administrador</div>
          <div className={styles.pageSub}>Terça-feira, 20 de maio de 2026</div>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.cards}>
          <KpiCard label="Pacientes ativos"  value="147"        icon="👥" accent="#0D9488" />
          <KpiCard label="Consultas hoje"    value="12"         icon="📅" accent="#6366f1" />
          <KpiCard label="Agendamentos"      value="8"          icon="⏰" accent="#8b5cf6" />
          <KpiCard label="Receita do mês"    value="R$ 8.400"   icon="💰" accent="#f59e0b" />
        </div>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Próximos agendamentos</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Procedimento</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name}>
                  <td className={styles.bold}>{r.name}</td>
                  <td>{r.proc}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ color: r.sc, background: r.sb }}>
                      {r.status}
                    </span>
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

function AgendaMock() {
  const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  const weeks = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  const dates = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
  ];
  const events: Record<number, string[]> = {
    6:  ['09:00 Pedro A.', '14:00 Larissa B.'],
    7:  ['10:30 Felipe C.'],
    8:  ['09:00 Mariana D.', '11:00 Renato E.'],
    13: ['14:00 Sônia F.'],
    14: ['09:30 Bruno G.', '16:00 Carla H.'],
    20: ['09:00 Pedro A.', '11:00 Larissa B.', '14:30 Felipe C.'],
    21: ['10:00 Mariana D.'],
  };
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Agenda</div>
          <div className={styles.pageSub}>Maio de 2026</div>
        </div>
        <button className={styles.addBtn}>+ Agendamento</button>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.calendarWrap}>
          <div className={styles.calendarHead}>
            {days.map(d => (
              <div key={d} className={styles.calendarDayLabel}>{d}</div>
            ))}
          </div>
          {dates.map((week, wi) => (
            <div key={wi} className={styles.calendarRow}>
              {week.map((day, di) => (
                <div key={di} className={`${styles.calendarCell} ${day === 20 ? styles.calendarToday : ''} ${!day ? styles.calendarEmpty : ''}`}>
                  {day && <div className={styles.calendarDate}>{day}</div>}
                  {day && events[day] && events[day].map((ev, ei) => (
                    <div key={ei} className={styles.calendarEvent}>{ev}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CrmMock() {
  const kpis = [
    { label: 'Total leads',       value: '24', icon: '👥', accent: '#0D1117' },
    { label: 'Agendados',         value: '8',  icon: '📅', accent: '#6366f1' },
    { label: 'Concluídos',        value: '11', icon: '✓',  accent: '#0D9488' },
    { label: 'Sem identificação', value: '5',  icon: '❓', accent: '#f59e0b' },
  ];
  const cols = [
    {
      label: 'Novo Lead', dot: '#8B95A8', count: 5,
      cards: [
        { name: 'Beatriz M.', phone: '(88) 9xxxx-1234', proc: 'Consulta',    date: '15/05' },
        { name: 'Roberto S.', phone: '(88) 9xxxx-5678', proc: 'Avaliação',   date: '16/05' },
        { name: 'Carla D.',   phone: '(85) 9xxxx-9012', proc: 'Retorno',     date: '17/05' },
      ],
    },
    {
      label: 'Agendado', dot: '#6366f1', count: 3,
      cards: [
        { name: 'Lucas P.',    phone: '(88) 9xxxx-3456', proc: 'Procedimento', date: '20/05' },
        { name: 'Fernanda R.', phone: '(85) 9xxxx-7890', proc: 'Consulta',     date: '21/05' },
      ],
    },
    {
      label: 'Concluído', dot: '#0D9488', count: 4,
      cards: [
        { name: 'Tiago K.',  phone: '(88) 9xxxx-2345', proc: 'Limpeza',  date: '12/05' },
        { name: 'Paula N.',  phone: '(85) 9xxxx-6789', proc: 'Consulta', date: '14/05' },
      ],
    },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>CRM — Leads WhatsApp</div>
          <div className={styles.pageSub}>Contatos captados pelo bot de IA</div>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.cards} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {kpis.map(k => (
            <div key={k.label} className={styles.card}>
              <div className={styles.cardIconWrap} style={{ background: k.accent + '18' }}>
                <span style={{ fontSize: '0.95rem' }}>{k.icon}</span>
              </div>
              <div>
                <div className={styles.cardValue} style={{ color: k.accent === '#0D1117' ? '#0D1117' : undefined }}>{k.value}</div>
                <div className={styles.cardLabel}>{k.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.kanban}>
          {cols.map(col => (
            <div key={col.label} className={styles.kanbanCol}>
              <div className={styles.kanbanHeader}>
                <span className={styles.kanbanDot} style={{ background: col.dot }} />
                <span className={styles.kanbanLabel}>{col.label}</span>
                <span className={styles.kanbanCount}>{col.count}</span>
              </div>
              {col.cards.map(card => (
                <div key={card.name} className={styles.kanbanCard}>
                  <div className={styles.kanbanAvatar}>{card.name.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={styles.kanbanName}>{card.name}</div>
                    <div className={styles.kanbanSub}>{card.phone}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' }}>
                      <span className={styles.crmChip}>{card.proc}</span>
                      <span className={styles.crmDate}>📅 {card.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    patient: 'Pedro A.', sub: 'Odontologia · última consulta 15/05/2026',
    anamnese: ['Queixa principal / Motivo da consulta', 'Estado geral de saúde', 'Medicamentos em uso', 'Alergias (medicamentos, látex, anestésicos)', 'Pressão arterial / Cardiopatias', 'Sangramento gengival / Dor dentária', 'Bruxismo / Ranger de dentes'],
    exame: ['Higiene bucal (placa, tártaro)', 'Mucosa oral (cor, lesões)', 'Oclusão / ATM', 'Mobilidade dentária', 'Profundidade de sondagem', 'Dor à percussão / Sensibilidade', 'Hipótese diagnóstica'],
  },
  medico: {
    patient: 'Larissa B.', sub: 'Medicina · última consulta 14/05/2026',
    anamnese: ['Queixa principal / Motivo da consulta', 'História da doença atual', 'Comorbidades (Diabetes, HAS, etc.)', 'Medicamentos em uso', 'Alergias', 'Hábitos de vida (Fumo / Álcool)', 'Sintomas associados'],
    exame: ['Pressão Arterial (mmHg)', 'Frequência Cardíaca (bpm)', 'Temperatura (°C)', 'Saturação O₂ (%)', 'Peso / Altura / IMC', 'Ausculta Cardíaca / Pulmonar', 'Hipótese diagnóstica (CID)'],
  },
  estetica: {
    patient: 'Mariana D.', sub: 'Estética · última consulta 13/05/2026',
    anamnese: ['Queixa principal / Região de interesse', 'Expectativas com o tratamento', 'Uso de cosméticos / Ácidos / Retinol', 'Uso de isotretinoína (últimos 6 meses?)', 'Alergias (cosméticos, anestésicos)', 'Gestante / Lactante?', 'Doenças de pele'],
    exame: ['Tipo de pele (Normal, Seca, Oleosa, Mista)', 'Fototipo (Fitzpatrick I–VI)', 'Manchas / Melasma', 'Grau de flacidez / Celulite', 'Lesões visíveis (acne, cicatrizes)', 'Procedimento proposto', 'Contraindicações identificadas'],
  },
  vet: {
    patient: 'Rex (Bruno G.)', sub: 'Veterinária · última consulta 12/05/2026',
    anamnese: ['Motivo da consulta / Queixa principal', 'Alimentação / Dieta', 'Ambiente (interno / externo)', 'Vacinação e vermifugação em dia?', 'Histórico de doenças / Cirurgias', 'Medicamentos em uso', 'Contato com outros animais'],
    exame: ['Temperatura retal (°C)', 'Mucosas (cor, TPC)', 'Frequência Cardíaca (bpm)', 'Peso (kg) / Escore corporal', 'Linfonodos', 'Ausculta cardíaca / Pulmonar', 'Hipótese diagnóstica'],
  },
  fisio: {
    patient: 'Felipe C.', sub: 'Fisioterapia · última consulta 11/05/2026',
    anamnese: ['Queixa principal', 'Diagnóstico médico / Encaminhamento', 'Região acometida', 'Início e causa (trauma, postura)', 'Intensidade da dor (0–10)', 'Cirurgias ou fraturas anteriores', 'Exames de imagem (RX, RM, USG)'],
    exame: ['Avaliação postural', 'ADM — Amplitude de Movimento (graus)', 'Força muscular (escala 0–5)', 'Testes especiais (Lasègue, Phalen)', 'Dor à palpação / Pontos-gatilho', 'Edema / Inflamação', 'Diagnóstico fisioterapêutico'],
  },
  psico: {
    patient: 'Sônia F.', sub: 'Psicologia · última consulta 10/05/2026',
    anamnese: ['Queixa principal / Motivo da busca', 'Histórico pessoal relevante', 'Tratamentos anteriores', 'Medicamentos em uso', 'Qualidade do sono', 'Situação profissional / escolar', 'Triagem de risco (ideação suicida)'],
    exame: ['Apresentação geral (aparência, postura)', 'Humor e afeto', 'Curso e conteúdo do pensamento', 'Memória, atenção e concentração', 'Crítica e julgamento (insight)', 'Escala PHQ-9 / GAD-7', 'Hipótese diagnóstica (CID-10 / DSM-5)'],
  },
  nutri: {
    patient: 'Carla H.', sub: 'Nutrição · última consulta 09/05/2026',
    anamnese: ['Objetivo principal / Queixa', 'Histórico clínico (Diabetes, HAS)', 'Alergias ou intolerâncias alimentares', 'Hábitos alimentares (refeições/dia)', 'Recordatório alimentar 24h', 'Ingestão hídrica diária', 'Prática de atividade física'],
    exame: ['Peso atual (kg)', 'Altura (cm) / IMC (kg/m²)', 'Circunferência abdominal (cm)', 'Percentual de gordura corporal (%)', 'Massa magra (kg)', 'Exames laboratoriais (glicose, TSH)', 'Meta calórica / VET prescrito'],
  },
};

function OdontogramaMock() {
  const upper = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
  const lower = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
  const cariado   = new Set([36, 46]);
  const ausente   = new Set([17, 27]);
  const restaurado = new Set([11, 22]);
  function toothStyle(n: number) {
    if (ausente.has(n))    return { bg: '#fca5a5', border: '#f87171', color: '#7f1d1d' };
    if (cariado.has(n))    return { bg: '#fde68a', border: '#f59e0b', color: '#78350f' };
    if (restaurado.has(n)) return { bg: '#5EEAD4', border: '#0D9488', color: '#0a3d36' };
    return { bg: '#ECFDF5', border: '#5EEAD4', color: '#065F46' };
  }
  const legend = [
    { color: '#ECFDF5', border: '#5EEAD4', label: 'Hígido' },
    { color: '#fde68a', border: '#f59e0b', label: 'Cariado' },
    { color: '#5EEAD4', border: '#0D9488', label: 'Restaurado' },
    { color: '#fca5a5', border: '#f87171', label: 'Ausente' },
  ];
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Odontograma</span>
      </div>
      <div className={styles.odontoPad}>
        <div className={styles.odontoLegendTop}>
          {legend.map(l => (
            <span key={l.label} className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: l.color, border: `1px solid ${l.border}` }} />
              {l.label}
            </span>
          ))}
        </div>
        <div className={styles.odontoLabel}>Superior</div>
        <div className={styles.odontoRow}>
          {upper.map(n => { const c = toothStyle(n); return (
            <div key={n} className={styles.tooth} style={{ background: c.bg, borderColor: c.border, color: c.color }}>{n}</div>
          );})}
        </div>
        <div className={styles.odontoRow}>
          {lower.map(n => { const c = toothStyle(n); return (
            <div key={n} className={styles.tooth} style={{ background: c.bg, borderColor: c.border, color: c.color }}>{n}</div>
          );})}
        </div>
        <div className={styles.odontoLabel}>Inferior</div>
        <button className={styles.saveOdontoBtn}>Salvar Odontograma</button>
      </div>
    </div>
  );
}

function FichaMock({ spec }: { spec: SpecId }) {
  const data = specData[spec];
  const fields = [
    { label: 'Nome completo', value: data.patient.replace(/\.$/, '').split(' ')[0] + ' Alves Santos' },
    { label: 'Data de nascimento', value: '12/03/1985' },
    { label: 'CPF', value: '•••.•••.•••-••' },
    { label: 'Telefone', value: '(88) 9••••-••••' },
    { label: 'E-mail', value: '••••@gmail.com' },
  ];
  return (
    <div className={styles.fichaWrap}>
      <div className={styles.fichaSection}>
        <div className={styles.fichaSectionTitle}>Dados Pessoais</div>
        <div className={styles.fichaGrid}>
          {fields.map(f => (
            <div key={f.label} className={styles.fichaField}>
              <div className={styles.fichaFieldLabel}>{f.label}</div>
              <div className={styles.fichaFieldValue}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.fichaColumns}>
        <div className={styles.fichaSection}>
          <div className={styles.fichaSectionTitle}>📋 Anamnese</div>
          <div className={styles.fichaFieldList}>
            {data.anamnese.map((item, i) => (
              <div key={i} className={styles.fichaFieldItem}>
                <span className={styles.fichaDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.fichaSection}>
          <div className={styles.fichaSectionTitle}>🔬 Exame Clínico</div>
          <div className={styles.fichaFieldList}>
            {data.exame.map((item, i) => (
              <div key={i} className={styles.fichaFieldItem}>
                <span className={styles.fichaDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProntuarioMock({ spec }: { spec: SpecId }) {
  const [activeTab, setActiveTab] = useState(0);
  const data = specData[spec];
  const prontuTabs = spec === 'odonto'
    ? ['📋 Ficha', '🦷 Odontograma', '📝 Evolução', '📄 Documentos', '💬 Chat IA']
    : ['📋 Ficha', '📝 Evolução', '📄 Documentos', '💬 Chat IA'];

  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Prontuário — {data.patient}</div>
          <div className={styles.pageSub}>{data.sub}</div>
        </div>
      </div>
      <div className={styles.prontuTabs}>
        {prontuTabs.map((t, i) => (
          <span
            key={t}
            className={`${styles.prontuTab} ${i === activeTab ? styles.prontuTabActive : ''}`}
            onClick={() => setActiveTab(i)}
            style={{ cursor: 'pointer' }}
          >{t}</span>
        ))}
      </div>
      <div className={styles.mainScroll}>
        {activeTab === 0 && <FichaMock spec={spec} />}
        {activeTab === 1 && spec === 'odonto' && <OdontogramaMock />}
        {((activeTab === 1 && spec !== 'odonto') || activeTab > 1) && (
          <div className={styles.emptyTab}>Em breve nesta aba</div>
        )}
      </div>
    </div>
  );
}

function LineChart() {
  const months = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  const receitas = [6200, 7400, 6800, 9200, 10100, 12840];
  const despesas = [3100, 2800, 3600, 3200, 4100, 4320];
  const max = 14000;
  const W = 340;
  const H = 90;
  const pad = { top: 8, right: 12, bottom: 4, left: 8 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const gridLines = [0, 3500, 7000, 10500, 14000];
  const labels = ['R$ 0', 'R$ 25', 'R$ 50', 'R$ 75', 'R$ 100'];

  function toX(i: number) { return pad.left + (i / (months.length - 1)) * chartW; }
  function toY(v: number) { return pad.top + chartH - (v / max) * chartH; }

  function polyline(vals: number[]) {
    return vals.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  }

  return (
    <div className={styles.lineChart}>
      <div className={styles.lineChartTitle}>Receitas vs Despesas — últimos 6 meses</div>
      <div className={styles.lineChartBody}>
        <div className={styles.lineChartYAxis}>
          {labels.slice().reverse().map(l => (
            <span key={l} className={styles.lineChartYLabel}>{l}</span>
          ))}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.lineChartSvg} preserveAspectRatio="none">
          {gridLines.map((v, i) => (
            <line
              key={i}
              x1={pad.left} y1={toY(v)}
              x2={W - pad.right} y2={toY(v)}
              stroke="#E4E8F2" strokeWidth="0.5"
            />
          ))}
          <polyline
            points={polyline(receitas)}
            fill="none" stroke="#0D9488" strokeWidth="1.8"
            strokeLinejoin="round" strokeLinecap="round"
          />
          <polyline
            points={polyline(despesas)}
            fill="none" stroke="#f87171" strokeWidth="1.8"
            strokeLinejoin="round" strokeLinecap="round"
          />
          {receitas.map((v, i) => (
            <circle key={i} cx={toX(i)} cy={toY(v)} r="2.5" fill="#0D9488" />
          ))}
          {despesas.map((v, i) => (
            <circle key={i} cx={toX(i)} cy={toY(v)} r="2.5" fill="#f87171" />
          ))}
        </svg>
      </div>
      <div className={styles.lineChartXAxis}>
        {months.map(m => <span key={m} className={styles.lineChartXLabel}>{m}</span>)}
      </div>
    </div>
  );
}

function FinanceiroMock() {
  const rows = [
    { tipo: 'receita', data: '20/05', paciente: 'Pedro A.',   cat: 'Consulta',     method: 'PIX',    value: 'R$ 350,00'   },
    { tipo: 'despesa', data: '19/05', paciente: '—',          cat: 'Material',     method: 'Boleto', value: 'R$ 180,00'   },
    { tipo: 'receita', data: '18/05', paciente: 'Larissa B.', cat: 'Procedimento', method: 'Cartão', value: 'R$ 220,00'   },
    { tipo: 'despesa', data: '17/05', paciente: '—',          cat: 'Salário',      method: 'TED',    value: 'R$ 1.800,00' },
    { tipo: 'receita', data: '16/05', paciente: 'Felipe C.',  cat: 'Consulta',     method: 'PIX',    value: 'R$ 180,00'   },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Financeiro</div>
          <div className={styles.pageSub}>Maio de 2026</div>
        </div>
        <button className={styles.addBtn}>+ Lançamento</button>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.cards}>
          <KpiCard label="Receitas do mês" value="R$ 12.840" icon="📈" accent="#10b981" />
          <KpiCard label="Despesas do mês" value="R$ 4.320"  icon="📉" accent="#f87171" />
          <KpiCard label="Saldo líquido"   value="R$ 8.520"  icon="💳" accent="#0D9488" />
          <KpiCard label="A receber"        value="R$ 2.100"  icon="⏳" accent="#6366f1" />
        </div>
        <LineChart />
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Lançamentos recentes</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Data</th>
                <th>Paciente</th>
                <th>Categoria</th>
                <th>Método</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>
                    <span style={{ color: r.tipo === 'receita' ? '#10b981' : '#f87171', fontWeight: 700, fontSize: '0.76rem' }}>
                      {r.tipo === 'receita'
                        ? <><svg width="10" height="10" viewBox="0 0 10 10" style={{ marginRight: 2, verticalAlign: 'middle' }}><path d="M5 8V2M2 5l3-3 3 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>Receita</>
                        : <><svg width="10" height="10" viewBox="0 0 10 10" style={{ marginRight: 2, verticalAlign: 'middle' }}><path d="M5 2v6M8 5L5 8 2 5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>Despesa</>
                      }
                    </span>
                  </td>
                  <td>{r.data}</td>
                  <td className={styles.bold}>{r.paciente}</td>
                  <td>{r.cat}</td>
                  <td>{r.method}</td>
                  <td className={styles.bold}>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EstoqueMock() {
  const items = [
    { name: 'Luva de procedimento', cat: 'Descartável', qty: 3,   min: 10, unit: 'caixa', price: 'R$ 28,00', supplier: 'FornecedorA' },
    { name: 'Máscara cirúrgica',    cat: 'Descartável', qty: 45,  min: 20, unit: 'caixa', price: 'R$ 12,00', supplier: 'FornecedorA' },
    { name: 'Seringa 5ml',          cat: 'Material',    qty: 8,   min: 15, unit: 'unid.', price: 'R$  0,80', supplier: 'FornecedorB' },
    { name: 'Clorexidina 1L',       cat: 'Medicamento', qty: 6,   min: 3,  unit: 'litro', price: 'R$ 42,00', supplier: 'FornecedorC' },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Estoque de Produtos</div>
          <div className={styles.pageSub}>Maio de 2026</div>
        </div>
        <button className={styles.addBtn}>+ Produto</button>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.cards}>
          <KpiCard label="Total produtos"     value="28"          icon="📦" accent="#0D9488" />
          <KpiCard label="Estoque baixo"      value="4"           icon="⚠️" accent="#f87171" />
          <KpiCard label="Valor em estoque"   value="R$ 3.240"    icon="💰" accent="#6366f1" />
        </div>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Produtos</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Qtd</th>
                <th>Mín.</th>
                <th>Unidade</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.name}>
                  <td className={styles.bold}>{item.name}</td>
                  <td>{item.cat}</td>
                  <td style={{ color: item.qty < item.min ? '#f87171' : '#0D9488', fontWeight: 700 }}>{item.qty}</td>
                  <td>{item.min}</td>
                  <td>{item.unit}</td>
                  <td>{item.price}</td>
                  <td>
                    <span className={styles.entradaBtn}>+ Entrada</span>
                    <span className={styles.saidaBtn}>- Saída</span>
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

export default function Preview() {
  const [active, setActive] = useState('dashboard');
  const [activeSpec, setActiveSpec] = useState<SpecId>('odonto');

  const screen = (() => {
    switch (active) {
      case 'dashboard':  return <DashboardMock />;
      case 'agenda':     return <AgendaMock />;
      case 'crm':        return <CrmMock />;
      case 'prontuario': return <ProntuarioMock spec={activeSpec} />;
      case 'financeiro': return <FinanceiroMock />;
      case 'estoque':    return <EstoqueMock />;
      default:           return null;
    }
  })();

  return (
    <section className={styles.section} id="preview">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>/ Preview</span>
          <h2 className={styles.title}>Veja o sistema em ação</h2>
          <p className={styles.subtitle}>Interface limpa e intuitiva, pensada para o dia a dia da sua clínica.</p>
        </div>

        <div className={styles.tabsRow}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === 'prontuario' && (
          <div className={styles.specSelectorRow}>
            <span className={styles.specSelectorLabel}>Especialidade:</span>
            {specOptions.map(s => (
              <button
                key={s.id}
                className={`${styles.specBtn} ${activeSpec === s.id ? styles.specBtnActive : ''}`}
                onClick={() => setActiveSpec(s.id)}
              >
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.shell}>
          <Sidebar activeIndex={sidebarIndex[active]} />
          <div className={styles.content}>{screen}</div>
        </div>
      </div>
    </section>
  );
}
