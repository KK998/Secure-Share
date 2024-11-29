<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <UButton variant="soft" v-for="locale in availableLocales" :key="locale.code">
    <NuxtLink :to="switchLocalePath(locale.code)">
      {{ locale.name }}
    </NuxtLink>
  </UButton>
</template>
