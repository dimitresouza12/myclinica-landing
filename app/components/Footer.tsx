import Logotype from './Logotype';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <Logotype className={styles.logotype} />
          </span>
          <span className={styles.tagline}>Sistema completo de gestão para clínicas</span>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <a href="#features">Funcionalidades</a>
          <a href="#plans">Planos</a>
          <a href="#contact">Contato</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/termos">Termos de Uso</a>
        </nav>
        <span className={styles.copy}>© {new Date().getFullYear()} My Clínica. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
