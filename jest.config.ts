/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const { join } = require("path");
const pkg = require("./package.json");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  rootDir: __dirname,
  displayName: pkg.name,
  testMatch: [join(__dirname, "src/**/*.test.{js,ts,tsx}")],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
    //   "<rootDir>/src/__mocks__/fileMock.js",
    // "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    "^@shared(.*)$": "<rootDir>/shared$1",
  },
  coveragePathIgnorePatterns: ["node_modules", "__mocks__", "stories"],
  clearMocks: true,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "^.+\\.css$": "jest-transform-css",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-file",
  },
};
