<!--app.vue-->
<template>
  <div>
    <NuxtLayout> 
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
useHead({
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-MB7JZNQX5L',
      async: true,
      tagPosition: 'head',
    },
    {
      key: 'gtag-init',
      innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MB7JZNQX5L');`,
      tagPosition: 'head',
    },
  ],
})
</script>


