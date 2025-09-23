<template>
  <div>
    <!-- HERO -->
    <section
      class="pt-28 min-h-screen flex flex-col md:flex-row items-center justify-center px-6 bg-gradient-to-br from-sky-600 to-sky-950 text-white"
    >
      <div class="md:w-9/10 text-center">
        <h1
          v-motion="{
            initial: { opacity: 0, y: 40 },
            enter: { opacity: 1, y: 0, transition: { duration: 1000, easing: 'ease-out' } }
          }"
          class="text-4xl md:text-7xl font-black mb-6 leading-tight"
        >
          Consultoria
          <span
            v-motion="{
              initial: { scale: 0.8, opacity: 0 },
              enter: { scale: 1, opacity: 1, transition: { duration: 1200, delay: 800 } }
            }"
            class="text-yellow-500 inline-block"
          >
          de imóveis irregulares
          </span>
        </h1>

        <p
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 1200 } }
          }"
          class="text-lg md:text-xl mb-10"
        >
          Seu imóvel não pode ser vendido ou você não tem certeza sobre a segurança da sua posse?  
          Nós analisamos a documentação, identificamos problemas e indicamos caminhos claros para negociar ou vender com confiança, mesmo sem regularização completa.
        </p>

        <NuxtLink
          to="/consultoria/solicitar"
          v-motion="{
            initial: { opacity: 0, scale: 0.9 },
            enter: { opacity: 1, scale: 1, transition: { duration: 800, delay: 1800 } }
          }"
          class="inline-block bg-yellow-400 text-blue-900 px-6 py-3 rounded-2xl shadow hover:bg-yellow-500 transition text-lg"
        >
          Quero destravar meu imóvel
        </NuxtLink>
      </div>
    </section>

    <!-- SECTIONS DINÂMICAS -->
    <section
      v-for="(item, index) in sections"
      :key="index"
      :class="[
        'w-full py-20 px-6',
        index % 2 === 0 ? 'bg-slate-50 text-slate-800' : 'bg-sky-900 text-white'
      ]"
    >
      <div
        class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
        :class="index % 2 === 1 ? 'md:flex-row-reverse' : ''"
      >
        <!-- Imagem -->
        <div class="md:w-1/2 flex justify-center fade-on-scroll">
          <img
            :src="item.img"
            :alt="item.alt"
            class="rounded-2xl shadow-lg transition-transform duration-700"
          />
        </div>

        <!-- Texto -->
        <div class="md:w-1/2 text-center md:text-left fade-on-scroll">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ item.title }}</h2>
          <p v-if="item.desc" class="text-lg mb-6">{{ item.desc }}</p>
          <ul v-if="item.list" class="space-y-2 mb-6">
            <li v-for="(li, i) in item.list" :key="i">{{ li }}</li>
          </ul>
          <NuxtLink
            to="/consultoria/solicitar"
            class="inline-block bg-yellow-400 text-blue-900 px-6 py-3 rounded-2xl shadow hover:bg-yellow-300 transition"
          >
            Quero uma consultoria
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-20 px-6 bg-slate-50 text-slate-800">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-10 fade-on-scroll" data-delay="0">Como funciona</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-start gap-6 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll"
            :class="{'md:justify-self-center': index === steps.length - 1 && steps.length % 2 !== 0}"
            :data-delay="index*200"
          >
            <div class="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900 text-3xl font-bold">
              {{ index + 1 }}
            </div>
            <div class="text-left">
              <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
              <p class="text-slate-700">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
  </section>


    <!-- DEPOIMENTOS -->
    <section class="py-20 px-6 bg-slate-50 text-slate-800">
      <div class="max-w-6xl mx-auto text-center fade-on-scroll">
        <h2 class="text-3xl md:text-4xl font-bold mb-10">O que dizem nossos clientes</h2>
        <client-only>
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
            navigation
            :pagination="{ clickable: true }"
            loop
            class="w-full max-w-5xl mx-auto"
          >
            <SwiperSlide 
              v-for="(depoimento, i) in depoimentos" 
              :key="i"
            >
              <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition max-w-xs mx-auto h-full flex flex-col justify-between">
                <p class="text-lg font-semibold text-gray-800 mb-4">"{{ depoimento.texto }}"</p>
                <div class="flex items-center">
                  <template v-if="depoimento.foto">
                    <img class="w-12 h-12 rounded-full mr-4" :src="depoimento.foto" :alt="`Foto de ${depoimento.nome}`" />
                  </template>
                  <template v-else>
                    <div class="w-12 h-12 rounded-full mr-4 bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {{ getInitials(depoimento.nome) }}
                    </div>
                  </template>
                  <div>
                    <p class="font-semibold text-gray-800">{{ depoimento.nome }}</p>
                    <p class="text-sm text-gray-500">{{ depoimento.profissao }}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </client-only>
      </div>
    </section>

    <!-- BENEFÍCIOS -->
  <section class="bg-sky-900 text-white py-20 px-6">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 fade-on-scroll" data-delay="0">
        Liberte seu imóvel travado e venda com segurança
      </h2>
      <p class="text-lg md:text-xl leading-relaxed mb-10 fade-on-scroll" data-delay="100">
        Nós ajudamos a destravar imóveis que estavam parados por falta de documentação ou problemas legais.  
        Você envia o que tem, nossa equipe organiza, identifica pendências e entrega soluções claras para negociar ou regularizar sem dor de cabeça.
      </p>

      <div class="grid md:grid-cols-2 gap-8 mb-10">
        <div class="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="300">
          <h3 class="text-xl font-semibold text-sky-800 mb-3">Identificação de problemas reais</h3>
          <p class="text-slate-600">Verificamos tudo que está travando a venda ou regularização: pendências em cartório, herança parada ou terrenos de posse/marinha.</p>
        </div>
        <div class="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="500">
          <h3 class="text-xl font-semibold text-sky-800 mb-3">Soluções claras e práticas</h3>
          <p class="text-slate-600">Entregamos um relatório direto com os caminhos possíveis para você vender, negociar ou regularizar seu imóvel com segurança.</p>
        </div>
        <div class="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="700">
          <h3 class="text-xl font-semibold text-sky-800 mb-3">Agilidade e controle</h3>
          <p class="text-slate-600">Você sabe exatamente o que precisa fazer e em quanto tempo, sem perder dinheiro ou tempo com tentativas frustradas.</p>
        </div>
        <div class="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="900">
          <h3 class="text-xl font-semibold text-sky-800 mb-3">Segurança na posse</h3>
          <p class="text-slate-600">Com a consultoria, você sabe se a sua posse é reconhecida legalmente, garantindo segurança para vender ou negociar mesmo sem regularizar completamente o imóvel.</p>
        </div>

      </div>

      <NuxtLink
        to="/consultoria/solicitar"
        class="inline-block bg-yellow-400 text-sky-900 px-6 py-3 rounded-2xl shadow hover:bg-yellow-300 transition"
      >
        Quero destravar meu imóvel
      </NuxtLink>
    </div>
  </section>


  <section class="py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
    <div class="max-w-6xl mx-auto text-center">
      <!-- Título e descrição -->
      <h2 class="text-3xl md:text-4xl font-bold mb-4 fade-on-scroll">
        Planos da nossa Consultoria
      </h2>
      <p class="text-lg text-slate-600 mb-12 fade-on-scroll">
        ⚠️ Levantamos toda a documentação do seu imóvel e entregamos um relatório detalhado com soluções práticas.  
        <span class="italic">
          Nosso serviço não inclui regularização direta, mas você vai saber exatamente os próximos passos para vender, negociar ou regularizar seu imóvel futuramente.
        </span>
      </p>


      <!-- Cards de simulação -->
      <!-- Cards de Simulação Estilizados -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

