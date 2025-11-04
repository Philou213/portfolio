<script setup lang="ts">
const socialMediaRegexMap = [
  { regex: /github\.com/, name: 'GitHub', logo: 'SvgoGithub' },
  { regex: /twitter\.com/, name: 'X / Twitter', logo: 'SvgoX' },
  { regex: /linkedin\.com/, name: 'LinkedIn', logo: 'SvgoLinkedin' },
  { regex: /instagram\.com/, name: 'Instagram', logo: 'SvgoInstagram' },
  { regex: /spotify\.com/, name: 'Spotify', logo: 'SvgoSpotify' },
  { regex: /gitlab\.com/, name: 'GitLab', logo: 'SvgoGitlab' },
  { regex: /.itch.io/, name: 'Itch', logo: 'SvgoItch' },
  { regex: /cv/, name: 'CV', logo: 'SvgoItch' },
]

const { socials } = useAppConfig()
const mappedSocials = Object.values(socials).map((link) => {
  const foundSocial = socialMediaRegexMap.find(social => social.regex.test(link))
  if (!foundSocial) throw new Error(`No social media found for link: ${link}`)
  const { name, logo } = foundSocial
  return { name, link, logo }
})
</script>

<template>
  <div class="my-7 flex items-center justify-center gap-6 sm:gap-10">
    <NuxtLink
      v-for="social in mappedSocials"
      :key="social.name"
      :to="social.link"
      target="_blank"
      class="flex items-center justify-center"
      :aria-label="'Go to ' + social.name + ' profile'"
    >
      <component
        :is="social.logo"
        class="social-item size-6 text-muted transition-all duration-300 hover:text-main"
        :font-controlled="false"
        :alt="social.name + ' logo'"
        :aria-label="social.name + ' logo'"
      />
    </NuxtLink>
    <a
      href="/assets/CV.pdf"
      download
      class="flex items-center justify-center rounded-xl border border-gray-500 px-4 py-2 text-sm text-gray-700 transition-colors duration-300 hover:bg-emerald-500 hover:text-white dark:text-gray-200"
    >
    {{ $t("global.download_cv") }}
    </a>
  </div>
</template>
