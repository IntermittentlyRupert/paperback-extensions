/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: ".",
  roots: ["./src"],
  testMatch: ["**/tests/**/*.test.[tj]s"],
  setupFilesAfterEnv: ["jest-extended"],
  resetMocks: true,
  moduleFileExtensions: ["ts", "js", "json", "d.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};
