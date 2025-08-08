<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { projectTags } from '~/content/tags'

const { t } = useI18n()

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

// Sorted tags using localized labels
const sortedTags = computed(() => {
  return [...projectTags].sort((a, b) =>
    t(`tags.${a}`).localeCompare(t(`tags.${b}`))
  )
})

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
        v-for="tag in sortedTags"
        :key="tag"
        class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
        @click="toggleTag(tag)"
      >
        <input
          type="checkbox"
          :id="tag"
          :value="tag"
          :checked="selectedTags.includes(tag)"
          @change.stop
        />
        <label class="cursor-pointer">  {{ $t(`tags.${tag}`) }}</label>
  </div>
    </div>
  </div>
</template>
