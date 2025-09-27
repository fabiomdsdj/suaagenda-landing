<template>
  <div class="min-h-screen bg-green-900 text-white font-[Poppins] pt-28 px-6">
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 fade-on-scroll">
      Política de Privacidade
    </h1>

    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="0">
      <ol class="list-decimal list-inside space-y-4 text-slate-100">
        <li><strong>Coleta de Dados:</strong> Nome, e-mail, telefone e demais informações necessárias para cadastro e uso da plataforma.</li>
        <li><strong>Finalidade:</strong> Garantir a execução dos serviços contratados, comunicação institucional e melhoria contínua da experiência do usuário.</li>
        <li><strong>Base Legal:</strong> Tratamento dos dados conforme a LGPD (Lei nº 13.709/2018), mediante consentimento e execução contratual.</li>
        <li><strong>Compartilhamento:</strong> Os dados não serão vendidos ou compartilhados, exceto em casos de obrigação legal.</li>
        <li><strong>Segurança:</strong> Medidas técnicas e organizacionais são aplicadas para proteger os dados de acessos não autorizados.</li>
        <li><strong>Armazenamento e Retenção:</strong> Os dados são armazenados pelo tempo necessário à execução dos serviços e podem ser mantidos conforme exigências legais.</li>
        <li><strong>Direitos do Titular:</strong> O usuário pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados pessoais.</li>
        <li><strong>Alterações na Política:</strong> Esta política pode ser atualizada periodicamente, sendo a versão mais recente sempre publicada nesta página.</li>
        <li><strong>Contato:</strong> Para exercer seus direitos, envie solicitação para <a href="mailto:contato@empreitador.com.br" class="underline">contato@empreitador.com.br</a>.</li>
      </ol>
    </section>
  </div>
</template>

<script setup>
const name = 'Política de privacidade'
const content = 'Conheça os planos e preços da SuaAgenda: Básico, Profissional e Premium. Escolha o ideal para seu negócio e cresça no digital.'
const slug = 'privacidade'

useHead({
  title: name,
  meta: [
    { name: 'description', content },
    { property: 'og:title', content: name },
    { property: 'og:description', content },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://suaagenda-landing.onrender.com/${slug}/` },
    { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: name },
    { name: 'twitter:description', content },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' }
  ],
  link: [
    { rel: 'canonical', href: `https://suaagenda-landing.onrender.com/${slug}/` }
  ]
})
</script>
