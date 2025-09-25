<template>
  <div>
    <!-- HERO -->
    <HeroSection
      :title="hero.title"
      :highlight="hero.highlight"
      :subtitle="hero.subtitle"
      :ctaText="hero.ctaText"
      :ctaLink="hero.ctaLink"
      :image="hero.image"
      ctaBgColor="bg-red-400"
      ctaHoverColor="hover:bg-red-600"
    />

    <!-- SECTIONS DINÂMICAS -->
    <section
      v-for="(item, index) in sections"
      :key="index"
      :class="[
        'w-full py-20 px-6',
        index % 4 === 0 ? 'bg-green-400 text-white' : '',
        index % 4 === 1 ? 'bg-white text-gray-900' : '',
        index % 4 === 2 ? 'bg-red-400 text-white' : '',
        index % 4 === 3 ? 'bg-white text-gray-900' : ''
      ]"
    >
      <div
        class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
        :class="index % 2 === 1 ? 'md:flex-row-reverse' : ''"
      >
        <!-- Imagem -->
        <div
          class="md:w-1/2 w-full flex fade-on-scroll"
          :class="index % 2 === 0 ? 'justify-start' : 'justify-end'"
        >
          <NuxtImg
            provider="cloudinary"
            sizes="(max-width: 768px) 100vw, 600px"
            :src="item.img"
            :alt="item.alt"
            class="w-full h-auto object-contain max-h-[500px]"
            :class="index % 2 === 0 
              ? '-rotate-3' 
              : 'rotate-3 hover:rotate-0 hover:-translate-y-2 hover:scale-105'"
          />
        </div>


        <!-- Texto -->
        <div class="md:w-1/2 text-center md:text-left fade-on-scroll">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ item.title }}</h2>
          <p v-if="item.desc" class="text-lg mb-6">{{ item.desc }}</p>
          <ul v-if="item.list" class="space-y-2 mb-6">
            <li v-for="(li, i) in item.list" :key="i">{{ li }}</li>
          </ul>
          <BotaoAgendar 
            text="Quero testar" 
            href="https://wa.me/..." 
            bgColor="bg-black" 
            textColor="text-white" 
            haloColor="bg-black"
          />
        </div>
      </div>
    </section>

    <section
      id="contador-section"
      class="bg-slate-50 py-20 px-6"
    >
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-12">
          Mais de <span class="text-green-400">300 donas de salão</span> já confiam na gente
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p id="contador1" class="text-5xl font-extrabold text-green-400">0</p>
            <p class="mt-2">Salões parceiros</p>
          </div>
          <div>
            <p id="contador2" class="text-5xl font-extrabold text-green-400">0</p>
            <p class="mt-2">Agendamentos realizados</p>
          </div>
          <div>
            <p id="contador3" class="text-5xl font-extrabold text-green-400">0</p>
            <p class="mt-2">Satisfação das clientes</p>
          </div>
        </div>
      </div>
    </section>

    <section 
      class="relative text-white py-20 px-6"
      style="
      background-image: 
        linear-gradient(45deg, #be185d 25%, transparent 25%),
        linear-gradient(-45deg, #1d4ed8 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #be185d 75%),
        linear-gradient(-45deg, transparent 75%, #1d4ed8 75%);
      background-size: 400px 400px; /* aumenta o tamanho do mosaico */
      background-color: #111827;
    "
    >
      <!-- Overlay escuro -->
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div class="max-w-5xl mx-auto text-center">
        <!-- Título com animação -->
        <h2
          class="text-3xl md:text-4xl font-bold mb-6"
          v-motion="{
            initial: { opacity: 0, scale: 0.9 },
            visibleOnce: { opacity: 1, scale: 1, transition: { duration: 800 } }
          }"
        >
          Do Orkut ao Instagram: o que nunca mudou?
        </h2>

        <!-- Texto com fade + slide up -->
        <p
          class="text-lg md:text-xl leading-relaxed mb-10"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visibleOnce: { opacity: 1, y: 0, transition: { duration: 1000, delay: 300 } }
          }"
        >
          Lembra quando todo mundo queria ter um site na época do
          <span class="font-semibold text-red-400">Orkut</span>? Depois veio o
          <span class="font-semibold text-red-400">Facebook</span>, o
          <span class="font-semibold text-red-400">Instagram</span>...
          As redes mudam, o algoritmo muda, mas uma coisa nunca muda:
          <span class="font-bold"
            >quem tem um espaço próprio na internet tem mais força, mais
            credibilidade e mais clientes.</span
          >
        </p>

        <!-- Cards animados centralizados -->
        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="p-6 bg-white text-red-400 rounded-2xl shadow hover:shadow-lg transition"
            v-motion="{
              initial: { opacity: 0, y: 40, scale: 0.95 },
              visibleOnce: { opacity: 1, y: 0, scale: 1, transition: { duration: 900, delay: 500 } }
            }"
          >
            <h3 class="text-xl font-bold mb-3">Rede social é aluguel</h3>
            <p class="text-slate-600">
              Se o algoritmo muda, sua página some. Com um site, o espaço é seu pra sempre.
            </p>
          </div>

          <div
            class="p-6 bg-white text-red-400 rounded-2xl shadow hover:shadow-lg transition"
            v-motion="{
              initial: { opacity: 0, y: 40, scale: 0.95 },
              visibleOnce: { opacity: 1, y: 0, scale: 1, transition: { duration: 900, delay: 700 } }
            }"
          >
            <h3 class="text-xl font-bold mb-3">Google traz cliente novo</h3>
            <p class="text-slate-600">
              Quem busca “salão perto de mim” vai encontrar você. Mesmo sem te seguir.
            </p>
          </div>

          <div
            class="p-6 bg-white text-red-400 rounded-2xl shadow hover:shadow-lg transition"
            v-motion="{
              initial: { opacity: 0, y: 40, scale: 0.95 },
              visibleOnce: { opacity: 1, y: 0, scale: 1, transition: { duration: 900, delay: 900 } }
            }"
          >
            <h3 class="text-xl font-bold mb-3">Mais profissionalismo</h3>
            <p class="text-slate-600">
              Um site passa confiança e mostra que o salão é organizado e sério.
            </p>
          </div>
        </div>

        <!-- Botão com efeito pulse -->
        <div
          class="mt-10 inline-block"
          v-motion="{
            initial: { opacity: 0, scale: 0.8 },
            visibleOnce: { opacity: 1, scale: 1, transition: { duration: 600, delay: 1100 } }
          }"
        >
          <BotaoAgendar 
            class="animate-pulse" 
            text="Quero testar" 
            href="https://wa.me/..." 
            bgColor="bg-green-500" 
            textColor="text-white" 
            haloColor="bg-green-500"
          />
        </div>
      </div>
    </section>


    <section class="bg-gradient-to-r from-green-900 to-green-300 text-white py-20 px-6">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Mais clientes, menos complicação
        </h2>
        <p class="text-lg md:text-xl leading-relaxed mb-12 fade-on-scroll">
          Nossa plataforma foi feita para <span class="font-semibold text-red-300">simplificar sua agenda</span>.  
          Você cuida da beleza, e nós cuidamos da organização: mais horários preenchidos e menos tempo perdido.
        </p>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="p-6 bg-white/95 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition fade-on-scroll">
            <h3 class="text-xl font-bold text-red-400 mb-3">Agenda online</h3>
            <p class="text-slate-600">Seus horários sempre disponíveis, clientes agendam sozinhas sem precisar te chamar toda hora.</p>
          </div>
          <div class="p-6 bg-white/95 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition fade-on-scroll">
            <h3 class="text-xl font-bold text-red-400 mb-3">Mais visibilidade</h3>
            <p class="text-slate-600">Mostre seus serviços online e conquiste novas clientes no digital sem gastar com anúncios caros.</p>
          </div>
          <div class="p-6 bg-white/95 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition fade-on-scroll">
            <h3 class="text-xl font-bold text-red-400 mb-3">Zero dor de cabeça</h3>
            <p class="text-slate-600">Organização simples, lembretes automáticos e suporte pra você focar só no atendimento.</p>
          </div>
        </div>

        <BotaoAgendar 
          text="Quero testar" 
          href="https://wa.me/..." 
          bgColor="bg-green-500" 
          textColor="text-white" 
          haloColor="bg-green-500"
        />
      </div>
    </section>


    <!-- DEPOIMENTOS -->
    <section class="py-20 px-6 bg-slate-50 text-slate-800">
      <div class="max-w-6xl mx-auto text-center fade-on-scroll">
        <h2 class="text-3xl md:text-4xl font-black mb-10">Alguns clientes que aprovam nosso trabalho</h2>
        <div class="mb-10 flex flex-col items-center gap-2">
          <div class="text-5xl md:text-6xl font-extrabold text-yellow-400">
            {{ mediaRating }}/5
          </div>
          <div class="flex gap-1">
          <template v-for="i in 5" :key="i">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-10 h-10"
              :class="i <= Math.round(mediaRating) ? 'text-yellow-400' : 'text-gray-300'"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </template>
        </div>
        </div>
        <client-only>
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
            navigation
            :pagination="{ clickable: true }"
            loop
            class="w-full max-w-5xl mx-auto relative"
          >
            <SwiperSlide 
              v-for="(depoimento, i) in depoimentos" 
              :key="i"
            >
              <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition max-w-xs mx-auto h-full flex flex-col justify-between">
                <p class="text-lg font-semibold text-gray-800 mb-4">"{{ depoimento.texto }}"</p>

                <!-- Rating -->
                <div class="flex items-center mb-4">
                  <span
                    v-for="n in 5"
                    :key="n"
                    class="w-5 h-5"
                  >
                    <svg
                      v-if="n <= depoimento.rating"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      class="text-yellow-400"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="text-gray-300"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.073 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.073 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.073-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>

                <!-- Autor -->
                <div class="flex items-center">
                  <template v-if="depoimento.foto">
                    <NuxtImg class="w-12 h-12 rounded-full mr-4" :src="depoimento.foto" :alt="`Foto de ${depoimento.nome}`" />
                  </template>
                  <template v-else>
                    <div class="w-12 h-12 rounded-full mr-4 bg-pink-600 flex items-center justify-center text-white font-semibold">
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

    <section class="bg-red-400 text-white py-20 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-black mb-10 fade-on-scroll">
          Perguntas Frequentes
        </h2>

        <div class="space-y-6 text-left">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="bg-red-300 p-6 rounded-2xl shadow hover:shadow-lg transition fade-on-scroll"
            :data-delay="index * 100"
          >
            <h3 class="font-semibold text-xl mb-2">{{ faq.pergunta }}</h3>
            <p>{{ faq.resposta }}</p>
          </div>
        </div>
        
      </div>
    </section>
  
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
const { trackEvent, trackPageview } = useAnalytics();
// Dados dinâmicos (podem vir do CMS, props ou config do whitelabel)

