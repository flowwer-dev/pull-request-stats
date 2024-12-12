/* eslint-disable import/no-extraneous-dependencies */
import jest from 'eslint-plugin-jest';
import globals from 'globals';
import path from 'node:path';
import js from '@eslint/js';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
/* eslint-enable import/no-extraneous-dependencies */

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* eslint-enable no-underscore-dangle */
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: ['dist/**/*'],
}, ...compat.extends('airbnb-base'), {
  plugins: {
    jest,
  },

  languageOptions: {
    globals: {
      ...globals.node,
      ...jest.environments.globals.globals,
      Promise: 'readonly',
    },

    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}];
