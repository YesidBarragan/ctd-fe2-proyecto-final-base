module.exports = {
  projects : [
    {
      displayName: 'components',
      testMatch: ['<rootDir>/features/quote/*.test.tsx'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: [
        '<rootDir>/jest.env.ts',
      ],
      verbose: true,
    }
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/features/quote',
    '**/*.test.tsx',
    '!src/features/news',
    '!src/mocks',
    '!test-utils.tsx'
  ],
  testPathIgnorePatterns: [
    "<rootDir>/mocks",
    "<rootDir>/test-utils.tsx"
  ]
};