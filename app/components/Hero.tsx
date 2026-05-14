import styles from './Hero.module.css';

const WHATSAPP = 'https://wa.me/5588988557247';
const SAAS_REGISTER = 'https://myclinica.online/login?mode=register';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.badge}>Sistema completo para clínicas ✦</div>
        <h1 className={styles.title}>
          Gerencie sua clínica com{' '}
          <span className={styles.highlight}>inteligência e simplicidade</span>
        </h1>
        <p className={styles.subtitle}>
          Prontuário eletrônico, agendamento online, financeiro, equipe e CRM integrado ao WhatsApp.
          Tudo em uma plataforma feita para profissionais da saúde.
        </p>
        <div className={styles.ctas}>
          <a href={SAAS_REGISTER} className={styles.primary}>
            Testar grátis por 7 dias →
          </a>
          <a href="#features" className={styles.secondary}>
            Ver funcionalidades
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>Prontuário</strong>
            <span>Eletrônico completo</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>Agendamento</strong>
            <span>Online integrado</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>CRM</strong>
            <span>Via WhatsApp</span>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.mockup}>
          <div className={styles.mockupBar}>
            <span /><span /><span />
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.mockupSidebar}>
              {['Dashboard', 'Pacientes', 'Agenda', 'Financeiro', 'Equipe'].map(item => (
                <div key={item} className={styles.mockupSidebarItem}>{item}</div>
              ))}
            </div>
            <div className={styles.mockupMain}>
              <div className={styles.mockupCard}>
                <div className={styles.mockupCardHeader} />
                <div className={styles.mockupRow} />
                <div className={styles.mockupRow} style={{ width: '75%' }} />
                <div className={styles.mockupRow} style={{ width: '60%' }} />
              </div>
              <div className={styles.mockupGrid}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={styles.mockupKpi}>
                    <div className={styles.mockupKpiValue} />
                    <div className={styles.mockupKpiLabel} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.glow} />
      </div>
    </section>
  );
}