const hero = {
    title: "Revolucionando o mercado",
    highlight: "dos pequenos salões de beleza",
    subtitle: "Nunca foi tão simples ter o seu salão sob controle, ganhar mais clientes e mostrar profissionalismo.",
    ctaText: "Experimente já",
    ctaLink: "/agendamento",
    image:"v1758666030/foto-cabeleireira-2-700-hero0_gzstbz.png"
}

const faqs = [
  {
    pergunta: "A SuaAgenda ajuda meu salão a aparecer no Google?",
    resposta: "Sim. Quando você cria sua página na SuaAgenda, ela já é configurada para aparecer no Google. Assim, novas clientes que pesquisam por serviços de beleza podem encontrar seu salão online."
  },
  {
    pergunta: "Ter uma página de agendamento online realmente traz mais clientes?",
    resposta: "Traz sim. Além de facilitar a vida das clientes atuais, sua página no Google faz com que pessoas que ainda não conhecem você descubram seu salão e agendem direto."
  },
  {
    pergunta: "Posso compartilhar meu link de agendamento no WhatsApp e Instagram?",
    resposta: "Pode sim. Você recebe um link exclusivo para divulgar no WhatsApp, Instagram e outras redes sociais. Basta clicar e a cliente já agenda."
  },
  {
    pergunta: "Preciso pagar anúncios para aparecer no Google?",
    resposta: "Não precisa. SuaAgenda já cuida da parte técnica para que sua página tenha mais chances de aparecer no Google sem gastar com anúncios."
  },
  {
    pergunta: "Além de aparecer no Google, como a SuaAgenda ajuda meu salão no dia a dia?",
    resposta: "O sistema organiza seus horários, evita marcações duplicadas e envia lembretes automáticos para as clientes. Isso reduz faltas e aumenta a produtividade."
  },
  {
    pergunta: "Funciona só para salão de beleza ou também para barbearia?",
    resposta: "Funciona para qualquer negócio com agendamento: salão, manicure, cílios, sobrancelha, barbearia, estética e outros. Todos podem ganhar novos clientes no Google."
  },
  {
    pergunta: "Em quanto tempo começo a aparecer nas buscas?",
    resposta: "Assim que sua página estiver no ar, o Google já pode começar a mostrar. Quanto mais você divulgar seu link, mais rápido novas clientes chegam."
  },
  {
    pergunta: "Preciso entender de tecnologia para usar?",
    resposta: "Não precisa. É simples de usar: você cadastra seus serviços e horários, e a plataforma já cuida de todo o resto para aparecer no Google e organizar os agendamentos."
  },
]


