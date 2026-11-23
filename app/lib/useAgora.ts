'use client';

import { useSyncExternalStore } from 'react';
import { agoraCampanha, CAMPANHA_ATIVA, FASE_1_INICIO, faseEm } from './campanha';

/** Maior atraso aceito por setTimeout (~24,8 dias). */
const MAX_TIMEOUT = 2 ** 31 - 1;

/**
 * Agenda os proximos avisos ao relogio:
 * - dentro da campanha: um aviso por segundo, alinhado ao relogio;
 * - antes da campanha: um unico aviso no inicio da campanha;
 * - depois da campanha: nenhum timer.
 */
function subscribe(onChange: () => void) {
  let timer: number | undefined;

  const agendar = () => {
    const agora = agoraCampanha();
    let espera: number | null = null;
    if (faseEm(agora) !== 0) {
      espera = 1000 - (agora % 1000) + 5;
    } else if (CAMPANHA_ATIVA && agora < FASE_1_INICIO) {
      espera = Math.min(FASE_1_INICIO - agora + 5, MAX_TIMEOUT);
    }
    if (espera === null) return;
    timer = window.setTimeout(() => {
      onChange();
      agendar();
    }, espera);
  };

  agendar();
  return () => window.clearTimeout(timer);
}

const getSnapshot = () => Math.floor(agoraCampanha() / 1000) * 1000;
const getServerSnapshot = () => 0;

/**
 * Relogio da campanha. No servidor (e na hidratacao) devolve 0, entao quem
 * usa deve renderizar um placeholder quando agora === 0. Evita mismatch.
 */
export function useAgora(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
