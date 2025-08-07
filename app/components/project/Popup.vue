<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import type { Project } from '~/data/projects';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
});

const img = useImage();

const emit = defineEmits(['update:isOpen']);

// Watch for changes in isOpen and handle closing the modal
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
    <div class="flex justify-center items-center w-full h-full p-2 bg-grey-1000">
      <div
        class="relative flex flex-col items-center gap-6 bg-zinc-900/80 rounded-lg p-10 shadow-2xl shadow-zinc-950/50 max-w-[80vw] max-h-[90vh] backdrop-blur-md"
        :aria-label="project.name + ' project details'"
      >
        <!-- Project Image -->
        <NuxtImg
          :placeholder="img(`${project.image}`)"
          width="1920"
          :alt="project.name + ' project image'"
          class="h-72 w-full rounded-lg object-cover"
          :src="project.image"
        />

        <!-- Project Name -->
        <h2 class="text-2xl font-bold text-white text-center">
          {{ project.name }}
        </h2>

        <!-- Context and Role -->
        <div class="flex flex-col items-start text-sm font-bold text-neutral-400 w-full">
          <!-- Project Context -->
          <p class="text-left leading-relaxed" 
            v-html="'<strong>' + $t('global.context') + '</strong>' + project.context"></p>

          <!-- Role -->
          <p class="text-left leading-relaxed" 
            v-html="'<strong>' + $t('global.role') + '</strong>' + project.role"></p>
        </div>


        <!-- Short Description -->
        <p class="text-base text-neutral-300 text-center leading-relaxed">
          {{ project.description || $t('project.description') }}
        </p>

        <!-- Redirect Button -->
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-flex items-center gap-3 rounded bg-gray-100 px-8 py-3 text-lg text-black hover:bg-gray-200 transition-all"
        >
          <UIcon name="i-heroicons-arrow-right" class="size-5" />
          {{ $t('global.visit_project') }}
        </a>
      </div>
    </div>
  </UModal>
</template>
