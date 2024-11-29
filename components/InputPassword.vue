<script setup lang="ts">
const model = defineModel<string | undefined>({ required: true })

const type = useState('input-password-type', () => 'password')
const iconName = useState('input-password-icon', () => 'i-heroicons-eye')

const iconNames = {
  'password': 'i-heroicons-eye-slash',
  'text': 'i-heroicons-eye'
}

type IconName = keyof typeof iconNames

const toggleVisibility = () => {
  type.value = type.value === 'password' ? 'text' : 'password'
  iconName.value = iconNames[type.value as IconName]
}
</script>

<template>
  <UInput v-model="model" :type="type" :ui="{ icon: { trailing: { pointer: '' } } }" autocomplete="off" v-bind="$attrs">
    <template #trailing>
      <UIcon :name="iconName" class="w-5 h-5" @click="toggleVisibility" />
    </template>
  </UInput>
</template>