<!-- Passo 1 -->
<div class="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col justify-between min-h-[360px]">
  <div>
    <h3 class="text-xl font-extrabold text-sky-600 mb-3">Passo 1 – Só Análise</h3>
    <p class="text-sm text-slate-600 mb-3">
      Exame completo da documentação que você já possui, identificando riscos, pendências e problemas que podem travar a regularização.
    </p>
  </div>
  <div class="bg-slate-50 p-5 rounded-xl text-center border border-slate-100">
    <p class="text-sm font-medium text-slate-500">Valor:</p>
    <p class="text-2xl font-bold text-sky-600 mt-1">R$ 200,00</p>
    <p class="text-xs text-slate-400 mt-1">Valor mínimo do advogado: R$ 1.106,71</p>
  </div>
</div>

<!-- Passo 2 -->
<div class="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col justify-between min-h-[360px]">
  <div>
    <h3 class="text-xl font-extrabold text-emerald-600 mb-3">Passo 2 – Levantamento</h3>
    <p class="text-sm text-slate-600 mb-3">
      Busca de certidões, processos no TJ e informações em órgãos públicos, trazendo tudo organizado para você.
    </p>
  </div>
  <div class="bg-slate-50 p-5 rounded-xl text-center border border-slate-100">
    <p class="text-sm font-medium text-slate-500">Valor:</p>
    <p class="text-2xl font-bold text-emerald-600 mt-1">R$ 699,00</p>
    <p class="text-xs text-slate-400 mt-1">Valor mínimo do advogado: R$ 1.165,00</p>
  </div>
