'use client';

import { useEffect } from 'react';
import styles from './CampanhaBar.module.css';
import { agoraCampanha, contagemLancamento, faseEm, TEXTO_OFERTA, TEXTO_PRIMEIRA, TEXTO_TESTE } from '../lib/campanha';
import { PRECO_GANCHO } from './Plans';
import { useAgora } from '../lib/useAgora';

/**
 * Faixa fixa do topo da campanha. Aparece conforme <html data-campanha="1">
 * (definido antes da primeira pintura por CAMPANHA_BOOT_SCRIPT). Fora da
 * campanha fica oculta.
 */
export default function CampanhaBar() {
  const agora = useAgora();

  // Acompanha a virada com a pagina aberta: o script do <head> so decide a
  // fase no carregamento. Aqui o atributo e atualizado a cada tick e, ao
  // acabar a campanha, tema e faixa somem sozinhos.
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

  // Um "bloco" do carrossel. Repetido varias vezes (e duplicado em 2 metades)
  // para a faixa rolar sem emenda: a animacao anda -50% e recomeca igual.
  const contagem = contagemLancamento(agora);
  const bloco = (
    <>
      {contagem && (
        <span className={styles.item}>
          <strong>Lançamento oficial hoje às 18h</strong> · faltam {contagem}
        </span>
      )}
      <span className={styles.item}>
        <span className={styles.label}>Black Friday MyClinica</span>
      </span>
      <span className={styles.item}>
        <strong>{TEXTO_OFERTA}</strong>
      </span>
      <span className={styles.item}>{TEXTO_PRIMEIRA}</span>
      <span className={styles.item}>Oferta até 30/11</span>
      <span className={styles.item}>{TEXTO_TESTE}</span>
      <span className={styles.item}>
        Planos a partir de <strong>{PRECO_GANCHO}/mês</strong>
      </span>
      <span className={`${styles.item} ${styles.cta}`}>Ver ofertas &rarr;</span>
    </>
  );

  return (
    <div className={styles.bar} role="region" aria-label="Campanha Black Friday">
      <a href="#plans" className={styles.link}>
        <span className={styles.track}>
          {[0, 1, 2, 3].map(n => (
            <span key={n} className={styles.group} aria-hidden={n > 0 || undefined}>
              {bloco}
            </span>
          ))}
        </span>
      </a>
    </div>
  );
}
