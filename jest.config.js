module.exports = {
  rootDir: ".",
  roots: ["./src"],

  setupFilesAfterEnv: ["jest-extended"],

  collectCoverage: false,
  coverageReporters: ["json", "lcov"],
  coverageDirectory: "./cov",
  collectCoverageFrom: ["**/*.ts", "**/*.js", "!**/*.d.ts", "!test-utils/**"],

  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "d.ts"],
  resetMocks: true,
};
