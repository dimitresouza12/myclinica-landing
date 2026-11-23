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

/** Fase 1: Black Friday MyClinica, de 24/11 a 30/11 (inclusive). */
export const FASE_1_INICIO = Date.parse('2026-11-24T00:00:00-03:00');
export const FASE_1_FIM = Date.parse('2026-12-01T00:00:00-03:00');

/** Fase 2: Black Friday estendida, de 01/12 ate 15/12 as 23:59. */
export const FASE_2_FIM = Date.parse('2026-12-16T00:00:00-03:00');

export type Fase = 0 | 1 | 2;

export function faseEm(agora: number): Fase {
  if (!CAMPANHA_ATIVA) return 0;
  if (agora >= FASE_1_INICIO && agora < FASE_1_FIM) return 1;
  if (agora >= FASE_1_FIM && agora < FASE_2_FIM) return 2;
  return 0;
}

/** Textos informativos do topo (faixa e hero). */
export const TEXTO_TESTE = 'Teste 14 dias grátis, sem cartão.';
export const TEXTO_CONTRATO = 'No contrato mês a mês, a primeira cobrança é em 15 de janeiro.';

/**
 * Pre-visualizacao SO EM DESENVOLVIMENTO: ?fase=0|1|2 na URL simula o relogio
 * (fase 1: 25/11 12:00; fase 2: 05/12 10:00; fase 0: depois da campanha).
 * Em producao o ramo inteiro e removido do bundle e o parametro e ignorado.
 */
const PREVIEW_ALVOS: Record<string, number> = {
  '0': Date.parse('2027-01-01T00:00:00-03:00'),
  '1': Date.parse('2026-11-25T12:00:00-03:00'),
  '2': Date.parse('2026-12-05T10:00:00-03:00'),
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
 * <html data-campanha="1|2">. Assim o tema preto ja nasce aplicado, sem
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
else if(n>=${FASE_1_FIM}&&n<${FASE_2_FIM})f=2;
}
if(f)d.setAttribute('data-campanha',String(f));
}catch(e){}})();`;
