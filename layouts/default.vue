<script setup lang="ts"></script>

<template>
  <div class="min-h-screen w-full p-6 flex flex-col items-center justify-center">
    <header class="flex flex-col gap-2 justify-center items-center mb-10 lg:mb-20">
      <h1 class="text-center text-black dark:text-white text-4xl lg:text-8xl font-black">
        {{ $t('landing.greeting') }}
      </h1>
    </header>

    <main class="mx-auto container flex flex-col">
      <slot />
    </main>

    <footer class="flex justify-center items-center gap-4 fixed bottom-0 w-full">
      <small>{{ $t('landing.notice') }}</small>
      <LocaleSwitcher />
    </footer>
  </div>
</template>