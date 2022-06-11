const preset = require("./jest.config")

module.exports = {
  ...preset,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>../../packages/tests/jest.setup.node.js'],
}
