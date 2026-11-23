import styles from './Logotype.module.css';

/**
 * Logotipo "MyClínica": o "My" e um batimento de traco continuo com pontas
 * arredondadas; "Clínica" e Nunito Bold 700. Mesmo desenho do app
 * (src/components/login/Logotype.tsx). O tamanho vem do font-size do pai
 * (altura 1.25em, largura 5.41em). O batimento e verde-petroleo no fundo claro
 * e branco no fundo escuro (tema preto da campanha).
 */
export default function Logotype({ className }: { className?: string }) {
  return (
    <svg
      className={`${styles.logotype} ${className ?? ''}`}
      viewBox="-70 -830 4584 1060"
      role="img"
      aria-label="MyClínica"
    >
      <path
        className={styles.beat}
        d="M0 -272H150L320 -697L530 160L730 -600L890 -272M1000 -484L1175 -20M1350 -484L1175 -20L1105 160"
      />
      <text className={styles.word} x="1431" y="0" textLength="3110" lengthAdjust="spacingAndGlyphs">
        Clínica
      </text>
    </svg>
  );
}
