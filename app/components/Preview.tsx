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
  { icon: '⊞', label: 'Dashboard' },
  { icon: '👥', label: 'Pacientes' },
  { icon: '📅', label: 'Agenda' },
  { icon: '💬', label: 'CRM' },
  { icon: '💰', label: 'Financeiro' },
  { icon: '📦', label: 'Estoque' },
  { icon: '🧑‍⚕️', label: 'Equipe' },
  { icon: '⚙️', label: 'Config.' },
];

function Sidebar({ activeIndex }: { activeIndex: number }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <div className={styles.sidebarBrandTop}>
          <Image src="/favicon.svg" alt="MyClínica" width={26} height={26} style={{ borderRadius: 6 }} />
          <span className={styles.sidebarLogoText}>My<strong>Clínica</strong></span>
        </div>
        <span className={styles.sidebarClinic}>Clínica Exemplo</span>
      </div>
      <nav className={styles.sidebarNav}>
        {navItems.map((item, i) => (
          <div key={item.label} className={`${styles.navItem} ${i === activeIndex ? styles.navActive : ''}`}>
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </div>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        <div className={styles.avatar}>DR</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Dr. Rafael</span>
          <span className={styles.userRole}>admin</span>
        </div>
      </div>
    </div>
  );
}

function DashboardMock() {
  const kpis = [
    { label: 'Pacientes ativos', value: '142', accent: '#0D9488' },
    { label: 'Consultas hoje',   value: '12',  accent: '#6366f1' },
    { label: 'Agendamentos',     value: '8',   accent: '#f59e0b' },
    { label: 'Receita do mês',   value: 'R$ 8.4k', accent: '#10b981' },
  ];
  const rows = [
    { name: 'Ana Souza',       time: '09:00', status: 'Confirmado', sc: '#065F46', sb: '#ECFDF5' },
    { name: 'Carlos Lima',     time: '10:30', status: 'Agendado',   sc: '#4338CA', sb: '#EEF2FF' },
    { name: 'Maria Oliveira',  time: '11:00', status: 'Confirmado', sc: '#065F46', sb: '#ECFDF5' },
    { name: 'João Pereira',    time: '14:00', status: 'Pendente',   sc: '#92400E', sb: '#FFFBEB' },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.pageTitle}>Dashboard</div>
          <div className={styles.pageSub}>Hoje, 14 de maio de 2025</div>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.kpiGrid}>
          {kpis.map(k => (
            <div key={k.label} className={styles.kpiCard} style={{ '--accent': k.accent } as React.CSSProperties}>
              <div className={styles.kpiIconWrap} style={{ background: k.accent + '20' }}>
                <span style={{ color: k.accent, fontSize: '1rem' }}>◆</span>
              </div>
              <div className={styles.kpiBody}>
                <div className={styles.kpiValue}>{k.value}</div>
                <div className={styles.kpiLabel}>{k.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Próximos agendamentos</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Hora</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name} className={styles.tableRow}>
                  <td className={styles.bold}>{r.name}</td>
                  <td>{r.time}</td>
                  <td>
                    <span className={styles.badge} style={{ color: r.sc, background: r.sb }}>{r.status}</span>
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
  const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00'];
  const events: Record<number, { name: string; type: string; color: string }> = {
    1: { name: 'Ana Souza',      type: 'Consulta',  color: '#0D9488' },
    3: { name: 'Carlos Lima',    type: 'Retorno',   color: '#6366f1' },
    5: { name: 'Maria Oliveira', type: 'Avaliação', color: '#f59e0b' },
    6: { name: 'João Pereira',   type: 'Consulta',  color: '#0D9488' },
  };
  return (
    <div className={styles.screenBody}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.pageTitle}>Agenda</div>
          <div className={styles.pageSub}>Maio 2025</div>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button className={`${styles.toggleBtn} ${styles.toggleActive}`}>Calendário</button>
            <button className={styles.toggleBtn}>Lista</button>
          </div>
          <button className={styles.btnPrimary}>+ Novo</button>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.gcalBanner}>
          <span>📅 Sincronize com o Google Calendar</span>
          <button className={styles.gcalBannerBtn}>Conectar</button>
        </div>
        <div className={styles.calendarWrap}>
          <div className={styles.agendaGrid}>
            <div className={styles.agendaHours}>
              {hours.map(h => <div key={h} className={styles.agendaHour}>{h}</div>)}
            </div>
            <div className={styles.agendaSlots}>
              {hours.map((h, i) => {
                const ev = events[i];
                return (
                  <div key={h} className={styles.agendaSlot}>
                    {ev && (
                      <div className={styles.agendaEvent} style={{ background: ev.color + '18', borderLeft: `3px solid ${ev.color}` }}>
                        <span className={styles.agendaEventName} style={{ color: ev.color }}>{ev.name}</span>
                        <span className={styles.agendaEventType}>{ev.type}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrmMock() {
  const columns = [
    { label: 'Novos', color: '#6366f1', count: 3 },
    { label: 'Em contato', color: '#f59e0b', count: 5 },
    { label: 'Convertido', color: '#0D9488', count: 8 },
  ];
  const cards = [
    [
      { name: 'João Silva', phone: '(88) 9 9999-0001', proc: 'Consulta' },
      { name: 'Larissa Melo', phone: '(85) 9 8888-0002', proc: 'Avaliação' },
      { name: 'Pedro Alves', phone: '(88) 9 7777-0003', proc: 'Retorno' },
    ],
    [
      { name: 'Carla Nunes', phone: '(85) 9 6666-0004', proc: 'Ortodontia' },
      { name: 'Tiago Costa', phone: '(88) 9 5555-0005', proc: 'Consulta' },
    ],
    [
      { name: 'Ana Souza', phone: '(88) 9 4444-0006', proc: 'Consulta' },
      { name: 'Carlos Lima', phone: '(85) 9 3333-0007', proc: 'Retorno' },
    ],
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.pageTitle}>CRM</div>
          <div className={styles.pageSub}>Leads e atendimento via WhatsApp</div>
        </div>
        <div className={styles.crmStats}>
          {[{ l: 'Total', v: '16' }, { l: 'Hoje', v: '3' }, { l: 'Convertidos', v: '8' }, { l: 'Taxa', v: '50%' }].map(s => (
            <div key={s.l} className={styles.crmStat}>
              <span className={styles.crmStatVal}>{s.v}</span>
              <span className={styles.crmStatLabel}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.kanban}>
          {columns.map((col, ci) => (
            <div key={col.label} className={styles.kanbanCol}>
              <div className={styles.colHeader}>
                <span className={styles.colDot} style={{ background: col.color }} />
                <span className={styles.colLabel}>{col.label}</span>
                <span className={styles.colCount}>{col.count}</span>
              </div>
              <div className={styles.colCards}>
                {cards[ci].map(card => (
                  <div key={card.name} className={styles.crmCard}>
                    <div className={styles.crmCardTop}>
                      <div className={styles.crmAvatar}>{card.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                      <div className={styles.crmCardInfo}>
                        <span className={styles.crmCardName}>{card.name}</span>
                        <span className={styles.crmCardPhone}>{card.phone}</span>
                      </div>
                    </div>
                    <span className={styles.crmBadgeProc}>{card.proc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProntuarioMock() {
  const prontuarioTabs = ['Ficha', 'Odontograma', 'Timeline', 'Chat IA'];
  const teeth = [
    18,17,16,15,14,13,12,11,
    21,22,23,24,25,26,27,28,
    48,47,46,45,44,43,42,41,
    31,32,33,34,35,36,37,38,
  ];
  const treated = new Set([16, 15, 26, 36, 46]);
  const missing  = new Set([18, 38]);

  return (
    <div className={styles.screenBody}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.pageTitle}>Prontuário — Ana Souza</div>
          <div className={styles.pageSub}>Última consulta: 14/05/2025</div>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.prontuarioTabs}>
          {prontuarioTabs.map((t, i) => (
            <div key={t} className={`${styles.prontuarioTab} ${i === 1 ? styles.prontuarioTabActive : ''}`}>{t}</div>
          ))}
        </div>
        {/* Odontograma */}
        <div className={styles.odontogramaWrap}>
          <div className={styles.odontogramaLabel}>Superior</div>
          <div className={styles.odontogramaRow}>
            {teeth.slice(0, 16).map(n => (
              <div
                key={n}
                className={styles.tooth}
                style={{
                  background: missing.has(n) ? '#fca5a5' : treated.has(n) ? '#5EEAD4' : '#fff',
                  borderColor: missing.has(n) ? '#f87171' : treated.has(n) ? '#0D9488' : '#E4E8F2',
                  color: missing.has(n) ? '#b91c1c' : treated.has(n) ? '#0D9488' : '#9AA3B5',
                }}
              >
                {n}
              </div>
            ))}
          </div>
          <div className={styles.odontogramaDivider} />
          <div className={styles.odontogramaRow}>
            {teeth.slice(16, 32).map(n => (
              <div
                key={n}
                className={styles.tooth}
                style={{
                  background: missing.has(n) ? '#fca5a5' : treated.has(n) ? '#5EEAD4' : '#fff',
                  borderColor: missing.has(n) ? '#f87171' : treated.has(n) ? '#0D9488' : '#E4E8F2',
                  color: missing.has(n) ? '#b91c1c' : treated.has(n) ? '#0D9488' : '#9AA3B5',
                }}
              >
                {n}
              </div>
            ))}
          </div>
          <div className={styles.odontogramaLabel}>Inferior</div>
          <div className={styles.odontogramaLegend}>
            <span className={styles.legendItem}><span style={{ background: '#5EEAD4', borderColor: '#0D9488' }} className={styles.legendDot} />Tratado</span>
            <span className={styles.legendItem}><span style={{ background: '#fca5a5', borderColor: '#f87171' }} className={styles.legendDot} />Ausente</span>
            <span className={styles.legendItem}><span style={{ background: '#fff', borderColor: '#E4E8F2' }} className={styles.legendDot} />Hígido</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinanceiroMock() {
  const stats = [
    { label: 'Receitas do mês',  value: 'R$ 12.840',  accent: '#10b981', sub: '+8% vs mês anterior' },
    { label: 'Despesas do mês',  value: 'R$ 4.320',   accent: '#ef4444', sub: 'Material e salários' },
    { label: 'Saldo do mês',     value: 'R$ 8.520',   accent: '#0D9488', sub: 'Lucro líquido' },
  ];
  const rows = [
    { desc: 'Consulta – Ana Souza',      cat: 'Consulta',   type: 'receita', value: 'R$ 350,00',  method: 'PIX',    date: '14/05' },
    { desc: 'Material descartável',       cat: 'Material',   type: 'despesa', value: 'R$ 180,00',  method: 'Boleto', date: '13/05' },
    { desc: 'Procedimento – Carlos Lima', cat: 'Procedimento',type: 'receita', value: 'R$ 720,00', method: 'Cartão', date: '13/05' },
    { desc: 'Salário recepcionista',      cat: 'Salário',    type: 'despesa', value: 'R$ 1.800,00',method: 'TED',    date: '12/05' },
    { desc: 'Consulta – Maria Oliveira',  cat: 'Consulta',   type: 'receita', value: 'R$ 350,00',  method: 'PIX',    date: '12/05' },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.pageTitle}>Financeiro</div>
          <div className={styles.pageSub}>Maio de 2025</div>
        </div>
        <div className={styles.topBarActions}>
          <span className={styles.filterChip}>Todos</span>
          <span className={styles.filterChip}>Receitas</span>
          <span className={styles.filterChip}>Despesas</span>
          <button className={styles.addBtn}>+ Lançamento</button>
        </div>
      </div>
      <div className={styles.mainScroll}>
        <div className={styles.kpiGrid}>
          {stats.map(s => (
            <div key={s.label} className={styles.kpiCard} style={{ '--accent': s.accent } as React.CSSProperties}>
              <div className={styles.kpiIconWrap} style={{ background: s.accent + '20' }}>
                <span style={{ color: s.accent, fontSize: '1rem' }}>◆</span>
              </div>
              <div className={styles.kpiBody}>
                <div className={styles.kpiValue}>{s.value}</div>
                <div className={styles.kpiLabel}>{s.label}</div>
                <div className={styles.kpiSub}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Lançamentos recentes</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Método</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={styles.tableRow}>
                  <td className={styles.bold}>{r.desc}</td>
                  <td><span className={styles.catChip}>{r.cat}</span></td>
                  <td>{r.method}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className={styles.badge} style={
                      r.type === 'receita'
                        ? { color: '#065F46', background: '#ECFDF5' }
                        : { color: '#991B1B', background: '#FEF2F2' }
                    }>{r.value}</span>
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

function EstoqueMock() {
  const items = [
    { name: 'Luva de procedimento', cat: 'descartável', qty: 3,  min: 10, unit: 'caixa', price: 'R$ 18,00', supplier: 'MedSupply', low: true },
    { name: 'Máscara cirúrgica',    cat: 'descartável', qty: 45, min: 20, unit: 'caixa', price: 'R$ 12,50', supplier: 'MedSupply', low: false },
    { name: 'Seringa 5ml',          cat: 'material',    qty: 8,  min: 15, unit: 'caixa', price: 'R$ 9,00',  supplier: 'Cirúrgica',  low: true },
    { name: 'Clorexidina 1L',       cat: 'medicamento', qty: 6,  min: 3,  unit: 'un',    price: 'R$ 32,00', supplier: 'Farmaven',   low: false },
    { name: 'Algodão hidrófilo',    cat: 'material',    qty: 12, min: 5,  unit: 'rolo',  price: 'R$ 5,00',  supplier: 'Cirúrgica',  low: false },
  ];
  return (
    <div className={styles.screenBody}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.pageTitle}>Estoque de Produtos</div>
          <div className={styles.pageSub}>5 produtos cadastrados</div>
        </div>
        <button className={styles.btnPrimary}>+ Novo Produto</button>
      </div>
      <div className={styles.mainScroll}>
        {/* Stats */}
        <div className={styles.estoqueStats}>
          <div className={styles.estoqueStatCard}>
            <span className={styles.estoqueStatIcon}>📦</span>
            <div>
              <span className={styles.estoqueStatVal}>5</span>
              <span className={styles.estoqueStatLabel}>Total de produtos</span>
            </div>
          </div>
          <div className={`${styles.estoqueStatCard} ${styles.estoqueStatWarn}`}>
            <span className={styles.estoqueStatIcon}>⚠️</span>
            <div>
              <span className={styles.estoqueStatVal} style={{ color: '#F59E0B' }}>2</span>
              <span className={styles.estoqueStatLabel}>Estoque baixo</span>
            </div>
          </div>
          <div className={styles.estoqueStatCard}>
            <span className={styles.estoqueStatIcon}>💰</span>
            <div>
              <span className={styles.estoqueStatVal} style={{ color: '#059669' }}>R$ 1.240</span>
              <span className={styles.estoqueStatLabel}>Valor em estoque</span>
            </div>
          </div>
        </div>
        {/* Tabs toolbar */}
        <div className={styles.estoqueToolbar}>
          <div className={styles.estoqueTabs}>
            <div className={`${styles.estoqueTab} ${styles.estoqueTabActive}`}>Produtos</div>
            <div className={styles.estoqueTab}>Movimentações</div>
          </div>
          <div className={styles.estoqueSearch}>🔍 Buscar produto...</div>
        </div>
        {/* Table */}
        <div className={styles.section}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Qtd</th>
                <th>Mín.</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.name} className={item.low ? styles.estoqueRowLow : ''}>
                  <td className={styles.bold}>
                    {item.name}
                    {item.low && <span className={styles.estoqueLowBadge}>Baixo</span>}
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{item.cat}</td>
                  <td className={styles.bold} style={{ color: item.low ? '#F59E0B' : undefined }}>{item.qty} {item.unit}</td>
                  <td>{item.min}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className={styles.estoqueActions}>
                      <span className={styles.btnEntrada}>+ Entrada</span>
                      <span className={styles.btnSaida}>− Saída</span>
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

const sidebarIndex: Record<string, number> = {
  dashboard:  0,
  agenda:     2,
  crm:        3,
  prontuario: 1,
  financeiro: 4,
  estoque:    5,
};

const screens: Record<string, React.ReactNode> = {
  dashboard:  <DashboardMock />,
  agenda:     <AgendaMock />,
  crm:        <CrmMock />,
  prontuario: <ProntuarioMock />,
  financeiro: <FinanceiroMock />,
  estoque:    <EstoqueMock />,
};

export default function Preview() {
  const [active, setActive] = useState('dashboard');

  return (
    <section className={styles.section} id="preview">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Preview</span>
          <h2 className={styles.title}>Veja o sistema em ação</h2>
          <p className={styles.subtitle}>
            Interface limpa e intuitiva, pensada para o dia a dia da sua clínica.
          </p>
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

        <div className={styles.mockupWrapper}>
          <div className={styles.mockupBar}>
            <span /><span /><span />
            <div className={styles.mockupUrl}>app.myclinica.com.br</div>
          </div>
          <div className={styles.mockupShell}>
            <Sidebar activeIndex={sidebarIndex[active]} />
            {screens[active]}
          </div>
        </div>
      </div>
    </section>
  );
}
