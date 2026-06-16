'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const SAAS_REGISTER = 'https://myclinica.online/login?quiz=true';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#hero" className={styles.logo}>
          <Image src="/logo.png" alt="MyClínica" width={30} height={30} className={styles.logoImg} priority />
          <span>My<strong>Clínica</strong></span>
        </a>

        <ul className={`${styles.links} ${open ? styles.open : ''}`}>
          <li><a href="#features" onClick={() => setOpen(false)}>Produto</a></li>
          <li><a href="#specialties" onClick={() => setOpen(false)}>Especialidades</a></li>
          <li><a href="#preview" onClick={() => setOpen(false)}>Preview</a></li>
          <li><a href="#plans" onClick={() => setOpen(false)}>Planos</a></li>
          <li><a href="#faq" onClick={() => setOpen(false)}>FAQ</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contato</a></li>
        </ul>

        <div className={styles.actions}>
          <a href={SAAS_REGISTER} className={styles.ctaBtn}>Testar grátis</a>
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
