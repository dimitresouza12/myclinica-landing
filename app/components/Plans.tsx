'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import styles from './Plans.module.css';
import RevealSection from './RevealSection';
import { trackContact, trackTrialLead } from '../lib/pixel';
import { useAgora } from '../lib/useAgora';
import { partesRestanteFase } from '../lib/campanha';

const WHATSAPP = 'https://wa.me/5588920020570';
const BASE_URL = 'https://myclinica.online/login';

const IconGift = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const IconWhatsApp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

type Prazo = 1 | 3 | 6 | 12;

const PRAZOS: { value: Prazo; label: string }[] = [
  { value: 1, label: 'Mensal' },
  { value: 3, label: '3 meses' },
  { value: 6, label: '6 meses' },
  { value: 12, label: '12 meses' },
];

/** Valores em centavos. Fonte: tabela de preços da campanha. */
interface Plano {
  name: string;
  slug: string;
  /** Valor aceito pelo parâmetro ?plan= do cadastro do app. */
  appPlan: 'essencial' | 'completo' | 'equipe';
  description: string;
  highlight: boolean;
  badge: string | null;
  /** Mensalidade sem contrato. */
  semContrato: number;
  /** Mensalidade com contrato (pago mês a mês) por prazo. */
  contrato: Record<3 | 6 | 12, number>;
  /** Valor total pago à vista por prazo. */
  avista: Record<3 | 6 | 12, number>;
  features: string[];
  missing: string[];
}

const plans: Plano[] = [
  {
    name: 'Essencial',
    slug: 'essencial',
    appPlan: 'essencial',
    description: 'Para profissionais autônomos que estão começando a organizar sua clínica.',
    highlight: false,
    badge: null,
    semContrato: 9990,
    contrato: { 3: 8990, 6: 8490, 12: 7990 },
    avista: { 3: 25390, 6: 47890, 12: 89890 },
    features: [
      'Prontuário eletrônico completo',
      'Agenda com lembretes e confirmação por SIM ou NÃO',
      'Mensagens do WhatsApp e CRM automático em quadro',
      'Agendamento online pelo link da clínica',
      'Financeiro básico',
      '1 profissional',
      'Recepção com login ilimitado',
      'Suporte humanizado por WhatsApp',
    ],
    missing: [
      'Relatórios avançados',
      'Gestão de equipe',
      'Atendente virtual com IA',
    ],
  },
  {
    name: 'Completo',
    slug: 'completo',
    appPlan: 'completo',
    description: 'Ideal para clínicas em crescimento, com pacientes ilimitados e equipe de até 3 profissionais.',
    highlight: true,
    badge: 'Mais popular',
    semContrato: 12990,
    contrato: { 3: 11690, 6: 10990, 12: 10390 },
    avista: { 3: 33090, 6: 62290, 12: 116890 },
    features: [
      'Prontuário eletrônico completo',
      'Agenda com lembretes e confirmação por SIM ou NÃO',
      'Mensagens do WhatsApp e CRM automático em quadro',
      'Agendamento online pelo link da clínica',
      'Financeiro completo',
      'Pacientes ilimitados',
      'Até 3 profissionais',
      'Recepção com login ilimitado',
      'Gestão de equipe',
      'Relatórios avançados',
      'Suporte humanizado por WhatsApp',
    ],
    missing: ['Atendente virtual com IA'],
  },
  {
    name: 'Equipe',
    slug: 'equipe',
    appPlan: 'equipe',
    description: 'Para clínicas com equipe maior, de até 6 profissionais.',
    highlight: false,
    badge: null,
    semContrato: 16990,
    contrato: { 3: 15290, 6: 14390, 12: 13590 },
    avista: { 3: 43290, 6: 81490, 12: 152890 },
    features: [
      'Tudo do plano Completo',
      'Até 6 profissionais',
      'Recepção com login ilimitado',
      'Suporte humanizado por WhatsApp',
    ],
    missing: ['Atendente virtual com IA'],
  },
];

const brl = (centavos: number) => {
  const reais = Math.floor(centavos / 100);
  const cents = String(centavos % 100).padStart(2, '0');
  return `R$ ${String(reais).replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${cents}`;
};

/** Gancho de preço: Essencial, 12 meses à vista, dividido por 12. */
export const PRECO_GANCHO = brl(Math.floor(plans[0].avista[12] / 12));

const GRANDES_FEATURES = [
  'Para clínicas com 7 ou mais profissionais',
  'Plano com IA no WhatsApp, sob proposta',
  'Proposta montada junto com a clínica',
  'Implantação acompanhada',
];

