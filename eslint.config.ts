import type { FlatConfigComposer } from 'eslint-flat-config-utils'

import { frabbit } from './src'
import type { Config, ConfigNames } from './src'

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
  },
  {
    rules: {
      'unicorn/no-top-level-side-effects': 'off',
      'node/prefer-global/process': 'off',
    },
  },
  {
    files: ['scripts/**/*.ts'],
    rules: { 'baseline-js/use-baseline': 'off' },
  },
)
export default _default
