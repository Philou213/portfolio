export default defineAppConfig({
  appName: 'Philippe St-Laurent-Recoura - Portfolio',
  appDescription: 'Portfolio de présentation de Philippe St-Laurent-Recoura',
  profilePicture: '/assets/hugo-richard-light.webp',
  footerName: 'Philippe St-Laurent-Recoura',
  email: 'philippestlr@gmail.com',
  twitterUsername: '@HugoRCD__',
  phone: '(+33) 6 21 56 22 18',
  openGraphImage: 'https://canvas.hrcd.fr/social-preview.jpg',
  socials: {
    github: 'https://github.com/Philou213',
    gitlab: 'https://gitlab.com/Philou213',
    linkedin: 'https://www.linkedin.com/in/philippe-st-laurent-recoura-9bb40224a/',
    itch: 'https://philou213.itch.io/'
  },
  ui: {
    primary: 'emerald',
    gray: 'zinc',
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    input: {
      variant: {
        none: 'bg-gray-100 dark:bg-gray-900/40 border-1 border-gray-700 hover:border-gray-400 focus:border-gray-400 transition-colors duration-300 ease-in-out',
      },
    },
    textarea: {
      variant: {
        none: 'bg-gray-100 dark:bg-gray-900/40 border-1 border-gray-700 hover:border-gray-400 focus:border-gray-400 transition-colors duration-300 ease-in-out',
      },
    },
  },
})
