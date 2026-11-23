'use client';

import { useEffect } from 'react';
import styles from './CampanhaBar.module.css';
import { agoraCampanha, FASE_2_FIM, faseEm, TEXTO_CONTRATO, TEXTO_TESTE } from '../lib/campanha';
import { useAgora } from '../lib/useAgora';

const pad = (n: number) => String(n).padStart(2, '0');

export function formatarRestante(agora: number) {
  if (agora === 0) return '--';
  const total = Math.max(0, Math.floor((FASE_2_FIM - agora) / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

/**
 * Faixa fixa do topo da campanha. As duas fases sao renderizadas no HTML e
 * alternadas por CSS conforme <html data-campanha="1|2"> (definido antes da
 * primeira pintura por CAMPANHA_BOOT_SCRIPT). Fora da campanha fica oculta.
 */
export default function CampanhaBar() {
  const agora = useAgora();

  // Acompanha a virada de fase com a pagina aberta: o script do <head> so
  // decide a fase no carregamento. Aqui o atributo e atualizado a cada tick
  // (fase 1 -> 2 -> fim) e, ao acabar a campanha, tema e faixa somem sozinhos.
  useEffect(() => {
    if (agora === 0) return;
    const fase = faseEm(agoraCampanha());
    const html = document.documentElement;
    if (fase === 0) {
      if (html.hasAttribute('data-campanha')) html.removeAttribute('data-campanha');
    } else if (html.getAttribute('data-campanha') !== String(fase)) {
      html.setAttribute('data-campanha', String(fase));
    }
  }, [agora]);

  return (
    <div className={styles.bar} role="region" aria-label="Campanha Black Friday">
      <span className={styles.label}>
        <span className={styles.f1}>Black Friday MyClinica</span>
        <span className={styles.f2}>Black Friday estendida: últimos dias</span>
      </span>
      <span className={styles.msg}>
        {TEXTO_TESTE} <span className={styles.long}>{TEXTO_CONTRATO}</span>
      </span>
      <span className={styles.count}>
        Termina em <strong>{formatarRestante(agora)}</strong>
      </span>
    </div>
  );
}
