<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import type { Project } from '~/data/projects';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  project: {
    type: Object as PropType<Project>,
    required: true
  }
});

const img = useImage()

const emit = defineEmits(['update:isOpen']);

// Watch for changes in isOpen and update the modal accordingly
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    closeModal();
  }
});

function closeModal() {
  emit('update:isOpen', false);
}
</script>

<template>
  <UModal :model-value="props.isOpen" @close="closeModal">
    <div class="flex justify-center items-center w-full h-full p-5">
      <div
        :aria-label="project.name + ' project link'"
        class="group relative flex cursor-pointer flex-col gap-1 rounded-lg border border-white/10 bg-zinc-900/80 p-4 shadow-2xl shadow-zinc-950/50 backdrop-blur-sm max-w-[90vw] max-h-[90vh]"
      >
        <div class="flex justify-center overflow-hidden rounded-lg">
          <NuxtImg
            :placeholder="img(`${project.image}`)"
            width="1536"
            :alt="project.name + ' project image'"
            class="max-h-96 w-auto rounded-lg object-cover transition-all duration-300 hover:scale-105"
            :src="project.image"
            :aria-label="project.name + ' project image'"
          />
        </div>
        <div class="absolute bottom-0 flex w-full justify-center">
          <div class="rounded-t-lg border-x border-t border-white/10 border-b-transparent px-4 py-[5px] shadow-md backdrop-blur-md sm:w-2/3">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <component
                  :is="project.logo"
                  v-if="project.name !== 'Sekoïa'"
                  :alt="project.name + ' logo'"
                  :aria-label="project.name + ' logo'"
                  :font-controlled="false"
                  class="size-5 text-white/90"
                />
                <div class="flex items-center gap-2">
                  <span class="whitespace-nowrap text-sm font-semibold text-white/90">
                    {{ project.name }}
                  </span>
                  <span class="whitespace-nowrap text-xs text-neutral-500">
                    {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
                  </span>
                </div>
              </div>
              <div
                class="flex items-center justify-center rounded-full border border-transparent p-1 shadow-md backdrop-blur-md transition-all duration-500 group-hover:-rotate-45 group-hover:border-white/10"
              >
                <UIcon
                  name="i-heroicons-arrow-right"
                  class="size-3 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>
