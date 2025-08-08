<script setup lang="ts">
import { ref, watch } from 'vue'
import { projectTags } from '~/content/tags'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const isOpen = ref(false)
const selectedTags = ref([...props.modelValue])

watch(
  () => props.modelValue,
  (newVal) => {
    selectedTags.value = [...newVal]
  }
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function toggleTag(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  emit('update:modelValue', selectedTags.value)
}
</script>

<template>
  <div class="relative inline-block w-full">
    <button
      @click="toggleDropdown"
      class="w-full rounded border border-gray-300 bg-gray-900 px-4 py-2 text-white text-left"
    >
        {{ $t("global.filter")}}
    </button>
    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full rounded border border-gray-300 bg-gray-800 shadow-lg max-h-60 overflow-auto"
    >
      <div
        v-for="tag in projectTags"
        :key="tag"
        class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
      >
        <input
          type="checkbox"
          :id="tag"
          :value="tag"
          :checked="selectedTags.includes(tag)"
          @change="toggleTag(tag)"
        />
        <label :for="tag" class="text-white">{{ tag }}</label>
      </div>
    </div>
  </div>
</template>
