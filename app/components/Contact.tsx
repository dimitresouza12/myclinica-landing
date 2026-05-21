import styles from './Contact.module.css';

const WHATSAPP = 'https://wa.me/5588988557247';

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.inner}>
          <span className={styles.badge}>Contato</span>
          <h2 className={styles.title}>
            Pronto para transformar<br />
            <span className={styles.highlight}>sua clínica?</span>
          </h2>
          <p className={styles.subtitle}>
            Fale com a nossa equipe pelo WhatsApp. Respondemos rapidinho e ajudamos você a configurar tudo.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.btn}>
            <span className={styles.btnIcon}>💬</span>
            Falar pelo WhatsApp
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 9h16M10 3l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
          <p className={styles.note}>Resposta em até 1 hora · Seg–Sáb, 8h–18h</p>
        </div>
      </div>
    </section>
  );
}