</div>

<!-- Passo 3 -->
<div class="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col justify-between min-h-[360px]">
  <div>
    <h3 class="text-xl font-extrabold text-amber-600 mb-3">Passo 3 – Encaminhamento ao Advogado</h3>
    <p class="text-sm text-slate-600 mb-3">
      Se houver necessidade legal ou complexidade, seu caso é enviado diretamente para advogado parceiro. Honorários tratados diretamente com ele.
    </p>
  </div>
  <div class="bg-slate-50 p-5 rounded-xl text-center border border-slate-100">
    <p class="text-sm font-medium text-slate-500">Valor estimado:</p>
    <p class="text-2xl font-bold text-amber-600 mt-1">Sob consulta com advogado</p>
  </div>
</div>

</div>




      <!-- Aviso -->
      <div class="max-w-4xl mx-auto mt-10 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl text-left fade-on-scroll">
        <p class="text-sm md:text-base text-amber-800">
          💡 <span class="font-semibold">Atenção:</span> os valores acima são estimativas e podem variar conforme a complexidade do imóvel, quantidade de certidões e necessidade de encaminhamento para advogado parceiro.
        </p>
      </div>
    </div>
  </section>



    <section class="bg-sky-900 text-white py-20 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-10 fade-on-scroll">
          Perguntas Frequentes
        </h2>

        <div class="space-y-6 text-left">
          <!-- FAQ 1 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="0">
            <h3 class="font-semibold text-xl mb-2">Meu imóvel está travado no cartório, vocês conseguem destravar?</h3>
            <p class="text-slate-200">
              Sim! Levantamos toda a documentação, identificamos o que está pendente e indicamos exatamente os passos para liberar a venda ou negociação.
            </p>
          </div>

          <!-- FAQ 2 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="100">
            <h3 class="font-semibold text-xl mb-2">Preciso regularizar completamente meu imóvel para vender?</h3>
            <p class="text-slate-200">
              Nem sempre. Com nossa consultoria você sabe se a posse é segura e pode negociar ou vender mesmo sem regularização total, evitando prejuízos.
            </p>
          </div>

          <!-- FAQ 3 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="200">
            <h3 class="font-semibold text-xl mb-2">Quanto tempo leva para receber o relatório?</h3>
            <p class="text-slate-200">
              Normalmente entre 5 a 10 dias úteis, dependendo da complexidade do imóvel e da quantidade de documentos que precisaremos analisar.
            </p>
          </div>

          <!-- FAQ 4 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="300">
            <h3 class="font-semibold text-xl mb-2">Se eu tiver herança ou inventário parado, vocês conseguem ajudar?</h3>
            <p class="text-slate-200">
              Sim! Organizamos toda a documentação necessária e mostramos o caminho claro para que o advogado possa dar andamento no inventário sem atrasos.
            </p>
          </div>

          <!-- FAQ 5 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="400">
            <h3 class="font-semibold text-xl mb-2">Quais tipos de imóveis vocês atendem?</h3>
            <p class="text-slate-200">
              Posse antiga, terrenos em áreas da Marinha, imóveis dentro de programas REURB e REURB-S, imóveis travados por herança ou cartório.
            </p>
          </div>

          <!-- FAQ 6 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="500">
            <h3 class="font-semibold text-xl mb-2">Vocês cobram custos de cartório e certidões?</h3>
            <p class="text-slate-200">
              Os custos de certidões estão incluídos nos planos. Você paga apenas o valor da consultoria, sem surpresas.
            </p>
          </div>

          <!-- FAQ 7 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="600">
            <h3 class="font-semibold text-xl mb-2">A consultoria substitui o advogado?</h3>
            <p class="text-slate-200">
              Não. Nós levantamos documentos, identificamos problemas e entregamos um parecer prático. Se houver necessidade, indicamos advogados parceiros para seguir legalmente.
            </p>
          </div>

          <!-- FAQ 8 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="700">
            <h3 class="font-semibold text-xl mb-2">Como sei se minha posse é segura?</h3>
            <p class="text-slate-200">
              Nossa análise verifica títulos, contratos e histórico do imóvel. Assim, você recebe um parecer que mostra se a posse é reconhecida legalmente e se pode negociar com segurança.
            </p>
          </div>

          <!-- FAQ 9 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="800">
            <h3 class="font-semibold text-xl mb-2">E se meu imóvel estiver em área de Marinha?</h3>
            <p class="text-slate-200">
              Investigamos a situação no órgão competente e explicamos o que é possível regularizar, além de mostrar os riscos e alternativas para negociação.
            </p>
          </div>

          <!-- FAQ 10 -->
          <div class="bg-sky-800 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll" data-delay="900">
            <h3 class="font-semibold text-xl mb-2">Preciso enviar todos os documentos de uma vez?</h3>
            <p class="text-slate-200">
              Não. Você pode enviar o que já tem, e nós identificamos faltantes ou pendências. Assim você não perde tempo nem dinheiro tentando adivinhar o que é necessário.
            </p>
          </div>
        </div>
        <NuxtLink
          to="/consultoria/solicitar"
          class="inline-block bg-yellow-400 text-sky-900 px-6 py-3 my-10 rounded-2xl shadow hover:bg-yellow-300 transition"
        >
          Quero destravar meu imóvel
        </NuxtLink>
      </div>
      
    </section>
  </div>
