const { pathsToModuleNameMapper } = require('ts-jest');
const preset = require('tests/jest.config.node');
const { compilerOptions } = require('./tsconfig');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...preset,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
  setupFilesAfterEnv: ['./src/core/tests/setup.ts'],
}
