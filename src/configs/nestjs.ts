import { GLOB_TS, GLOB_TSX } from '../globs'
import { pluginImport } from '../plugins'
import type { Config } from '../types'

export const nestjs = (): Config[] => [
  {
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parserOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
      },
    },
    name: 'frabbit/nestjs',
    plugins: {
      import: pluginImport,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      'import/consistent-type-specifier-style': 'off',
    },
  },
]
