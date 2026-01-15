module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: ["**/__tests__/*.ts", "**/*.test.ts"],

  setupFiles: ["<rootDir>/.jest/testEnvs.ts"],
  setupFilesAfterEnv: ["<rootDir>/.jest/testLifecycle.ts"],
  globalSetup: "<rootDir>/.jest/globalSetup.ts",

  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: "<rootDir>/tsconfig.json",
      useESM: false,
      diagnostics: {
        ignoreCodes: ['TS151001']
      }
    }],
  },

  moduleNameMapper: {
    "^@orchesty/nodejs-connectors/test/(.*)$": "<rootDir>/test/$1",
    "^@orchesty/nodejs-connectors/lib/(.*)$": "<rootDir>/lib/$1",
  },

  transformIgnorePatterns: [
    "/node_modules/(?!@orchesty/)"
  ],
};