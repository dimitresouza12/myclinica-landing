'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const WHATSAPP = 'https://wa.me/5588988557247';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#hero" className={styles.logo}>
          <Image src="/favicon.svg" alt="MyClínica" width={28} height={28} className={styles.logoImg} />
          <span>My<strong>Clínica</strong></span>
        </a>

        <ul className={`${styles.links} ${open ? styles.open : ''}`}>
          <li><a href="#features" onClick={() => setOpen(false)}>Funcionalidades</a></li>
          <li><a href="#plans" onClick={() => setOpen(false)}>Planos</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contato</a></li>
        </ul>

        <div className={styles.actions}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            Fale Conosco
          </a>
          <button
            className={styles.hamburger}
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
