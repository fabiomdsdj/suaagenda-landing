<template>
  <div class="min-h-screen bg-green-900 text-white font-[Poppins] pt-28 px-6">
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-4 fade-on-scroll">
      Termos de Serviço
    </h1>
    <p class="text-center text-slate-300 mb-12 fade-on-scroll" data-delay="0">
      Última atualização: 14 de julho de 2026
    </p>

    <section class="max-w-4xl mx-auto pb-24 fade-on-scroll space-y-10" data-delay="0">

      <!-- Sumário -->
      <div class="bg-green-800/50 rounded-2xl p-6 border border-green-700">
        <h2 class="text-lg font-semibold mb-3">Nestes termos</h2>
        <ul class="grid sm:grid-cols-2 gap-2 text-sm text-slate-200">
          <li><a href="#objeto" class="underline hover:text-white">1. Objeto</a></li>
          <li><a href="#servico-ia" class="underline hover:text-white">2. Funcionamento do módulo de IA</a></li>
          <li><a href="#google" class="underline hover:text-white">3. Integração com Google e Google Ads API</a></li>
          <li><a href="#obrigacoes-plataforma" class="underline hover:text-white">4. Obrigações da Plataforma</a></li>
          <li><a href="#obrigacoes-usuario" class="underline hover:text-white">5. Obrigações do Usuário</a></li>
          <li><a href="#valores" class="underline hover:text-white">6. Valores, verba de anúncios e pagamento</a></li>
          <li><a href="#garantia" class="underline hover:text-white">7. Garantia de resultado</a></li>
          <li><a href="#responsabilidade" class="underline hover:text-white">8. Limitação de responsabilidade</a></li>
          <li><a href="#confidencialidade" class="underline hover:text-white">9. Confidencialidade e dados</a></li>
          <li><a href="#vigencia" class="underline hover:text-white">10. Vigência, cancelamento e rescisão</a></li>
          <li><a href="#propriedade" class="underline hover:text-white">11. Propriedade intelectual</a></li>
          <li><a href="#alteracoes" class="underline hover:text-white">12. Alterações nestes termos</a></li>
          <li><a href="#foro" class="underline hover:text-white">13. Legislação e foro</a></li>
          <li><a href="#contato" class="underline hover:text-white">14. Contato</a></li>
        </ul>
      </div>

      <!-- 1 -->
      <div id="objeto">
        <h2 class="text-2xl font-bold mb-3">1. Objeto</h2>
        <p class="text-slate-100 leading-relaxed">
          Estes Termos de Serviço regulam o uso da plataforma <strong>SuaAgenda</strong>, incluindo o sistema de
          agenda online e o módulo opcional <strong>SuaAgenda IA</strong>, que presta serviço de criação,
          monitoramento e otimização automática de campanhas de tráfego pago no Google Ads, voltado a barbearias,
          salões e profissionais autônomos do setor.
        </p>
      </div>

      <!-- 2 -->
      <div id="servico-ia">
        <h2 class="text-2xl font-bold mb-3">2. Funcionamento do módulo de IA</h2>
        <p class="text-slate-100 leading-relaxed mb-3">
          Ao contratar o módulo SuaAgenda IA, você entende e concorda que:
        </p>
        <ul class="list-disc list-inside space-y-2 text-slate-100">
          <li>As campanhas são criadas <strong>automaticamente</strong>, com base nos dados já cadastrados na sua conta (serviços, preços, ticket médio, localização e histórico de agendamentos);</li>
          <li>A cada semana, o sistema analisa o desempenho e pode <strong>ajustar lances, pausar serviços sem retorno e adicionar novas palavras-chave</strong>, sem necessidade de aprovação manual a cada alteração;</li>
          <li>Você pode acompanhar todas as ações da IA pelo seu painel, mas o modelo do serviço é a automação — não a gestão manual passo a passo típica de uma agência tradicional.</li>
        </ul>
      </div>

      <!-- 3 -->
      <div id="google">
        <h2 class="text-2xl font-bold mb-3">3. Integração com Google e Google Ads API</h2>
        <p class="text-slate-100 leading-relaxed mb-3">
          Para operar o módulo de IA, você autoriza a SuaAgenda, por meio do protocolo OAuth 2.0 do Google, a
          acessar sua conta do Google Ads com o escopo
          <code class="bg-black/30 px-1.5 py-0.5 rounded text-sm">https://www.googleapis.com/auth/adwords</code>,
          permitindo criar, editar, pausar e ler dados de campanhas exclusivamente em seu nome. Detalhes completos
          sobre o uso desses dados constam na nossa
          <NuxtLink to="/privacidade" class="underline hover:text-white">Política de Privacidade</NuxtLink>.
        </p>
        <p class="text-slate-100 leading-relaxed mb-3">
          A verba de anúncios é debitada <strong>diretamente pelo Google</strong> na sua própria conta de
          faturamento — a SuaAgenda não intermedia, retém ou tem acesso a esses valores, e você pode aumentar,
          reduzir ou pausar o investimento a qualquer momento diretamente pelo Google Ads.
        </p>
        <p class="text-slate-100 leading-relaxed">
          Você pode revogar o acesso da SuaAgenda à sua conta Google a qualquer momento em
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener" class="underline hover:text-white">myaccount.google.com/permissions</a>.
          A revogação interrompe imediatamente a criação e otimização automática de campanhas.
        </p>
      </div>

      <!-- 4 -->
      <div id="obrigacoes-plataforma">
        <h2 class="text-2xl font-bold mb-3">4. Obrigações da Plataforma</h2>
        <p class="text-slate-100 leading-relaxed">
          Cabe à SuaAgenda: manter o sistema disponível e funcional; ser transparente quanto a valores e ao
          funcionamento do módulo de IA; prestar suporte técnico adequado; e tratar os dados dos usuários em
          conformidade com a LGPD e com a Política de Dados do Usuário dos Serviços de API do Google.
        </p>
      </div>

      <!-- 5 -->
      <div id="obrigacoes-usuario">
        <h2 class="text-2xl font-bold mb-3">5. Obrigações do Usuário</h2>
        <p class="text-slate-100 leading-relaxed">
          Cabe ao usuário: fornecer informações corretas e atualizadas sobre seus serviços e preços; manter uma
          conta ativa e válida no Google Ads com meio de pagamento configurado; utilizar a plataforma de forma
          ética e dentro das políticas de anúncios do Google; e não repassar suas credenciais de acesso a
          terceiros não autorizados.
        </p>
      </div>

      <!-- 6 -->
      <div id="valores">
        <h2 class="text-2xl font-bold mb-3">6. Valores, verba de anúncios e pagamento</h2>
        <p class="text-slate-100 leading-relaxed">
          Os valores do plano contratado e a recomendação de verba mínima de anúncios são informados previamente
          na plataforma antes da contratação. A verba de anúncios (paga diretamente ao Google) é independente da
          mensalidade do módulo de IA e pode ser ajustada livremente pelo usuário a qualquer momento.
        </p>
      </div>

      <!-- 7 -->
      <div id="garantia">
        <h2 class="text-2xl font-bold mb-3">7. Garantia de resultado</h2>
        <p class="text-slate-100 leading-relaxed">
          Conforme condições detalhadas na página comercial do serviço, a garantia de resultado é válida para
          contas que utilizam o sistema de agenda SuaAgenda nativamente, com investimento mínimo sustentado
          durante o período de vigência, e considera exclusivamente agendamentos confirmados de clientes novos
          registrados na própria plataforma.
        </p>
      </div>

      <!-- 8 -->
      <div id="responsabilidade">
        <h2 class="text-2xl font-bold mb-3">8. Limitação de responsabilidade</h2>
        <p class="text-slate-100 leading-relaxed">
          A SuaAgenda atua como intermediadora tecnológica entre o usuário e o Google Ads, e não se responsabiliza
          por instabilidades, alterações de política ou indisponibilidades causadas por serviços de terceiros
          (incluindo o próprio Google), tampouco por resultados comerciais que dependem de fatores externos como
          concorrência local, sazonalidade e mercado.
        </p>
      </div>

      <!-- 9 -->
      <div id="confidencialidade">
        <h2 class="text-2xl font-bold mb-3">9. Confidencialidade e dados</h2>
        <p class="text-slate-100 leading-relaxed">
          Todos os dados fornecidos pelo usuário são tratados de forma sigilosa, conforme detalhado em nossa
          <NuxtLink to="/privacidade" class="underline hover:text-white">Política de Privacidade</NuxtLink>,
          e não serão divulgados a terceiros, salvo quando exigido por lei ou autoridade competente.
        </p>
      </div>

      <!-- 10 -->
      <div id="vigencia">
        <h2 class="text-2xl font-bold mb-3">10. Vigência, cancelamento e rescisão</h2>
        <p class="text-slate-100 leading-relaxed">
          Estes termos vigem enquanto durar a utilização do serviço. Não há fidelidade ou multa contratual: o
          usuário pode solicitar o cancelamento do módulo de IA a qualquer momento, e a revogação do acesso à
          conta Google pode ser feita de forma independente, a qualquer momento, pelo próprio usuário.
        </p>
      </div>

      <!-- 11 -->
      <div id="propriedade">
        <h2 class="text-2xl font-bold mb-3">11. Propriedade intelectual</h2>
        <p class="text-slate-100 leading-relaxed">
          Todo o conteúdo, marca, tecnologia, algoritmos de otimização e identidade visual da SuaAgenda são de uso
          exclusivo da plataforma, sendo vedada a reprodução, engenharia reversa ou uso não autorizado.
        </p>
      </div>

      <!-- 12 -->
      <div id="alteracoes">
        <h2 class="text-2xl font-bold mb-3">12. Alterações nestes termos</h2>
        <p class="text-slate-100 leading-relaxed">
          Estes termos podem ser atualizados periodicamente. A versão mais recente estará sempre publicada nesta
          página, com a data de atualização indicada no topo.
        </p>
      </div>

      <!-- 13 -->
      <div id="foro">
        <h2 class="text-2xl font-bold mb-3">13. Legislação e foro</h2>
        <p class="text-slate-100 leading-relaxed">
          Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de São Paulo/SP para
          dirimir eventuais conflitos decorrentes destes termos, com renúncia a qualquer outro, por mais
          privilegiado que seja.
        </p>
      </div>

      <!-- 14 -->
      <div id="contato">
        <h2 class="text-2xl font-bold mb-3">14. Contato</h2>
        <p class="text-slate-100 leading-relaxed">
          Dúvidas sobre estes Termos podem ser enviadas para
          <a href="mailto:contato@suaagenda.link" class="underline hover:text-white">contato@suaagenda.link</a>
          ou pelo WhatsApp disponível em nosso site.
        </p>
      </div>

    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })
const name = 'Termos de Serviço | SuaAgenda IA'
const content = 'Conheça os Termos de Serviço da SuaAgenda IA, incluindo o funcionamento da automação de campanhas via Google Ads API.'
const slug = 'termos'

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