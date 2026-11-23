'use client';

import styles from './Hero.module.css';
import RotatingText from './RotatingText';
import { trackContact, trackTrialLead } from '../lib/pixel';
import { TEXTO_CONTRATO, TEXTO_TESTE } from '../lib/campanha';
import { useAgora } from '../lib/useAgora';
import { formatarRestante } from './CampanhaBar';
import { PRECO_GANCHO } from './Plans';

const SAAS_QUIZ = 'https://myclinica.online/login?quiz=true';
const WHATSAPP = 'https://wa.me/5588920020570';

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const HEADLINE_PHRASES = [
  'inteligência',
  'prontuário digital',
  'agenda automática',
  'CRM no WhatsApp',
];


export default function Hero() {
  const agora = useAgora();
  const restante = formatarRestante(agora);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.orb} aria-hidden />

      {/* Cards flutuantes. Fora da campanha: dados do sistema. Na campanha
          (html[data-campanha]) os cards da Black assumem os mesmos cantos,
          alternados por CSS (sem flash, sem depender da hidratacao). */}
      <div className={`${styles.floatCard} ${styles.fcSys}`} data-pos="tl" aria-hidden>
        <div className={styles.fcHead}>
          <strong>14</strong>
          <span>consultas hoje</span>
        </div>
        <div className={styles.fcBar}><span style={{ width: '86%' }} /></div>
        <div className={styles.fcFoot}>
          <em className={styles.fcGood}>✓ 12 confirmadas</em>
          <em className={styles.fcWarn}>2 pendentes</em>
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.fcSys}`} data-pos="tr" aria-hidden>
        <div className={styles.fcTopRow}>
          <strong>73%</strong>
          <span className={styles.fcTag}>+18%</span>
        </div>
        <span className={styles.fcLabel}>orçamentos aprovados</span>
        <div className={styles.fcDots}>
          {Array.from({ length: 12 }).map((_, i) => (
            <i key={i} className={i < 9 ? styles.fcDotOn : ''} />
          ))}
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.fcSys}`} data-pos="bl" aria-hidden>
        <div className={styles.fcTopRow}>
          <strong>R$ 42.800</strong>
        </div>
        <span className={styles.fcLabel}>faturado este mês</span>
        <div className={styles.fcChart}>
          {[40, 55, 48, 70, 62, 92].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.fcSys} ${styles.fcSysKeep}`} data-pos="br" aria-hidden>
        <div className={styles.fcHead}>
          <strong>47</strong>
          <span>pacientes inativos</span>
        </div>
        <div className={styles.fcReactivate}>
          ↻ Reativar via WhatsApp
        </div>
      </div>

      {/* Cards da Black Friday (so aparecem com a campanha ativa) */}
      <div className={`${styles.floatCard} ${styles.fcBf} ${styles.fcBfMain}`} data-pos="tl" aria-hidden>
        <span className={styles.bfKicker}><i className={styles.bfDot} />Black Friday</span>
        <span className={styles.bfSmall}>a partir de</span>
        <div className={styles.bfPrice}>
          <strong>{PRECO_GANCHO}</strong>
          <span>/mês</span>
        </div>
        <span className={styles.bfNote}>Essencial, 12 meses à vista</span>
      </div>

      <div className={`${styles.floatCard} ${styles.fcBf}`} data-pos="tr" aria-hidden>
        <div className={styles.bfTitleRow}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8v13M3 12h18M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
          </svg>
          <strong>14 dias grátis</strong>
        </div>
        <span className={styles.bfNote}>Sem cartão de crédito, em qualquer plano</span>
      </div>

      <div className={`${styles.floatCard} ${styles.fcBf}`} data-pos="bl" aria-hidden>
        <strong className={styles.bfLine}>Contrato de 3, 6 ou 12 meses</strong>
        <span className={styles.bfNote}>com desconto na mensalidade</span>
        <div className={styles.bfChips}>
          <i>3 meses</i>
          <i>6 meses</i>
          <i>12 meses</i>
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.fcBf} ${styles.fcBf2} ${styles.fcBfMain}`} data-pos="br" aria-hidden>
        <span className={styles.bfKicker}><i className={styles.bfDot} />Últimos dias</span>
        <strong className={styles.bfCount}>{restante}</strong>
        <span className={styles.bfNote}>para o fim da Black Friday, em 15/12</span>
      </div>

      <div className={styles.container}>

        {/* Destaque da campanha: so aparece com a Black Friday ativa */}
        <div className={`${styles.bfHeadline} ${styles.heroBadge}`}>
          <span className={styles.bfHeadlineMain}>Black Friday</span>
          <span className={styles.bfHeadlineSub}>
            <span className={styles.bfF1}>MyClinica · ofertas de lançamento até 30/11</span>
            <span className={styles.bfF2}>MyClinica · Black Friday estendida até 15/12</span>
          </span>
        </div>

        <div className={`${styles.badge} ${styles.heroBadge} ${styles.badgeNormal}`}>
          <span className={styles.dot} />
          14 dias grátis, sem cartão
        </div>

        <h1 className={`${styles.title} ${styles.heroTitle}`}>
          Sua clínica gerenciada com{' '}
          <RotatingText phrases={HEADLINE_PHRASES} />
        </h1>

        {/* Selos da Black Friday: substituem os cards flutuantes em tela estreita */}
        <div className={`${styles.bfRow} ${styles.heroSub}`}>
          <span className={`${styles.bfPill} ${styles.bfPillMain}`}>
            Black Friday: a partir de <strong>{PRECO_GANCHO}/mês</strong>
          </span>
          <span className={styles.bfPill}>Contrato de 3, 6 ou 12 meses com desconto</span>
          <span className={`${styles.bfPill} ${styles.bfPillF2}`}>
            Últimos dias: <strong>{restante}</strong>
          </span>
        </div>

        <p className={`${styles.subtitle} ${styles.heroSub}`}>
          Prontuário eletrônico, agenda, financeiro e CRM via WhatsApp — uma plataforma que se adapta a 9 especialidades clínicas.
        </p>

        <p className={`${styles.campanhaInfo} ${styles.heroSub}`}>
          <strong>{TEXTO_TESTE}</strong> {TEXTO_CONTRATO}
        </p>

        <div className={`${styles.ctas} ${styles.heroCtaRow}`}>
          <a href={SAAS_QUIZ} className={styles.primary} onClick={() => trackTrialLead('hero_testar_gratis')}>
            Testar 14 dias grátis
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#plans" className={styles.bfOfertas}>
            Ver ofertas da Black Friday
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.secondary} onClick={() => trackContact('hero_falar_especialista')}>
            <IconWhatsApp />
            Falar com especialista
          </a>
        </div>

        <p className={`${styles.guarantee} ${styles.heroGuarantee}`}>
          14 dias grátis · Sem cartão de crédito · Plano mensal sem fidelidade
        </p>

        <div className={`${styles.stats} ${styles.heroStats}`}>
          <div className={styles.stat}>
            <strong>9</strong>
            <span>Especialidades suportadas</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>14</strong>
            <span>Dias grátis para testar</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>100%</strong>
            <span>Dados isolados por clínica</span>
          </div>
        </div>


      </div>
    </section>
  );
}
