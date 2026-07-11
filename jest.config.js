/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "html", "js"],
  transform: {
    "^.+\\.(ts|mjs|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.html$",
      },
    ],
  },
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "\\.(css|less|scss|sass)$": "jest-transform-stub", // Add this line
  },
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "src/**/*.ts",
    "!src/main.ts",
    "!src/polyfills.ts",
    "!src/**/*.module.ts",
    "!src/app/**/*.spec.ts",
    "!src/app/**/*.models.ts",
    "!src/app/app.config.ts",
    "!src/app/app.routes.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
