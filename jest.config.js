const nextJest = require("next/jest");
const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

const createJestConfig = nextJest({
  dir: ".",
});

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper,
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js)"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/node_modules/** ",
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
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

module.exports = createJestConfig(config);
