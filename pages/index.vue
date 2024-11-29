<script setup lang="ts">
import { object, string, bool } from 'yup'
import { useI18n } from 'vue-i18n';

import type { InferType } from 'yup';
import type { Form, FormError, FormSubmitEvent } from '#ui/types'

const { t } = useI18n()
const toast = useToast()

const schema = object({
  content: string().required(t('form.requiredField')),
  password: string().min(8, t('form.minimumLength', { value: 8 })).required(t('form.requiredField')),
  selfDestruct: bool().default(true).optional()
})

type Schema = InferType<typeof schema>

const form = ref<Form<Schema>>()
const isLoading = ref(false)

const state = reactive({
  content: undefined,
  password: undefined,
  selfDestruct: true
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true
    const response = await $fetch('/api/v1/share/new', {
      method: 'POST',
      body: {
        selfDestruct: event.data.selfDestruct,
        password: event.data.password,
        content: event.data.content
      },
    })

    if (!response.slug) {
      toast.add({
        color: 'red',
        title: t('no_slug'),
      })
      return
    }

    if (String(response.slug).match(/\/share\/[\w\d]+/) === null) {
      toast.add({
        color: 'red',
        title: t('malformed_slug'),
      })
      return
    }

    state.content = undefined;
    state.password = undefined;

    toast.add({
      title: 'Share created!',
    })

    await navigateTo(`/share/create?slug=${encodeURIComponent(response.slug)}`)
  } catch (error: any) {
    const { data } = error.data
    const errors = [] as FormError[]

    (['content', 'password'] as string[]).forEach((field: string) => {
      if (data[field]) {
        errors.push({
          path: field,
          message: t(data[field])
        })
      }
    })

    form.value?.setErrors(errors)
  } finally {
    isLoading.value = false
  }

}
</script>

<template>
  <main class="mx-auto container gap-10 flex flex-col justify-center items-center">
    <UForm ref="form" :schema="schema" :state="state" :validate-on="['input', 'submit', 'change']"
      class="space-y-4 grow w-full" @submit="onSubmit">
      <UCard :ui="{
        body: {
          base: 'flex flex-col gap-4'
        }
      }">
        <UFormGroup :label="$t('landing.content_label')" name="content">
          <UTextarea v-model="state.content" size="lg" placeholder="Lorem ipsum..." autoresize autofocus />
        </UFormGroup>

        <UFormGroup :label="$t('landing.password_label')" name="password">
          <InputPassword v-model="state.password" size="lg" />
        </UFormGroup>

        <UCheckbox v-model="state.selfDestruct" :help="$t('landing.self_destruct_help')"
          :label="$t('landing.self_destruct_label')" />

        <template #footer>
          <UButton type="submit" icon="i-heroicons-cog" :loading="isLoading">
            {{ $t('form.submit') }}
          </UButton>
        </template>
      </UCard>
    </UForm>
  </main>
</template>
