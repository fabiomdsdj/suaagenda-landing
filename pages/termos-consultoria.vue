<template>
  <div class="min-h-screen bg-sky-900 text-white font-[Poppins] pt-28 px-6">
    
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 fade-on-scroll">
      Termos de Consultoria & Política de Privacidade
    </h1>

    <!-- TERMOS DE CONSULTORIA -->
    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="0">
      <h2 class="text-2xl font-semibold mb-6">Termos de Consultoria</h2>
      <ol class="list-decimal list-inside space-y-4 text-slate-100">
        <li><strong>Objeto da Consultoria:</strong> Prestação de serviços de levantamento documental e emissão de pareceres sobre imóveis irregulares. Este serviço <em>não inclui regularização do imóvel</em>.</li>
        
        <li><strong>Obrigações da Plataforma:</strong> Disponibilizar os casos, ferramentas digitais de suporte, transparência nos valores e comunicação clara com o cliente.</li>
        
        <li><strong>Obrigações do Consultor/Advogado Parceiro:</strong> Fornecer pareceres fundamentados e éticos, observando normas profissionais aplicáveis, mantendo sigilo sobre informações recebidas e cumprindo prazos acordados.</li>
        
        <li><strong>Honorários e Custos:</strong> Os valores cobrados incluem honorários do consultor/advogado e custos médios de certidões. Valores finais podem variar conforme complexidade do caso, quantidade de documentos e honorários do advogado.</li>
        
        <li><strong>Responsabilidade:</strong> A plataforma atua como intermediadora; não se responsabiliza pelo conteúdo técnico dos pareceres, sendo este de responsabilidade exclusiva do consultor/advogado parceiro.</li>
        
        <li><strong>Confidencialidade:</strong> Todas as informações trocadas entre cliente, plataforma e parceiro são sigilosas, exceto quando exigido por lei.</li>
        
        <li><strong>Vigência e Rescisão:</strong> Estes termos vigem enquanto a consultoria estiver ativa e podem ser encerrados por qualquer das partes mediante aviso prévio de 30 (trinta) dias.</li>
        
        <li><strong>Propriedade Intelectual:</strong> Os pareceres emitidos são de autoria do consultor/advogado parceiro e armazenados pela plataforma apenas para fins administrativos e comprovação contratual.</li>
        
        <li><strong>Foro:</strong> Para eventuais disputas, fica eleito o foro da Comarca de São Paulo/SP.</li>
      </ol>
    </section>

    <!-- POLÍTICA DE PRIVACIDADE -->
    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="200">
      <h2 class="text-2xl font-semibold mb-6">Política de Privacidade</h2>
      <ol class="list-decimal list-inside space-y-4 text-slate-100">
        <li><strong>Coleta de Dados:</strong> Nome, e-mail, telefone, informações profissionais e dados necessários para cadastro e prestação de consultoria.</li>
        
        <li><strong>Finalidade:</strong> Cadastro, análise de perfil, encaminhamento de casos, comunicação institucional e emissão de pareceres.</li>
        
        <li><strong>Base Legal:</strong> Tratamento conforme LGPD (Lei nº 13.709/2018), mediante consentimento e execução contratual.</li>
        
        <li><strong>Compartilhamento:</strong> Dados não são compartilhados sem consentimento, exceto para cumprimento legal ou judicial.</li>
        
        <li><strong>Segurança:</strong> Medidas técnicas e administrativas protegem os dados contra acessos não autorizados e alterações indevidas.</li>
        
        <li><strong>Armazenamento e Retenção:</strong> Dados são mantidos durante a consultoria e podem ser preservados após término para fins legais.</li>
        
        <li><strong>Direitos:</strong> Acesso, correção, exclusão ou portabilidade dos dados podem ser solicitados pelo cliente ou parceiro.</li>
        
        <li><strong>Alterações na Política:</strong> A plataforma reserva-se o direito de atualizar esta política, informando sempre que houver mudanças relevantes.</li>
        
        <li><strong>Contato:</strong> Dúvidas ou solicitações: <a href="mailto:contato@empreitador.com.br" class="underline">contato@empreitador.com.br</a> | +55 (11) 99999-9999</li>
      </ol>
    </section>

    <!-- AVISO SOBRE VALORES -->
    <section class="max-w-4xl mx-auto pb-20 fade-on-scroll" data-delay="400">
      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl text-amber-800">
        💡 <strong>Atenção:</strong> Os valores apresentados nas consultorias são estimativas. Podem variar conforme a complexidade do imóvel, quantidade de documentos, custos de certidões e honorários do advogado parceiro.
      </div>
    </section>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'consultoria' })

useHead({
  title: 'Termos de Consultoria & Política de Privacidade | Empreitador',
  meta: [
    { name: 'description', content: 'Leia os Termos de Consultoria e a Política de Privacidade do Empreitador. Transparência, limites do serviço e proteção de dados.' },
    { name: 'keywords', content: 'consultoria de imóveis, termos de consultoria, política de privacidade, LGPD, Empreitador' },
    { property: 'og:title', content: 'Termos de Consultoria & Política de Privacidade | Empreitador' },
    { property: 'og:description', content: 'Conheça nossas regras e política de privacidade para consultoria de imóveis irregulares.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://empreitador.com.br/termos-consultoria' },
    { property: 'og:image', content: 'https://i.ibb.co/JWDnYBz2/empreitador-logo-e-g.jpg' }
  ],
  link: [{ rel: 'canonical', href: 'https://empreitador.com.br/termos-consultoria' }]
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
