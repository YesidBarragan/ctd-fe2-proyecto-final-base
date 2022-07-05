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
  collectCoverageFrom: [
    '**/*.test.tsx',
    '!src/mocks',
    '!test-utils.tsx'
  ],
  testPathIgnorePatterns: [
    "<rootDir>/mocks",
    "<rootDir>/test-utils.tsx"
  ]
};