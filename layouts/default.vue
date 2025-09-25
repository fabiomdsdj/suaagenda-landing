<template>
  <div class="font-[Poppins] min-h-screen text-slate-800">

    <!-- HEADER -->
    <header class="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white z-50">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <NuxtImg
          provider="cloudinary"
          src="v1758665895/logo-sua-agenda-site_u87ec1.jpg" 
          alt="Sua agenda" 
          
          v-motion="{
              initial: { scale: 0.4, opacity: 0 },
              enter: { scale: 1, opacity: 1, transition: { duration: 1200, delay: 100 } }
            }"
        />
      </NuxtLink>

      <!-- Links desktop -->
      <nav class="hidden md:flex gap-6 items-center"
          v-motion="{ initial: { scale: 0.4, opacity: 0 }, enter: { scale: 1, opacity: 1, transition: { duration: 1200, delay: 100 } } }"
      >
        <template v-for="link in links" :key="link.label">

          <!-- Submenu container -->
          <div 
            v-if="link.submenu" 
            class="relative"
            @mouseenter="submenuOpen[link.label] = true"
            @mouseleave="submenuOpen[link.label] = false"
          >
            <!-- Botão do menu -->
            <button class="flex items-center gap-1 font-medium text-md hover:text-green-600 transition">
              {{ link.label }}
            </button>

            <!-- Submenu card -->
            <transition name="fade">
              <div 
                v-show="submenuOpen[link.label]"
                class="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded w-64 z-20 p-4"
                style="pointer-events: auto;"
              >
                <ul>
                  <li v-for="s in link.submenu" :key="s.slug" class="py-1 hover:bg-gray-100 px-2 rounded">
                    <NuxtLink 
                      :to="`/${s.slug}`" 
                      class="text-gray-800 hover:text-green-600"
                      @mouseenter="submenuOpen[link.label] = true" 
                      @mouseleave="submenuOpen[link.label] = true"
                    >
                      {{ s.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!-- Link normal -->
          <NuxtLink 
            v-else-if="link.to" 
            :to="link.to" 
            class="text-md font-medium hover:text-green-400 transition"
          >
            {{ link.label }}
          </NuxtLink>

        </template>

        <!-- Botão Entrar -->
        <NuxtLink 
          href="/" 
          class="px-4 py-2 bg-green-400 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Minha agenda
        </NuxtLink>
      </nav>



      <!-- Botão hambúrguer -->
      <button class="md:hidden text-gray-950 z-50" aria-label="Abrir menu de navegação" @click="menuOpen = !menuOpen">
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Menu mobile sobreposto -->
      <transition name="fade">
        <div v-if="menuOpen" class="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 z-40">

          <template v-for="link in links" :key="link.label">
            <!-- Submenu -->
            <div v-if="link.submenu" class="flex flex-col items-center gap-2">
              <button 
                @click="submenuOpen[link.label] = !submenuOpen[link.label]" 
                class="text-gray-700 font-medium text-lg"
              >
                {{ link.label }} ▼
              </button>

              <ul v-if="submenuOpen[link.label]" class="flex flex-col gap-2 mt-2">
                <li v-for="s in link.submenu" :key="s.slug">
                  <NuxtLink 
                    :to="`/${s.slug}`" 
                    class="text-gray-700 hover:text-green-600"
                    @click="menuOpen = false"
                  >
                    {{ s.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Link normal -->
            <NuxtLink 
              v-else-if="link.to" 
              :to="link.to" 
              class="text-gray-700 hover:text-green-600 text-md font-medium"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>

            <a 
              v-else-if="link.external" 
              :href="link.href" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-gray-700 hover:text-green-600 text-md font-medium"
            >
              {{ link.label }}
            </a>
          </template>

          <!-- Botão fixo -->
          <a
            href="/"
            class="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-700 transition"
            @click="menuOpen = false"
          >
            Minha agenda
          </a>

        </div>
      </transition>

    </header>

    <!-- CONTEÚDO DA PÁGINA -->
    <main>
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-950 text-slate-300 py-16 px-6">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        <!-- Logo e descrição -->
        <div>
          <h2 
            class="text-2xl font-bold text-green-400 mb-4 fade-on-scroll opacity-0 translate-y-10 transition-all duration-700" 
            data-delay="0"
          >
            Sua agenda
          </h2>
          <p 
            class="fade-on-scroll opacity-0 translate-y-10 transition-all duration-700" 
            data-delay="200"
          >
            Organize seus agendamentos, conquiste novas clientes e valorize ainda mais o seu salão.  
            Nosso sistema foi feito para <span class="font-semibold text-green-400">simplificar sua rotina e aumentar seus lucros</span>.  
            Mais praticidade, mais visibilidade e mais tempo para cuidar do que você ama: realçar a beleza das suas clientes.
          </p>
        </div>


        <!-- Links úteis -->
        <div class="fade-on-scroll opacity-0 translate-y-10 transition-all duration-700" data-delay="400">
          <div
            v-for="nicho in nichos"
            :key="nicho.slug"
          >
            <h2 class="font-bold text-xl">{{ nicho.name }}</h2>
            <ul class="ml-4">
              <li v-for="servico in servicos" :key="servico.slug">
                <NuxtLink :to="`/servicos/${servico.slug}/${nicho.slug}`">
                  {{ servico.name }} para {{ nicho.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contato -->
        <div class="fade-on-scroll opacity-0 translate-y-10 transition-all duration-700" data-delay="600">
          <h3 class="text-xl font-semibold mb-4">Localização</h3>
          <p>Av Governador Mario Covas Jr, 4600 </p>
          <p>Vila Atlântica </p>
          <p>Mongaguá, SP</p>
        </div>

        <!-- Redes sociais -->
        <div class="fade-on-scroll opacity-0 translate-y-10 transition-all duration-700" data-delay="800">
          <h3 class="text-xl font-semibold mb-4">Estamos nas redes</h3>
          <div class="flex gap-4">

            <!-- Facebook -->
            <a href="https://www.facebook.com/profile.php?id=61581430582623" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition flex items-center gap-2" aria-label="Facebook da Sua Agenda">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#1877F2" viewBox="0 0 24 24" class="w-12 h-12">
                <path d="M22 12a10 10 0 1 0-11.6 9.86v-6.99h-2.5V12h2.5v-1.7c0-2.48 1.48-3.85 3.75-3.85 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.87h-2.34v6.99A10 10 0 0 0 22 12"/>
              </svg>
            </a>

            <!-- Instagram -->
            <a href="https://www.instagram.com/sistemasuaagenda/" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition flex items-center gap-2" aria-label="Instagram da Sua Agenda">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E1306C" viewBox="0 0 24 24" class="w-12 h-12">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.963.24 2.422.402a4.922 4.922 0 0 1 1.788 1.08 4.922 4.922 0 0 1 1.08 1.788c.163.46.348 1.252.403 2.422.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.963-.403 2.422a4.922 4.922 0 0 1-1.08 1.788 4.922 4.922 0 0 1-1.788 1.08c-.46.163-1.252.348-2.422.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.963-.24-2.422-.403a4.922 4.922 0 0 1-1.788-1.08 4.922 4.922 0 0 1-1.08-1.788c-.163-.46-.348-1.252-.403-2.422C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.24-1.963.403-2.422a4.922 4.922 0 0 1 1.08-1.788 4.922 4.922 0 0 1 1.788-1.08c.46-.163 1.252-.348 2.422-.403C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.16 0-3.53.012-4.78.069-1.047.048-1.61.22-1.985.367a3.125 3.125 0 0 0-1.135.723 3.125 3.125 0 0 0-.723 1.135c-.147.375-.319.938-.367 1.985-.057 1.25-.069 1.62-.069 4.78s.012 3.53.069 4.78c.048 1.047.22 1.61.367 1.985.17.39.392.73.723 1.135.404.33.745.552 1.135.723.375.147.938.319 1.985.367 1.25.057 1.62.069 4.78.069s3.53-.012 4.78-.069c1.047-.048 1.61-.22 1.985-.367a3.125 3.125 0 0 0 1.135-.723 3.125 3.125 0 0 0 .723-1.135c.147-.375.319-.938.367-1.985.057-1.25.069-1.62.069-4.78s-.012-3.53-.069-4.78c-.048-1.047-.22-1.61-.367-1.985a3.125 3.125 0 0 0-.723-1.135 3.125 3.125 0 0 0-1.135-.723c-.375-.147-.938-.319-1.985-.367-1.25-.057-1.62-.069-4.78-.069zm0 3.5a6.3 6.3 0 1 1 0 12.6 6.3 6.3 0 0 1 0-12.6zm0 1.8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm6.4-1.9a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Direitos -->
      <div class="mt-10 text-center text-slate-400 text-sm">
        &copy; 2025 Sua agenda. Todos os direitos reservados.
      </div>
      <!-- Botão Flutuante de WhatsApp -->
      <WhatsappButton 
        :contacts="siteInfo.contacts"
        defaultMessage="Olá, vim pelo site e gostaria de atendimento"
      />
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import locals from "~/data/local";
import servicos from "~/data/servicos";
import nichos from "~/data/nichos";

const themeColor = ref('#ff6467') // valor inicial

// Simula pegar de uma API
onMounted(async () => {
  const data = await $fetch('/api/config') // exemplo de API
  themeColor.value = data.themeColor || '#ff6467'
})

// Aqui estão os contatos, futuramente você pode buscar da API
const siteInfo = ref({
  contacts: [
    { 
      name: 'Vendas', 
      phone: '+5511941649284',
      availableTimes: ['10:30', '14:00', '16:00']
    },
    { 
      name: 'Suporte', 
      phone: '+5511941649284',
      availableTimes: ['09:00', '12:00', '15:00']
    }
  ]
})

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

useHead({
  meta: [
    { name: 'theme-color', content: themeColor.value }
  ],  
  link: [
    // Favicon básico
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://i.ibb.co/N6TTmpQx/favicon-16x16.png' },
    { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: 'https://i.ibb.co/wN3LnJ1S/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '48x48', href: 'https://i.ibb.co/xxxxxx/favicon-48x48.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'https://i.ibb.co/Qjbynbsc/android-chrome-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: 'https://i.ibb.co/dwRwhNzV/android-chrome-512x512.png' },


    //{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    //{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    //{
    //  rel: 'stylesheet',
    //  href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    //},
  ],
  
})

const menuOpen = ref(false) // mobile
const submenuOpen = reactive({}) // objeto vazio que vai guardar cada submenu


const links = [
  
  { label: "O que oferecemos", submenu: servicos },
  { label: "Quem ajudamos", submenu: nichos }, // <- aqui troquei de "to" para "submenu"
  { label: "Preços", to: "/precos" }
]

// Inicializa todas as chaves do submenu
links.forEach(link => {
  if (link.submenu) submenuOpen[link.label] = false
})

</script>

<style>
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s }
  .fade-enter-from, .fade-leave-to { opacity: 0 }

  .opacity-0 { opacity: 0; }
    .opacity-100 { opacity: 1; }
    .translate-y-10 { transform: translateY(2.5rem); }
    .translate-y-0 { transform: translateY(0); }

</style>
