import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { pluginAntfu, pluginImport } from '../plugins'
import type { Config } from '../types'

export const imports = (): Config[] => [
  {
    name: 'frabbit/imports',
    plugins: {
      antfu: pluginAntfu,
      import: pluginImport,
    },
    rules: {
      'antfu/import-dedupe': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-default-export': 'error',
      'import/no-duplicates': ['error', { 'prefer-inline': false }],
      'import/no-empty-named-blocks': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error',
    },
  },
  {
    // TODO: remove
    files: [
      `**/*config*.${GLOB_SRC_EXT}`,
      `**/views/${GLOB_SRC}`,
      `**/pages/${GLOB_SRC}`,
      `**/{index,vite,esbuild,rollup,webpack,rspack}.ts`,
      '**/*.d.ts',
      `${GLOB_MARKDOWN}/**`,
    ],
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
]
