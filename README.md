# @frabbit/eslint-config [![npm](https://img.shields.io/npm/v/@frabbit/eslint-config.svg)](https://npmjs.com/package/@frabbit/eslint-config)


Flat ESLint config for JavaScript, TypeScript, Vue 2, Vue 3, Prettier.
based on https://github.com/sxzz/eslint-config

A opinionated ESLint config preset for JavaScript, TypeScript, Vue,
and Prettier.

## Features

- Format with Prettier.
- Designed to work with TypeScript, Vue out-of-box.
- Support JSON(5), YAML, Markdown...
- Sort imports, `package.json`, `tsconfig.json`...
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Ignores common files like `dist`, `node_modules`, `coverage`, and files in `.gitignore`.
- Reasonable defaults, best practices, only one-line of config
- Reasonable strict, but with better code quality.

## Install

```bash
npm i -D @frabbit/eslint-config
```

Require Node.js >= 20.0.0, and ESLint >= 9.5.0.

## Usage

```js
import { frabbit } from '@frabbit/eslint-config'
export default frabbit(
  // Features: it'll detect installed dependency and enable necessary features automatically
  {
    prettier: true,
    markdown: true,
    vue: true, // auto detection
    unocss: false, // auto detection
  },
  [
    /* your custom config */
  ],
).removeRules('foo/bar') // see more in https://github.com/antfu/eslint-flat-config-utils
```

### Presets

```js
// eslint.config.js
import {
  presetJavaScript, // Ignore common files and include javascript support
  presetJsonc, // Includes basic json(c) file support and sorting json keys
  presetLangsExtensions, // Includes markdown, yaml + `presetJsonc` support
  presetBasic, // Includes `presetJavaScript` and typescript support

  // Includes
  // - `presetBasic` (JS+TS) support
  // - `presetLangsExtensions` (markdown, yaml, jsonc) support
  // - Vue support
  // - UnoCSS support (`uno.config.ts` is required)
  // - Prettier support
  presetAll,
} from '@frabbit/eslint-config'

export default presetAll
```

See [preset.ts](./src/presets.ts) for more details.

## Comparing to [`@antfu/eslint-config`](https://github.com/antfu/eslint-config)

Most of the rules are the same, but there are some differences:

- Use [Prettier](https://prettier.io/) instead of [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic).
- React and Svelte are not supported.
- Maybe stricter and simpler.

