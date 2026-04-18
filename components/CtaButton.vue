<!-- components/CtaButton.vue -->
<template>
    <component
      :is="external ? 'a' : NuxtLink"
      :href="external ? href : undefined"
      :to="!external ? href : undefined"
      class="inline-flex items-center justify-center gap-2 font-bold transition hover:-translate-y-0.5 active:scale-95"
      :class="[sizeClasses, variantClasses, roundedClass]"
    >
      <span v-if="emoji" class="text-base leading-none">{{ emoji }}</span>
      <slot>{{ label }}</slot>
      <svg v-if="arrow" viewBox="0 0 20 20" fill="none" class="w-4 h-4 flex-shrink-0">
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </component>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { NuxtLink } from '#components'
  
  const props = withDefaults(defineProps<{
    label?:    string
    href?:     string
    emoji?:    string
    arrow?:    boolean
    external?: boolean
    variant?:  'primary' | 'outline' | 'ghost'
    size?:     'sm' | 'md' | 'lg' | 'xl'
    rounded?:  'lg' | 'xl' | '2xl' | 'full'
  }>(), {
    label:    '',
    href:     '#',
    arrow:    false,
    external: true,
    variant:  'primary',
    size:     'md',
    rounded:  '2xl',
  })
  
  const sizeClasses = computed(() => ({
    sm:  'px-4 py-2 text-sm',
    md:  'px-5 py-2.5 text-sm',
    lg:  'px-6 py-3 text-base',
    xl:  'px-8 py-4 text-lg',
  }[props.size]))
  
  const variantClasses = computed(() => ({
    primary: 'bg-green-400 text-black hover:bg-green-300 shadow-lg shadow-green-400/20',
    outline: 'border border-green-400/30 text-green-400 hover:border-green-400 hover:bg-green-400/10',
    ghost:   'text-white border border-white/20 hover:border-green-400 hover:text-green-400',
  }[props.variant]))
  
  const roundedClass = computed(() => `rounded-${props.rounded}`)
  </script>