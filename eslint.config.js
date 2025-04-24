import globals from 'globals';
import pluginJs from '@eslint/js';
import react from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'; // no type declaration from pkg developer
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      eslintPluginReactHooks,
      eslintPluginPrettier,
      eslintPluginImport,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'eslintPluginPrettier/prettier': 'error',
      'react/jsx-no-target-blank': 'off',

      // 'react-refresh/only-export-components': [
      //   'warn',
      //   {
      //     allowConstantExport: true,
      //   },
      // ],

      'eslintPluginReactHooks/rules-of-hooks': 'error',
      'eslintPluginReactHooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
      'no-debugger': 'error',
      'consistent-return': 'warn',
      'react/jsx-no-bind': 'off',
      // 'import/no-commonjs': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'eslintPluginImport/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
        },
      ],
      'eslintPluginImport/prefer-default-export': 'off',
      'eslintPluginImport/no-unresolved': [
        'error',
        {
          ignore: ['^@/'],
        },
      ],

      // 'import/no-extraneous-dependencies': [
      //   'error',
      //   {
      //     devDependencies: ['vite.config.js'],
      //   },
      // ],
    },
  },
];