const depoimentos = [
  { 
    texto: "Antes eu só anotava em papel e WhatsApp, vivia me confundindo. Agora minhas clientes agendam sozinhas, recebo tudo organizado e não perco mais horário.",
    nome: "Carla Souza - Espaço Beleza", 
    foto: "https://i.ibb.co/0JxkP0H/client1.jpg",
    rating: 5
  },
  { 
    texto: "Depois que fiz a página meu salão começou a aparecer no Google. Já consegui várias clientes novas que nunca tinham vindo aqui.",
    nome: "Juliana Ferreira - Studio Lash", 
    foto: "https://i.ibb.co/4ZpXNN0g/client2.jpg",
    rating: 5
  },
  { 
    texto: "O sistema é simples e profissional. Coloquei o link na bio do Instagram e em uma semana já recebi novos agendamentos sem precisar responder mensagem.",
    nome: "Patrícia Almeida - Studio Patricia", 
    foto: "https://i.ibb.co/HVw4pqK/client4.jpg",
    rating: 5
  },
  { 
    texto: "O que eu mais gostei foi o lembrete automático. Minhas clientes não esquecem mais e minhas faltas caíram muito.",
    nome: "Renata Lima - Nails & Spa", 
    foto: "https://i.ibb.co/fpFvptN/client3.jpg",
    rating: 5
  },
  { 
    texto: "Agora organizo horários de duas funcionárias no mesmo sistema. Ficou fácil controlar tudo sem dor de cabeça.",
    nome: "Luciana Martins - Beleza & Estilo", 
    foto: "https://i.ibb.co/mR2yhsC/client8.jpg",
    rating: 5
  },
  { 
    texto: "O site deixou meu salão com cara mais profissional. As clientes comentam que ficou chique ter link próprio de agendamento.",
    nome: "Tatiane Gomes - Nail Designer", 
    foto: "https://i.ibb.co/XjZn4gk/client7.jpg",
    rating: 5
  },
  { 
    texto: "Eu mesma não entendia nada de tecnologia, mas foi só mandar as informações que já fiquei online com meu salão. Simples e rápido!",
    nome: "Marcia Oliveira - Cílios & Design", 
    foto: "https://i.ibb.co/qY7htmD/client9.jpg",
    rating: 5
  },
  { 
    texto: "As clientes falam que ficou muito mais fácil marcar horário comigo. E eu fiquei mais tranquila, porque não esqueço de responder ninguém.",
    nome: "Fernanda Costa - Espaço Feminize", 
    foto: "https://i.ibb.co/Z6n9qNh/client10.jpg",
    rating: 5
  },
  { 
    texto: "Já testei várias agendas no celular, mas nenhuma funcionava. Esse sistema de link no WhatsApp foi o único que realmente resolveu pra mim.",
    nome: "Aline Barbosa - Salão Aline", 
    foto: "https://i.ibb.co/hYrk5tY/client11.jpg",
    rating: 5
  },
  { 
    texto: "Achei que ia ser caro manter, mas pelo valor que pago e pelo retorno que tenho em clientes novas, vale cada centavo.",
    nome: "Cristiane Lopes - Beleza Express", 
    foto: "https://i.ibb.co/8bZXWyT/client12.jpg",
    rating: 5
  }
]

