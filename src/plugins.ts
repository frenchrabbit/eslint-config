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
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginPnpm from 'eslint-plugin-pnpm'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginSecurity from 'eslint-plugin-security'
import pluginSonarJS from 'eslint-plugin-sonarjs'
import pluginSxzz from 'eslint-plugin-sxzz'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import pluginVue from 'eslint-plugin-vue'
import pluginYml from 'eslint-plugin-yml'
import parserJsonc from 'jsonc-eslint-parser'
import tseslint from 'typescript-eslint'
import parserVue from 'vue-eslint-parser'
import parserYml from 'yaml-eslint-parser'

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
