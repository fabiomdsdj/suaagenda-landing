<template>
  <div class="min-h-screen bg-green-900 text-white font-[Poppins] pt-28 px-6">
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 fade-on-scroll">
      Termos de Serviço
    </h1>

    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="0">
      <ol class="list-decimal list-inside space-y-4 text-slate-100">
        <li><strong>Objeto:</strong> Prestação de serviços digitais de consultoria e suporte ao cliente, com foco em simplificação de processos e automação.</li>
        <li><strong>Obrigações da Plataforma:</strong> Garantir acesso ao sistema, transparência de valores e suporte técnico adequado.</li>
        <li><strong>Obrigações do Usuário:</strong> Fornecer informações corretas, utilizar o sistema de forma ética e respeitar prazos acordados.</li>
        <li><strong>Honorários e Custos:</strong> Os valores cobrados serão previamente informados e podem variar conforme complexidade dos serviços contratados.</li>
        <li><strong>Responsabilidade:</strong> A plataforma atua como intermediadora de serviços digitais e não se responsabiliza pelo uso indevido das informações disponibilizadas.</li>
        <li><strong>Confidencialidade:</strong> Todos os dados fornecidos são tratados de forma sigilosa, salvo quando exigido por lei.</li>
        <li><strong>Vigência e Rescisão:</strong> Os termos vigem enquanto durar a utilização do serviço e podem ser rescindidos a qualquer momento mediante aviso prévio.</li>
        <li><strong>Propriedade Intelectual:</strong> Todo o conteúdo, marca e tecnologia são de uso exclusivo da plataforma.</li>
        <li><strong>Foro:</strong> Fica eleito o foro da Comarca de São Paulo/SP para dirimir eventuais conflitos.</li>
      </ol>
    </section>
  </div>
</template>

<script setup>
const name = 'Termos de serviço'
const content = 'Conheça os planos e preços da SuaAgenda: Básico, Profissional e Premium. Escolha o ideal para seu negócio e cresça no digital.'
const slug = 'termos'

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