</template>

<script setup>
const { trackEvent, trackPageview } = useAnalytics();
useHead({
  title: 'Consultoria em Posse, Regularização e Direito Imobiliário',
  meta: [
    {
      name: 'description',
      content: 'Consultoria especializada em posse e direito imobiliário. Apoio em regularização de imóveis, estratégias jurídicas e soluções para quem busca segurança e valorização patrimonial.'
    },
    {
      name: 'keywords',
      content: 'consultoria imobiliária, posse de imóvel, regularização de imóveis, direito de moradia, assessoria jurídica, imóveis de posse, segurança patrimonial, soluções imobiliárias'
    },
    { property: 'og:title', content: 'Consultoria em Posse e Direito Imobiliário' },
    { property: 'og:description', content: 'Conte com uma consultoria especializada em posse e regularização de imóveis. Orientação jurídica e estratégias para garantir segurança e valorização.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://empreitador.com.br/landing/consultoria' },
    { property: 'og:image', content: 'https://i.ibb.co/JWDnYBz2/empreitador-logo-e-g.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Empreitador | Consultoria em Posse e Direito Imobiliário' },
    { name: 'twitter:description', content: 'Apoio jurídico e estratégico para posse, regularização e valorização de imóveis. Consultoria moderna e acessível.' },
    { name: 'twitter:image', content: 'https://i.ibb.co/JWDnYBz2/empreitador-logo-e-g.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://empreitador.com.br/landing/consultoria' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "url": "https://empreitador.com.br/landing/consultoria",
        "name": "Empreitador Consultoria",
        "description": "Consultoria especializada em posse e direito imobiliário. Apoio em regularização de imóveis, estratégias jurídicas e segurança patrimonial.",
        "publisher": {
          "@type": "Organization",
          "name": "Empreitador",
          "logo": {
            "@type": "ImageObject",
            "url": "https://i.ibb.co/JWDnYBz2/empreitador-logo-e-g.jpg"
          }
        },
        "areaServed": "Brasil",
        "serviceType": [
          "Consultoria em posse de imóveis",
          "Regularização imobiliária",
          "Assessoria em direito de moradia"
        ]
      })
    }
  ]
})


