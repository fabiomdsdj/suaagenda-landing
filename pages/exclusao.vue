<template>
  <div class="min-h-screen bg-green-900 text-white font-[Poppins] pt-28 px-6">
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 fade-on-scroll">
      Exclusão de Dados
    </h1>

    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="0">

      <div class="bg-green-800 border border-green-600 rounded-2xl p-8 mb-10 text-center">
        <div class="text-5xl mb-4">🗑️</div>
        <h2 class="text-2xl font-bold mb-3">Solicite a exclusão dos seus dados</h2>
        <p class="text-slate-200 mb-6">
          Você tem o direito de solicitar a exclusão completa dos seus dados pessoais da plataforma SuaAgenda a qualquer momento, conforme previsto pela LGPD (Lei nº 13.709/2018).
        </p>
        
        <a
          href="mailto:contato@suaagenda.link?subject=Solicitação de Exclusão de Dados&body=Olá, gostaria de solicitar a exclusão dos meus dados pessoais da plataforma SuaAgenda.%0A%0ANome:%0AE-mail cadastrado:%0A%0AAtenciosamente."
          class="inline-block bg-white text-green-900 font-bold px-8 py-3 rounded-full hover:bg-green-100 transition-colors"
        >
          Enviar solicitação por e-mail
        </a>
      </div>

      <ol class="list-decimal list-inside space-y-6 text-slate-100">
        <li>
          <strong>Como solicitar:</strong> Envie um e-mail para
          <a href="mailto:contato@suaagenda.link" class="underline">contato@suaagenda.link</a>
          com o assunto <em>"Solicitação de Exclusão de Dados"</em>, informando o nome completo e o e-mail cadastrado na plataforma.
        </li>
        <li>
          <strong>Prazo de resposta:</strong> Sua solicitação será processada em até 15 dias úteis a partir do recebimento do pedido.
        </li>
        <li>
          <strong>O que será excluído:</strong> Nome, e-mail, telefone, histórico de agendamentos, dados de perfil e quaisquer outras informações pessoais vinculadas à sua conta.
        </li>
        <li>
          <strong>Dados que podem ser retidos:</strong> Informações necessárias para cumprimento de obrigações legais, fiscais ou regulatórias poderão ser mantidas pelo prazo exigido por lei, mesmo após a exclusão da conta.
        </li>
        <li>
          <strong>Consequências da exclusão:</strong> Após a exclusão, o acesso à plataforma será encerrado permanentemente e os dados não poderão ser recuperados.
        </li>
        <li>
          <strong>Base legal:</strong> O direito à exclusão está previsto no Art. 18 da LGPD (Lei nº 13.709/2018) e é garantido a todos os titulares de dados.
        </li>
        <li>
          <strong>Contato:</strong> Para dúvidas sobre o processo, entre em contato pelo e-mail
          <a href="mailto:contato@suaagenda.link" class="underline">contato@suaagenda.link</a>.
        </li>
      </ol>

    </section>
  </div>
</template>

<script setup>
const name = 'Exclusão de Dados — SuaAgenda'
const content = 'Saiba como solicitar a exclusão dos seus dados pessoais da plataforma SuaAgenda conforme a LGPD.'
const slug = 'exclusao-de-dados'

useHead({
  title: name,
  meta: [
    { name: 'description', content },
    { name: 'robots', content: 'noindex, follow' },
    { property: 'og:title', content: name },
    { property: 'og:description', content },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://suaagenda.link/${slug}/` },
    { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: name },
    { name: 'twitter:description', content },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },
  ],
  link: [
    { rel: 'canonical', href: `https://suaagenda.link/${slug}/` },
  ],
})
</script>