import { GLOB_TS, GLOB_TSX } from '../globs'
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
  },
]
