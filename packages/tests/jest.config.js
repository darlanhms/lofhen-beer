module.exports = {
  clearMocks: true,
  testTimeout: 15000,
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  testRegex: '.(spec|test).(ts|tsx)$',
  transform: {'^.+\.(ts|tsx)$': 'ts-jest'},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
