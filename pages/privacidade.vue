<template>
  <div class="min-h-screen bg-green-900 text-white font-[Poppins] pt-28 px-6">
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-4 fade-on-scroll">
      Política de Privacidade
    </h1>
    <p class="text-center text-slate-300 mb-12 fade-on-scroll" data-delay="0">
      Última atualização: 14 de julho de 2026
    </p>

    <section class="max-w-4xl mx-auto pb-24 fade-on-scroll space-y-10" data-delay="0">

      <!-- Sumário -->
      <div class="bg-green-800/50 rounded-2xl p-6 border border-green-700">
        <h2 class="text-lg font-semibold mb-3">Nesta política</h2>
        <ul class="grid sm:grid-cols-2 gap-2 text-sm text-slate-200">
          <li><a href="#introducao" class="underline hover:text-white">1. Introdução</a></li>
          <li><a href="#dados-coletados" class="underline hover:text-white">2. Dados que coletamos</a></li>
          <li><a href="#google" class="underline hover:text-white">3. Integração com o Google (OAuth e Google Ads API)</a></li>
          <li><a href="#finalidade" class="underline hover:text-white">4. Finalidade do tratamento</a></li>
          <li><a href="#base-legal" class="underline hover:text-white">5. Base legal (LGPD)</a></li>
          <li><a href="#compartilhamento" class="underline hover:text-white">6. Compartilhamento de dados</a></li>
          <li><a href="#seguranca" class="underline hover:text-white">7. Segurança da informação</a></li>
          <li><a href="#retencao" class="underline hover:text-white">8. Armazenamento e retenção</a></li>
          <li><a href="#cookies" class="underline hover:text-white">9. Cookies</a></li>
          <li><a href="#direitos" class="underline hover:text-white">10. Seus direitos como titular</a></li>
          <li><a href="#revogacao" class="underline hover:text-white">11. Como revogar o acesso ao Google</a></li>
          <li><a href="#criancas" class="underline hover:text-white">12. Uso por menores de idade</a></li>
          <li><a href="#alteracoes" class="underline hover:text-white">13. Alterações nesta política</a></li>
          <li><a href="#contato" class="underline hover:text-white">14. Contato e encarregado de dados</a></li>
        </ul>
      </div>

      <!-- 1 -->
      <div id="introducao">
        <h2 class="text-2xl font-bold mb-3">1. Introdução</h2>
        <p class="text-slate-100 leading-relaxed">
          Esta Política de Privacidade descreve como a <strong>SuaAgenda</strong> ("nós", "plataforma") coleta, usa,
          armazena e protege os dados pessoais dos usuários ("você", "titular") que utilizam nosso sistema de agenda
          online e o módulo <strong>SuaAgenda IA</strong>, responsável pela criação e otimização automática de
          campanhas no Google Ads. Ao utilizar nossos serviços, você concorda com as práticas descritas neste
          documento, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
        </p>
      </div>

      <!-- 2 -->
      <div id="dados-coletados">
        <h2 class="text-2xl font-bold mb-3">2. Dados que coletamos</h2>
        <p class="text-slate-100 leading-relaxed mb-3">Coletamos as seguintes categorias de dados:</p>
        <ul class="list-disc list-inside space-y-2 text-slate-100">
          <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone e nome do negócio (barbearia/salão).</li>
          <li><strong>Dados de agendamento:</strong> serviços oferecidos, preços, horários e histórico de agendamentos dos seus clientes finais.</li>
          <li><strong>Dados de conta Google (quando você conecta sua conta Google Ads):</strong> informações de campanhas, grupos de anúncios, métricas de desempenho (cliques, impressões, custo, conversões) e configurações de lance.</li>
          <li><strong>Dados de uso da plataforma:</strong> logs de acesso, endereço IP, tipo de dispositivo e navegador, para fins de segurança e suporte técnico.</li>
          <li><strong>Dados de comunicação:</strong> mensagens trocadas com nosso suporte, incluindo via WhatsApp.</li>
        </ul>
      </div>

      <!-- 3 -->
      <div id="google">
        <h2 class="text-2xl font-bold mb-3">3. Integração com o Google (OAuth e Google Ads API)</h2>
        <p class="text-slate-100 leading-relaxed mb-3">
          O módulo <strong>SuaAgenda IA</strong> se conecta à sua conta do Google Ads por meio do protocolo
          <strong>OAuth 2.0</strong>, utilizando o escopo <code class="bg-black/30 px-1.5 py-0.5 rounded text-sm">https://www.googleapis.com/auth/adwords</code>.
          Essa autorização nos permite, exclusivamente em seu nome e para a sua própria conta de anúncios:
        </p>
        <ul class="list-disc list-inside space-y-2 text-slate-100 mb-3">
          <li>Ler o histórico de agendamentos, serviços e ticket médio já cadastrados na sua conta SuaAgenda, para orientar a criação das campanhas;</li>
          <li>Criar e configurar campanhas, grupos de anúncios e anúncios de pesquisa segmentados por serviço;</li>
          <li>Ler métricas de desempenho das campanhas (cliques, custo por clique, conversões registradas);</li>
          <li>Ajustar lances, pausar ou reativar grupos de anúncios e adicionar palavras-chave, de forma automática, com base no desempenho semanal.</li>
        </ul>
        <p class="text-slate-100 leading-relaxed mb-3">
          <strong>Não temos acesso a outros produtos do Google</strong> além da API do Google Ads. Não lemos, armazenamos
          ou compartilhamos e-mails do Gmail, arquivos do Google Drive, contatos ou qualquer outro dado do Google que
          não esteja diretamente relacionado à sua conta de anúncios.
        </p>
        <p class="text-slate-100 leading-relaxed mb-3">
          O uso e a transferência de informações recebidas das APIs do Google por parte da SuaAgenda IA seguem a
          <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener" class="underline hover:text-white">
            Política de Dados do Usuário dos Serviços de API do Google
          </a>, incluindo os requisitos de Uso Limitado.
        </p>
        <p class="text-slate-100 leading-relaxed">
          A verba investida em anúncios é debitada diretamente pelo Google na sua própria conta de faturamento do
          Google Ads — a SuaAgenda <strong>não tem acesso e não processa</strong> nenhum dado de pagamento ou cartão
          associado à sua conta Google.
        </p>
      </div>

      <!-- 4 -->
      <div id="finalidade">
        <h2 class="text-2xl font-bold mb-3">4. Finalidade do tratamento</h2>
        <p class="text-slate-100 leading-relaxed">
          Utilizamos os dados coletados para: (i) viabilizar o funcionamento do sistema de agenda; (ii) criar,
          monitorar e otimizar automaticamente campanhas de Google Ads em seu nome; (iii) gerar relatórios de
          desempenho em linguagem simples; (iv) prestar suporte técnico e comunicação institucional; e
          (v) cumprir obrigações legais e regulatórias aplicáveis.
        </p>
      </div>

      <!-- 5 -->
      <div id="base-legal">
        <h2 class="text-2xl font-bold mb-3">5. Base legal (LGPD)</h2>
        <p class="text-slate-100 leading-relaxed">
          O tratamento dos seus dados pessoais é realizado com base no <strong>consentimento</strong> do titular
          (art. 7º, I, LGPD) — obtido, entre outros momentos, no fluxo de autorização OAuth do Google — e na
          <strong>execução de contrato</strong> (art. 7º, V, LGPD), necessária para a prestação dos serviços
          contratados na plataforma.
        </p>
      </div>

      <!-- 6 -->
      <div id="compartilhamento">
        <h2 class="text-2xl font-bold mb-3">6. Compartilhamento de dados</h2>
        <p class="text-slate-100 leading-relaxed mb-3">
          Não vendemos seus dados pessoais. O compartilhamento ocorre apenas nas seguintes situações:
        </p>
        <ul class="list-disc list-inside space-y-2 text-slate-100">
          <li>Com o <strong>Google</strong>, exclusivamente por meio da API oficial do Google Ads, para execução das campanhas autorizadas por você;</li>
          <li>Com provedores de infraestrutura e hospedagem que processam dados em nosso nome, sob obrigações contratuais de confidencialidade;</li>
          <li>Quando exigido por lei, ordem judicial ou requisição de autoridade competente.</li>
        </ul>
      </div>

      <!-- 7 -->
      <div id="seguranca">
        <h2 class="text-2xl font-bold mb-3">7. Segurança da informação</h2>
        <p class="text-slate-100 leading-relaxed">
          Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados,
          perda, alteração ou divulgação indevida, incluindo criptografia em trânsito (HTTPS/TLS), controle de
          acesso por autenticação, e armazenamento seguro de tokens de acesso do Google — que nunca são expostos
          em texto plano nem compartilhados com terceiros não autorizados.
        </p>
      </div>

      <!-- 8 -->
      <div id="retencao">
        <h2 class="text-2xl font-bold mb-3">8. Armazenamento e retenção</h2>
        <p class="text-slate-100 leading-relaxed">
          Seus dados são armazenados pelo tempo necessário à prestação dos serviços contratados. Tokens de acesso
          à sua conta Google são mantidos apenas enquanto a integração estiver ativa e são excluídos
          automaticamente em caso de cancelamento do serviço ou revogação do acesso (veja a seção 11).
        </p>
      </div>

      <!-- 9 -->
      <div id="cookies">
        <h2 class="text-2xl font-bold mb-3">9. Cookies</h2>
        <p class="text-slate-100 leading-relaxed">
          Utilizamos cookies próprios para lembrar suas preferências de navegação e cookies de terceiros para
          entender o desempenho da nossa própria divulgação (analytics). Nenhum dado coletado por cookies é
          vendido a terceiros. Você pode gerenciar ou recusar cookies diretamente nas configurações do seu
          navegador.
        </p>
      </div>

      <!-- 10 -->
      <div id="direitos">
        <h2 class="text-2xl font-bold mb-3">10. Seus direitos como titular</h2>
        <p class="text-slate-100 leading-relaxed mb-3">Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
        <ul class="list-disc list-inside space-y-2 text-slate-100">
          <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;</li>
          <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
          <li>Eliminação dos dados tratados com base no seu consentimento;</li>
          <li>Revogação do consentimento, a qualquer momento.</li>
        </ul>
      </div>

      <!-- 11 -->
      <div id="revogacao">
        <h2 class="text-2xl font-bold mb-3">11. Como revogar o acesso ao Google</h2>
        <p class="text-slate-100 leading-relaxed mb-3">
          Você pode revogar, a qualquer momento e de forma independente da SuaAgenda, o acesso concedido à
          integração com sua conta Google:
        </p>
        <ol class="list-decimal list-inside space-y-2 text-slate-100">
          <li>Acesse <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener" class="underline hover:text-white">myaccount.google.com/permissions</a>;</li>
          <li>Localize <strong>SuaAgenda IA</strong> na lista de apps conectados;</li>
          <li>Clique em "Remover acesso".</li>
        </ol>
        <p class="text-slate-100 leading-relaxed mt-3">
          Após a revogação, nossos sistemas perdem imediatamente a capacidade de criar ou modificar campanhas na
          sua conta, e os tokens associados armazenados em nossa base são invalidados. Você também pode solicitar
          a exclusão completa dos seus dados na plataforma pelo canal de contato indicado na seção 14.
        </p>
      </div>

      <!-- 12 -->
      <div id="criancas">
        <h2 class="text-2xl font-bold mb-3">12. Uso por menores de idade</h2>
        <p class="text-slate-100 leading-relaxed">
          Nossos serviços são destinados a profissionais e empresas maiores de 18 anos. Não coletamos
          intencionalmente dados de menores de idade.
        </p>
      </div>

      <!-- 13 -->
      <div id="alteracoes">
        <h2 class="text-2xl font-bold mb-3">13. Alterações nesta política</h2>
        <p class="text-slate-100 leading-relaxed">
          Esta política pode ser atualizada periodicamente para refletir melhorias no serviço ou mudanças legais.
          A versão mais recente estará sempre publicada nesta página, com a data de atualização indicada no topo.
        </p>
      </div>

      <!-- 14 -->
      <div id="contato">
        <h2 class="text-2xl font-bold mb-3">14. Contato e encarregado de dados</h2>
        <p class="text-slate-100 leading-relaxed">
          Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail
          <a href="mailto:privacidade@suaagenda.link" class="underline hover:text-white">privacidade@suaagenda.link</a>
          ou pelo WhatsApp disponível em nosso site.
        </p>
      </div>

    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })
const name = 'Política de Privacidade | SuaAgenda IA'
const content = 'Saiba como a SuaAgenda IA coleta, usa e protege seus dados, incluindo a integração via OAuth com o Google Ads API.'
const slug = 'privacidade'

useHead({
  title: name,
  meta: [
    { name: 'description', content },
    { property: 'og:title', content: name },
    { property: 'og:description', content },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://suaagenda.link/${slug}/` },
    { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: name },
    { name: 'twitter:description', content },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' }
  ],
  link: [
    { rel: 'canonical', href: `https://suaagenda.link/${slug}/` }
  ]
})
</script>