const sections = [
  {
    title: "Mais clientes para o seu salão",
    desc: "Não importa se o salão é pequeno: com um site próprio, você aparece no Google quando alguém procura por serviços na sua região. Isso passa confiança, mostra profissionalismo e ajuda a conquistar clientes novos todos os dias.",
    img: "v1758668031/mulher-bonita-cortando-cabelo-no-cabeleireiro_bwy8e8.png",
    alt: "Site profissional para pequenos salões"
  },

  {
    title: "Agenda no WhatsApp",
    desc: "Cliente escolhe o horário, confirma em 1 clique e você não perde tempo respondendo direct.",
    img: "v1758668010/ARTE-AGENDA-WHATSAAPP_ezvzia.png",
    alt: "Agenda online no WhatsApp"
  },
  {
    title: "Mais clientes todo dia",
    desc: "Quem procura salão no Google encontra você primeiro. Resultado: mais clientes entrando sem precisar de anúncio.",
    img: "v1758668010/ARTE-GOOGLE-SITE_rc1a33.png",
    alt: "Clientes vindos do Google"
  },
  {
    title: "Destaque no Insta",
    desc: "Seu site conecta direto com o Insta, mostrando que você é profissional de verdade.",
    img: "v1758668011/ARTE-mockup-insta_dgz0qv.png",
    alt: "Integração com Instagram"
  },
  {
    title: "Zero dor de cabeça",
    desc: "A gente cuida de tudo: hospedagem, segurança e atualização. Você só usa, simples assim.",
    img: "v1758668014/foto-lash-site_qqdyca.png",
    alt: "Suporte garantido"
  },
  {
    title: "Do jeito do seu salão",
    desc: "Cada salão é único. Montamos seu site e agenda de acordo com seu público e estilo.",
    img: "v1758668011/ARTE-SITE-LASH_rdq6rh.png",
    alt: "Site personalizado"
  },
    {
    title: "Sem furo na agenda",
    desc: "Com lembrete automático no WhatsApp, suas clientes não esquecem o horário e você não perde dinheiro.",
    img: "v1758670902/mulher-recebendo-confirmacao-no-whats_xi2yfg.png",
    alt: "Lembrete automático de agendamento"
  }

]