export default function Plans() {
  const [prazo, setPrazo] = useState<Prazo>(12);
  const botoes = useRef<Array<HTMLButtonElement | null>>([]);
  const agora = useAgora();
  const partes = partesRestanteFase(agora);

  // Radiogroup acessivel: so o selecionado entra na ordem de Tab; setas
  // mudam o prazo e levam o foco para o botao novo.
  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    const avancar = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const voltar = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!avancar && !voltar) return;
    e.preventDefault();
    const atual = PRAZOS.findIndex(p => p.value === prazo);
    const prox = (atual + (avancar ? 1 : -1) + PRAZOS.length) % PRAZOS.length;
    setPrazo(PRAZOS[prox].value);
    botoes.current[prox]?.focus();
  };

  return (
    <section className={styles.section} id="plans">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Planos</span>
          <h2 className={styles.title}>Escolha o plano ideal</h2>
          <p className={styles.subtitle}>
            A partir de <strong>{PRECO_GANCHO}/mês</strong> no Essencial com pagamento anual à vista.
            Escolha o prazo e veja o valor de cada plano.
          </p>
        </div>

        {/* Bloco da Black Friday: só aparece com a campanha ativa (html[data-campanha]) */}
        <div className={styles.bfBanner}>
          <div className={styles.bfTop}>
            <span className={styles.bfTag}>Black Friday MyClinica</span>
            <span className={styles.bfTimer} role="timer" aria-label="Tempo restante da Black Friday">
              Termina em{' '}
              <strong>
                {partes ? partes.map(p => `${p.v}${p.l === 'dias' ? 'd' : p.l === 'horas' ? 'h' : p.l === 'min' ? 'm' : 's'}`).join(' ') : '--'}
              </strong>
            </span>
          </div>
          <ul className={styles.bfList}>
            <li><strong>50% off</strong> na primeira mensalidade</li>
            <li>Primeira cobrança <strong>só em 15 de janeiro</strong></li>
            <li><strong>14 dias grátis</strong>, sem cartão</li>
          </ul>
          <p className={styles.bfFoot}>Oferta válida até 30/11. Depois dessa data, o desconto sai do ar.</p>
        </div>

        <div className={styles.trialBanner}>
          <IconGift /> <span><strong>14 dias grátis</strong> em qualquer plano, sem cartão de crédito</span>
        </div>

        <div className={styles.termWrap}>
          <div className={styles.term} role="radiogroup" aria-label="Prazo do plano" onKeyDown={aoTeclar}>
            {PRAZOS.map((p, i) => (
              <button
                key={p.value}
                ref={el => { botoes.current[i] = el; }}
                type="button"
                role="radio"
                aria-checked={prazo === p.value}
                tabIndex={prazo === p.value ? 0 : -1}
                className={`${styles.termBtn} ${prazo === p.value ? styles.termBtnActive : ''}`}
                onClick={() => setPrazo(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className={styles.termHint}>
            {prazo === 1
              ? 'Plano mensal, sem contrato. Os contratos de 3, 6 e 12 meses têm desconto na mensalidade.'
              : `Contrato de ${prazo} meses, pago mês a mês. Pagando o período à vista o desconto é maior.`}
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => {
            const mensal = prazo === 1 ? plan.semContrato : plan.contrato[prazo];
            const avista = prazo === 1 ? null : plan.avista[prazo];
            const economia = avista === null ? 0 : mensal * prazo - avista;
            return (
              <RevealSection
                key={plan.name}
                className={`${styles.card} ${plan.highlight ? styles.highlighted : ''}`}
                delay={i}
                variant="scale"
              >
                {plan.badge && <div className={styles.popularBadge}>{plan.badge}</div>}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>
                  {brl(mensal)}<span className={styles.perMonth}>/mês</span>
                </div>
                {avista !== null ? (
                  <div className={styles.priceSub}>
                    ou <strong>{brl(avista)}</strong> à vista <span className={styles.saving}>(economize {brl(economia)})</span>
                  </div>
                ) : (
                  <div className={styles.priceSub}>Sem contrato, cancele quando quiser</div>
                )}
                {/* 50% na 1ª mensalidade vale no mensal e no contrato mês a mês (mesma regra do sistema). O à vista não tem "1ª mensalidade". */}
                <div className={styles.bfCardOff}>
                  <div className={styles.bfOffHead}>
                    <span className={styles.bfOffTag}>Black Friday</span>
                    <span className={styles.bfOffPct}>50% off</span>
                  </div>
                  <div className={styles.bfOffPrice}>
                    <s>{brl(mensal)}</s>
                    <strong>{brl(Math.round(mensal / 2))}</strong>
                    <em>na 1ª mensalidade</em>
                  </div>
                  <ul className={styles.bfOffList}>
                    <li>Você economiza <b>{brl(mensal - Math.round(mensal / 2))}</b> já na primeira</li>
                    {prazo !== 1 && (
                      <li>Depois, {brl(mensal)}/mês nas outras {prazo - 1} mensalidades do contrato</li>
                    )}
                    <li>Primeira cobrança só em <b>15 de janeiro</b>, depois de 14 dias grátis</li>
                  </ul>
                </div>
                <p className={styles.planDesc}>{plan.description}</p>

                <ul className={styles.featureList}>
                  {plan.features.map(f => (
                    <li key={f} className={styles.featureItem}>
                      <span className={styles.check}>✓</span>
                      {f}
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} className={`${styles.featureItem} ${styles.missing}`}>
                      <span className={styles.x}>✕</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`${BASE_URL}?plan=${plan.appPlan}`}
                  className={plan.highlight ? styles.primaryBtn : styles.secondaryBtn}
                  onClick={() => trackTrialLead(`plans_${plan.slug}`)}
                >
                  Testar grátis por 14 dias →
                </a>
                <p className={styles.btnSubtext}>sem cartão de crédito</p>
              </RevealSection>
            );
          })}

          <RevealSection className={`${styles.card} ${styles.cardContact}`} delay={plans.length} variant="scale">
            <div className={styles.contactBadge}>Sob consulta</div>
            <div className={styles.planName}>Clínicas maiores e IA</div>
            <div className={styles.planPriceText}>Fale com a gente</div>
            <p className={styles.planDesc}>
              Para clínicas com 7 ou mais profissionais e para quem quer o plano com IA no WhatsApp. Conversamos sobre a sua rotina e montamos a proposta juntos.
            </p>

            <ul className={styles.featureList}>
              {GRANDES_FEATURES.map(f => (
                <li key={f} className={styles.featureItem}>
                  <span className={styles.check}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsBtn}
              onClick={() => trackContact('plans_sob_consulta')}
            >
              <IconWhatsApp />
              Falar no WhatsApp
            </a>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
