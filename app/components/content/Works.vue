<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '~/components/Search/Searchbar.vue'
import TagDropdown from '~/components/Search/TagDropdown.vue'

const { locale } = useI18n()

const { data: projects } = await useAsyncData('projects', () => queryContent('/projects').locale(locale.value).sort({release: -1 }).find(), {
  watch: [locale],
})

const searchQuery = ref('')
const selectedTags = ref<ProjectTag[]>([])

// Filter projects based on the search query
const filteredProjects = computed(() => {
  if (!projects.value) return []

  const query = searchQuery.value.toLowerCase()
  const tags = selectedTags.value

  return projects.value.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      (project.description?.toLowerCase().includes(query) ?? false)

    const matchesTags =
      tags.length === 0 || tags.every(tag => project.tags?.includes(tag))

    return matchesSearch && matchesTags
  })
})
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-7xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <ContentSlot :use="$slots.title" />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <ContentSlot :use="$slots.subtitle" />
    </h2>
    <Divider class="mb-8 mt-2" />

    <div class="flex gap-4">
      <div class="w-2/3">
        <SearchBar v-model="searchQuery" />
      </div>

      <div class="w-1/3">
        <TagDropdown v-model="selectedTags" />
      </div>
    </div>
    <div v-if="filteredProjects.length === 0" class="text-center text-gray-400 mt-8">
      {{ $t('global.no_projects_found') }}
    </div>
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.name"
        :project="project"
      />
    </div>
  </section>
</template>
