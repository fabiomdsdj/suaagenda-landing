<template>
  <div class="min-h-screen bg-sky-900 text-white font-[Poppins] pt-28 px-6">
    
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 fade-on-scroll">
      Termos de Parceria & Política de Privacidade
    </h1>

    <!-- TERMOS DE PARCERIA -->
    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="0">
      <h2 class="text-2xl font-semibold mb-6">Termos de Parceria</h2>
      <ol class="list-decimal list-inside space-y-4 text-slate-100">
        <li><strong>Objeto da Parceria:</strong> Estabelece a colaboração entre o(a) Advogado(a) parceiro(a) e a plataforma Empreitador para a prestação de serviços jurídicos relacionados a imóveis irregulares e temas correlatos.</li>
        
        <li><strong>Obrigações do Advogado(a):</strong> Emitir pareceres jurídicos fundamentados e éticos, observar as normas da OAB, manter sigilo profissional sobre informações recebidas e cumprir prazos acordados.</li>
        
        <li><strong>Obrigações da Plataforma:</strong> Disponibilizar os casos, fornecer ferramentas tecnológicas de suporte, repassar honorários de forma transparente e manter comunicação clara com os parceiros.</li>
        
        <li><strong>Remuneração:</strong> Os honorários serão pagos por parecer emitido, conforme tabela previamente acordada, respeitando as normas éticas da advocacia.</li>
        
        <li><strong>Confidencialidade:</strong> Ambas as partes se comprometem a manter em sigilo informações trocadas durante a vigência da parceria, salvo em cumprimento de obrigação legal.</li>
        
        <li><strong>Responsabilidade:</strong> O(a) Advogado(a) é responsável pelo conteúdo técnico e jurídico de seus pareceres. A plataforma atua apenas como intermediadora, não respondendo pelo teor dos documentos.</li>
        
        <li><strong>Vigência e Rescisão:</strong> Este termo tem prazo indeterminado, podendo ser rescindido por qualquer das partes mediante aviso prévio de 30 (trinta) dias.</li>
        
        <li><strong>Propriedade Intelectual:</strong> Os pareceres elaborados são de autoria exclusiva do(a) Advogado(a), sendo armazenados pela plataforma apenas para fins administrativos e comprovação contratual.</li>
        
        <li><strong>Foro:</strong> Fica eleito o foro da Comarca de São Paulo/SP para dirimir eventuais controvérsias decorrentes da presente parceria.</li>
      </ol>
    </section>

    <!-- POLÍTICA DE PRIVACIDADE -->
    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="200">
      <h2 class="text-2xl font-semibold mb-6">Política de Privacidade</h2>
      <ol class="list-decimal list-inside space-y-4 text-slate-100">
        <li><strong>Coleta de Dados:</strong> Podemos coletar nome, e-mail, telefone, número da OAB, estado de atuação, especialidade, experiência profissional e demais informações necessárias à prestação dos serviços.</li>
        
        <li><strong>Finalidade do Uso:</strong> Os dados são utilizados para cadastro, análise de perfil, encaminhamento de casos e comunicação institucional da plataforma.</li>
        
        <li><strong>Base Legal:</strong> O tratamento de dados pessoais ocorre em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), mediante consentimento do(a) parceiro(a) e/ou quando necessário para execução contratual.</li>
        
        <li><strong>Compartilhamento de Dados:</strong> Os dados não serão compartilhados com terceiros sem consentimento, salvo em cumprimento de obrigações legais ou ordem judicial.</li>
        
        <li><strong>Segurança:</strong> Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perdas ou alterações indevidas.</li>
        
        <li><strong>Armazenamento e Retenção:</strong> Os dados serão armazenados pelo período de vigência da parceria e poderão ser mantidos após a rescisão, apenas para cumprimento de obrigações legais.</li>
        
        <li><strong>Direitos do(a) Advogado(a):</strong> O(a) parceiro(a) pode solicitar acesso, correção, exclusão ou portabilidade dos dados pessoais, conforme previsto na LGPD.</li>
        
        <li><strong>Alterações na Política:</strong> A Empreitador reserva-se o direito de atualizar esta Política de Privacidade, comunicando os parceiros sempre que houver mudanças relevantes.</li>
        
        <li><strong>Contato:</strong> Para dúvidas ou solicitações relacionadas à privacidade, entre em contato pelo e-mail: <a href="mailto:contato@empreitador.com.br" class="underline">contato@empreitador.com.br</a> ou telefone: +55 (11) 99999-9999.</li>
      </ol>
    </section>

  </div>
</template>

  
  <script setup>
  definePageMeta({ layout: 'advogados' })
  useHead({
  title: 'Termos de Parceria & Política de Privacidade | Empreitador',
  meta: [
    {
      name: 'description',
      content: 'Leia os Termos de Parceria e a Política de Privacidade do Empreitador. Transparência, segurança e confiança no uso do sistema e nos serviços oferecidos.'
    },
    {
      name: 'keywords',
      content: 'termos de parceria, política de privacidade, privacidade de dados, proteção de dados, segurança digital, empreitador'
    },
    { property: 'og:title', content: 'Termos de Parceria & Política de Privacidade | Empreitador' },
    { property: 'og:description', content: 'Conheça nossas regras de parceria, uso do sistema e política de privacidade. Segurança e transparência em primeiro lugar.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://empreitador.com.br/termos' },
    { property: 'og:image', content: 'https://i.ibb.co/JWDnYBz2/empreitador-logo-e-g.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Empreitador | Termos de Parceria & Política de Privacidade' },
    { name: 'twitter:description', content: 'Saiba como protegemos seus dados e quais são os termos para parcerias no Empreitador. Transparência e segurança digital.' },
    { name: 'twitter:image', content: 'https://i.ibb.co/JWDnYBz2/empreitador-logo-e-g.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://empreitador.com.br/termos' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://empreitador.com.br/termos",
        "name": "Termos de Parceria & Política de Privacidade",
        "description": "Termos de Parceria e Política de Privacidade do Empreitador. Segurança, transparência e proteção de dados no uso do sistema.",
        "publisher": {
          "@type": "Organization",
          "name": "Empreitador",
          "logo": {
            "@type": "ImageObject",
            "url": "https://i.ibb.co/JWDnYBz2/empreitador-logo-e-g.jpg"
          }
        }
      })
    }
  ]
})

import { onMounted } from 'vue'

const fadeIn = (el) => {
  if (!process.client) return
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-10')
      }
    })
  })
  observer.observe(el)
}

onMounted(() => {
  if (!process.client) return
  document.querySelectorAll('.fade-on-scroll').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700')
    fadeIn(el)
  })
})
</script>

<style>
.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }
.translate-y-10 { transform: translateY(2.5rem); }
.translate-y-0 { transform: translateY(0); }
</style>
  