
const nextJest = require('next/jest')
const preset = require('tests/jest.config.next');

const createJestConfig = nextJest({
  dir: './',
})

module.exports = createJestConfig({
  ...preset,
  moduleDirectories: ['node_modules', 'src']
})
