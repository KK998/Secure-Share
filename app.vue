<script setup lang="ts">
useSeoMeta({
    keywords: 'secure, share',
    author: 'kk998',
    creator: 'kk998',
    googlebotNews: 'noindex',
    google: 'nositelinkssearchbox',
    robots: 'noindex, nofollow',
    generator: '??',
    applicationName: 'Secure Share',
    description: 'Share your content in a secure manner...'
})
</script>
<template>
    <div>
        <NuxtLoadingIndicator />
        <NuxtRouteAnnouncer />
        <NuxtLayout name="default">
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
    </div>
</template>