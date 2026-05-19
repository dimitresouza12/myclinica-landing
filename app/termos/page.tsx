import type { Metadata } from 'next';
import styles from '../privacidade/privacidade.module.css';

export const metadata: Metadata = {
  title: 'Termos de Uso — My Clínica',
  description: 'Leia os termos e condições de uso da plataforma My Clínica.',
};

export default function TermosPage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <a href="/" className={styles.back}>← Voltar ao site</a>
        <h1>Termos de Uso</h1>
        <p className={styles.updated}>Última atualização: 19 de maio de 2026</p>

        <section>
          <h2>1. Aceitação dos termos</h2>
          <p>
            Ao criar uma conta e usar o <strong>My Clínica</strong>, você concorda com estes
            Termos de Uso. Se não concordar, não utilize a plataforma.
          </p>
        </section>

        <section>
          <h2>2. Descrição do serviço</h2>
          <p>
            O My Clínica é um sistema de gestão para clínicas e consultórios que oferece:
            prontuário eletrônico, agendamento, financeiro, CRM, estoque e integrações
            (como Google Calendar). O serviço é fornecido por assinatura mensal.
          </p>
        </section>

        <section>
          <h2>3. Cadastro e conta</h2>
          <ul>
            <li>Você deve fornecer informações verdadeiras no cadastro.</li>
            <li>É responsável por manter a segurança da sua senha.</li>
            <li>Uma conta representa uma clínica ou consultório.</li>
            <li>O período de teste gratuito (trial) é de uso único por clínica.</li>
          </ul>
        </section>

        <section>
          <h2>4. Uso aceitável</h2>
          <p>Você concorda em não:</p>
          <ul>
            <li>Usar a plataforma para fins ilegais ou não autorizados.</li>
            <li>Tentar acessar dados de outras clínicas.</li>
            <li>Realizar engenharia reversa ou tentar extrair o código-fonte.</li>
            <li>Sobrecarregar intencionalmente a infraestrutura do serviço.</li>
          </ul>
        </section>

        <section>
          <h2>5. Dados dos pacientes</h2>
          <p>
            Você, como responsável pela clínica, é o controlador dos dados de seus pacientes
            inseridos na plataforma. O My Clínica atua como operador, conforme a LGPD.
            Você é responsável por obter as autorizações necessárias dos seus pacientes para
            o armazenamento e uso dos dados.
          </p>
        </section>

        <section>
          <h2>6. Pagamentos e cancelamento</h2>
          <ul>
            <li>As assinaturas são cobradas mensalmente.</li>
            <li>O cancelamento pode ser feito a qualquer momento, sem multa.</li>
            <li>Após o cancelamento, o acesso é mantido até o fim do período pago.</li>
            <li>Não realizamos reembolso de períodos já pagos, exceto quando exigido por lei.</li>
          </ul>
        </section>

        <section>
          <h2>7. Disponibilidade do serviço</h2>
          <p>
            Buscamos manter a plataforma disponível 24/7, mas não garantimos disponibilidade
            ininterrupta. Manutenções programadas serão comunicadas com antecedência.
            Não nos responsabilizamos por perdas decorrentes de indisponibilidade temporária.
          </p>
        </section>

        <section>
          <h2>8. Propriedade intelectual</h2>
          <p>
            Todo o código, design e marca do My Clínica são propriedade da Otimiza AI.
            Os dados inseridos por você na plataforma são de sua propriedade.
          </p>
        </section>

        <section>
          <h2>9. Limitação de responsabilidade</h2>
          <p>
            O My Clínica não se responsabiliza por danos indiretos, perda de dados por
            uso inadequado, ou decisões médicas baseadas em informações da plataforma.
            A plataforma é uma ferramenta de gestão e não substitui julgamento clínico profissional.
          </p>
        </section>

        <section>
          <h2>10. Alterações nos termos</h2>
          <p>
            Podemos atualizar estes termos. Notificaremos por e-mail com pelo menos 15 dias
            de antecedência para mudanças relevantes. O uso continuado após a notificação
            implica aceitação dos novos termos.
          </p>
        </section>

        <section>
          <h2>11. Lei aplicável</h2>
          <p>
            Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca
            de domicílio do usuário para dirimir eventuais conflitos.
          </p>
        </section>

        <section>
          <h2>12. Contato</h2>
          <p>
            Dúvidas sobre estes termos:<br />
            <a href="mailto:contato@otimiza.net.br">contato@otimiza.net.br</a><br />
            <a href="https://otimizai.net.br">otimizai.net.br</a>
          </p>
        </section>
      </div>
    </main>
  );
}
