// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import react from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import flowtypePlugin from 'eslint-plugin-flowtype';
import pluginPromise from 'eslint-plugin-promise'
import reactRefresh from "eslint-plugin-react-refresh";

import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  {
    ignores: [
      '*.d.ts',
      '*.{js,jsx}',
      'src/tsconfig.json',
      '*.css',
      'node_modules/**/*',
      '.next',
      'out',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginPromise.configs['flat/recommended'],
  reactRefresh.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ...importPlugin.flatConfigs.recommended,
    ...importPlugin.flatConfigs.typescript,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs,
      '@stylistic/jsx': stylisticJsx,
      react,
      'jsx-a11y': jsxA11yPlugin,
      'flow-type': flowtypePlugin,
      'react-hooks': reactHooksPlugin,
    },
    extends: [
      // @ts-ignore
      ...compat.config(jsxA11yPlugin.configs.recommended),

      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    ],
    // @ts-ignore
    rules: {
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/require-render-return': 'off',
      'react/display-name': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/no-string-refs': 'off',
      'react/jsx-no-undef': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/jsx/jsx-indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
