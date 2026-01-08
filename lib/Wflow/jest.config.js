
const baseConfig = require('../../jest.config.js');

module.exports = {
  ...baseConfig,
  roots: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/../../.jest/testEnvs.ts"],
  setupFilesAfterEnv: ["<rootDir>/../../.jest/testLifecycle.ts"],
  globalSetup: "<rootDir>/../../.jest/globalSetup.ts",
  moduleNameMapper: {
    "^@orchesty/nodejs-connectors/test/(.*)$": "<rootDir>/../../test/$1",
    "^@orchesty/nodejs-connectors/lib/(.*)$": "<rootDir>/../../lib/$1",
  },
}