import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

definePageMeta({ layout: 'consultoria' })

// modelos selecionados
const tipoBasico = ref("posse");
const tipoAvancado = ref("posse");
const tipoCompleto = ref("posse");

// Tabelas de preços
const valoresBasico = { posse: 219, marinha: 219, reurb: 219 };
const valoresJuridico = { posse: 789, marinha: 829, reurb: 789 };
const valoresCompleto = { posse: 999, marinha: 999, reurb: 999 };

// Cálculo
const totalBasico = computed(() => valoresBasico[tipoBasico.value]);
const totalAvancado = computed(() => valoresJuridico[tipoAvancado.value]);
const totalCompleto = computed(() => valoresCompleto[tipoCompleto.value]);


const depoimentos = [
  { 
    texto: "Meu terreno estava no nome do meu pai falecido e ninguém conseguia vender. A consultoria organizou toda a papelada e mostrou o que precisava para fazer o inventário. Hoje já estamos negociando sem dor de cabeça.", 
    nome: "Rafael M.", 
    profissao: "Proprietário", 
    foto: "" 
  },
  { 
    texto: "Eu tinha um contrato de gaveta de um lote, mas o cartório não aceitava. A consultoria puxou os documentos, explicou os riscos e me orientou nos próximos passos. Consegui fechar a venda com segurança.", 
    nome: "Carla S.", 
    profissao: "Proprietária", 
    foto: "" 
  },
  { 
    texto: "Tentei intermediar a venda de um imóvel de posse e quase perdi o negócio porque a documentação não estava em dia. O relatório que recebi da consultoria foi direto e me deu base para conduzir a negociação tranquilo.", 
    nome: "Lucas P.", 
    profissao: "Corretor de imóveis", 
    foto: "" 
  },
  { 
    texto: "Eu ia comprar um lote, mas descobri com a consultoria que havia dívidas e risco de embargo. Evitei uma dor de cabeça enorme e só fechei negócio quando tudo foi regularizado.", 
    nome: "Patrícia A.", 
    profissao: "Compradora", 
    foto: "" 
  },
  { 
    texto: "Recebi do cliente toda a documentação já organizada pela consultoria. Isso acelerou muito o processo e reduziu custos para ele, porque eu só precisei focar na parte jurídica. Excelente parceria.", 
    nome: "Dr. Henrique L.", 
    profissao: "Advogado", 
    foto: "" 
  }
]


