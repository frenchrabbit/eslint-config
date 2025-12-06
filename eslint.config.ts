import { frabbit, type Config, type ConfigNames } from './src'

import type { FlatConfigComposer } from 'eslint-flat-config-utils'

const _default: FlatConfigComposer<Config, ConfigNames> = frabbit({
  vue: true,
  pnpm: true,
}).append(
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
  {
    files: ['**/*.md/*'],
    rules: {
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
    },
  },
  {
    ignores: ['src/typegen.ts'],
  }
)
export default _default
