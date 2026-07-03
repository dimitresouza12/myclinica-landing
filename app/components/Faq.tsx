'use client';
import { useState } from 'react';
import styles from './Faq.module.css';
import RevealSection from './RevealSection';

const faqs = [
  {
    q: 'Precisa de cartão de crédito para testar?',
    a: 'Não. Você cria sua conta e usa o sistema por 7 dias completos sem precisar cadastrar nenhum cartão. Só cobramos se você decidir continuar.',
  },
  {
    q: 'Consigo migrar meus dados de outro sistema?',
    a: 'Sim. Nossa equipe faz a migração gratuitamente. Importamos pacientes, agendamentos e histórico de outros sistemas como Clinicorp, iDental, OdontoSoft e planilhas Excel. Você não perde nenhum dado.',
  },
  {
    q: 'O sistema funciona para qual especialidade?',
    a: 'Para 7 especialidades: Odontologia, Medicina, Estética, Veterinária, Fisioterapia, Psicologia e Nutrição. Cada uma tem seu próprio prontuário com campos específicos — nada genérico.',
  },
  {
    q: 'O bot de IA do WhatsApp funciona como?',
    a: 'Você conecta seu número do WhatsApp e o bot passa a responder automaticamente: agenda consultas, envia confirmações, lembra os pacientes 24h antes e ainda capta leads no CRM. Tudo sem você precisar digitar uma mensagem.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim, sem multa e sem burocracia. O cancelamento é feito pelo próprio painel com um clique. Você continua com acesso até o fim do período pago.',
  },
  {
    q: 'Os dados dos pacientes ficam seguros?',
    a: 'Sim. Todos os dados são criptografados, hospedados em servidores no Brasil e estão em conformidade com a LGPD. Cada clínica tem seu banco de dados isolado — nenhuma outra clínica acessa suas informações.',
  },
  {
    q: 'Tem aplicativo para celular?',
    a: 'O sistema funciona direto no navegador do celular, sem precisar instalar nada. A interface é totalmente responsiva — você acessa pelo iPhone, Android ou computador com a mesma experiência.',
  },
  {
    q: 'Quantos usuários posso cadastrar?',
    a: 'Depende do plano. No Profissional você cadastra até 3 usuários (recepcionista, dentista, gerente). No Clínica o número é ilimitado. Todos com controle de permissões por perfil.',
  },
  {
    q: 'O prontuário eletrônico tem validade jurídica?',
    a: 'Sim. O prontuário gerado pelo MyClínica segue as normas do CFM, CFO e CFF. Inclui assinatura digital com validade jurídica, registro de data/hora e logs de acesso — aceito como documento oficial.',
  },
  {
    q: 'Tem suporte em caso de dúvidas?',
    a: 'Suporte por WhatsApp de segunda a sábado, das 8h às 18h. Respondemos em até 1 hora. Para planos Clínica, há suporte prioritário com gerente de conta dedicado.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <RevealSection className={styles.header} tag="div">
          <span className={styles.badge}>FAQ</span>
          <h2 className={styles.title}>Perguntas frequentes</h2>
          <p className={styles.subtitle}>
            Tudo que você precisa saber antes de começar.
          </p>
        </RevealSection>

        <RevealSection className={styles.list} tag="div">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={styles.icon}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className={styles.answer}>{faq.a}</div>
              )}
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
