'use client';
import { useState } from 'react';
import styles from './Faq.module.css';
import RevealSection from './RevealSection';

const faqs = [
  {
    q: 'Precisa de cartão de crédito para testar?',
    a: 'Não. Você cria sua conta e usa o sistema por 14 dias completos sem precisar cadastrar nenhum cartão. Só cobramos se você decidir continuar.',
  },
  {
    q: 'Consigo migrar meus dados de outro sistema?',
    a: 'Sim. Nossa equipe faz a migração gratuitamente. Importamos pacientes, agendamentos e histórico de outros sistemas como Clinicorp, iDental, OdontoSoft e planilhas Excel. Você não perde nenhum dado.',
  },
  {
    q: 'O sistema funciona para qual especialidade?',
    a: 'Para 9 especialidades: Odontologia, Medicina, Estética, Veterinária, Fisioterapia, Psicologia, Nutrição, Fonoaudiologia e Terapia Ocupacional. Cada uma tem seu próprio prontuário com campos específicos, nada genérico.',
  },
  {
    q: 'O bot de IA do WhatsApp funciona como?',
    a: 'Você conecta seu número do WhatsApp e o bot passa a responder automaticamente: agenda consultas, envia confirmações, lembra os pacientes 24h antes e ainda capta leads no CRM. Tudo sem você precisar digitar uma mensagem. O atendente de IA faz parte do plano com IA, sob consulta. A aba de Mensagens do WhatsApp e a confirmação automática por SIM ou NÃO estão em todos os planos.',
  },
  {
    q: 'Como funciona o cancelamento?',
    a: 'No plano mensal, sem contrato, você cancela quando quiser, pelo próprio painel, e continua com acesso até o fim do período pago. Nos planos com contrato de 3, 6 ou 12 meses vale o prazo contratado: o desconto vem justamente desse compromisso.',
  },
  {
    q: 'Os dados dos pacientes ficam seguros?',
    a: 'Sim. Todos os dados são criptografados, hospedados em servidores no Brasil e estão em conformidade com a LGPD. Cada clínica tem seu banco de dados isolado, e nenhuma outra clínica acessa suas informações.',
  },
  {
    q: 'Tem aplicativo para celular?',
    a: 'O sistema funciona direto no navegador e também pode ser instalado na tela inicial do celular, como um aplicativo, no iPhone ou no Android. A interface é responsiva: a mesma experiência no celular e no computador.',
  },
  {
    q: 'Quantos usuários posso cadastrar?',
    a: 'Depende do plano, e só contam profissionais que atendem paciente (dentista, médico, terapeuta etc). No Essencial é 1 profissional, no Completo até 3 e no Equipe até 6. Para clínicas com 7 ou mais profissionais, fale com a gente. Recepcionistas e auxiliares têm login ilimitado em qualquer plano, sem custo extra. Todos com controle de permissões por perfil.',
  },
  {
    q: 'Como o prontuário eletrônico registra as informações?',
    a: 'O prontuário gerado pelo MyClínica segue as normas do CFM, CFO e CFF. Inclui assinatura eletrônica com registro de data/hora e logs de acesso.',
  },
  {
    q: 'Tem suporte em caso de dúvidas?',
    a: 'Suporte por WhatsApp de segunda a sábado, das 8h às 18h. Respondemos em até 1 hora. Clínicas maiores, no plano sob consulta, têm suporte prioritário com gerente de conta dedicado.',
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