const studio = {
  name: "SuaAgenda - Sites e Agenda para Salões",
  url: "https://suaagenda.link/",
  image: "https://i.ibb.co/vCPhCPXG/retrato-de-moda-beleza-de-jovem-morena.jpg",
  telephone: "+55-11-99999-9999",
  address: {
    streetAddress: "Av. Exemplo, 1000",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01234-567",
    addressCountry: "BR"
  },
  geo: {
    lat: -23.55052,
    lng: -46.633308
  },
  social: [
    "https://www.instagram.com/suaagenda",
    "https://www.facebook.com/suaagenda"
  ]
}
// calcula a média
const mediaRating = computed(() => {
  if (!depoimentos.length) return null
  const total = depoimentos.reduce((acc, d) => acc + d.rating, 0)
  return (total / depoimentos.length).toFixed(1) // ex: 4.8
})

// monta JSON-LD dinâmico
const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Site e Agenda Fácil para Pequenos Salões de Beleza",
      "url": studio.url,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "image": studio.image,
      "description": "Plataforma simples e poderosa para pequenos salões de beleza: tenha seu site profissional, agenda online e mais clientes.",
      "author": {
        "@type": "Organization",
        "name": studio.name,
        "url": studio.url
      },
      ...(mediaRating.value && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": mediaRating.value,
          "reviewCount": depoimentos.length
        }
      })
    },
    {
      "@type": "LocalBusiness",
      "name": studio.name,
      "image": studio.image,
      "@id": studio.url,
      "url": studio.url,
      "telephone": studio.telephone,
      "address": {
        "@type": "PostalAddress",
        ...studio.address
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": studio.geo.lat,
        "longitude": studio.geo.lng
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "priceRange": "$$",
      "sameAs": studio.social
    }
  ]
}))