const steps = [
  {
    title: "Envie seus documentos",
    desc: "Você nos envia tudo que tem do imóvel: contrato, matrícula, IPTU, escritura, fotos, etc., pelo formulário seguro, rápido e sem complicação."
  },
  {
    title: "Identificamos os problemas",
    desc: "Nossa equipe verifica o que está travando a venda ou regularização, incluindo pendências em cartório, herança parada ou terrenos de posse/marinha."
  },
  {
    title: "Mapeamento de riscos legais",
    desc: "Analisamos cada detalhe para identificar riscos jurídicos e financeiros, garantindo que você saiba exatamente sua posição antes de negociar."
  },
  {
    title: "Relatório claro com soluções",
    desc: "Entregamos um parecer direto, mostrando os problemas e caminhos para resolver, para que você possa vender, negociar ou regularizar sem dor de cabeça."
  },
  {
    title: "Confirme sua segurança na posse",
    desc: "Além de levantar os documentos, avaliamos se sua posse é segura, permitindo negociar ou vender o imóvel com tranquilidade mesmo sem regularização completa."
  },
  {
    title: "Aja com confiança",
    desc: "Com todos os dados organizados e soluções apontadas, você sabe exatamente quais passos tomar ou qual advogado acionar, economizando tempo e evitando prejuízos."
  }
]



const sections = [
  {
    title: "O que fazemos na consultoria de imóveis travados",
    desc: "Nós analisamos seu caso quando o imóvel não pode ser vendido, está travado no cartório, em herança parada, em área de posse ou até em terreno da Marinha. Fazemos o levantamento da documentação, identificamos os problemas e mostramos os caminhos para liberar seu imóvel para venda, negociação ou regularização, garantindo que você saiba se sua posse é segura mesmo sem regularização completa.",
    img: "https://via.placeholder.com/400x300",
    alt: "Consultoria prática para destravar imóveis"
  },

  {
    title: "Por que contar com nossa consultoria",
    desc: "Imóveis irregulares travam negociações e podem gerar prejuízo. Nós identificamos os riscos, organizamos seus documentos e apontamos soluções claras. Assim, você evita dor de cabeça, sabe se a posse é segura e entende exatamente o que precisa para vender ou regularizar seu imóvel.",
    img: "https://via.placeholder.com/400x300",
    alt: "Soluções para imóveis irregulares"
  },

  {
    title: "Herança e inventário emperrados",
    desc: "O imóvel está no nome de alguém que já faleceu e ninguém consegue vender? Nós organizamos toda a documentação e já preparamos o caminho para o advogado fazer o inventário sem atrasos, garantindo que cada herdeiro esteja amparado.",
    img: "https://via.placeholder.com/400x300",
    alt: "Herança parada e inventário"
  },

  {
    title: "Venda travada no cartório",
    desc: "Você achou comprador, mas o cartório barrou a escritura? Nós levantamos os documentos que faltam, verificamos pendências e apontamos soluções para liberar a venda com segurança, incluindo avaliação da validade da posse para negociação mesmo antes da regularização completa.",
    img: "https://via.placeholder.com/400x300",
    alt: "Venda de imóvel travada"
  },

  {
    title: "Terrenos de posse e áreas de marinha",
    desc: "Seu imóvel não tem escritura, é posse antiga ou está em área da Marinha? Nós investigamos a situação, buscamos informações em órgãos públicos e mostramos o que pode ou não ser regularizado, além de indicar quando a posse já é segura para negociar.",
    img: "https://via.placeholder.com/400x300",
    alt: "Terrenos de posse e marinha"
  },

  {
    title: "Segurança para negociar sem dor de cabeça",
    desc: "Muitos compram ou vendem imóveis irregulares no escuro e acabam perdendo dinheiro. Nossa consultoria mostra de forma clara os riscos, caminhos possíveis e se a posse é segura, para você tomar decisões confiantes, mesmo antes de regularizar totalmente o imóvel.",
    img: "https://via.placeholder.com/400x300",
    alt: "Negociação segura de imóveis"
  }
]



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
  trackPageview();
})

const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase()
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>
