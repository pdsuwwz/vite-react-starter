module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpeg|jpg|gif|svg)$': 'identity-obj-proxy',
    '\\.(ttf|woff|woff2)$': 'identity-obj-proxy'
  },

  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/main.tsx'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],

  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest'
  },
  testMatch: ['<rootDir>/__tests__/**/*.(test|spec).ts?(x)'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules']
}