useHead({
  title: 'Site e Agenda Fácil para Pequenos Salões de Beleza',
  meta: [
    {
      name: 'description',
      content: 'Transforme seu salão em referência no Google! Tenha site profissional, agenda automática no WhatsApp e mais clientes todos os dias. Simples, rápido e feito para pequenos salões de beleza.'
    },
    {
      name: 'keywords',
      content: 'imóveis, corretores, leads imobiliários, sistema imobiliário, imóveis de posse, segurança imobiliária, site de corretor, destaque no Google, gestão de imóveis, teste grátis'
    },
    { property: 'og:title', content: 'Site e Agenda Fácil para Pequenos Salões de Beleza' },
    { property: 'og:description', content: 'Transforme seu salão em referência no Google! Tenha site profissional, agenda automática no WhatsApp e mais clientes todos os dias. Simples, rápido e feito para pequenos salões de beleza.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://suaagenda-landing.onrender.com' },
    { property: 'og:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Site e Agenda Fácil para Pequenos Salões de Beleza' },
    { name: 'twitter:description', content: 'Transforme seu salão em referência no Google! Tenha site profissional, agenda automática no WhatsApp e mais clientes todos os dias. Simples, rápido e feito para pequenos salões de beleza.' },
    { name: 'twitter:image', content: 'https://res.cloudinary.com/du872kkq0/image/upload/v1758737301/og-image_rnumjg.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://suaagenda-landing.onrender.com/' }
  ],
  script: [
    {
      type: "application/ld+json",
      children: computed(() => JSON.stringify(jsonLd.value))
    }
  ]
})

const animarContador = (id, final, duracao, sufixo = "") => {
  const el = document.getElementById(id)
  if (!el) return

  let valor = 0
  const incremento = final / (duracao / 16)

  function atualizar() {
    valor += incremento
    if (valor < final) {
      el.textContent = Math.floor(valor)
      requestAnimationFrame(atualizar)
    } else {
      el.textContent = final + sufixo
    }
  }
  atualizar()
}

onMounted(() => {
  let iniciado = false
  window.addEventListener("scroll", () => {
    const section = document.querySelector("#contador-section")
    if (!section) return

    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom >= 0 && !iniciado) {
      iniciado = true
      animarContador("contador1", 300, 2000, "+")
      animarContador("contador2", 1200, 2500, "+")
      animarContador("contador3", 98, 1800, "%")
    }
  })
})

const enviarEvento = () => {
  if (window.gtag) {
    window.gtag('event', 'click_test', {
      event_category: 'debug',
      event_label: 'Botão Teste'
    })
    console.log("📡 Evento enviado: click_test")
  } else {
    console.warn("⚠️ gtag ainda não carregou")
  }
}

// Fade-in animação
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
  // Rastrear visualização de página (usar no mounted())
  trackPageview();
})

const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase()


</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s }
.fade-enter-from, .fade-leave-to { opacity: 0 }

/* Setas customizadas */
.swiper-button-next,
.swiper-button-prev {
  color: #46da90; /* rosa forte */
  font-weight: bold;
  transition: color 0.3s, transform 0.2s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #46da90; /* rosa mais escuro no hover */
  transform: scale(1.2);
}

/* Paginação (bolinhas) */
.swiper-pagination-bullet {
  background: #46da90;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.swiper-pagination-bullet-active {
  background: #46da90;
  opacity: 1;
}
</style>
