module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/netlify/functions/setupTests.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  roots: ["<rootDir>/netlify/functions"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
