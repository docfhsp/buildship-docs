import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  flexsearch: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})

export default withNextra({
  reactStrictMode: true,
  eslint: {
    // Eslint behaves weirdly in this monorepo.
    ignoreDuringBuilds: true
  },
  redirects: () => [
    {
      source: '/docs/guide/:slug(typescript|latex|tailwind-css|mermaid)',
      destination: '/docs/guide/advanced/:slug',
      permanent: true
    },
    {
      source: '/docs/docs-theme/built-ins/:slug(callout|steps|tabs)',
      destination: '/docs/guide/built-ins/:slug',
      permanent: true
    },
    {
      source: '/:slug(rest-api|scheduled-cron|scheduled-interval|telegram-bot)',
      destination: '/trigger-nodes/:slug',
      permanent: true
    },
    {
      source: '/meta/whatsapp',
      destination: '/whatsapp',
      permanent: true
    },
    {
      source: '/utility-nodes/overview',
      destination: '/utility-nodes',
      permanent: true
    }
    
  ],
  webpack(config) {
    const allowedSvgRegex = /components\/icons\/.+\.svg$/

    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test('.svg')
    )
    fileLoaderRule.exclude = allowedSvgRegex

    config.module.rules.push({
      test: allowedSvgRegex,
      use: ['@svgr/webpack']
    })
    return config
  }
})
