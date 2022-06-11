const preset = require("./jest.config")

module.exports = {
  ...preset,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>../../packages/tests/jest.setup.node.js'],
}
