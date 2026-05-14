import styles from './Contact.module.css';

const WHATSAPP = 'https://wa.me/5588988557247';

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <span className={styles.badge}>Contato</span>
        <h2 className={styles.title}>Pronto para transformar sua clínica?</h2>
        <p className={styles.subtitle}>
          Fale com a nossa equipe pelo WhatsApp. Respondemos rapidinho.
        </p>

        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.card}>
          <div className={styles.cardIcon}>💬</div>
          <div>
            <strong>WhatsApp</strong>
            <span>Resposta em até 1 hora</span>
          </div>
          <span className={styles.arrow}>→</span>
        </a>
      </div>
    </section>
  );
}
