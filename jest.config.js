module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.ts'],
  roots: ["<rootDir>/lib/"],
  setupFiles: ["<rootDir>/.jest/testEnvs.ts"],
  setupFilesAfterEnv: ["<rootDir>/.jest/testLifecycle.ts"],
  globalSetup: '<rootDir>/.jest/globalSetup.ts',
};
