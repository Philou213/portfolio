<script setup lang="ts">
import type { Project } from '~/data/projects';
import Popup from '../project/Popup.vue';
const { locale } = useI18n()

const { data: projects } = await useAsyncData('projects', () => queryContent('/projects').locale(locale.value).sort({ release: -1 }).find(), {
  watch: [locale],
})

const isOpen = ref(false)
const selectedProject = ref<Project | null>(null)
function openModal(projectData : Project) {
  selectedProject.value = projectData;
  isOpen.value = true;
}

</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <h3 class="font-newsreader italic text-white-shadow text-xl">
      {{ $t("navigation.works") }}
    </h3>
    <div class="flex w-full flex-col gap-4">
      <NuxtLink
        v-for="project in projects?.filter((work) => work.featured)"
        :key="project.name"
        role="link"
        class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-secondary hover:text-main"
        :aria-label="'go to ' + project.name + ' project website'"
        :target="project.release === 'soon' ? '_self' : '_blank'"
        @click.prevent="openModal(project)"
      >
    
        <span class="whitespace-nowrap">
          {{ project.name }}
        </span>
        <div class="mx-2 h-[0.1px] w-full bg-muted" />
        <span class="whitespace-nowrap text-muted">
          {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
        </span>
      </NuxtLink>
    </div>
    <div @click="useRouter().push('/works')">
      <span class="font-newsreader italic text-white-shadow cursor-pointer text-sm">
        {{ $t("global.see_more") }}
      </span>
    </div>
  </div>
  <Popup v-if="selectedProject" :isOpen="isOpen" :project="selectedProject" @update:isOpen="isOpen = $event" />
</template>

<style scoped></style>
