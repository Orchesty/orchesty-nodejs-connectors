import path from 'node:path';
import { fileURLToPath } from 'node:url';
import hanaboso from '@hanaboso/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...hanaboso.configs.orchesty,

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