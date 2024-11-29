<script setup lang="ts">
import { object, string } from 'yup'

import type { InferType } from 'yup';
import type { Form, FormSubmitEvent } from '#ui/types'

const emits = defineEmits<{
  (e: 'submit', content: string): void
}>()

const route = useRoute()

const schema = object({
  password: string().optional(),
})

type Schema = InferType<typeof schema>

const form = ref<Form<Schema>>()
const isLoading = ref(false)
const state = reactive({
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true
    const response: { [key: string]: string } = await $fetch(`/api/v1/share/${route.params.id}`, {
      method: 'post',
      body: {
        password: event.data.password
      }
    })

    emits('submit', response.content);
    form.value?.clear()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm
ref="form" :schema="schema" :state="state" :validate-on="['input', 'submit', 'change']"
    class="space-y-4 grow w-full" @submit="onSubmit">
    <UCard
:ui="{
      body: {
        base: 'flex flex-col gap-4'
      }
    }">
      <UFormGroup :label="$t('landing.password_label')" name="password">
        <InputPassword v-model="state.password" size="lg" />
      </UFormGroup>

      <template #footer>
        <UButton type="submit" icon="i-heroicons-key" :loading="isLoading">
          {{ $t('form.access') }}
        </UButton>
      </template>
    </UCard>
  </UForm>
</template>