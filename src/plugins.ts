/* eslint-disable perfectionist/sort-imports */
// @ts-nocheck

import configJs from '@eslint/js'
import pluginMarkdown from '@eslint/markdown'
import configComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import pluginIgnore from 'eslint-config-flat-gitignore'
import pluginAntfu from 'eslint-plugin-antfu'
import configCommand from 'eslint-plugin-command/config'
import pluginDeMorgan from 'eslint-plugin-de-morgan'
import pluginImport from 'eslint-plugin-import-x'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import pluginJsonc from 'eslint-plugin-jsonc'
import pluginNode from 'eslint-plugin-n'
import pluginSxzz from 'eslint-plugin-sxzz'
import tseslint from 'typescript-eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import pluginPnpm from 'eslint-plugin-pnpm'
import pluginSecurity from 'eslint-plugin-security'
import pluginSonarJS from 'eslint-plugin-sonarjs'
import pluginYml from 'eslint-plugin-yml'
import parserVue from 'vue-eslint-parser'
import parserYml from 'yaml-eslint-parser'
import parserJsonc from 'jsonc-eslint-parser'

export {
  configCommand,
  configComments,
  configJs,
  parserJsonc,
  parserVue,
  parserYml,
  pluginAntfu,
  pluginDeMorgan,
  pluginIgnore,
  pluginImport,
  pluginJsdoc,
  pluginJsonc,
  pluginMarkdown,
  pluginNode,
  pluginPerfectionist,
  pluginPnpm,
  pluginPrettier,
  pluginPrettierRecommended,
  pluginSecurity,
  pluginSonarJS,
  pluginSxzz,
  pluginUnicorn,
  pluginUnusedImports,
  pluginVue,
  pluginYml,
  tseslint,
}
