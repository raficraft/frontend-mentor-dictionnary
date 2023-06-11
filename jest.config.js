const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/api/(.*)$": "<rootDir>/pages/api/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/atoms/(.*)$": "<rootDir>/src/components/atoms/$1",
    "^@/molecules/(.*)$": "<rootDir>/src/components/molecules/$1",
    "^@/organisms/(.*)$": "<rootDir>/src/components/organisms/$1",
    "^@/templates/(.*)$": "<rootDir>/src/components/templates/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/context/(.*)$": "<rootDir>/src/context/$1",
    "^@/svg/(.*)$": "<rootDir>/src/assets/svg/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js)"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/node_modules/** ",
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/components/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "cobertura"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "coverage",
        outputName: "junit.xml",
      },
    ],
  ],
};

module.exports = createJestConfig(customJestConfig);
