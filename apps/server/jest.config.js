const { pathsToModuleNameMapper } = require('ts-jest');
const preset = require('tests/jest.config.node');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  ...preset,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
}
