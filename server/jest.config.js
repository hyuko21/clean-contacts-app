module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*spec.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
