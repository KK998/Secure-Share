<script setup lang="ts">

const route = useRoute()
if (!route.params.id) throw createError({ statusCode: 404, fatal: true });

const { data: share } = await useFetch(() => `/api/v1/share/${route.params.id}`)

if (!share.value) throw createError({ statusCode: 404, fatal: true })

const content = useState('content', () => '')

function handleContentCopy() {
  useClipboard().copy(String(content.value))
  useToast().add({
    title: 'Copied url to clipboard!'
  })
}
</script>

<template>
  <main class="mx-auto container gap-10 flex flex-col justify-center items-center">
    <ClientOnly>
      <SharePasswordForm v-if="!content" @submit="content = $event" />
      <UButtonGroup v-else size="lg" orientation="vertical" class="w-full">
        <UTextarea
v-model="content" class="w-full" disabled autoresize :ui="{
          base: 'disabled:!cursor-copy'
        }" />
        <UButton icon="i-heroicons-clipboard-document" color="gray" class="ml-auto" @click="handleContentCopy">
          {{ $t('share.copy') }}
        </UButton>
      </UButtonGroup>
    </ClientOnly>
  </main>
</template>
