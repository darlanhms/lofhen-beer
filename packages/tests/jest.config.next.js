const preset = require("./jest.config")


module.exports =  {
  ...preset,
  setupFilesAfterEnv: ['<rootDir>../../packages/tests/jest.setup.next.js'],
  testEnvironment: 'jest-environment-jsdom',
}
