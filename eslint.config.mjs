import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends("plugin:@hanaboso/orchesty"),

  {
    files: ["test/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./test/tsconfig.json", "./lib/**/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },

  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  },

  {
    files: ["**/*.ts"],
    ignores: ["dist/**"],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  }
];