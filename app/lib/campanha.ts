/**
 * Campanha Black Friday MyClinica.
 *
 * Arquivo unico de controle. Para DESLIGAR a campanha inteira (tema preto,
 * faixa do topo, textos promocionais): troque CAMPANHA_ATIVA para false.
 * Fora da janela de datas abaixo a pagina volta sozinha ao visual claro.
 *
 * Fuso: America/Fortaleza (UTC-3, sem horario de verao), por isso os
 * instantes sao escritos com o offset -03:00.
 */

export const CAMPANHA_ATIVA = true;

/** Campanha única: de 23/11 a 30/11 (inclusive). Depois disso a página volta ao visual normal. */
export const FASE_1_INICIO = Date.parse('2026-11-23T00:00:00-03:00');
export const FASE_1_FIM = Date.parse('2026-12-01T00:00:00-03:00');

export type Fase = 0 | 1;

export function faseEm(agora: number): Fase {
  if (!CAMPANHA_ATIVA) return 0;
  if (agora >= FASE_1_INICIO && agora < FASE_1_FIM) return 1;
  return 0;
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/** Tempo até o fim da campanha (30/11) em partes, para os relógios do hero e dos planos. null enquanto o relógio não hidratou. */
export function partesRestanteFase(agora: number) {
  if (agora === 0) return null;
  const total = Math.max(0, Math.floor((FASE_1_FIM - agora) / 1000));
  return [
    { v: pad2(Math.floor(total / 86400)), l: 'dias' },
    { v: pad2(Math.floor((total % 86400) / 3600)), l: 'horas' },
    { v: pad2(Math.floor((total % 3600) / 60)), l: 'min' },
    { v: pad2(total % 60), l: 'seg' },
  ];
}

/** Textos informativos do topo (faixa e hero). */
export const TEXTO_TESTE = 'Teste 14 dias grátis, sem cartão.';
export const TEXTO_OFERTA = '50% off na primeira mensalidade';
export const TEXTO_PRIMEIRA = 'Primeira cobrança só em 15 de janeiro';

/**
 * Pre-visualizacao SO EM DESENVOLVIMENTO: ?fase=0|1 na URL simula o relogio
 * (fase 1: 25/11 12:00; fase 0: depois da campanha).
 * Em producao o ramo inteiro e removido do bundle e o parametro e ignorado.
 */
const PREVIEW_ALVOS: Record<string, number> = {
  '0': Date.parse('2027-01-01T00:00:00-03:00'),
  '1': Date.parse('2026-11-25T12:00:00-03:00'),
};

let previewDelta: number | null | undefined;

/** Relogio da campanha: Date.now(), ou o relogio simulado no modo de preview (dev). */
export function agoraCampanha(): number {
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    if (previewDelta === undefined) {
      const alvo = PREVIEW_ALVOS[new URLSearchParams(window.location.search).get('fase') ?? ''];
      previewDelta = alvo === undefined ? null : alvo - Date.now();
    }
    if (previewDelta !== null) return Date.now() + previewDelta;
  }
  return Date.now();
}

/**
 * Script executado no <head> antes da primeira pintura: grava a fase em
 * <html data-campanha="1">. Assim o tema preto ja nasce aplicado, sem
 * flash de pagina clara e sem depender da hidratacao do React.
 */
const BOOT_PREVIEW_DEV =
  process.env.NODE_ENV !== 'production'
    ? `var q=new URLSearchParams(location.search).get('fase'),T=${JSON.stringify(PREVIEW_ALVOS)};if(T[q]!==undefined)n=T[q];`
    : '';

export const CAMPANHA_BOOT_SCRIPT = `(function(){try{
var d=document.documentElement,n=Date.now(),f=0;
${BOOT_PREVIEW_DEV}
if(${CAMPANHA_ATIVA}){
if(n>=${FASE_1_INICIO}&&n<${FASE_1_FIM})f=1;
}
if(f)d.setAttribute('data-campanha',String(f));
}catch(e){}})();`;
