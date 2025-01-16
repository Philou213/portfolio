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
    <div class="flex justify-center items-center w-full h-full p-10">
      <div
        class="relative flex flex-col items-center gap-6 bg-zinc-900/80 p-10 rounded-lg shadow-2xl shadow-zinc-950/50 max-w-[80vw] max-h-[90vh] backdrop-blur-md"
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
       <div class="flex justify-center gap-8 text-sm font-bold text-neutral-400">
          <!-- Project Context -->
          <p v-html="'<strong>' + $t('global.context') + '</strong>' + '<br>' + project.context"></p>
          <!-- Role -->
          <p v-html="'<strong>' + $t('global.role') + '</strong>' + '<br>' + project.role"></p>
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
          class="mt-6 inline-flex items-center gap-3 rounded bg-blue-600 px-8 py-3 text-lg text-white hover:bg-blue-700 transition-all"
        >
          <UIcon name="i-heroicons-arrow-right" class="size-5" />
          {{ $t('global.visit_project') }}
        </a>
      </div>
    </div>
  </UModal>
</template>
