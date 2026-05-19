import type { Metadata } from 'next';
import styles from './privacidade.module.css';

export const metadata: Metadata = {
  title: 'Política de Privacidade — My Clínica',
  description: 'Saiba como o My Clínica coleta, usa e protege seus dados pessoais.',
};

export default function PrivacidadePage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <a href="/" className={styles.back}>← Voltar ao site</a>
        <h1>Política de Privacidade</h1>
        <p className={styles.updated}>Última atualização: 19 de maio de 2026</p>

        <section>
          <h2>1. Quem somos</h2>
          <p>
            O <strong>My Clínica</strong> é um sistema de gestão para clínicas e consultórios,
            desenvolvido e operado pela <strong>Otimiza AI</strong> (CNPJ a informar),
            com sede no Brasil. Nosso site é <a href="https://site.myclinica.online">site.myclinica.online</a>.
          </p>
        </section>

        <section>
          <h2>2. Dados que coletamos</h2>
          <p>Coletamos os seguintes dados para fornecer nossos serviços:</p>
          <ul>
            <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone e dados da clínica.</li>
            <li><strong>Dados de pacientes:</strong> informações inseridas pelos próprios usuários da plataforma (nome, contato, prontuário).</li>
            <li><strong>Dados de uso:</strong> logs de acesso, dispositivo, IP e navegador.</li>
            <li><strong>Google Calendar:</strong> quando você conecta sua conta Google, acessamos eventos do calendário exclusivamente para sincronizar agendamentos com a sua agenda. Não armazenamos permanentemente dados do Google Calendar em nossos servidores além do necessário para a sincronização.</li>
          </ul>
        </section>

        <section>
          <h2>3. Como usamos seus dados</h2>
          <ul>
            <li>Fornecer e melhorar a plataforma My Clínica.</li>
            <li>Sincronizar agendamentos com o Google Calendar (somente se você autorizar).</li>
            <li>Enviar comunicações sobre o serviço (notificações, suporte, atualizações).</li>
            <li>Cumprir obrigações legais.</li>
          </ul>
        </section>

        <section>
          <h2>4. Uso da API do Google</h2>
          <p>
            O My Clínica utiliza a API do Google Calendar para sincronizar agendamentos.
            O uso de informações recebidas das APIs do Google respeitará a{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
              Política de Dados do Usuário dos Serviços de API do Google
            </a>
            , incluindo os requisitos de Uso Limitado.
          </p>
          <p>
            Especificamente: os dados obtidos via Google Calendar API são usados apenas para
            exibir e sincronizar agendamentos dentro da plataforma. Não compartilhamos,
            vendemos nem usamos esses dados para fins de publicidade.
          </p>
        </section>

        <section>
          <h2>5. Compartilhamento de dados</h2>
          <p>Não vendemos seus dados. Podemos compartilhá-los apenas com:</p>
          <ul>
            <li><strong>Supabase:</strong> banco de dados e autenticação (infraestrutura segura).</li>
            <li><strong>Google:</strong> para integração com Google Calendar, quando autorizado.</li>
            <li><strong>Autoridades legais:</strong> quando exigido por lei.</li>
          </ul>
        </section>

        <section>
          <h2>6. Armazenamento e segurança</h2>
          <p>
            Seus dados são armazenados em servidores seguros com criptografia em trânsito (HTTPS)
            e em repouso. Utilizamos autenticação segura via Supabase Auth e seguimos boas
            práticas de segurança da informação.
          </p>
        </section>

        <section>
          <h2>7. Seus direitos (LGPD)</h2>
          <p>De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
          <ul>
            <li>Acessar os dados que temos sobre você.</li>
            <li>Corrigir dados incompletos ou desatualizados.</li>
            <li>Solicitar a exclusão dos seus dados.</li>
            <li>Revogar o consentimento de uso dos seus dados a qualquer momento.</li>
            <li>Portabilidade dos dados.</li>
          </ul>
          <p>Para exercer seus direitos, entre em contato: <a href="mailto:contato@otimiza.net.br">contato@otimiza.net.br</a></p>
        </section>

        <section>
          <h2>8. Cookies</h2>
          <p>
            Utilizamos cookies estritamente necessários para autenticação e funcionamento da
            plataforma. Não utilizamos cookies de rastreamento ou publicidade.
          </p>
        </section>

        <section>
          <h2>9. Alterações nesta política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Notificaremos usuários sobre
            mudanças relevantes por e-mail ou aviso na plataforma.
          </p>
        </section>

        <section>
          <h2>10. Contato</h2>
          <p>
            Dúvidas sobre esta política? Entre em contato:<br />
            <a href="mailto:contato@otimiza.net.br">contato@otimiza.net.br</a><br />
            <a href="https://otimizai.net.br">otimizai.net.br</a>
          </p>
        </section>
      </div>
    </main>
  );
}
