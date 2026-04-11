import type { ESLint } from 'eslint'

import { preferAsyncImport } from './prefer-async-import'

export const pluginFrabbitVue: ESLint.Plugin = {
  rules: {
    'prefer-async-import': preferAsyncImport,
  },
}
