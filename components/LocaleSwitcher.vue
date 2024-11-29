<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <UButton v-for="l in availableLocales" :key="l.code" variant="soft">
    <NuxtLink :to="switchLocalePath(l.code)">
      {{ l.name }}
    </NuxtLink>
  </UButton>
</template>
