<template>
    <section class="py-20 px-6 bg-gray-100">
      <div class="max-w-6xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-black">Nossas Fotos</h2>
        <p class="text-lg text-gray-600 mt-4">Confira alguns de nossos trabalhos de sobrancelhas e cílios</p>
      </div>
  
      <!-- Grid de imagens -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="overflow-hidden rounded-2xl relative group cursor-pointer"
          @click="openLightbox(index)"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold"
          >
            {{ img.label }}
          </div>
        </div>
      </div>
  
      <!-- Lightbox -->
      <transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        >
          <button
            class="cursor-pointer absolute top-6 right-6 text-white text-3xl font-bold hover:text-yellow-400"
            @click="lightboxOpen = false"
          >&times;</button>
  
          <button
            class="cursor-pointer absolute left-6 text-white text-3xl font-bold hover:text-yellow-400"
            @click="prevImage"
          >&#10094;</button>
  
          <img
            :src="images[currentImage].src"
            :alt="images[currentImage].alt"
            class="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl shadow-lg transition-transform duration-500"
          />
  
          <button
            class="cursor-pointer absolute right-6 text-white text-3xl font-bold hover:text-yellow-400"
            @click="nextImage"
          >&#10095;</button>
        </div>
      </transition>
    </section>
  </template>
  
  <script setup>
import { ref } from "vue";

// array de imagens local
const images = [
  { src: 'https://i.ibb.co/4ZpXNN0g/mulher-fazendo-tratamento-para-sobrancelha-em-um-salao-de-beleza.jpg', alt: 'Sobrancelha', label: 'Sobrancelha' },
  { src: 'https://i.ibb.co/7nP7dYB/mulher-com-cilios-alongados.jpg', alt: 'Cílios', label: 'Cílios' },
  { src: 'https://i.ibb.co/2tX6LxB/mulher-fazendo-lash-lifting.jpg', alt: 'Lash Lifting', label: 'Lash Lifting' },
  { src: 'https://i.ibb.co/8d1xK5D/mulher-com-henna.jpg', alt: 'Henna sobrancelhas', label: 'Henna' },
];

const lightboxOpen = ref(false);
const currentImage = ref(0);

function openLightbox(index) {
  currentImage.value = index;
  lightboxOpen.value = true;
}

function nextImage() {
  currentImage.value = (currentImage.value + 1) % images.length;
}

function prevImage() {
  currentImage.value = (currentImage.value - 1 + images.length) % images.length;
}
</script>

  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  