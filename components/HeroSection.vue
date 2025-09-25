<script setup>
defineProps({
  title: { type: String, required: true },
  highlight: { type: String, required: true },
  subtitle: { type: String, required: true },
  ctaText: { type: String, required: true },
  ctaLink: { type: String, required: true },
  image: { type: String, required: true },
  onClick: { type: Function, default: null },
  ctaBgColor: { type: String, default: "bg-green-400" }, // cor fundo
  ctaTextColor: { type: String, default: "text-white" }, // cor texto
  ctaHoverColor: { type: String, default: "hover:bg-green-500" }, // cor hover
  wrapperClass: { type: String, default: "text-xl font-bold" } // classe adicional
})
</script>

<template>
  <section class="relative min-h-screen flex flex-col-reverse md:flex-row bg-white overflow-hidden pt-20">
    <!-- Conteúdo -->
    <div
      class="z-10 w-full md:w-1/2 flex flex-col justify-center items-center text-center px-6 md:px-12"
    >
      <h1
        v-motion="{
          initial: { opacity: 0, y: 40 },
          enter: { opacity: 1, y: 0, transition: { duration: 1000, easing: 'ease-out' } }
        }"
        class="text-4xl md:text-6xl font-black mb-6 leading-none"
      >
        {{ title }}
        <span
          v-motion="{
            initial: { scale: 0.8, opacity: 0 },
            enter: { scale: 1, opacity: 1, transition: { duration: 1200, delay: 800 } }
          }"
          class="text-red-400 inline-block"
        >
          {{ highlight }}
        </span>
      </h1>

      <p
        v-motion="{
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 1200 } }
        }"
        class="text-lg md:text-xl mb-10"
      >
        {{ subtitle }}
      </p>

      <a
        :href="ctaLink"
        @click="onClick && onClick()"
        v-motion="{
          initial: { opacity: 0, scale: 0.9 },
          enter: { opacity: 1, scale: 1, transition: { duration: 800, delay: 1800 } }
        }"
        :class="[
          'inline-block px-6 py-3 mb-4 rounded-2xl shadow transition text-lg',
          ctaBgColor,
          ctaTextColor,
          ctaHoverColor,
          wrapperClass
        ]"
      >
        {{ ctaText }}
      </a>
    </div>

    <!-- Imagem primeiro no mobile -->
    <div class="w-full md:w-1/2 flex justify-center md:justify-end items-end mt-10 md:mt-0">
      <NuxtImg
        provider="cloudinary"
        sizes="(max-width: 768px) 100vw, 600px"
        :src="image"
        :alt="title"
        class="block max-w-full h-auto object-contain"
      />
    </div>
  </section>
</template>
