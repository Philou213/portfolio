<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="onInput"
    :placeholder= "$t('global.search')"
    class="mb-6 rounded border border-gray-300 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none w-full"
  />
</template>
