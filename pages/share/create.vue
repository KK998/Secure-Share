<script setup lang="ts">
const route = useRoute()
const url = useRequestURL()

const urlToCopy = `${url.origin}${route.query.slug}`

const handleUrlCopy = () => {
    useClipboard().copy(urlToCopy)
    useToast().add({
        title: 'Copied url to clipboard!'
    })
}
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center">
        <p class="text-black dark:text-white text-lg">{{ $t('create.info') }}</p>
        <UButtonGroup size="lg" orientation="horizontal" class="w-full">
            <UInput
class="w-full" :model-value="urlToCopy" disabled :ui="{
                base: 'disabled:!cursor-copy'
            }" />
            <UButton icon="i-heroicons-clipboard-document" color="gray" @click="handleUrlCopy" />
        </UButtonGroup>
    </div>
</template>